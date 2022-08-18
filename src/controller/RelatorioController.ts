/* eslint-disable no-undef */
import RelatorioResponse from "dto/RelatorioResponse";
import { Request, Response } from "express";
import RespostasResponse from "../dto/RespostasResponse";
import relatorioServer from "../server/RelatorioServer";

class RelatorioController {
    async importarPlanilha(
        req: Request,
        res: Response,
    ): Promise<Response<Array<RespostasResponse>>> {
        const file: Express.Multer.File = <Express.Multer.File>req.file;
        const response: Array<RelatorioResponse> | null =
            await relatorioServer.importarPlanilha(file);

        return res.json(response);
    }
}

export default new RelatorioController();
