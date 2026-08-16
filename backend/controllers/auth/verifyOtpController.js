import bcrypt from "bcrypt";
import Users from "../../models/User.js";

export const verifyOtp = async (req, res, next) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                msg: "Email and OTP are required.",
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

        // Check OTP exists
        if (!user.resetOtp || !user.resetOtpExpire) {
            return res.status(400).json({
                success: false,
                msg: "Please request a new OTP.",
            });
        }

        // Check expiry first
        if (user.resetOtpExpire < new Date()) {
            user.resetOtp = null;
            user.resetOtpExpire = null;
            user.resetOtpAttempts = 0;
            user.resetOtpSentAt = null;

            await user.save();

            return res.status(400).json({
                success: false,
                msg: "OTP has expired. Please request a new OTP.",
            });
        }

        // Already verified
        if (user.isOtpVerified) {
            return res.status(400).json({
                success: false,
                msg: "OTP already verified.",
            });
        }

        // Maximum 5 attempts
        if (user.resetOtpAttempts >= 5) {
            user.resetOtp = null;
            user.resetOtpExpire = null;
            user.resetOtpAttempts = 0;
            user.resetOtpSentAt = null;

            await user.save();

            return res.status(429).json({
                success: false,
                msg: "Too many incorrect attempts. Please request a new OTP.",
            });
        }

        // Compare entered OTP with hashed OTP
        const isValidOtp = await bcrypt.compare(
            String(otp),
            user.resetOtp
        );

        if (!isValidOtp) {
            user.resetOtpAttempts += 1;
            await user.save();

            const remainingAttempts = 5 - user.resetOtpAttempts;

            return res.status(400).json({
                success: false,
                msg: `Invalid OTP. ${remainingAttempts} attempts remaining.`,
            });
        }

        // OTP verified
        user.isOtpVerified = true;

        // OTP should not be usable again
        user.resetOtp = null;
        user.resetOtpExpire = null;
        user.resetOtpAttempts = 0;
        user.resetOtpSentAt = null;

        await user.save();

        return res.status(200).json({
            success: true,
            msg: "OTP verified successfully.",
        });

    } catch (error) {
        console.error(error);
        next(error);
    }
};