import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        type: {
            type: String,
            enum: ["credit", "debit"],
            required: true,
        },

        amount: {
            type: Number,
            required: true,
            min: 1,
        },

        reason: {
            type: String,
            enum: [
                "Wallet Recharge",
                "Tournament Entry",
                "Tournament Winning",
                "Withdrawal",
                "Refund",
            ],
            required: true,
        },

        paymentId: {
            type: String,
            default: null,
        },

        orderId: {
            type: String,
            default: null,
        },

        tournamentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tournament",
            default: null,
        },

        status: {
            type: String,
            enum: ["success", "pending", "failed"],
            default: "success",
        },
    },
    {
        timestamps: true,
    }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;