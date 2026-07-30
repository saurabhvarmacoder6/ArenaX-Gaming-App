import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { RiSecurePaymentFill } from "react-icons/ri";
import { MdSecurity } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import api from "../api/api";

import {
    FaArrowLeft,
    FaWallet,
    FaLock,
    FaIndianRupeeSign,
} from "react-icons/fa6";
import { useState } from "react";

const Wallet = () => {

    const [amount, setAmount] = useState(0);

    const handlePayment = async () => {
        try {
            const { data } = await api.post("/payment/create-order", {
                amount,
            });

            console.log(data);

        } catch (error) {
            console.log(error);
        }
    };

    const transactions = [
        {
            id: 1,
            type: "Deposit",
            amount: 500,
            status: "Success",
            date: "25 Jul 2026",
        },
        {
            id: 2,
            type: "Withdraw",
            amount: 300,
            status: "Pending",
            date: "24 Jul 2026",
        },
        {
            id: 3,
            type: "Deposit",
            amount: 1000,
            status: "Success",
            date: "22 Jul 2026",
        },
    ];
    const navigate = useNavigate();

    const walletBalance = 0;

    return (
        <div className="min-h-screen bg-[#0F0F17] text-white">

            {/* Header */}

            <div className="sticky top-0 z-50 bg-[#0F0F17]/80 backdrop-blur-xl border-b border-white/10">

                <div className="max-w-md mx-auto px-5 py-4 flex items-center gap-4">

                    <button
                        onClick={() => navigate(-1)}
                        className="w-11 h-11 rounded-full bg-[#171722] border border-white/10 flex items-center justify-center active:scale-95"
                    >
                        <FaArrowLeft />
                    </button>

                    <div>

                        <h1 className="text-xl font-bold">
                            Wallet
                        </h1>

                        <p className="text-xs text-gray-400">
                            Manage your wallet securely
                        </p>

                    </div>

                </div>

            </div>

            <div className="max-w-md mx-auto px-5 py-6 space-y-6">

                {/* Wallet Card */}

                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: .5 }}
                    className="relative overflow-hidden rounded-3xl bg-linear-to-br from-violet-600 via-fuchsia-600 to-indigo-700 p-6 shadow-2xl shadow-violet-700/30"
                >

                    <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/10 blur-3xl"></div>

                    <div className="flex justify-between items-start">

                        <div>

                            <div className="flex items-center gap-2 text-white/80">

                                <FaWallet />

                                <span className="text-sm">
                                    Wallet Balance
                                </span>

                            </div>

                            <h2 className="text-4xl font-extrabold mt-4">

                                ₹ {walletBalance.toFixed(2)}

                            </h2>

                        </div>

                        <div className="flex flex-col gap-2">

                            <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-200 text-xs font-medium flex items-center gap-2">

                                <FaCheckCircle size={12} />

                                Verified

                            </span>

                            <span className="px-3 py-1 rounded-full bg-white/15 text-white text-xs">

                                Active

                            </span>

                        </div>

                    </div>

                    <div className="mt-8 pt-5 border-t border-white/20 flex items-center gap-3">

                        <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">

                            <FaLock />

                        </div>

                        <div>

                            <h3 className="font-semibold">

                                End-to-End Encrypted

                            </h3>

                            <p className="text-xs text-white/70">

                                Your wallet is protected with secure encryption.

                            </p>

                        </div>

                    </div>

                </motion.div>

                {/* Add Money */}

                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: .15 }}
                    className="rounded-3xl bg-[#171722] border border-white/10 p-5"
                >

                    <h2 className="text-lg font-semibold">

                        Add Money

                    </h2>

                    <p className="text-sm text-gray-400 mt-1">

                        Enter the amount you want to add.

                    </p>

                    <div className="mt-6 relative">

                        <FaIndianRupeeSign
                            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="number"
                            placeholder="Enter Amount"
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-5 text-2xl font-semibold outline-none focus:border-violet-500 transition"
                        />

                    </div>

                    <div className="flex justify-between mt-3 text-xs text-gray-400">

                        <span>Min ₹10</span>

                        <span>Max ₹10,000</span>

                    </div>

                    <button
                        onClick={handlePayment}
                        className="mt-6 w-full py-4 rounded-2xl bg-linear-to-r from-violet-600 via-fuchsia-600 to-indigo-600 font-semibold shadow-lg shadow-violet-600/30 active:scale-[0.98] transition"
                    >

                        Add Money

                    </button>

                </motion.div>

                {/* Withdraw Card */}

                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: .4 }}
                    className="rounded-3xl bg-[#171722] border border-white/10 p-5"
                >
                    <div className="flex items-center gap-4 justify-between">

                        <div>

                            <h2 className="text-lg font-semibold">
                                Withdraw Money
                            </h2>

                            <p className="text-sm text-gray-400 mt-1">
                                Transfer your winnings directly to your bank account.
                            </p>

                        </div>

                        <div className=" flex items-center justify-center">

                            <FaMoneyBillTransfer
                                className="text-violet-400 text-2xl"
                            />

                        </div>

                    </div>

                    <button
                        className="mt-6 w-full py-4 rounded-2xl border border-violet-500/30 bg-violet-500/10 hover:bg-violet-500/20 transition font-semibold"
                    >
                        Withdraw Now
                    </button>

                </motion.div>

                {/* Security Card */}

                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: .1 }}
                    className="rounded-3xl bg-[#171722] border border-white/10 p-5"
                >

                    <div className="flex items-center gap-3">

                        <div className="w-12 h-12 rounded-xl bg-green-500/15 flex items-center justify-center">

                            <RiSecurePaymentFill
                                className="text-green-400 text-2xl"
                            />

                        </div>

                        <div>

                            <h2 className="font-semibold">
                                Secure Payments
                            </h2>

                            <p className="text-xs text-gray-400">
                                Your wallet is fully protected.
                            </p>

                        </div>

                    </div>

                    <div className="mt-6 space-y-4">

                        {[
                            "End-to-End Encryption",
                            "Razorpay Secured Payment",
                            "Instant Wallet Credit",
                            "Fast Withdraw Processing",
                        ].map((item) => (

                            <div
                                key={item}
                                className="flex items-center gap-3"
                            >

                                <div className="w-8 h-8 rounded-full bg-green-500/15 flex items-center justify-center">

                                    <MdSecurity className="text-green-400" />

                                </div>

                                <span className="text-sm text-gray-300">
                                    {item}
                                </span>

                            </div>

                        ))}

                    </div>

                </motion.div>
                {/* Payment History */}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-3xl bg-[#171722] border border-white/10 p-5 mb-30"
                >

                    <div className="flex items-center justify-between">

                        <h2 className="text-lg font-semibold">
                            Payment History
                        </h2>

                        <span className="text-xs text-gray-400">
                            {transactions.length} Transactions
                        </span>

                    </div>

                    <div className="mt-5 space-y-4">

                        {transactions ? transactions.map((item) => (

                            <div
                                key={item.id}
                                className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-4"
                            >

                                <div className="flex items-center gap-4">

                                    <div
                                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.type === "Deposit"
                                            ? "bg-green-500/15"
                                            : "bg-red-500/15"
                                            }`}
                                    >

                                        {item.type === "Deposit" ? (
                                            <FaArrowDown className="text-green-400" />
                                        ) : (
                                            <FaArrowUp className="text-red-400" />
                                        )}

                                    </div>

                                    <div>

                                        <h3 className="font-medium">
                                            {item.type}
                                        </h3>

                                        <p className="text-xs text-gray-400">
                                            {item.date}
                                        </p>

                                    </div>

                                </div>

                                <div className="text-right">

                                    <h3
                                        className={`font-semibold ${item.type === "Deposit"
                                            ? "text-green-400"
                                            : "text-red-400"
                                            }`}
                                    >
                                        {item.type === "Deposit" ? "+" : "-"}₹{item.amount}
                                    </h3>

                                    <span
                                        className={`text-xs px-2 py-1 rounded-full ${item.status === "Success"
                                            ? "bg-green-500/15 text-green-400"
                                            : "bg-yellow-500/15 text-yellow-400"
                                            }`}
                                    >
                                        {item.status}
                                    </span>

                                </div>

                            </div>

                        )) : <div className="text-center py-10">

                            <p className="text-gray-400">
                                No payment history found.
                            </p>

                        </div>}

                    </div>

                </motion.div>

            </div>

        </div>
    );
};

export default Wallet;