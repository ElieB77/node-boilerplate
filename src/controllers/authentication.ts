import prisma from "../db";
import { Request, Response } from "express";
import {
  comparePassword,
  createJWT,
  hashPassword,
} from "../utils/authentication";

export const AuthController = {
  signup: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await prisma.user.create({
      data: {
        email,
        password: await hashPassword(password),
      },
    });

    const token = createJWT(user);
    res.status(200).json({ token });
  },

  signin: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    const isValid = await comparePassword(password, user.password);

    if (!isValid) {
      res.status(401);
      res.json({ message: "Invalid email or password." });
      return;
    }

    const token = createJWT(user);
    res.status(200).json({ token });
  },
};
