import RespostasDto from "./RespostasDto";

class PerguntasDto {
    private _pergunta: string;
    private _respostas: RespostasDto;
    private _respostasMatutino: RespostasDto;
    private _respostasNoturno: RespostasDto;

    public constructor() {
        this._pergunta = "";
        this._respostas = new RespostasDto();
        this._respostasMatutino = new RespostasDto();
        this._respostasNoturno = new RespostasDto();
    }

    public static of(
        pergunta: string,
        respostas: RespostasDto,
        respostasMatutino: RespostasDto,
        respostasNoturno: RespostasDto,
    ): PerguntasDto {
        const perguntasDto: PerguntasDto = new PerguntasDto();
        perguntasDto.pergunta = pergunta;
        perguntasDto.respostas = respostas;
        perguntasDto.respostasMatutino = respostasMatutino;
        perguntasDto.respostasNoturno = respostasNoturno;

        return perguntasDto;
    }

    public get pergunta(): string {
        return this._pergunta;
    }

    public set pergunta(pergunta: string) {
        this._pergunta = pergunta;
    }

    public get respostas(): RespostasDto {
        return this._respostas;
    }

    public set respostas(resposta: RespostasDto) {
        this._respostas = resposta;
    }

    public get respostasMatutino(): RespostasDto {
        return this._respostasMatutino;
    }

    public set respostasMatutino(resposta: RespostasDto) {
        this._respostasMatutino = resposta;
    }

    public get respostasNoturno(): RespostasDto {
        return this._respostasNoturno;
    }

    public set respostasNoturno(resposta: RespostasDto) {
        this._respostasNoturno = resposta;
    }
}

export default PerguntasDto;
