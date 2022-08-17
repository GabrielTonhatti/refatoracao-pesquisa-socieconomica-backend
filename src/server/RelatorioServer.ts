import Pergunta, { PerguntaInterface } from "../model/Pergunta";
import { INDEX_PERGUNTA } from "../utils/constantes";
import { PerguntasExcel } from "../utils/types/types";
import planilhaServer from "./PlanilhaServer";

class RelatorioServer {
    private static readonly ITENS_PARA_REMOVER: Array<string> = [
        "3. Informe os 7 últimos dígitos do seu RA (109048xxxxxxx)",
        "__rowNum__",
        "Timestamp",
        "Email Address",
    ];

    public async importarPlanilha(file: Express.Multer.File) {
        const dadosPlanilhaConvertida: Array<PerguntasExcel> =
            planilhaServer.converterPlanilha(file);
        const perguntas: Array<string> = this.obterPerguntas(
            dadosPlanilhaConvertida
        );
        const perguntasMongo: Array<PerguntaInterface> = await Pergunta.find();

        console.log("perguntas", perguntas);
        console.log("perguntasMongo", perguntasMongo);

        if (this.isEmpty(perguntasMongo)) {
            return this.salvarPerguntas(perguntas, dadosPlanilhaConvertida);
        }

        return this.calcularRespostas(
            perguntas,
            perguntasMongo,
            dadosPlanilhaConvertida
        );
    }

    private async salvarPerguntas(
        perguntas: Array<string>,
        dadosPlanilhaConvertida: Array<PerguntasExcel>
    ) {
        perguntas.forEach(async (pergunta: string) => {
            dadosPlanilhaConvertida.forEach(
                async (dados: PerguntasExcel) => {}
            );
        });
    }

    private async calcularRespostas(
        perguntas: Array<string>,
        perguntasMongo: Array<PerguntaInterface>,
        dadosPlanilhaConvertida: Array<PerguntasExcel>
    ) {
        perguntas.forEach(async (pergunta: string) => {
            dadosPlanilhaConvertida.forEach(async (dados: PerguntasExcel) => {
                const resposta: string =
                    dados[pergunta as keyof PerguntasExcel];

                console.log("pergunta", pergunta);
                console.log("resposta", resposta);
            });
        });
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
        return pergunta.split(". ")[INDEX_PERGUNTA];
    }

    private isEmpty(obj: Array<any>): boolean {
        return obj.length === 0;
    }
}

export default new RelatorioServer();
