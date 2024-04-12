import prisma from "../database/db";
import logger from "../logger";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { errorHandler } from "../utils/errorHandler";

export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization;

    if (!bearer) {
      logger.error(
        `method: ${req.method}, route: ${req.url}, message: Not authorized`
      );
      return res.status(401).json({ message: "Not authorized" });
    }

    const [, token] = bearer.split(" ");

    if (!token) {
      return next(errorHandler(401, "Unvalid token"));
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  }
);

export const authorize = (requiredRole: string) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    if (user.role !== requiredRole) {
      return next(errorHandler(403, "Forbidden. Admin only"));
    }

    next();
  });
