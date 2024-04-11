import request from "supertest";
import app from "../../server";

describe("AuthController", () => {
  describe("GET /", () => {
    it("should return hello world", async () => {
      const response = await request(app).get("/");

      expect(response.status).toBe(201);
    });
  });
});
