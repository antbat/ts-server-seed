import { config } from './config';
import { LoggerOptions, transports, createLogger } from "winston";

require("winston-daily-rotate-file");

const defaultLevel = process.env.LOG_LEVEL;

// We might want to do something on rotation?
// rotateTransport.on("rotate", (oldFilename, newFilename) => {
//     // do something fun
// });

const options: LoggerOptions = {
    exitOnError: false,
    level: defaultLevel,
    transports: [
        new transports.DailyRotateFile({
            filename: config.logging.default,
            datePattern: "YYYY-MM-DD-HH",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "14d",
            level: "info", // info and below to rotate
        }),
        new transports.DailyRotateFile({
            filename: config.logging.error,
            datePattern: "YYYY-MM-DD-HH",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "14d",
            level: "error", // error and below to rotate
        }),
        new transports.DailyRotateFile({
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
