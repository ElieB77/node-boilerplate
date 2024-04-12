import developmentLogger from "./developmentLogger";
import productionLogger from "./productionLogger";
import { Request } from "express";

let logger = null;

if (process.env.NODE_ENV !== "production") {
  logger = developmentLogger();
}

if (process.env.NODE_ENV === "production") {
  logger = productionLogger();
}

export const customLog = (level: string, req: Request, message: string) => {
  switch (level) {
    case "info":
      logger.info(`${req.method} ${req.url} -> ${message}`);
      break;
    case "error":
      logger.error(`${req.method} ${req.url} -> ${message}`);
      break;
    case "debug":
      logger.debug(`${req.method} ${req.url} -> ${message}`);
      break;
    default:
      logger.info(`${req.method} ${req.url} -> ${message}`);
  }
};

export default logger;
