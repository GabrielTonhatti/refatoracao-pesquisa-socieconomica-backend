/* eslint-disable no-undef */
import { Model, model, Types } from "mongoose";
import logger from "../config/logger";
import PerguntasDto from "../dto/PerguntasDto";
import RespostaDto from "../dto/RespostaDto";
import RespostasDto from "../dto/RespostasDto";
import Pergunta, { PerguntaInterface } from "../model/Pergunta";
import { INDEX_PERGUNTA } from "../utils/constantes";
import respostasUtils from "../utils/respostasUtils";
import { PerguntasExcel } from "../utils/types/types";
import planilhaServer from "./PlanilhaServer";
import RelatorioResponse from "../dto/RelatorioResponse";
import { Turno } from "../enums/Turno";

type PerguntaRepository = Model<PerguntaInterface, {}, {}, {}, any>;

interface PerguntaSchema extends PerguntaInterface {
    _id: Types.ObjectId;
}

class RelatorioServer {
    private static readonly TEXTO_DESNECESSARIO: string =
        "Estamos quase acabando... ";

    private static readonly INDEX_PERGUNTA_TURNO: string =
        "2. Qual o período que cursa?";

    private static readonly ITENS_PARA_REMOVER: Array<string> = [
        "3. Informe os 7 últimos dígitos do seu RA (109048xxxxxxx)",
        "__rowNum__",
        "Timestamp",
        "Email Address",
    ];

    private readonly repository: PerguntaRepository;

    public constructor() {
        this.repository = model<PerguntaInterface>("Pergunta", Pergunta.schema);
    }

    public async importarPlanilha(
        file: Express.Multer.File,
    ): Promise<Array<RelatorioResponse> | null> {
        const dadosPlanilhaConvertida: Array<PerguntasExcel> =
            planilhaServer.converterPlanilha(file);
        const perguntas: Array<string> = this.obterPerguntas(
            dadosPlanilhaConvertida,
        );
        const perguntasMongo: Array<PerguntaInterface> =
            await this.repository.find();

        if (this.isEmpty(perguntasMongo)) {
            return await this.salvarPerguntas(
                perguntas,
                dadosPlanilhaConvertida,
            );
        }

        return await this.calcularRespostas(perguntas, dadosPlanilhaConvertida);
    }

    private async salvarPerguntas(
        perguntas: Array<string>,
        dadosPlanilhaConvertida: Array<PerguntasExcel>,
    ): Promise<Array<RelatorioResponse> | null> {
        const perguntasModel: Array<PerguntaInterface> = [];

        perguntas.forEach((pergunta: string): void => {
            const perguntaModel: PerguntaInterface = new Pergunta({
                pergunta: this.formatarPergunta(pergunta),
                respostas: respostasUtils[pergunta],
            });

            perguntasModel.push(perguntaModel);
        });

        await this.repository.create(perguntasModel);

        return await this.calcularRespostas(perguntas, dadosPlanilhaConvertida);
    }

    private async calcularRespostas(
        perguntas: Array<string>,
        dadosPlanilhaConvertida: Array<PerguntasExcel>,
    ): Promise<Array<RelatorioResponse> | null> {
        const response: Array<PerguntasDto> = [];

        try {
            for (const pergunta of perguntas) {
                const perguntaFormatada: string =
                    this.formatarPergunta(pergunta);
                const perguntaSchema: PerguntaSchema | null =
                    await this.repository.findOne({
                        pergunta: perguntaFormatada,
                    });

                const respostasGeral: RespostasDto = new RespostasDto();
                const respostasMatutino: RespostasDto = new RespostasDto();
                const respostasNoturno: RespostasDto = new RespostasDto();
                this.preencherRespostas(
                    perguntaSchema,
                    respostasGeral,
                    respostasMatutino,
                    respostasNoturno,
                    dadosPlanilhaConvertida,
                    pergunta,
                );

                const schema: PerguntaSchema = <PerguntaSchema>perguntaSchema;
                const perguntaDto: PerguntasDto = PerguntasDto.of(
                    schema.pergunta,
                    respostasGeral,
                    respostasMatutino,
                    respostasNoturno,
                );

                response.push(perguntaDto);
            }

            return response.map(RelatorioResponse.of);
        } catch (error: any) {
            logger.error(error);
            logger.error(`Não foi possível encontrar a pergunta`);

            return [];
        }
    }

