import mongoose from "mongoose";
import Tournament from "../../models/tournament.js";

export const updateTournament = async (req, res) => {
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

        const {
            title,
            mode,
            type,
            entryFee,
            perKill,
            prizePool,
            totalSlots,
            map,
            matchDate,
            matchTime,
            roomId,
            roomPassword,
            status,
        } = req.body;

        tournament.title = title;
        tournament.mode = mode;
        tournament.type = type;
        tournament.entryFee = entryFee;
        tournament.perKill = perKill;
        tournament.prizePool = prizePool;
        tournament.totalSlots = totalSlots;
        tournament.map = map;
        tournament.matchDate = matchDate;
        tournament.matchTime = matchTime;
        tournament.roomId = roomId || "";
        tournament.roomPassword = roomPassword || "";
        tournament.status = status;

        await tournament.save();

        return res.status(200).json({
            success: true,
            msg: "Tournament updated successfully.",
            tournament,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            msg: "Internal Server Error.",
        });

    }
};