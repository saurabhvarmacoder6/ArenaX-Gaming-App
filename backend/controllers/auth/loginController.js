import User from "../.././models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const Login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            msg: "please enter valid email or password",
            success: false
        })
    }
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                msg: "invalid email or password",
                success: false
            })
        }
        const userWithoutPassword = await User.findById(user._id).select("-password");
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({
                msg: "invalid email or password",
                success: false
            })
        }

        jwt.sign(
            { userId: user._id, role: user.role }
            , process.env.JWT_SECRET, { expiresIn: '6d' }, (error, token) => {
                if (error) {
                    return res.status(500).json({
                        success: false,
                        msg: "JWT generation failed"
                    });
                }
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                    maxAge: 6 * 24 * 60 * 60 * 1000
                })
                res.status(200).json({
                    msg: "login done",
                    success: true,
                    user: userWithoutPassword
                })
            })
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error
        })
    }
} 
