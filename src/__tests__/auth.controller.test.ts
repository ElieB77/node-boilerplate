import request from "supertest";
import app from "../server";

describe("AuthController", () => {
  describe("POST /auth/signup", () => {
    it("should return status 200", async () => {
      const signUp = await request(app).post("/auth/signup").send({
        email: "user@mail.com",
        password: "Password",
      });
      expect(signUp.status).toBe(200);
    });
  });

  describe("POST /auth/signin", () => {});
});
