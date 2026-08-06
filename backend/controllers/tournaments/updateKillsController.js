import JoinedPlayer from "../../models/JoinedPlayer.js";


export const updatePlayerKills = async (req, res) => {

    try {
        const { players } = req.body;

        for (const player of players) {

            await JoinedPlayer.findByIdAndUpdate(
                player.id,
                {
                    kill: player.kill
                },
                {
                    returnDocument: "after"
                }
            );

        }

        return res.json({
            success: true,
            msg: "Kills Updated Successfully"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            error: error.message,
            stack: error.stack,
        });

    }

};