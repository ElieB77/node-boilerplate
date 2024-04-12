import prisma from "../database/db";
import logger from "../logger";
import asyncHandler from "express-async-handler";
import { userProjection } from "../utils/user";
import { Response, Request, NextFunction } from "express";
import { errorHandler } from "../utils/errorHandler";

export const UserController = {
  getUsers: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const users = await prisma.user.findMany({
        select: userProjection(),
      });

      if (!users) {
        return next(errorHandler(404, "Users not found"));
      }

      logger.info(
        `method: ${req.method}, route: ${req.url}, message: Got users succesfully`
      );
      res.status(200).json({ data: users });
    }
  ),

  findUser: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = await prisma.user.findUnique({
        where: {
          id: req.params.id,
        },
        select: userProjection(),
      });

      if (!user) {
        return next(errorHandler(404, "User not found", user.email));
      }

      logger.info(
        `method: ${req.method}, route: ${req.url}, message: Got user succesfully -> ${user.email}`
      );
      res.status(200).json({ data: user });
    }
  ),

  deleteUser: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.params.id;

      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        return next(errorHandler(404, "User not found", user.email));
      }

      const deletedUser = await prisma.user.delete({
        where: {
          id: userId,
        },
        select: userProjection(),
      });

      logger.info(
        `method: ${req.method}, route: ${req.url}, message: User deleted succesfully -> ${deletedUser.email}`
      );
      res.status(200).json({ data: deletedUser });
    }
  ),
};
