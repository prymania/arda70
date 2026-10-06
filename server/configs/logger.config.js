"use strict";
import { createLogger, format, transports, addColors } from "winston";
import moment from "moment";
import fs from "fs";
import "winston-daily-rotate-file";

// * Set environment.
const env = process.env.NODE_ENV || "development";
const logDir = process.env.LOG_DIR || "logs";

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};
addColors(colors);

// * Create folder if not exists.
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// * Create instance log daily file.
const dailyRotateFileTransport = new transports.DailyRotateFile({
  filename: `${logDir}/log-%DATE%.log`,
  datePattern: moment.utc().local().format("YYYY-MM-DDTHH"),
  maxSize: "20m",
  maxFiles: "14d",
});

// * Create instance system log file.
const logger = createLogger({
  level: env == "production" ? "info" : "debug",
  format: format.combine(
    format.timestamp({
      format: moment.utc().local().format("YYYY-MM-DDTHH:mm:ss.SSS"),
    }),
    format.printf(
      (info) =>
        `${moment.utc().local().format("YYYY-MM-DDTHH:mm:ss.SSS")} [${
          info.level
        }] [${info.moduleName}] : ${info.message}`
    )
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.errors({ stack: true }),
        format.colorize(),
        format.printf((info) => {
          return `${moment.utc().local().format("YYYY-MM-DD HH:mm:ss.SSS")} [${
            info.level
          }] [${info.moduleName}] : ${info.message}`;
        })
      ),
    }),
    dailyRotateFileTransport,
  ],
});

export default function (name) {
  return logger.child({ moduleName: name });
}
