import JoinedPlayer from "../../models/JoinedPlayer.js";

export const getOccupiedSlots = async (req, res) => {
    try {

        const { id } = req.params;

        const occupiedSlots = await JoinedPlayer.find({
            tournament: id,
        }).select("slot -_id");

        const alreadyJoined = await JoinedPlayer.findOne({
            tournament: id,
            user: req.user.userId,
        });

        return res.status(200).json({
            success: true,
            occupiedSlots: occupiedSlots.map(item => item.slot),
            alreadyJoined: !!alreadyJoined,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            msg: "Internal Server Error",
        });

    }
};