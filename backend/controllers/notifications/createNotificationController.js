import Notification from "../../models/notification.js";

export const createNotification = async (req, res) => {
    try {

        const {
            title,
            message,
            type,
            isPinned,
        } = req.body;

        if (!title || !message) {
            return res.status(400).json({
                success: false,
                msg: "Title and message are required.",
            });
        }

        const notification = await Notification.create({
            title,
            message,
            type,
            isPinned,
        });

        return res.status(201).json({
            success: true,
            msg: "Notification created successfully.",
            notification,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            msg: "Internal Server Error.",
        });

    }
};