import relatorioServer from "../server/RelatorioServer";
import { Request, Response } from "express";
import { PerguntaInterface } from "../model/Pergunta";

class RelatorioController {
    async importarPlanilha(
        req: Request,
        res: Response
    ): Promise<Response<Array<PerguntaInterface>>> {
        console.log(req.file);
        const file: Express.Multer.File = <Express.Multer.File>req.file;

        return res.json(relatorioServer.importarPlanilha(file));
    }
}

export default new RelatorioController();
