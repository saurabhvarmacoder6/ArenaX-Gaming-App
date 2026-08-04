import Tournament from "../../models/tournament.js";
import JoinedPlayer from "../../models/JoinedPlayer.js";
import Wallet from "../../models/Wallet.js";
import Transaction from "../../models/transaction.js";
import mongoose from "mongoose";


export const joinTournament = async (req, res) => {
// console.log(req.user.id);
    let session = null;
    try {

        const { id } = req.params;
        const { slot } = req.body;

        const userId = req.user.userId;
        
        


        const tournament = await Tournament.findById(id);

        if (!tournament) {
            return res.status(404).json({
                success: false,
                msg: "Tournament not found.",
            });
        }

        if (tournament.status !== "Upcoming") {
            return res.status(400).json({
                success: false,
                msg: "Tournament joining is closed.",
            });
        }

        if (!slot) {
            return res.status(400).json({
                success: false,
                msg: "Please select a slot.",
            });
        }

        const alreadyJoined = await JoinedPlayer.findOne({
            tournament: id,
            user: userId,
        });

        if (alreadyJoined) {
            return res.status(400).json({
                success: false,
                msg: "You have already joined this tournament.",
            });
        }

        if (tournament.joinedPlayers >= tournament.totalSlots) {
            return res.status(400).json({
                success: false,
                msg: "Tournament is full.",
            });
        }

        const slotTaken = await JoinedPlayer.findOne({
            tournament: id,
            slot,
        });

        if (slotTaken) {
            return res.status(400).json({
                success: false,
                msg: "This slot is already booked.",
            });
        }

        const wallet = await Wallet.findOne({
            userId,
        });


        if (!wallet) {
            return res.status(404).json({
                success: false,
                msg: "Wallet not found.",
            });
        }

        if (wallet.balance < tournament.entryFee) {
            return res.status(400).json({
                success: false,
                msg: "Insufficient wallet balance.",
            });
        }


        session = await mongoose.startSession();
        session.startTransaction();

        wallet.balance -= tournament.entryFee;

        await wallet.save({ session });

        await JoinedPlayer.create([{
            tournament: id,
            user: userId,
            slot,
            entryFee: tournament.entryFee,
        }], { session });

        tournament.joinedPlayers += 1;

        await tournament.save({ session });

        await Transaction.create([{
            userId,
            type: "debit",
            amount: tournament.entryFee,
            reason: "Tournament Entry",
            tournamentId: tournament._id,
            status: "success",
        }], { session });

        await session.commitTransaction();

        return res.status(200).json({
            success: true,
            msg: "Tournament joined successfully.",
            walletBalance: wallet.balance,
            slot,
        });

    } catch (error) {

        console.error(error);
        if (session) {
            await session.abortTransaction();
        }
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error",
        });

    } finally {
        if (session) {
            session.endSession();
        }
    }
};