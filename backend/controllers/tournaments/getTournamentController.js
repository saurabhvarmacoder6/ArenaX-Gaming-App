import Tournament from "../../models/tournament.js";

export const getTournament = async (req, res) => {
    try {

        const { mode, status } = req.query;

        const filter = {};

        if (mode) {
            filter.mode = mode;
        }

        if (status) {
            filter.status = status;
        }

        const tournaments = await Tournament.find(filter).sort({
            createdAt: -1,
        });

        return res.status(200).json({
            success: true,
            total: tournaments.length,
            tournaments,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            msg: "Internal Server Error",
        });

    }
};