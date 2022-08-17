class RespostasDto {
    private _respostas: Set<string>;
    private _dados: Array<number>;

    public constructor() {
        this._respostas = new Set<string>();
        this._dados = new Array<number>();
    }

    public get respostas(): Set<string> {
        return this._respostas;
    }

    public set respostas(value: Set<string>) {
        this._respostas = value;
    }

    public get dados(): Array<number> {
        return this._dados;
    }

    public set dados(value: Array<number>) {
        this._dados = value;
    }

    public static of(
        respostas: Set<string>,
        dados: Array<number>
    ): RespostasDto {
        const respostasDto: RespostasDto = new RespostasDto();

        respostasDto.respostas = respostas;
        respostasDto.dados = dados;

        return respostasDto;
    }

    public static ofData(resposta: string, dados: number): RespostasDto {
        const respostasDto: RespostasDto = new RespostasDto();
        respostasDto.respostas.add(resposta);
        respostasDto.dados.push(dados);

        return respostasDto;
    }
}

export default RespostasDto;
