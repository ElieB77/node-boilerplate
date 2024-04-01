import express from "express";
import { AuthController } from "../controllers/authentication";

const router = express.Router();

router.post("/auth/signup", AuthController.signup);
router.post("/auth/signin", AuthController.signin);

export default router;
