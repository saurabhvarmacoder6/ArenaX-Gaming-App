import mongoose from "mongoose";
import Withdrawal from "../../models/withdraw.js";
import Wallet from "../../models/Wallet.js";
import Transaction from "../../models/transaction.js";

export const markWithdrawPaid = async (req, res) => {

    const { id } = req.params;

    let session = null;

    try {
        const withdrawal = await Withdrawal.findById(id);

        if (!withdrawal) {
            return res.status(404).json({
                success: false,
                msg: "Withdrawal not found",
            });
        }

        if (withdrawal.status === "paid") {

            return res.status(409).json({
                success: false,
                msg: "Already paid",
            });

        }

        if (withdrawal.status === "rejected") {

            return res.status(400).json({
                success: false,
                msg: "Rejected withdrawal cannot be marked as paid."
            });

        }

        session = await mongoose.startSession();

        session.startTransaction();
        const wallet = await Wallet.findOne(
            {
                userId: withdrawal.userId,
            },
            null,
            {
                session,
            }
        );

        if (!wallet) {

            await session.abortTransaction();

            return res.status(404).json({
                success: false,
                msg: "Wallet not found",
            });

        }

        if (wallet.balance < withdrawal.amount) {

            await session.abortTransaction();

            return res.status(400).json({
                success: false,
                msg: "Insufficient wallet balance",
            });

        }

        wallet.balance -= withdrawal.amount;

        await wallet.save({ session });
        await Transaction.create(
            [
                {
                    userId: withdrawal.userId,
                    type: "debit",
                    amount: withdrawal.amount,
                    reason: "Withdrawal",
                    status: "success",
                },
            ],
            { session }
        );

        withdrawal.status = "paid";

        await withdrawal.save({ session });

        await session.commitTransaction();

        return res.status(200).json({
            success: true,
            msg: "Withdrawal completed successfully",
        });

    } catch (error) {

        console.error(error);

        if (session?.inTransaction()) {
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

}



export const rejectWithdraw = async (req, res) => {

    const { id } = req.params;
    const { adminNote } = req.body;

    const withdrawal = await Withdrawal.findById(id);

    if (!withdrawal) {
        return res.status(404).json({
            success: false,
            msg: "Withdrawal not found",
        });
    }
    

    if (withdrawal.status !== "pending") {
        return res.status(400).json({
            success: false,
            msg: "Only pending requests can be rejected.",
        });
    }

    withdrawal.status = "rejected";
    withdrawal.adminNote = adminNote || "Rejected by Admin";

    await withdrawal.save();

    return res.status(200).json({
        success: true,
        msg: "Withdrawal rejected successfully.",
    });

}