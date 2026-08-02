import express from "express";
import { signUp } from "../controllers/auth/signupController.js";
import { Login } from "../controllers/auth/loginController.js";
import verifyToken from "../middleware/verifyToken.js";
import { FindMe } from "../controllers/auth/findMeController.js";
import { Logout } from "../controllers/auth/logoutController.js";
import verifyAdmin from "../middleware/verifyAdmin.js";
import { blockUser } from "../controllers/auth/blockController.js";
import { unblockUser } from "../controllers/auth/unblockController.js";
import { forgotPassword } from "../controllers/auth/forgotPasswordController.js";
import { verifyOtp } from "../controllers/auth/verifyOtpController.js";
import { resetPassword } from "../controllers/auth/resetPasswordController.js";
import { getBalance, paymentOrderData, transactionData, totalUsers } from "../controllers/authRouterController.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", Login);
router.post("/logout", Logout);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);
router.get("/me", verifyToken, FindMe);
router.get("/balance", verifyToken, getBalance);
router.get("/order-data", verifyToken, paymentOrderData);
router.get("/transaction", verifyToken, transactionData);
router.get("/users", verifyToken, totalUsers);
router.patch("/user/:id/block", verifyToken, verifyAdmin, blockUser);
router.patch("/user/:id/unblock", verifyToken, verifyAdmin, unblockUser);

export default router; 