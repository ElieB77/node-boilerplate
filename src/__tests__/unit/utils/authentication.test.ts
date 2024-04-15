import { describe, expect, test } from "@jest/globals";
import bcrypt from "bcrypt";

describe("utility functions for authentication", () => {
  describe("password comparison", () => {
    test("should return true when password matches hash", async () => {
      const password = "MyPassword";
      const hashedPassword = await bcrypt.hash(password, 5);
      const result = await bcrypt.compare(password, hashedPassword);
      expect(result).toBe(true);
    });

    test("should return false when password does not match hash", async () => {
      const password = "MyPassword";
      const hashedPassword = await bcrypt.hash(password, 5);
      const result = await bcrypt.compare("WrongPassword", hashedPassword);
      expect(result).toBe(false);
    });
  });
});
