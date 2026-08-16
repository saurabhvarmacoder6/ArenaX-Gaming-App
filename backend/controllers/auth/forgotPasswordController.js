import Users from "../../models/User.js";
import generateOTP from "../../utils/generateOTP.js";
import resend from "../../utils/sendEmail.js";
import emailTemplate from "../../utils/emailTemplate.js";
import bcrypt from "bcrypt";

export const forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        if (!email) {
            return res.status(400).json({
                success: false,
                msg: "Email is required",
            });
        }

        const normalizedEmail = email.toLowerCase().trim();

        const user = await Users.findOne({
            email: normalizedEmail
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User not found",
            });
        }

        // Resend cooldown: 60 seconds
        if (
            user.resetOtpSentAt &&
            Date.now() - user.resetOtpSentAt.getTime() < 60 * 1000
        ) {
            return res.status(429).json({
                success: false,
                msg: "Please wait 60 seconds before requesting another OTP.",
            });
        }

        // Generate OTP
        const otp = generateOTP();

        // Hash OTP before storing
        const hashedOtp = await bcrypt.hash(otp, 10);

        // OTP expires in 5 minutes
        const otpExpire = new Date(
            Date.now() + 5 * 60 * 1000
        );

        user.resetOtp = hashedOtp;
        user.resetOtpExpire = otpExpire;
        user.resetOtpAttempts = 0;
        user.resetOtpSentAt = new Date();
        user.isOtpVerified = false;

        await user.save();

        try {
            await resend.emails.send({
                from: "ArenaX <onboarding@resend.dev>",
                to: normalizedEmail,
                subject: "ArenaX Password Reset OTP",
                html: emailTemplate(otp),
            });
        } catch (emailError) {
            // If email fails, invalidate OTP
            user.resetOtp = null;
            user.resetOtpExpire = null;
            user.resetOtpAttempts = 0;
            user.resetOtpSentAt = null;
            await user.save();

            throw emailError;
        }

        return res.status(200).json({
            success: true,
            msg: "OTP sent successfully",
        });

    } catch (error) {
        console.error(error);
        next(error);
    }
};