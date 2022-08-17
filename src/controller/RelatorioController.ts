import { Request, Response } from "express";
import * as Xlsx from "xlsx";

class RelatorioController {
    async importarPlanilha(req: Request, res: Response) {
        console.log(req.file);
        const file: Express.Multer.File = <Express.Multer.File>req.file;

        const workbook: Xlsx.WorkBook = Xlsx.read(file.buffer);
        const sheetName: string = workbook.SheetNames[0];
        const worksheet: Xlsx.WorkSheet = workbook.Sheets[sheetName];
        const dataArray: Array<any> = Xlsx.utils.sheet_to_json(worksheet);
        console.log(dataArray);
    }
}

export default new RelatorioController();
