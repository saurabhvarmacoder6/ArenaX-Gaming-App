import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            msg: "Unauthorized. Please login first."
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
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