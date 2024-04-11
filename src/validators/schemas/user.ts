import { Schema } from "express-validator";

export const userSchema: Schema = {
  id: {
    in: ["params"],
    isUUID: {
      errorMessage: "Invalid id parameter.",
    },
  },
};
