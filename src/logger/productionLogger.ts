import { createLogger, format, transports } from "winston";
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${level} ${timestamp}: ${message}`;
});

const productionLogger = () => {
  return createLogger({
    level: process.env.LOG_LEVEL,
    format: combine(timestamp(), myFormat),
    transports: [
      new transports.Console(),
      new transports.File({ filename: "errors.log" }),
    ],
  });
};

export default productionLogger;
