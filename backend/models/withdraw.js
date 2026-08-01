import mongoose from "mongoose";

const withdrawalSchema = new mongoose.Schema(
    {

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        userName: {
            type: String,
            required: true,
            trim: true,
        },

        amount: {
            type: Number,
            required: true,
        },

        upiId: {
            type: String,
            required: true,
            trim: true,
        },

        status: {
            type: String,
            enum: ["pending", "approved", "rejected", "paid"],
            default: "pending",
        },

        adminNote: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const Withdrwal = mongoose.model("Withdrawal", withdrawalSchema);
export default Withdrwal;