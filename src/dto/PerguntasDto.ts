import RespostasDto from "./RespostasDto";

class PerguntasDto {
    private _pergunta: string;
    private _respostas: RespostasDto;

    public constructor() {
        this._pergunta = "";
        this._respostas = new RespostasDto();
    }

    public static of(pergunta: string, respostas: RespostasDto): PerguntasDto {
        const perguntasDto: PerguntasDto = new PerguntasDto();

        perguntasDto.pergunta = pergunta;
        perguntasDto.respostas = respostas;

        return perguntasDto;
    }

    public get pergunta(): string {
        return this._pergunta;
    }

    public set pergunta(value: string) {
        this._pergunta = value;
    }

    public get respostas(): RespostasDto {
        return this._respostas;
    }

    public set respostas(value: RespostasDto) {
        this._respostas = value;
    }
}

export default PerguntasDto;