    private preencherRespostas(
        perguntaSchema: PerguntaSchema | null,
        respostasGeral: RespostasDto,
        respostasMatutino: RespostasDto,
        respostasNoturno: RespostasDto,
        dadosPlanilhaConvertida: PerguntasExcel[],
        pergunta: string,
    ): void {
        const respostasMongo: Array<string> = <Array<string>>(
            perguntaSchema?.respostas
        );
        respostasGeral.preencherValoresIniciaisDeRespostas(respostasMongo);
        respostasMatutino.preencherValoresIniciaisDeRespostas(respostasMongo);
        respostasNoturno.preencherValoresIniciaisDeRespostas(respostasMongo);

        this.processamentoDeRespostas(
            dadosPlanilhaConvertida,
            pergunta,
            respostasGeral,
            respostasMatutino,
            respostasNoturno,
            perguntaSchema,
        );

        respostasGeral.removerLabelsSemResposta();
        respostasMatutino.removerLabelsSemResposta();
        respostasNoturno.removerLabelsSemResposta();
    }

    private processamentoDeRespostas(
        dadosPlanilhaConvertida: Array<PerguntasExcel>,
        pergunta: string,
        respostasGeral: RespostasDto,
        respostasMatutino: RespostasDto,
        respostasNoturno: RespostasDto,
        perguntaSchema: PerguntaSchema | null,
    ): void {
        dadosPlanilhaConvertida.forEach((dados: PerguntasExcel): void => {
            const turno: string =
                dados[
                    RelatorioServer.INDEX_PERGUNTA_TURNO as keyof PerguntasExcel
                ];
            const respostaPlanilha: string =
                dados[pergunta as keyof PerguntasExcel];

            if (respostaPlanilha !== undefined) {
                const resposta: string = respostaPlanilha.toString();
                const respostasMongo: Array<string> = <Array<string>>(
                    perguntaSchema?.respostas
                );

                if (this.isEmpty(respostasMongo)) {
                    // TODO: Calcular respostas que não foram cadastradas no banco

                    if (this.isEmpty(respostasGeral.respostas)) {
                        respostasGeral.respostas.push(
                            RespostaDto.ofWithData(resposta, 1),
                        );
                    } else {
                        respostasGeral.respostas.forEach(
                            (respostaDto: RespostaDto): void => {
                                if (respostaDto.resposta === resposta) {
                                    respostaDto.data++;
                                } else {
                                    respostaDto.resposta = resposta;
                                    respostaDto.data = 1;
                                }
                            },
                        );
                    }
                } else {
                    this.validarRespostasMongo(
                        respostasMongo,
                        resposta,
                        turno,
                        respostasGeral,
                        respostasMatutino,
                        respostasNoturno,
                    );
                }
            }
        });
    }

    private validarRespostasMongo(
        respostasMongo: string[],
        resposta: string,
        turno: string,
        respostasGeral: RespostasDto,
        respostasMatutino: RespostasDto,
        respostasNoturno: RespostasDto,
    ): void {
        respostasMongo.forEach((respostaSchema: string): void => {
            if (resposta === respostaSchema) {
                const index: number = this.obterIndexPergunta(
                    respostasGeral,
                    respostaSchema,
                );
                respostasGeral.incrementarData(index);

                switch (turno) {
                    case Turno.MATUTINO:
                        respostasMatutino.incrementarData(index);
                        break;
                    case Turno.NOTURNO:
                        respostasNoturno.incrementarData(index);
                        break;
                }
            }
        });
    }

    private obterIndexPergunta(respostasGeral: RespostasDto, label: string) {
        return respostasGeral.labels.indexOf(label);
    }

    private obterPerguntas(
        dadosPlanilhaConvertida: Array<PerguntasExcel>,
    ): Array<string> {
        return Object.getOwnPropertyNames(dadosPlanilhaConvertida[0]).filter(
            (pergunta: string): boolean =>
                !RelatorioServer.ITENS_PARA_REMOVER.includes(pergunta),
        );
    }

    private formatarPergunta(pergunta: string): string {
        return pergunta
            .replace(RelatorioServer.TEXTO_DESNECESSARIO, "")
            .split(". ")[INDEX_PERGUNTA];
    }

    private isEmpty(obj: Array<any>): boolean {
        return obj.length === 0;
    }
}

export default new RelatorioServer();
