import Users from "../../models/User.js";


export const verifyOtp = async (req, res) => {

    try {

        const { email, otp } = req.body;



        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                msg: "Email and OTP are required.",
            });
        }

        const user = await Users.findOne({ email: email.toLowerCase(), });



        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User not found.",
            });
        }

        if (!user.resetOtp || !user.resetOtpExpire) {
            return res.status(400).json({
                success: false,
                msg: "Please request a new OTP.",
            });
        }

        if (user.resetOtp !== otp) {
            return res.status(400).json({
                success: false,
                msg: "Invalid OTP.",
            });
        }

        if (user.resetOtpExpire < new Date()) {
            return res.status(400).json({
                success: false,
                msg: "OTP has expired.",
            });
        }

        if (user.isOtpVerified) {
            return res.status(400).json({
                success: false,
                msg: "OTP already verified.",
            });
        }

        user.isOtpVerified = true;

        await user.save();


        return res.status(200).json({
            success: true,
            msg: "OTP verified successfully.",
        });


    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            msg: "Internal Server Error.",
        });

    }

};