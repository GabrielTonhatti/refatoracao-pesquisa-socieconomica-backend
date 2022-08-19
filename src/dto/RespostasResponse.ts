/* eslint-disable no-unexpected-multiline */
import RespostasDto from "./RespostasDto";

class RespostasResponse {
    private static readonly INDEX_SIGLA: number = 1;
    private static readonly PARENTESES_ABERTURA: string = "(";
    private static readonly PARENTESES_FECHAMENTO: string = ")";
    private static readonly CURSOS: Array<string> = [
        "Análise e Desenvolvimento de Sistemas (ADS)",
        "Gestão da Produção Industrial (GPI)",
        "Gestão de Recursos Humanos (GRH)",
        "Desenvolvimento de Software Multiplataforma (DSM)"
    ];

    private labels: Array<string>;
    private data: Array<number>;

    public constructor() {
        this.labels = [];
        this.data = [];
    }

    public getLabels(): Array<string> {
        return this.labels;
    }

    public setLabels(labels: Array<string>): void {
        this.labels = labels;
    }

    public getData(): Array<number> {
        return this.data;
    }

    public setData(data: Array<number>): void {
        this.data = data;
    }

    public static of(resposta: RespostasDto): RespostasResponse {
        const respostasResponse: RespostasResponse = new RespostasResponse();
        respostasResponse.setLabels(this.formatarLabels(resposta.labels));
        respostasResponse.setData(resposta.data);

        return respostasResponse;
    }

    private static formatarLabels(labels: Array<string>): Array<string> {
        return labels.map((label: string): string =>
            RespostasResponse.CURSOS.includes(label)
                ? label
                    .split(RespostasResponse.PARENTESES_ABERTURA)
                    [RespostasResponse.INDEX_SIGLA].replace(
                        RespostasResponse.PARENTESES_FECHAMENTO,
                        ""
                    )
                : label
        );
    }
}

export default RespostasResponse;
