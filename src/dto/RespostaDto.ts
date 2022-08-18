class RespostaDto {
    private _resposta: string;
    private _data: number;

    public constructor() {
        this._resposta = "";
        this._data = 0;
    }

    public get resposta(): string {
        return this._resposta;
    }

    public set resposta(resposta: string) {
        this._resposta = resposta;
    }

    public get data(): number {
        return this._data;
    }

    public set data(data: number) {
        this._data = data;
    }

    public static of(resposta: string): RespostaDto {
        const respostaDto: RespostaDto = new RespostaDto();
        respostaDto.resposta = resposta;

        return respostaDto;
    }

    public static ofWithData(resposta: string, data: number): RespostaDto {
        const respostaDto: RespostaDto = new RespostaDto();
        respostaDto.resposta = resposta;
        respostaDto.data = data;

        return respostaDto;
    }
}

export default RespostaDto;
