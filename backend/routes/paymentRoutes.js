import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import { markWithdrawPaid, rejectWithdraw } from "../controllers/payment/markWithdrawPaid.js";
import { createOrder, verifyPayment } from "../controllers/payment/createOrderController.js";
import { getWithdrawData, postWithdrawData } from "../controllers/payment/withdrawController.js";
import { getAllWithdrawRequests } from "../controllers/payment/withdrawController.js";
import verifyAdmin from "../middleware/verifyAdmin.js";

const router = express.Router();

router.post("/create-order", verifyToken, createOrder);
router.post("/verify", verifyToken, verifyPayment);
router.post("/money-withdraw", verifyToken, postWithdrawData);
router.get("/getWithdrawData", verifyToken, getWithdrawData);
router.patch("/withdraw/:id/paid", verifyToken, verifyAdmin, markWithdrawPaid);
router.patch("/withdraw/:id/reject", verifyToken, verifyAdmin, rejectWithdraw);
router.get("/admin/withdraw", verifyToken, verifyAdmin, getAllWithdrawRequests);


export default router;