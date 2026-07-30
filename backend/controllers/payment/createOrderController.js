import razorpay from "../../config/razorpay.js";
import crypto from "crypto";
import PaymentOrder from "../../models/paymentOrder.js";
import Wallet from "../../models/Wallet.js";
import Transaction from "../../models/transaction.js";

export const createOrder = async (req, res) => {

    const { amount } = req.body;
    if (typeof amount !== "number" || !Number.isInteger(amount) || amount < 10) {
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

        // await PaymentOrder.create({
        //     userId: req.user.id,
        //     orderId: order.id,
        //     amount,
        //     currency: order.currency,
        //     status: "created",
        // });

        return res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            msg: "Failed to create order",
        });
    }
}


export const verifyPayment = async (req, res) => {
    const {
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
    } = req.body;

    // create hmac

    const hmac = crypto.createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
    );

    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);

    // generated signature

    const generatedSignature = hmac.digest("hex");

    if (generatedSignature !== razorpay_signature) {
        return res.status(400).json({
            success: false,
            message: "Invalid payment signature",
        });
    }
    let session = null;
    try {
        const paymentOrder = await PaymentOrder.findOne({
            orderId: razorpay_order_id,
        });

        if (!paymentOrder) {
            return res.status(404).json({
                success: false,
                message: "Payment order not found",
            });
        }

        if (paymentOrder.status === "paid") {
            return res.status(409).json({
                success: false,
                message: "Payment already verified",
            });
        }

        // start session

        session = await mongoose.startSession();

        session.startTransaction();

        // find object in wallet

        const wallet = await Wallet.findOne(
            {
                userId: paymentOrder.userId,
            },
            null,
            { session }
        );

        if (!wallet) {
            return res.status(404).json({
                success: false,
                message: "Wallet not found",
            });
        }

        // update wallet balance

        wallet.balance += paymentOrder.amount;

        await wallet.save({ session });

        // update paymentorder

        paymentOrder.status = "paid";
        paymentOrder.paymentId = razorpay_payment_id;

        await paymentOrder.save({ session });

        // create transaction

        await Transaction.create(
            [
                {
                    userId: paymentOrder.userId,
                    type: "credit",
                    amount: paymentOrder.amount,
                    reason: "Wallet Recharge",
                    paymentId: razorpay_payment_id,
                    orderId: razorpay_order_id,
                    status: "success",
                },
            ],
            { session }
        );

        await session.commitTransaction();

        return res.status(200).json({
            success: true,
            message: "Payment verified successfully",
            paymentId: razorpay_payment_id,
        });
    } catch (error) {
        console.error(error);

        if (session?.inTransaction()) {
            await session.abortTransaction();
        }

        return res.status(500).json({
            success: false,
            message: "Payment verification failed",
        });
    } finally {

        if (session) {
            session.endSession();
        }

    }
}
