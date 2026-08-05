import Withdrawal from "../../models/withdraw.js";
import Wallet from "../../models/Wallet.js";

export const postWithdrawData = async (req, res) => {
        try {
        const { amount, upiId, adminNote } = req.body;

        // Validation
        if (!amount || !upiId) {
            return res.status(400).json({
                success: false,
                msg: "Amount and UPI ID are required.",
            });
        }

        // Minimum amount
        if (amount < 30) {
            return res.status(400).json({
                success: false,
                msg: "Minimum withdrawal amount is ₹30.",
            });
        }

        // Wallet check
        const wallet = await Wallet.findOne({
            userId: req.user.userId,
        });

        if (!wallet) {
            return res.status(404).json({
                success: false,
                msg: "Wallet not found.",
            });
        }

        // Balance check
        if (wallet.balance < amount) {
            return res.status(400).json({
                success: false,
                msg: "Insufficient wallet balance.",
            });
        }

        const pendingRequest = await Withdrawal.findOne({
            userId: req.user.userId,
            status: "pending",
        });

        if (pendingRequest) {
            return res.status(400).json({
                success: false,
                msg: "You already have a pending withdrawal request.",
            });
        }

        const result = await Withdrawal.create({
            userId: req.user.userId,
            userName: req.user.userName,
            amount,
            upiId,
            adminNote,
        });

        return res.status(201).json({
            success: true,
            msg: "Withdrawal request submitted successfully.",
            data: result,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            msg: "Internal Server Error",
        });
    }
};

export const getWithdrawData = async (req, res) => {
    try {
        const result = await Withdrawal.find({
            userId: req.user.userId,
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            msg: "Internal Server Error",
        });
    }
};

export const getAllWithdrawRequests = async (req, res) => {
    try {

        const result = await Withdrawal.find()
            .populate("userId", "name email")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: result,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            msg: "Internal Server Error",
        });

    }
};