import { Schema } from "express-validator";

export const authenticationSchema: Schema = {
  email: {
    isEmail: true,
    errorMessage: "Incorrect email format.",
  },
  password: {
    isLength: {
      options: { min: 6 },
      errorMessage: "Password must have at least 6 characters",
    },
  },
};
