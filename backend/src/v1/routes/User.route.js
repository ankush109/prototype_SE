import express from "express";
import { loginController, userController } from "../controllers";
import authMiddleware from "../middlewares/Auth.middleware";

const router = express.Router();

router.get("/user-details", authMiddleware, userController.userDetails);

router.post("/sendmoney", authMiddleware, userController.sendMoney);
export default router;
