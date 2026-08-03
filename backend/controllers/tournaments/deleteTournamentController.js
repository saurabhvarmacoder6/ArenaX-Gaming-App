import mongoose from "mongoose";
import Tournament from "../../models/tournament.js";

export const deleteTournament = async (req, res) => {
    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                msg: "Invalid tournament id.",
            });
        }

        const tournament = await Tournament.findById(id);

        if (!tournament) {
            return res.status(404).json({
                success: false,
                msg: "Tournament not found.",
            });
        }

        await tournament.deleteOne();

        return res.status(200).json({
            success: true,
            msg: "Tournament deleted successfully.",
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            msg: "Internal Server Error.",
        });

    }
};