import express from "express";
import { AuthController } from "../controllers/authentication";
import { checkSchema } from "express-validator";
import { authenticationSchema } from "../validators/schemas/authenticationSchema";
import { validate } from "../validators/middlewares/authentication";

const router = express.Router();

router.post(
  "/signup",
  validate(checkSchema(authenticationSchema)),
  AuthController.signup
);

router.post(
  "/signin",
  validate(checkSchema(authenticationSchema)),
  AuthController.signin
);

export default router;
