import logger from "../logger";
import { Request, Response, NextFunction } from "express";

export const exceptionHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(`method: ${req.method}, route: ${req.url}, message: ${error}`);
  return res.status(500).json({ message: "Internal server error" });
};
