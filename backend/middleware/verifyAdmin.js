const verifyAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            msg: "Access denied"
        });
    }

    next();
};

export default verifyAdmin;