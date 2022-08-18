class RespostaDto {
    private resposta: string;
    private data: number;

    public constructor() {
        this.resposta = "";
        this.data = 0;
    }

    public getResposta(): string {
        return this.resposta;
    }

    public setResposta(resposta: string): void {
        this.resposta = resposta;
    }

    public getData(): number {
        return this.data;
    }

    public setData(data: number): void {
        this.data = data;
    }

    public static of(resposta: string): RespostaDto {
        const respostaDto: RespostaDto = new RespostaDto();
        respostaDto.setResposta(resposta);

        return respostaDto;
    }
}

export default RespostaDto;
