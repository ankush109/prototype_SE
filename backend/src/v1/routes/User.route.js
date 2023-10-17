import express from "express";
import { loginController, userController } from "../controllers";
import authMiddleware from "../middlewares/Auth.middleware";

const router = express.Router();

router.get("/user-details", authMiddleware, userController.userDetails);

export default router;
