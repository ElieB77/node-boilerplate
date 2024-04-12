import { Schema } from "express-validator";

export const authenticationSchema: Schema = {
  email: {
    notEmpty: {
      errorMessage: "Email is required",
    },
    isEmail: {
      errorMessage: "Incorrect email format",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Password is required",
    },
    isLength: {
      options: { min: 12 },
      errorMessage: "Password must have at least 12 characters",
    },
    matches: {
      options: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, "g"],
      errorMessage:
        "Password must contain at least one lowercase letter, one uppercase letter, and one number",
    },
  },
};
