import razorpay from "../../config/razorpay.js";


export const createOrder = async (req, res) => {
    const { amount } = req.body;
    if (!Number.isInteger(amount) || amount < 10) {
        return res.status(400).json({
            success: false,
            msg: "Minimum amount is ₹10",
        });
    }

    try {
        const order = await razorpay.orders.create({
            amount: amount * 100,
            currency: "INR",
        });

        return res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "Failed to create order",
        });
    }
}