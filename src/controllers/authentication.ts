import { Request, Response } from "express";
import logger from "../logger";
import prisma from "../database/db";
import {
  comparePassword,
  createJWT,
  hashPassword,
} from "../utils/authentication";
import asyncHandler from "express-async-handler";

export const AuthController = {
  signup: asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const alreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (alreadyExists) {
      logger.error(
        `method: ${req.method}, route: ${req.url}, message: User already exists -> ${alreadyExists.email}`
      );
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        password: await hashPassword(password),
      },
    });

    const token = createJWT(newUser);
    logger.info(
      `method: ${req.method}, route: ${req.url}, message: Signup succesful -> ${newUser.email}`
    );
    res.status(200).json({ token });
  }),

  signin: asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      logger.error(
        `method: ${req.method}, route: ${req.url}, message: User not found -> ${user.email}`
      );
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isValid = await comparePassword(password, user.password);

    if (!isValid) {
      logger.error(
        `method: ${req.method}, route: ${req.url}, message: Invalid password -> ${user.email}`
      );
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = createJWT(user);
    logger.info(
      `method: ${req.method}, route: ${req.url}, message: Logged in succesful -> ${user.email}`
    );
    res.status(200).json({ token });
  }),
};
