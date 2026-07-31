import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import { createOrder, verifyPayment } from "../controllers/payment/createOrderController.js";
import { getWithdrawData, postWithdrawData } from "../controllers/payment/withdrawController.js";

const router = express.Router();

router.post("/create-order", verifyToken , createOrder);
router.post("/verify", verifyToken, verifyPayment);
router.post("/money-withdraw", verifyToken, postWithdrawData);
router.get("/getWithdrawData", verifyToken, getWithdrawData);

export default router;