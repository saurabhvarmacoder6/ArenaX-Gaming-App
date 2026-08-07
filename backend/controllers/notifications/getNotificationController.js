import Notification from "../../models/notification.js";

export const getNotifications = async (req, res) => {
    try {

        const notifications = await Notification.find().sort({
            isPinned: -1,
            createdAt: -1,
        });

        return res.status(200).json({
            success: true,
            total: notifications.length,
            notifications,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            msg: "Internal Server Error.",
            error: error.message,
        });

    }
};