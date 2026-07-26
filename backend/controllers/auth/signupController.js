import User from "../.././models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const signUp = async (req, res) => {
    const { name, email, gameName, uid, password } = req.body;
    if (!name || !email || !gameName || !uid || !password) {
        return res.send({
            msg: "userdata invalid",
            success: false
        })
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await User.create({
            name,
            email,
            gameName,
            uid,
            password: hashedPassword
        });

        const userWithoutPassword = await User.findById(result._id).select("-password");

        jwt.sign(
            { userId: result._id, role: result.role }
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
                return res.status(201).json({
                    success: true,
                    msg: "Signup successful",
                    user:userWithoutPassword
                });

            })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error"
        })
    }
}

