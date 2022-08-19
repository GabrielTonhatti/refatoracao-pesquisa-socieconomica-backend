import RespostaDto from "./RespostaDto";

class RespostasDto {
    private _labels: Array<string>;
    private _data: Array<number>;
    private _respostas: Array<RespostaDto>;

    public constructor() {
        this._labels = [];
        this._data = [];
        this._respostas = [];
    }

    public get labels(): Array<string> {
        return this._labels;
    }

    public set labels(labels: Array<string>) {
        this._labels = labels;
    }

    public get data(): Array<number> {
        return this._data;
    }

    public set data(data: Array<number>) {
        this._data = data;
    }

    public get respostas(): Array<RespostaDto> {
        return this._respostas;
    }

    public set respostas(resposta: Array<RespostaDto>) {
        this._respostas = resposta;
    }

    public incrementarData(index: number): void {
        if (this._respostas[index] === undefined) {
            const resposta: RespostaDto = new RespostaDto();
            resposta.resposta = this.labels[index];
            resposta.data = 1;

            this._respostas.push(resposta);
        } else {
            this._respostas[index].data++;
        }
    }

    public preencherValoresIniciaisDeRespostas(
        labels: Array<string>,
    ): void {
        const respostas: Array<RespostaDto> = [];

        this.labels = labels;
        this.labels.forEach((label: string): void => {
            this.data.push(0);
            respostas.push(RespostaDto.of(label));
        });

        this.respostas = respostas;
    }

    public removerLabelsSemResposta(): void {
        const respostasFiltradas: Array<RespostaDto> = this.respostas.filter(
            (resposta: RespostaDto): boolean => resposta.data > 0,
        );
        this.labels = respostasFiltradas.map(
            (resposta: RespostaDto): string => resposta.resposta,
        );
        this.data = respostasFiltradas.map(
            (resposta: RespostaDto): number => resposta.data,
        );
    }
}

export default RespostasDto;
