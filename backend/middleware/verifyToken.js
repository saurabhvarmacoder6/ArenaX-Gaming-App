import jwt from "jsonwebtoken";
import Users from "../models/User.js";

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            msg: "Unauthorized. Access token required."
        });
    }

    const accessToken = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(
            accessToken,
            process.env.ACCESS_SECRET_KEY
        );

        const user = await Users.findById(decoded.userId)
            .select("isBlocked");

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
            msg: "Invalid or expired access token."
        });
    }
};

export default verifyToken;