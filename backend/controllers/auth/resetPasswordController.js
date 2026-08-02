import bcrypt from "bcrypt";
import Users from "../../models/User.js";

export const resetPassword = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                msg: "Email and password are required.",
            });
        }

        const user = await Users.findOne({ email: email.toLowerCase(), });

        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User not found.",
            });
        }

        if (!user.isOtpVerified) {
            return res.status(403).json({
                success: false,
                msg: "Please verify OTP first.",
            });
        }

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

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                msg: "Password must be at least 8 characters long.",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;

        user.resetOtp = null;
        user.resetOtpExpire = null;
        user.isOtpVerified = false;
        await user.save();
        return res.status(200).json({
            success: true,
            msg: "Password reset successfully.",
        });



    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            msg: "Internal Server Error.",
        });

    }

};