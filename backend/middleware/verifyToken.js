import jwt from "jsonwebtoken";
import Users from "../models/User.js";

const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            msg: "Unauthorized. Please login first."
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Users.findById(decoded.userId).select("isBlocked");

        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User not found."
            });
        }

        if (user.isBlocked) {
            return res.status(403).json({
                success: false,
                msg: "Your account has been blocked."
            });
        }
        req.user = decoded;
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            msg: "Invalid or expired token."
        });
    }
};

export default verifyToken;