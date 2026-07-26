import User from "../../models/User.js";

export const FindMe = async (req, res) => {

    try {
        const userId = req.user.userId;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User not found"
            });
        }
        return res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error"
        });
    }
}