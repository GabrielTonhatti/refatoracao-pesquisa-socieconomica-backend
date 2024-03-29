/* eslint-disable no-undef */
import { Model, model, Types } from "mongoose";
import { Logger } from "pino";
import utils from "../utils/utils";
import logger from "../config/logger";
import PerguntasDto from "../dto/PerguntasDto";
import RelatorioResponse from "../dto/RelatorioResponse";
import RespostasDto from "../dto/RespostasDto";
import { Errors } from "../enums/Errors";
import { Turno } from "../enums/Turno";
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

  private static readonly INDEX_PERGUNTA_TURNO: string =
    "2. Qual o período que cursa?";

  private static readonly ITENS_PARA_REMOVER: Array<string> = [
    "3. Informe os 7 últimos dígitos do seu RA (109048xxxxxxx)",
    "__rowNum__",
    "Timestamp",
    "Email Address"
  ];

  private static readonly TIPO_ARQUIVOS_PERMITIDOS: Array<string> = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/wps-office.xlsx"
  ];

  private static readonly PRIMEIRA_PERGUNTA: string = "1. Qual o seu curso?";

  private static readonly SEPARADOR_PERGUNTA: string = ", ";

  private readonly repository: PerguntaRepository;
  private readonly log: Logger;

  public constructor() {
    this.repository = model<PerguntaInterface>("Pergunta", Pergunta.schema);
    this.log = logger;
  }

  public async importarPlanilha(
    file: Express.Multer.File
  ): Promise<Array<RelatorioResponse> | null> {
    this.validarArquivo(file);

    const dadosPlanilhaConvertida: Array<PerguntasExcel> = <
            Array<PerguntasExcel>
        >planilhaServer.converterPlanilha(file);

    this.validarPlanilha(dadosPlanilhaConvertida);

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
  ): Promise<Array<RelatorioResponse> | null> {
    try {
      this.log.info(`Salvando perguntas no banco de dados`);
      const perguntasModel: Array<PerguntaInterface> = [];

      perguntas.forEach((pergunta: string): void => {
        const perguntaModel: PerguntaInterface = new Pergunta({
          pergunta: this.formatarPergunta(pergunta),
          respostas: respostasUtils[pergunta]
        });

        perguntasModel.push(perguntaModel);
      });

      await this.repository.create(perguntasModel);
      this.log.info(`Perguntas salvas com sucesso`);

      return await this.calcularRespostas(
        perguntas,
        dadosPlanilhaConvertida
      );
    } catch (error: any) {
      this.log.error(error);
      this.log.error(`Ocorreu um erro ao salvar as perguntas`);

      return [];
    }
  }

  private async calcularRespostas(
    perguntas: Array<string>,
    dadosPlanilhaConvertida: Array<PerguntasExcel>
  ): Promise<Array<RelatorioResponse> | null> {
    const response: Array<PerguntasDto> = [];

    try {
      for (const pergunta of perguntas) {
        const perguntaFormatada: string =
                    this.formatarPergunta(pergunta);
        const perguntaSchema: PerguntaSchema | null =
                    await this.repository.findOne({
                      pergunta: perguntaFormatada
                    });
        const schema: PerguntaSchema = <PerguntaSchema>perguntaSchema;
        const respostasGeral: RespostasDto = new RespostasDto();
        const respostasMatutino: RespostasDto = new RespostasDto();
        const respostasNoturno: RespostasDto = new RespostasDto();

        this.preencherRespostas(
          schema,
          respostasGeral,
          respostasMatutino,
          respostasNoturno,
          dadosPlanilhaConvertida,
          pergunta
        );

        const perguntaDto: PerguntasDto = PerguntasDto.of(
          schema.pergunta,
          respostasGeral,
          respostasMatutino,
          respostasNoturno
        );

        response.push(perguntaDto);
      }

      return response.map(RelatorioResponse.of);
    } catch (error: any) {
      this.log.error(error);
      this.log.error(`Não foi possível encontrar a pergunta`);

      return [];
    }
  }

  private preencherRespostas(
    perguntaSchema: PerguntaSchema,
    respostasGeral: RespostasDto,
    respostasMatutino: RespostasDto,
    respostasNoturno: RespostasDto,
    dadosPlanilhaConvertida: PerguntasExcel[],
    pergunta: string
  ): void {
    let respostasMongo: Array<string> = <Array<string>>(
            perguntaSchema.respostas
        );
    const respostasSet: Set<string> = new Set<string>();

    if (this.isEmpty(respostasMongo)) {
      this.obterRespostasPlanilha(
        dadosPlanilhaConvertida,
        respostasSet,
        pergunta
      );
      perguntaSchema.respostas = utils.ordenarArray(
        Array.from(respostasSet)
      );
      respostasMongo = perguntaSchema.respostas;

      perguntaSchema.save();
    }

    respostasGeral.preencherValoresIniciaisDeRespostas(respostasMongo);
    respostasMatutino.preencherValoresIniciaisDeRespostas(respostasMongo);
    respostasNoturno.preencherValoresIniciaisDeRespostas(respostasMongo);

    this.processamentoDeRespostas(
      dadosPlanilhaConvertida,
      pergunta,
      respostasGeral,
      respostasMatutino,
      respostasNoturno,
      respostasMongo
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
    respostasMongo: Array<string>
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

        this.validarRespostas(
          respostasMongo,
          resposta,
          turno,
          respostasGeral,
          respostasMatutino,
          respostasNoturno
        );
      }
    });
  }

  private validarRespostas(
    respostas: Array<string>,
    resposta: string,
    turno: string,
    respostasGeral: RespostasDto,
    respostasMatutino: RespostasDto,
    respostasNoturno: RespostasDto
  ): void {
    respostas.forEach((respostaAtual: string): void => {
      resposta
        .split(RelatorioServer.SEPARADOR_PERGUNTA)
        .forEach((resp: string): void => {
          const respostaFormatada: string = respostaAtual
            .toString()
            .trim();
          const respFormatada: string = resp.toString().trim();

          if (respFormatada === respostaFormatada) {
            const index: number = this.obterIndexPergunta(
              respostasGeral,
              respostaFormatada
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
    });
  }

  private obterRespostasPlanilha(
    dadosPlanilhaConvertida: Array<PerguntasExcel>,
    respostas: Set<string>,
    pergunta: string
  ): void {
    dadosPlanilhaConvertida.forEach((dados: PerguntasExcel): void => {
      const resposta: string = dados[pergunta as keyof PerguntasExcel];
      const numero: number = Number(resposta);

      if (!isNaN(numero)) {
        respostas.add(numero.toString());
        dados[pergunta as keyof PerguntasExcel] = numero.toString();
      } else {
        respostas.add(resposta);
      }
    });
  }

  private obterIndexPergunta(respostasGeral: RespostasDto, label: string) {
    return respostasGeral.labels.indexOf(label);
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

  private validarPlanilha(
    dadosPlanilhaConvertida: Array<PerguntasExcel>
  ): void {
    if (this.isEmpty(dadosPlanilhaConvertida)) {
      throw new Error(Errors.ERRO_PLANILHA_VAZIA);
    }

    const primeiraPergunta: string =
            dadosPlanilhaConvertida[0][
                RelatorioServer.PRIMEIRA_PERGUNTA as keyof PerguntasExcel
            ];

    if (
      dadosPlanilhaConvertida === null ||
            primeiraPergunta === undefined
    ) {
      throw new Error(Errors.ERRO_PLANILHA_INVALIDA);
    }
  }

  private validarArquivo(file: Express.Multer.File): void {
    if (!RelatorioServer.TIPO_ARQUIVOS_PERMITIDOS.includes(file.mimetype)) {
      throw new Error(Errors.ERRO_TIPO_ARQUIVO_INVALIDO);
    }
  }
}

export default new RelatorioServer();
