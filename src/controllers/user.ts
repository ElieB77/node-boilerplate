import prisma from "../database/db";
import logger from "../logger";
import asyncHandler from "express-async-handler";
import { userProjection } from "../utils/user";
import { Response, Request } from "express";

export const UserController = {
  getUsers: asyncHandler(async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
      select: userProjection(),
    });

    if (!users) {
      logger.error(
        `method: ${req.method}, route: ${req.url}, message: Users not found`
      );
      res.status(404).json({ message: "Users not found" });
    }

    logger.info(
      `method: ${req.method}, route: ${req.url}, message: Got users succesfully`
    );
    res.status(200).json({ data: users });
  }),

  findUser: asyncHandler(async (req: Request, res: Response) => {
    const user = await prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
      select: userProjection(),
    });

    if (!user) {
      logger.error(
        `method: ${req.method}, route: ${req.url}, message: User not found`
      );
      return res.status(404).json({ message: "User not found" });
    }

    logger.info(
      `method: ${req.method}, route: ${req.url}, message: Got user succesfully -> ${user.email}`
    );
    res.status(200).json({ data: user });
  }),

  deleteUser: asyncHandler(async (req: Request, res: Response) => {
    const userId = req.params.id;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      logger.error(
        `method: ${req.method}, route: ${req.url}, message: User not found`
      );
      return res.status(404).json({ message: "User not found" });
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
  }),
};
