import JoinedPlayer from "../../models/JoinedPlayer.js";

export const getMyMatches = async (req, res) => {
    try {

        const userId = req.user.userId;

        const myMatches = await JoinedPlayer.find({
            user: userId,
        })
            .populate("tournament")
            .sort({ createdAt: -1 });

        const validMatches = myMatches.filter(
            match => match.tournament
        );

        return res.status(200).json({
            success: true,
            matches: validMatches,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            msg: "Internal Server Error",
        });

    }
};