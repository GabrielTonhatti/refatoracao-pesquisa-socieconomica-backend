import { PerguntasExcel } from "utils/types/types";
import * as Xlsx from "xlsx";

class PlanilhaService {
    public converterPlanilha(file: Express.Multer.File): Array<PerguntasExcel> {
        const workbook: Xlsx.WorkBook = Xlsx.read(file.buffer);
        const sheetName: string = workbook.SheetNames[0];
        const worksheet: Xlsx.WorkSheet = workbook.Sheets[sheetName];

        return Xlsx.utils.sheet_to_json(worksheet);
    }
}

export default new PlanilhaService();
