import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    message: {
        success: false,
        msg: "Too many login attempts. Please try again later."
    },
    standardHeaders: true,
    legacyHeaders: false,
});

export const otpRequestLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 3,
    message: {
        success: false,
        msg: "Too many OTP requests. Please try again later."
    },
    standardHeaders: true,
    legacyHeaders: false,
});

export const otpVerifyLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
        success: false,
        msg: "Too many OTP verification attempts. Please try again later."
    },
    standardHeaders: true,
    legacyHeaders: false,
});