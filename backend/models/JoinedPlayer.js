import mongoose from "mongoose";

const joinedPlayerSchema = new mongoose.Schema(
    {
        tournament: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "tournaments",
            required: true,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true,
        },

        slot: {
            type: Number,
            required: true,
        },

        entryFee: {
            type: Number,
            required: true,
        },

        joinedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const JoinedPlayer = mongoose.model(
    "JoinedPlayer",
    joinedPlayerSchema
);

export default JoinedPlayer;