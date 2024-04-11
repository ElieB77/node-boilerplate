import prisma from "../database/db";
import logger from "../logger";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    logger.error(
      `method: ${req.method}, route: ${req.url}, message: Not authorized`
    );
    return res.status(401).json({ message: "Not authorized" });
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    logger.error(
      `method: ${req.method}, route: ${req.url}, message: Unvalid token`
    );
    return res.status(401).json({ message: "Unvalid token" });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    logger.error(
      `method: ${req.method}, route: ${req.url}, message: Unvalid token`
    );
    return res.status(401).json({ message: "Unvalid token" });
  }
};

export const authorize =
  (requiredRole) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: req.user.id,
        },
      });

      if (user.role !== requiredRole) {
        logger.error(
          `method: ${req.method}, route: ${req.url}, message: Forbidden, admin only`
        );
        return res.status(403).json({ error: "Forbidden" });
      }

      next();
    } catch (error) {
      logger.error(
        `method: ${req.method}, route: ${req.url}, message: ${error}`
      );
      res
        .status(500)
        .json({ error: "An error occurred while authorizing the user" });
    }
  };
