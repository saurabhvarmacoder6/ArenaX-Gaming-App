import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Session from "../../models/session.js";

export const Login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            msg: "Please enter valid email or password",
            success: false
        });
    }

    try {
        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                msg: "Invalid email or password",
                success: false
            });
        }

        // Check blocked user
        if (user.isBlocked) {
            return res.status(403).json({
                success: false,
                msg: "Your account has been blocked by admin."
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                msg: "Invalid email or password",
                success: false
            });
        }

        // Create refresh token
        const refreshToken = jwt.sign(
            {
                userId: user._id,
                role: user.role,
                userName: user.name
            },
            process.env.REFRESH_SECRET_KEY,
            {
                expiresIn: "7d"
            }
        );

        // Hash refresh token
        const refreshTokenHash = await bcrypt.hash(
            refreshToken,
            10
        );

        // Create session
        const userSession = new Session({
            userId: user._id,
            refreshTokenHash,
            expiresAt: new Date(
                Date.now() + 7 * 24 * 60 * 60 * 1000
            )
        });

        await userSession.save();

        // Create access token
        const accessToken = jwt.sign(
            {
                userId: user._id,
                role: user.role,
                userName: user.name
            },
            process.env.ACCESS_SECRET_KEY,
            {
                expiresIn: "15m"
            }
        );

        // Remove password
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        // Store refresh token in HttpOnly cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production"
                    ? "none"
                    : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            msg: "Login successful",
            success: true,
            user: userWithoutPassword,
            accessToken
        });

    } catch (error) {
        next(error);
    }
};