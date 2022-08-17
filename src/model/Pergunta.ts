import { Document, model, Schema } from "mongoose";

export type RespostaInterface = {
    resposta: string;
};

export interface PerguntaInterface extends Document {
    pergunta: string;
    respostas: Array<RespostaInterface>;
}

const PerguntaSchema = new Schema({
    pergunta: String,
    respostas: Array<RespostaInterface>,
});

export default model<PerguntaInterface>("Pergunta", PerguntaSchema);
