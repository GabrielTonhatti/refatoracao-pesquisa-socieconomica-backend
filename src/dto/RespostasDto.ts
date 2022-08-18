import RespostaDto from "./RespostaDto";

class RespostasDto {
    private labels: Array<string>;
    private data: Array<number>;
    private respostas: Array<RespostaDto>;

    public constructor() {
        this.labels = [];
        this.data = [];
        this.respostas = [];
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

    public getRespostas(): Array<RespostaDto> {
        return this.respostas;
    }

    public setRespostas(resposta: Array<RespostaDto>): void {
        this.respostas = resposta;
    }

    public incrementarData(index: number): void {
        if (this.respostas[index] === undefined) {
            const resposta: RespostaDto = new RespostaDto();
            resposta.setResposta(this.getLabels()[index]);
            resposta.setData(1);

            this.respostas.push(resposta);
        } else {
            this.respostas[index].setData(this.respostas[index].getData() + 1);
        }
    }
}

export default RespostasDto;
