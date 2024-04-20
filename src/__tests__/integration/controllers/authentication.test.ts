import { describe, test } from "@jest/globals";
import request from "supertest";
import app from "../../../index";
import prisma from "../../../database/db";

const newUser = {
  email: "user@test.com",
  password: "MyPassword000",
};

describe("Authentication", () => {
  afterAll(async () => {
    await prisma.user.delete({
      where: {
        email: newUser.email,
      },
    });
  });

  describe("Signup", () => {
    test("Should return 201", async () => {
      await request(app).post("/auth/signup").send(newUser).expect(201);
    });

    test("Should return 409 if user already exists", async () => {
      await request(app).post("/auth/signup").send(newUser).expect(409);
    });
  });

  describe("Signin", () => {
    test("Should return 200", async () => {
      await request(app).post("/auth/signin").send(newUser).expect(200);
    });

    test("Should return 401 if email or password is invalid", async () => {
      await request(app)
        .post("/auth/signin")
        .send({ email: newUser.email, password: "WrongPassword000" })
        .expect(401);
    });
  });
});
