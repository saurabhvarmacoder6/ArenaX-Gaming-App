
import PaymentOrder from "../models/paymentOrder.js";
import Transaction from "../models/transaction.js";
import Wallet from "../models/Wallet.js";
import Users from "../models/User.js";

export const getBalance = async (req, res) => {

    const result = await Wallet.findOne({ userId: req.user.userId })
    if (!result) {
        return res.status(400).json({
            success: false,
            msg: "result not found"
        })
    }

    return res.status(200).json({
        success: true,
        msg: "result fetched successfully",
        data: result
    })
}


export const paymentOrderData = async (req, res) => {
    const result = await PaymentOrder.find({
        userId: req.user.userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
        success: true,
        msg: "result fetched successfully",
        data: result
    })
}


export const transactionData = async (req, res) => {
    const result = await Transaction.find({
        userId: req.user.userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
        success: true,
        msg: "result fetched successfully",
        data: result
    })
}

export const totalUsers = async (req, res) => {
    const result = await Users.find()

    return res.status(200).json({
        success: true,
        msg: "result fetched successfully",
        data: result
    })
}