import { Model, model, Types } from "mongoose";
import logger from "../config/logger";
import PerguntasDto from "../dto/PerguntasDto";
import RespostasDto from "../dto/RespostasDto";
import Pergunta, { PerguntaInterface } from "../model/Pergunta";
import { INDEX_PERGUNTA } from "../utils/constantes";
import respostasUtils from "../utils/respostasUtils";
import { PerguntasExcel } from "../utils/types/types";
import planilhaServer from "./PlanilhaServer";
import RespostaDto from "../dto/RespostaDto";

type PerguntaRepository = Model<PerguntaInterface, {}, {}, {}, any>;
interface PerguntaSchema extends PerguntaInterface {
    _id: Types.ObjectId;
}

class RelatorioServer {
    private readonly repository: PerguntaRepository;
    private static readonly TEXTO_DESNECCESSARIO: string =
        "Estamos quase acabando... ";
    private static readonly ITENS_PARA_REMOVER: Array<string> = [
        "3. Informe os 7 últimos dígitos do seu RA (109048xxxxxxx)",
        "__rowNum__",
        "Timestamp",
        "Email Address",
    ];

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

        return await this.calcularRespostas(
            perguntas,
            perguntasMongo,
            dadosPlanilhaConvertida
        );
    }

    private async salvarPerguntas(
        perguntas: Array<string>,
        dadosPlanilhaConvertida: Array<PerguntasExcel>
    ): Promise<Array<PerguntasDto> | null> {
        const perguntasModel: Array<PerguntaInterface> = new Array();

        perguntas.forEach((pergunta: string): void => {
            const perguntaModel: PerguntaInterface = new Pergunta({
                pergunta: this.formatarPergunta(pergunta),
                respostas: respostasUtils[pergunta],
            });

            perguntasModel.push(perguntaModel);
        });

        await this.repository.create(perguntasModel);

        return await this.calcularRespostas(
            perguntas,
            perguntasModel,
            dadosPlanilhaConvertida
        );
    }

    private async calcularRespostas(
        perguntas: Array<string>,
        perguntasMongo: Array<PerguntaInterface>,
        dadosPlanilhaConvertida: Array<PerguntasExcel>
    ): Promise<Array<PerguntasDto> | null> {
        const response: Array<PerguntasDto> = new Array();

        try {
            for (const pergunta of perguntas) {
                const respostas: Array<string> = new Array();
                const dados: Array<number> = new Array();

                const perguntaFormatada: string =
                    this.formatarPergunta(pergunta);

                const perguntaSchema: PerguntaSchema | null =
                    await this.repository.findOne({
                        pergunta: perguntaFormatada,
                    });

                dadosPlanilhaConvertida.forEach(
                    (dados: PerguntasExcel): void => {
                        const respostaPlanilha: string =
                            dados[pergunta as keyof PerguntasExcel];

                        if (respostaPlanilha !== undefined) {
                            const respostaString: string =
                                respostaPlanilha.toString();
                            respostas.push(respostaString);

                            respostaString
                                .split(" ,")
                                .forEach((resp: string): number =>
                                    respostas.push(resp)
                                );

                            perguntaSchema?.respostas.forEach(
                                (respostaSchema: string): void => {
                                    const respostaDto: RespostaDto =
                                        new RespostaDto();
                                    const respostasDto: RespostasDto =
                                        new RespostasDto();
                                    if (
                                        respostaString.includes(respostaSchema)
                                    ) {
                                        respostasDto.respostas.add(
                                            respostaSchema
                                        );
                                        const perguntaDto: PerguntasDto =
                                            PerguntasDto.of(
                                                perguntaSchema.pergunta,
                                                respostasDto
                                            );
                                        // console.log("perguntaDto", perguntaDto);
                                        response.push(perguntaDto);
                                    }
                                    // console.log("teste");
                                }
                            );
                        }
                    }
                );

                // response.push(perguntaSchema);
            }

            return response;
        } catch (error: any) {
            logger.error(error);
            logger.error(`Não foi possível encontrar a pergunta`);

            return new Array<PerguntasDto>();
        }
    }

    private obterPerguntas(
        dadosPlanilhaConvertida: Array<PerguntasExcel>
    ): Array<string> {
        return Object.getOwnPropertyNames(dadosPlanilhaConvertida[0]).filter(
            (pergunta: string): boolean =>
                !RelatorioServer.ITENS_PARA_REMOVER.includes(pergunta)
        );
    }

    private obterPerguntasFormatas(perguntas: Array<string>): Array<string> {
        return perguntas
            .map(this.formatarPergunta)
            .filter((pergunta: string): boolean => pergunta !== undefined);
    }

    private formatarPergunta(pergunta: string): string {
        return pergunta
            .replace(RelatorioServer.TEXTO_DESNECCESSARIO, "")
            .split(". ")[INDEX_PERGUNTA];
    }

    private isEmpty(obj: Array<any>): boolean {
        return obj.length === 0;
    }
}

export default new RelatorioServer();
