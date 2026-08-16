import User from "../.././models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Wallet from "../../models/Wallet.js";
import Session from "../../models/session.js";

export const signUp = async (req, res, next) => {
    const { name, email, gameName, uid, password } = req.body;

    let session;

    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Start MongoDB transaction
        session = await mongoose.startSession();
        session.startTransaction();

        // Create user
        const user = new User({
            name,
            email,
            gameName,
            uid,
            password: hashedPassword
        });

        await user.save({ session });

        // Create wallet
        const wallet = new Wallet({
            userId: user._id,
            balance: 0
        });

        await wallet.save({ session });

        // Create refresh token
        const refreshToken = jwt.sign(
            {
                userId: user._id,
                role: user.role,
                userName: user.name
            },
            process.env.REFRESH_SECRET_KEY,
            {
                expiresIn: "7d"
            }
        );

        // Hash refresh token before storing it
        const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

        // Create session
        const userSession = new Session({
            userId: user._id,
            refreshTokenHash,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        await userSession.save({ session });

        // Commit transaction
        await session.commitTransaction();

        // Create access token
        const accessToken = jwt.sign(
            {
                userId: user._id,
                role: user.role,
                userName: user.name
            },
            process.env.ACCESS_SECRET_KEY,
            {
                expiresIn: "15m"
            }
        );

        // Remove password from response
        const userObject = user.toObject();
        delete userObject.password;

        // Store refresh token in HttpOnly cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production"
                    ? "none"
                    : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(201).json({
            success: true,
            msg: "Signup successful",
            user: userObject,
            accessToken
        });

    } catch (error) {

        if (session) {
            await session.abortTransaction();
        }

        next(error);

    } finally {

        if (session) {
            await session.endSession();
        }
    }
};