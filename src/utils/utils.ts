import moment from "moment-timezone";

export class Utils {
    private static readonly DATA_TIME_FORMAT: string = "DD/MM/yyyy HH:mm:ss";
    private static readonly TIME_ZONE: string = "America/Sao_Paulo";

    public getCurrentDateTime(): string {
        return moment().tz(Utils.TIME_ZONE).format(Utils.DATA_TIME_FORMAT);
    }
}

export default new Utils();
