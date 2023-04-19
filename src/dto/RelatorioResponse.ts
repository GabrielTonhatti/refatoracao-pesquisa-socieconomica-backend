import RespostasResponse from "./RespostasResponse";
import PerguntasDto from "./PerguntasDto";

class RelatorioResponse {
  private pergunta: string;
  private respostas: RespostasResponse;
  private respostasMatutino: RespostasResponse;
  private respostasNoturno: RespostasResponse;

  public constructor() {
    this.pergunta = "";
    this.respostas = new RespostasResponse();
    this.respostasMatutino = new RespostasResponse();
    this.respostasNoturno = new RespostasResponse();
  }

  public getPergunta(): string {
    return this.pergunta;
  }

  public setPergunta(pergunta: string): void {
    this.pergunta = pergunta;
  }

  public getRespostas(): RespostasResponse {
    return this.respostas;
  }

  public setRespostas(resposta: RespostasResponse): void {
    this.respostas = resposta;
  }

  public getRespostasMatutino(): RespostasResponse {
    return this.respostasMatutino;
  }

  public setRespostasMatutino(resposta: RespostasResponse): void {
    this.respostasMatutino = resposta;
  }

  public getRespostasNoturno(): RespostasResponse {
    return this.respostasNoturno;
  }

  public setRespostasNoturno(resposta: RespostasResponse): void {
    this.respostasNoturno = resposta;
  }

  public static of(pergunta: PerguntasDto): RelatorioResponse {
    const relatorioResponse: RelatorioResponse = new RelatorioResponse();
    relatorioResponse.setPergunta(pergunta.pergunta);
    relatorioResponse.setRespostas(RespostasResponse.of(pergunta.respostas));
    relatorioResponse.setRespostasMatutino(RespostasResponse.of(pergunta.respostasMatutino));
    relatorioResponse.setRespostasNoturno(RespostasResponse.of(pergunta.respostasNoturno));

    return relatorioResponse;
  }
}

export default RelatorioResponse;
