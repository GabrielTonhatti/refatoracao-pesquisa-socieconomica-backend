/* eslint-disable no-undef */
import logger from "../config/logger";
import { Logger } from "pino";
import { PerguntasExcel } from "utils/types/types";
import * as Xlsx from "xlsx";

class PlanilhaService {
    private static readonly PERGUNTA_DATA_NASCIMENTO: string =
        "7. Qual a sua data de nascimento?";

    private readonly log: Logger;

    public constructor() {
        this.log = logger;
    }

    public converterPlanilha(file: Express.Multer.File): Array<PerguntasExcel> {
        try {
            this.log.info("Convertendo planilha...");
            const workbook: Xlsx.WorkBook = Xlsx.read(file.buffer);
            const sheetName: string = workbook.SheetNames[0];
            const worksheet: Xlsx.WorkSheet = workbook.Sheets[sheetName];

            const quests: Array<PerguntasExcel> =
                Xlsx.utils.sheet_to_json(worksheet);
            quests.forEach(
                (quest: PerguntasExcel, index: number): string =>
                    (quest[
                        PlanilhaService.PERGUNTA_DATA_NASCIMENTO as keyof PerguntasExcel
                    ] = this.getDataNascimento(index + 1, worksheet)),
            );

            return quests;
        } catch (error: any) {
            this.log.error(error);
            this.log.error("Erro ao tentar converter planilha");

            return [];
        }
    }

    public getDataNascimento(index: number, worksheet: Xlsx.WorkSheet): string {
        return index < 2 ? worksheet[`I${2}`].w : worksheet[`I${index + 1}`].w;
    }
}

export default new PlanilhaService();
