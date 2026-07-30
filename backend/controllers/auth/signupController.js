import User from "../.././models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import Wallet from "../../models/Wallet.js"

export const signUp = async (req, res) => {
    const { name, email, gameName, uid, password } = req.body;
    if (!name || !email || !gameName || !uid || !password) {
        return res.send({
            msg: "userdata invalid",
            success: false
        })
    }

    let session;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        session = await mongoose.startSession();
        session.startTransaction();
        const user = new User({
            name,
            email,
            gameName,
            uid,
            password: hashedPassword
        });
        await user.save({ session });

        const wallet = new Wallet({
            userId: user._id,
            balance: 0
        })
        await wallet.save({ session });
        console.log("wallet saved");
        await session.commitTransaction();
        const userObject = user.toObject();
        delete userObject.password;

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
                return res.status(201).json({
                    success: true,
                    msg: "Signup successful",
                    user: userObject
                });

            })
    } catch (error) {
        console.error(error)
        if (session) {
            await session.abortTransaction();
        }
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error"
        })
    } finally {
        if (session) {
            await session.endSession();
        }
    }
}

