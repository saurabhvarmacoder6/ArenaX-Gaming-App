import JoinedPlayer from "../../models/JoinedPlayer.js";

export const getJoinedPlayers = async (req, res) => {
    try {

        const { id } = req.params;

        const players = await JoinedPlayer.find({
            tournament: id,
        })
            .populate("user", "gameName") 
            .sort({ slot: 1 });

        return res.status(200).json({
            success: true,
            totalPlayers: players.length,
            players,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            msg: "Internal Server Error",
        });

    }
};