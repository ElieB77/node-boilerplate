import express from "express";
import authentication from "./authentication";
import user from "./user";
import { authorize, protect } from "../middlewares/auth";

const router = express.Router();

router.use("/auth", authentication);
router.use("/user", protect, authorize("ADMIN"), user);

export default router;
