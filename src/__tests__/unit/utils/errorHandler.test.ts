import { ResponseError } from "../../../utils/errorHandler";

describe("Error Handler", () => {
  test("Should contain message, statusCode and data properties", () => {
    const message = "This is an error message";
    const statusCode = 400;
    const data = "email@email.com";

    const error: ResponseError = new Error(message);
    error.statusCode = statusCode;
    error.data = data;

    expect(error).toHaveProperty("message", message);
    expect(error).toHaveProperty("statusCode", statusCode);
    expect(error).toHaveProperty("data", data);
  });
});
