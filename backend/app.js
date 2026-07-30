import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js";
import cookieParser from "cookie-parser";
const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    process.env.CLIENT_URL,
];

app.use(
    cors({
        origin: (origin, callback) => {
            // Postman ya same-origin requests ko allow karega
            if (!origin || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(new Error("Origin not allowed by CORS"));
        },
        credentials: true,
    })
);
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRoutes)
app.use("/api/payment", paymentRoutes);

app.get("/", (req, res) => {
    res.send("Server Working")
})

export default app;