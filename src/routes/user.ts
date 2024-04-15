import express from "express";
import { checkSchema } from "express-validator";
import { validate } from "../validators/middlewares/authentication";
import { UserController } from "../controllers/user";
import { userSchema } from "../validators/schemas/user";

const router = express.Router();

router.get("/users", UserController.getUsers);
router.get("/:id", validate(checkSchema(userSchema)), UserController.findUser);
router.put(
  "/:id",
  validate(checkSchema(userSchema)),
  UserController.updateUser
);
router.delete(
  "/:id",
  validate(checkSchema(userSchema)),
  UserController.deleteUser
);

export default router;
