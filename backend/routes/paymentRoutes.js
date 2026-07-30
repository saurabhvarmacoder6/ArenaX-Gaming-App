import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import { createOrder } from "../controllers/payment/createOrderController.js";

const router = express.Router();

router.post("/create-order", verifyToken , createOrder);

export default router;