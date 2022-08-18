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

type PerguntaRepository = Model<PerguntaInterface, {}, {}, {}, any>;

interface PerguntaSchema extends PerguntaInterface {
    _id: Types.ObjectId;
}

class RelatorioServer {
    private static readonly TEXTO_DESNECESSARIO: string =
        "Estamos quase acabando... ";

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
        file: Express.Multer.File
    ): Promise<Array<PerguntasDto> | null> {
        const dadosPlanilhaConvertida: Array<PerguntasExcel> =
            planilhaServer.converterPlanilha(file);
        const perguntas: Array<string> = this.obterPerguntas(
            dadosPlanilhaConvertida
        );
        const perguntasMongo: Array<PerguntaInterface> =
            await this.repository.find();

        if (this.isEmpty(perguntasMongo)) {
            return await this.salvarPerguntas(
                perguntas,
                dadosPlanilhaConvertida
            );
        }

        return await this.calcularRespostas(perguntas, dadosPlanilhaConvertida);
    }

    private async salvarPerguntas(
        perguntas: Array<string>,
        dadosPlanilhaConvertida: Array<PerguntasExcel>
    ): Promise<Array<PerguntasDto> | null> {
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
        dadosPlanilhaConvertida: Array<PerguntasExcel>
    ): Promise<Array<PerguntasDto> | null> {
        const response: Array<PerguntasDto> = [];

        try {
            for (const pergunta of perguntas) {
                const perguntaFormatada: string =
                    this.formatarPergunta(pergunta);
                const perguntaSchema: PerguntaSchema | null =
                    await this.repository.findOne({
                        pergunta: perguntaFormatada,
                    });

                const respostasDto: RespostasDto = new RespostasDto();
                this.preencherValoresIniciaisDeRespostas(
                    respostasDto,
                    <PerguntaSchema>perguntaSchema
                );
                this.processamentoDeRespostas(
                    dadosPlanilhaConvertida,
                    pergunta,
                    respostasDto,
                    perguntaSchema
                );
                this.removerLabelsSemResposta(respostasDto);

                const schema: PerguntaSchema = <PerguntaSchema>perguntaSchema;
                const perguntaDto: PerguntasDto = PerguntasDto.of(
                    schema.pergunta,
                    respostasDto
                );

                response.push(perguntaDto);
            }

            return response;
        } catch (error: any) {
            logger.error(error);
            logger.error(`Não foi possível encontrar a pergunta`);

            return [];
        }
    }

    private preencherValoresIniciaisDeRespostas(
        respostasDto: RespostasDto,
        perguntaSchema: PerguntaSchema
    ) {
        respostasDto.setLabels(<Array<string>>perguntaSchema?.respostas);

        const respostas: Array<RespostaDto> = [];
        respostasDto.getLabels().forEach((label: string): void => {
            respostasDto.getData().push(0);
            respostas.push(RespostaDto.of(label));
        });
        respostasDto.setRespostas(respostas);
    }

    private processamentoDeRespostas(
        dadosPlanilhaConvertida: Array<PerguntasExcel>,
        pergunta: string,
        respostasDto: RespostasDto,
        perguntaSchema: PerguntaSchema | null
    ): void {
        dadosPlanilhaConvertida.forEach((dados: PerguntasExcel): void => {
            const respostaPlanilha: string =
                dados[pergunta as keyof PerguntasExcel];

            if (respostaPlanilha !== undefined) {
                const resposta: string = respostaPlanilha.toString();

                perguntaSchema?.respostas.forEach(
                    (respostaSchema: string): void => {
                        if (resposta === respostaSchema) {
                            const index: number = this.obterIndexPergunta(
                                respostasDto,
                                respostaSchema
                            );
                            respostasDto.incrementarData(index);
                        }
                    }
                );
            }
        });
    }

    private obterIndexPergunta(respostasDto: RespostasDto, label: string) {
        return respostasDto.getLabels().indexOf(label);
    }

    private removerLabelsSemResposta(respostasDto: RespostasDto): void {
        const respostasFiltradas: Array<RespostaDto> = respostasDto
            .getRespostas()
            .filter((resposta: RespostaDto): boolean => resposta.getData() > 0);

        respostasDto.setLabels(
            respostasFiltradas.map((resposta: RespostaDto): string =>
                resposta.getResposta()
            )
        );
        respostasDto.setData(
            respostasFiltradas.map((resposta: RespostaDto): number =>
                resposta.getData()
            )
        );
    }

    private obterPerguntas(
        dadosPlanilhaConvertida: Array<PerguntasExcel>
    ): Array<string> {
        return Object.getOwnPropertyNames(dadosPlanilhaConvertida[0]).filter(
            (pergunta: string): boolean =>
                !RelatorioServer.ITENS_PARA_REMOVER.includes(pergunta)
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
