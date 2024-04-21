import { describe, test } from "@jest/globals";
import request from "supertest";
import app from "../../../index";
import prisma from "../../../database/db";
import jwt from "jsonwebtoken";

const newUser = {
  email: "admin@test.mail",
  password: "Password0000",
  firstName: "MyFirstName",
};

let token;
let userId;

describe("User controllers", () => {
  beforeEach(async () => {
    const user = await prisma.user.create({
      data: newUser,
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { role: "ADMIN" },
    });

    token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    userId = user.id;
  });

  afterEach(async () => {
    const userToDelete = await prisma.user.findUnique({
      where: {
        email: newUser.email,
      },
    });

    if (userToDelete) {
      await prisma.user.delete({
        where: {
          id: userToDelete.id,
        },
      });
    }
  });

  describe("Get users", () => {
    test("should return users", async () => {
      const response = await request(app)
        .get("/user/users")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
    });
  });

  describe("Get user", () => {
    test("Should return user", async () => {
      const response = await request(app)
        .get(`/user/${userId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
    });
  });

  describe("Update user", () => {
    test("Should update user", async () => {
      const response = await request(app)
        .put(`/user/${userId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ firstName: "newName" });

      expect(response.status).toBe(200);
      expect(response.body.data.firstName).not.toEqual(newUser.firstName);
      expect(response.body).toHaveProperty("data");
    });
  });

  describe("Delete user", () => {
    test("Should delete user", async () => {
      const response = await request(app)
        .delete(`/user/${userId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
    });
  });
});
