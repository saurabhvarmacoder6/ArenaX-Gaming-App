import mongoose from "mongoose";
import Notification from "../../models/notification.js";

export const deleteNotification = async (req, res) => {
    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                msg: "Invalid notification id.",
            });
        }

        const notification = await Notification.findById(id);

        if (!notification) {
            return res.status(404).json({
                success: false,
                msg: "Notification not found.",
            });
        }

        await notification.deleteOne();

        return res.status(200).json({
            success: true,
            msg: "Notification deleted successfully.",
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            msg: "Internal Server Error.",
        });

    }
};