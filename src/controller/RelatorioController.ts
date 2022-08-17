import { Request, Response } from "express";
import PerguntasDto from "../dto/PerguntasDto";
import relatorioServer from "../server/RelatorioServer";

class RelatorioController {
    async importarPlanilha(
        req: Request,
        res: Response
    ): Promise<Response<Array<PerguntasDto>>> {
        const file: Express.Multer.File = <Express.Multer.File>req.file;
        const response: Array<PerguntasDto> | null =
            await relatorioServer.importarPlanilha(file);

        return res.json(response);
    }
}

export default new RelatorioController();
