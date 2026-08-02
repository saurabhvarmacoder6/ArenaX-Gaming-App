import mongoose from "mongoose";

const paymentOrderSchema = new mongoose.Schema(
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

        orderId: {
            type: String,
            required: true,
            unique: true,
        },

        paymentId: {
            type: String,
            default: null,
        },

        amount: {
            type: Number,
            required: true,
            min: 10,
        },

        currency: {
            type: String,
            default: "INR",
        },

        status: {
            type: String,
            enum: ["created", "paid", "failed"],
            default: "created",
        },
    },
    {
        timestamps: true,
    }
);

const PaymentOrder = mongoose.model("PaymentOrder", paymentOrderSchema);

export default PaymentOrder;