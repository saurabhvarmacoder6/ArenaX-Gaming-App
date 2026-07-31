import express from "express";
import { signUp } from "../controllers/auth/signupController.js";
import { Login } from "../controllers/auth/loginController.js";
import verifyToken from "../middleware/verifyToken.js";
import { FindMe } from "../controllers/auth/findMeController.js";
import { Logout } from "../controllers/auth/logoutController.js";
import { getBalance } from "../controllers/authRouterController.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", Login);
router.post("/logout", Logout)
router.get("/me", verifyToken, FindMe);
router.get("/balance",verifyToken, getBalance);

export default router; 