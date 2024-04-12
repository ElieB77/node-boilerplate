import { Request, Response, NextFunction } from "express";
import logger from "../logger";
import prisma from "../database/db";
import {
  comparePassword,
  createJWT,
  hashPassword,
} from "../utils/authentication";
import asyncHandler from "express-async-handler";
import { errorHandler } from "../utils/errorHandler";

export const AuthController = {
  signup: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body;

      const alreadyExists = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (alreadyExists) {
        return next(
          errorHandler(400, "User already exists", alreadyExists.email)
        );
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
    }
  ),

  signin: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return next(errorHandler(401, "Invalid email or password", user.email));
      }

      const isValid = await comparePassword(password, user.password);

      if (!isValid) {
        return next(errorHandler(401, "Invalid email or password", user.email));
      }

      const token = createJWT(user);
      logger.info(
        `method: ${req.method}, route: ${req.url}, message: Logged in succesful -> ${user.email}`
      );
      res.status(200).json({ token });
    }
  ),
};
