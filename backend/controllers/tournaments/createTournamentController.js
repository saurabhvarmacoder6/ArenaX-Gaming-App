import Tournament from "../../models/tournament.js";

export const createTournament = async (req, res) => {

    try {

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
        } = req.body;

        if (
            !title ||
            !mode ||
            !type ||
            entryFee === undefined ||
            prizePool === undefined ||
            totalSlots === undefined ||
            !map ||
            !matchDate ||
            !matchTime
        ) {
            return res.status(400).json({
                success: false,
                msg: "All required fields are required.",
            });
        }

        const tournament = await Tournament.create({
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
        });

        return res.status(201).json({
            success: true,
            msg: "Tournament created successfully.",
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