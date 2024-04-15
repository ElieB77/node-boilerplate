import bcrypt from "bcrypt";
import { describe, expect, test } from "@jest/globals";
import { comparePassword, hashPassword } from "../../../utils/authentication";

describe("utility functions for authentication", () => {
  describe("password comparison", () => {
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

  describe("password hashing", () => {
    test("should return the hashed password", async () => {
      const password = "MyPassword";
      const hashedPassword = await hashPassword(password);
      expect(hashedPassword).not.toBe(password);
    });
  });
});
