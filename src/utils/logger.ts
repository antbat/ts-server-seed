import { config } from './config';
import { LoggerOptions, transports, createLogger } from "winston";
import { client } from '../connections/elasticSearch.connection';
import DailyRotateFile = require ('winston-daily-rotate-file');
import { ElasticsearchWinstonTransport } from "./ElasticsearchWinstonTransport";

const defaultLevel = process.env.LOG_LEVEL;

const options: LoggerOptions = {
    exitOnError: false,
    level: defaultLevel,
    transports: [
        new ElasticsearchWinstonTransport({
            client,
            index: config.logging.elasticSearchLogIndex
        }),
        new DailyRotateFile({
            filename: config.logging.default,
            datePattern: "YYYY-MM-DD-HH",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "14d",
            level: "info", // info and below to rotate
        }),
        new DailyRotateFile({
            filename: config.logging.error,
            datePattern: "YYYY-MM-DD-HH",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "14d",
            level: "error", // error and below to rotate
        }),
        new DailyRotateFile({
            filename: config.logging.silly,
            datePattern: "YYYY-MM-DD-HH",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "1d",
            level: "silly", // error and below to rotate
        }),
    ],
};

const logger = createLogger(options);

if (process.env.NODE_ENV === "development") {
    const transport = new transports.Console({
        level: "debug", // debug and below to console
    });
    logger.add(transport);
}

export { logger };
