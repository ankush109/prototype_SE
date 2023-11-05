import express from "express";
import { loginController, userController } from "../controllers";
import authMiddleware from "../middlewares/Auth.middleware";

const router = express.Router();

router.get("/user-details", authMiddleware, userController.userDetails);
router.put("/fillBankDetails", authMiddleware, userController.fillBankDetails);
router.post("/sendmoney", authMiddleware, userController.sendMoney);
router.get(
  "/getUserPhone",
  authMiddleware,
  userController.getUserByPhoneNumber
);
router.get(
  "/getTransactionDetails",
  authMiddleware,
  userController.getTransactionDetails
);
router.post("/validateEmail", userController.validateEmail);
export default router;
