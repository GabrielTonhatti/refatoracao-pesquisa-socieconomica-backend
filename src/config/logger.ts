import pino, { Logger } from "pino";
import utils from "../utils/utils";

const logger: Logger = pino({
    name: "upload example",
    level: "info",
    timestamp: (): string => `,"time":"${utils.getCurrentDateTime()}"`,
    prettyPrint: {
        colorize: true,
        levelFirst: true,
        timestampKey: "time",
        messageKey: "msg",
        ignore: "filename",
    },
});

export default logger;
