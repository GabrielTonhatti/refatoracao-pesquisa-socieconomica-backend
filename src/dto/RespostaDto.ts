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

    public set resposta(value: string) {
        this._resposta = value;
    }

    public get data(): number {
        return this._data;
    }

    public set data(value: number) {
        this._data = value;
    }
}

export default RespostaDto;
