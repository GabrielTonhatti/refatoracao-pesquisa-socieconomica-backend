import RespostasDto from "./RespostasDto";

class PerguntasDto {
    private pergunta: string;
    private respostas: RespostasDto;

    public constructor() {
        this.pergunta = "";
        this.respostas = new RespostasDto();
    }

    public static of(pergunta: string, respostas: RespostasDto): PerguntasDto {
        const perguntasDto: PerguntasDto = new PerguntasDto();
        perguntasDto.setPergunta(pergunta);
        perguntasDto.setRespostas(respostas);

        return perguntasDto;
    }

    public getPergunta(): string {
        return this.pergunta;
    }

    public setPergunta(pergunta: string): void {
        this.pergunta = pergunta;
    }

    public getRespostas(): RespostasDto {
        return this.respostas;
    }

    public setRespostas(resposta: RespostasDto): void {
        this.respostas = resposta;
    }
}

export default PerguntasDto;
