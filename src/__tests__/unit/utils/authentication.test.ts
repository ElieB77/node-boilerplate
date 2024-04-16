import bcrypt from "bcrypt";
import { describe, expect, test } from "@jest/globals";
import {
  comparePassword,
  createJWT,
  hashPassword,
} from "../../../utils/authentication";
import jwt from "jsonwebtoken";

describe("Utility functions for authentication", () => {
  describe("Password Comparison", () => {
    test("should return true when password match hash", async () => {
      const password = "MyPassword";
      const hashedPassword = await bcrypt.hash(password, 5);
      const result = await comparePassword(password, hashedPassword);
      expect(result).toBe(true);
    });

    test("should return false when password does not match hash", async () => {
      const password = "MyPassword";
      const hashedPassword = await bcrypt.hash(password, 5);
      const result = await comparePassword("WrongPassword", hashedPassword);
      expect(result).toBe(false);
    });
  });

  describe("Password Hashing", () => {
    test("should return the hashed password", async () => {
      const password = "MyPassword";
      const hashedPassword = await hashPassword(password);
      expect(hashedPassword).not.toBe(password);
    });
  });

  describe("Generate JWT", () => {
    test("should include correct user id in the payload", () => {
      const userId = "1";
      const token = createJWT(userId);
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
        id: string;
      };
      expect(decoded.id).toBe(userId);
    });
  });
});
