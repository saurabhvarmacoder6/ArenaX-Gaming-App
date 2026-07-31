
import Wallet from "../models/Wallet.js";

export const getBalance = async (req, res) => {
    const userId = req.user.userId;
    console.log(userId);

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