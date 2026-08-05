import JoinedPlayer from "../../models/JoinedPlayer.js";

export const getOccupiedSlots = async (req, res) => {
    try {

        const { id } = req.params;

        const occupiedSlots = await JoinedPlayer.find({
            tournament: id,
            user: req.user.userId,
        }).select("slot -_id");

        return res.status(200).json({
            success: true,
            occupiedSlots: occupiedSlots.map(item => item.slot),

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            msg: "Internal Server Error",
        });

    }
};