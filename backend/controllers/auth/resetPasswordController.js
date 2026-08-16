import bcrypt from "bcrypt";
import Users from "../../models/User.js";
import Session from "../../models/Session.js";

export const resetPassword = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                msg: "Email and password are required.",
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                msg: "Password must be at least 8 characters long.",
            });
        }

        const normalizedEmail = email.toLowerCase().trim();

        const user = await Users.findOne({
            email: normalizedEmail
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User not found.",
            });
        }

        // OTP must be verified first
        if (!user.isOtpVerified) {
            return res.status(403).json({
                success: false,
                msg: "Please verify OTP first.",
            });
        }

        // Check if new password is same as old password
        const isSamePassword = await bcrypt.compare(
            password,
            user.password
        );

        if (isSamePassword) {
            return res.status(400).json({
                success: false,
                msg: "New password must be different from the old password.",
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;

        // Clear OTP/reset state
        user.resetOtp = null;
        user.resetOtpExpire = null;
        user.resetOtpAttempts = 0;
        user.resetOtpSentAt = null;
        user.isOtpVerified = false;

        await user.save();

        // Revoke all existing sessions
        await Session.updateMany(
            {
                userId: user._id,
                revoked: false
            },
            {
                $set: {
                    revoked: true,
                    revokedAt: new Date()
                }
            }
        );

        return res.status(200).json({
            success: true,
            msg: "Password reset successfully. Please login again.",
        });

    } catch (error) {
        console.error(error);
        next(error);
    }
};