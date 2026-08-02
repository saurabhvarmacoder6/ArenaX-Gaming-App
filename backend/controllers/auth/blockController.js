import Users from "../../models/User.js";

export const blockUser = async (req, res) => {
    const { id } = req.params;
    try {

        const user = await Users.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User not found",
            });
        }



        if (user._id.toString() === req.user.userId) {
            return res.status(400).json({
                success: false,
                msg: "You cannot block your own account.",
            });
        }

        if (user.isBlocked) {
            return res.status(400).json({
                success: false,
                msg: "User is already blocked",
            });
        }

        user.isBlocked = true;

        await user.save();

        return res.status(200).json({
            success: true,
            msg: "User blocked successfully",
            data: user,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            msg: "Internal Server Error",
        });

    }
};