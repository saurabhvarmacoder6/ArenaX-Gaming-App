import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Session from "../../models/session.js";
import Users from "../../models/User.js";

export const refreshAccessToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                msg: "Refresh token not found"
            });
        }

        // Verify old refresh token
        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_SECRET_KEY
        );

        // Get current user data
        const user = await Users.findById(decoded.userId).select(
            "role name isBlocked"
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User not found"
            });
        }

        if (user.isBlocked) {
            return res.status(403).json({
                success: false,
                msg: "Your account has been blocked."
            });
        }

        // Find active sessions
        const sessions = await Session.find({
            userId: decoded.userId,
            revoked: false
        });

        let validSession = null;

        for (const session of sessions) {
            const isValid = await bcrypt.compare(
                refreshToken,
                session.refreshTokenHash
            );

            if (isValid) {
                validSession = session;
                break;
            }
        }

        if (!validSession) {
            return res.status(401).json({
                success: false,
                msg: "Invalid refresh token"
            });
        }

        // Check session expiry
        if (validSession.expiresAt <= new Date()) {
            validSession.revoked = true;
            validSession.revokedAt = new Date();

            await validSession.save();

            return res.status(401).json({
                success: false,
                msg: "Session expired"
            });
        }

        // =========================
        // CREATE NEW REFRESH TOKEN
        // =========================

        const newRefreshToken = jwt.sign(
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

        // Hash new refresh token
        const newRefreshTokenHash = await bcrypt.hash(
            newRefreshToken,
            10
        );

        // Update existing session
        validSession.refreshTokenHash = newRefreshTokenHash;
        validSession.expiresAt = new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
        );

        await validSession.save();

        // =========================
        // CREATE NEW ACCESS TOKEN
        // =========================

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

        // Replace old refresh token cookie
        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production"
                    ? "none"
                    : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            accessToken
        });

    } catch (error) {
        next(error);
    }
};