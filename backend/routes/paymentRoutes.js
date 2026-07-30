import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import { createOrder, verifyPayment } from "../controllers/payment/createOrderController.js";

const router = express.Router();

router.post("/create-order", createOrder);
router.post("/verify", verifyToken, verifyPayment);

export default router;