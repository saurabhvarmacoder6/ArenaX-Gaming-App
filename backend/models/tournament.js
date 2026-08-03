import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        mode: {
            type: String,
            enum: ["BR", "CS", "LW"],
            required: true,
        },

        type: {
            type: String,
            enum: ["Solo", "Duo", "Squad"],
            required: true,
        },

        entryFee: {
            type: Number,
            required: true,
        },

        perKill: {
            type: Number,
            default: 0,
        },

        prizePool: {
            type: Number,
            required: true,
        },

        totalSlots: {
            type: Number,
            required: true,
        },

        joinedPlayers: {
            type: Number,
            default: 0,
        },

        roomId: {
            type: String,
            default: "",
        },

        roomPassword: {
            type: String,
            default: "",
        },

        map: {
            type: String,
            required: true,
        },

        matchDate: {
            type: Date,
            required: true,
        },

        matchTime: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            enum: ["Upcoming", "Live", "Completed"],
            default: "Upcoming",
        },
    },
    {
        timestamps: true,
    }
);

const Tournament =
    mongoose.models.tournaments ||
    mongoose.model("tournaments", tournamentSchema);

export default Tournament;