import Users from "../../models/User.js";
import generateOTP from "../../utils/generateOTP.js";
import resend from "../../utils/sendEmail.js";
import emailTemplate from "../../utils/emailTemplate.js";

export const forgotPassword = async (req, res) => {

    const { email } = req.body;
    let user;
    try {
        if (!email) {
            return res.status(400).json({
                success: false,
                msg: "Email is required",
            });
        }

        user = await Users.findOne({ email: email.toLowerCase(), });

        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User not found",
            });
        }

        const otp = generateOTP();

        const otpExpire = new Date(Date.now() + 5 * 60 * 1000);

        user.resetOtp = otp;
        user.resetOtpExpire = otpExpire;

        await user.save();

        await resend.emails.send({
            from: "ArenaX <onboarding@resend.dev>",
            to: email,
            subject: "ArenaX Password Reset OTP",
            html: emailTemplate(otp),
        });

        return res.status(200).json({
            success: true,
            msg: "OTP Generated Successfully",
        });

    } catch (error) {

        console.log(error);

        user.resetOtp = null;
        user.resetOtpExpire = null;

        await user.save();

        return res.status(500).json({
            success: false,
            error: error.message,
        });

    }
};