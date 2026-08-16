import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Session from "../../models/session.js";

export const Logout = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (refreshToken) {
            try {
                const decoded = jwt.verify(
                    refreshToken,
                    process.env.REFRESH_SECRET_KEY
                );

                const sessions = await Session.find({
                    userId: decoded.userId,
                    revoked: false
                });

                for (const session of sessions) {
                    const isValid = await bcrypt.compare(
                        refreshToken,
                        session.refreshTokenHash
                    );

                    if (isValid) {
                        session.revoked = true;
                        session.revokedAt = new Date();

                        await session.save();
                        break;
                    }
                }

            } catch (error) {
                console.log("Invalid refresh token during logout");
            }
        }

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production"
                    ? "none"
                    : "lax"
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });

    } catch (error) {
        next(error);
    }
};