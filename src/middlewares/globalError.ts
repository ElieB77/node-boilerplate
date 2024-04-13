import logger, { customLog } from "../logger";
import { Request, Response, NextFunction } from "express";

export const exceptionHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  const data = error.data || null;

  customLog("error", req, `${message} ${data ? "-> " + data : ""}`);

  return res.status(statusCode).json({
    statusCode: statusCode,
    message: message,
    data: data,
  });
};
