import { Document, model, Schema } from "mongoose";
import { TypeResposta } from "../utils/types/types";

export interface PerguntaInterface extends Document {
    pergunta: string;
    respostas: Array<TypeResposta>;
}

const PerguntaSchema = new Schema({
    pergunta: String,
    respostas: Array<TypeResposta>,
});

export default model<PerguntaInterface>("Pergunta", PerguntaSchema);
