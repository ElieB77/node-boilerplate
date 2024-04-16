import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const comparePassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 5);
};

export const createJWT = (userId: string) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);

  return token;
};
