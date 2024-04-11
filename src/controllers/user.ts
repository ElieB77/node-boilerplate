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

    logger.info(
      `method: ${req.method}, route: ${req.url}, message: Get users succesful`
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

    logger.info(
      `method: ${req.method}, route: ${req.url}, message: Get user succesful -> ${user.email}`
    );
    res.status(200).json({ data: user });
  }),

  deleteUser: asyncHandler(async (req: Request, res: Response) => {
    const deletedUser = await prisma.user.delete({
      where: {
        id: req.params.id,
      },
      select: userProjection(),
    });

    logger.info(
      `method: ${req.method}, route: ${req.url}, message: Find user succesful -> ${deletedUser.email}`
    );
    res.status(200).json({ data: deletedUser });
  }),
};
