import { Document, model, Schema } from "mongoose";

export interface PerguntaInterface extends Document {
  pergunta: string;
  respostas: Array<string>;
}

const PerguntaSchema = new Schema({
  pergunta: String,
  respostas: Array<string>
});

export default model<PerguntaInterface>("Pergunta", PerguntaSchema);
