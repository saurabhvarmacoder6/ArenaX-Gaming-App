import { motion } from "framer-motion";
import {
    FaWallet,
    FaMoneyBillWave,
    FaClock,
    FaInfoCircle,
} from "react-icons/fa";
import api from "../api/api";
import { useState, useEffect } from "react";

export default function Withdraw() {
    const walletBalance = 2560;
    const [withdrawHistory, setWithdrawHistory] = useState([])
    const [balance, setBalance] = useState()
    const [formData, setFormData] = useState({
        amount: 0,
        upiId: "",
        adminNote: ""
    });

    useEffect(() => {
        handleWithdrawData()
        getBalance()
    }, [])


    async function getBalance() {
        try {
            const { data } = await api.get("/api/auth/balance")
            const objData = data.data
            setBalance(objData.balance)
        } catch (error) {
            console.error(error);
        }

    }


    async function handleWithdrawData() {
        try {
            const { data } = await api.get("/api/payment/getWithdrawData")
            setWithdrawHistory(data.data)
        } catch (error) {
            console.error(error);
        }
    }

    const handleSubmitData = async () => {
        try {
            await api.post("/api/payment/money-withdraw", formData)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="min-h-screen bg-[#0f172a] text-white p-5 pb-40">

            {/* Heading */}

            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 bg-linear-to-r from-slate-800 to-gray-900 p-4 rounded-xl flex flex-col gap-2 justify-center items-center"
            >
                <h1 className="text-3xl font-bold">
                    Withdraw Money
                </h1>

                <p className="text-slate-400 text-center">
                    Withdraw your ArenaX wallet balance directly to your UPI account.
                </p>
            </motion.div>

            {/* Overview Cards */}

            <div className="grid md:grid-cols-3 gap-5">

                {/* Wallet Balance */}

                <div className="rounded-3xl border border-white/10 bg-[#1e293b] p-6">

                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-slate-400 text-sm">
                                Wallet Balance
                            </p>

                            <h2 className="text-3xl font-bold mt-2">
                                ₹{balance}.00
                            </h2>
                        </div>

                        <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
                            <FaWallet className="text-cyan-400 text-2xl" />
                        </div>

                    </div>

                </div>





            </div>

            {/* Rules */}

            <div className="mt-8 rounded-3xl border border-white/10 bg-[#1e293b] p-6">

                <div className="flex items-center gap-3 mb-5">

                    <div className="w-12 h-12 rounded-fullbg-cyan-500/10 flex items-center justify-center">
                        <FaInfoCircle className="text-cyan-400 text-xl" />
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold">
                            Withdrawal Rules
                        </h2>

                        <p className="text-slate-400 font-semibold text-sm">
                            Please read these instructions before requesting a withdrawal.
                        </p>
                    </div>

                </div>

                <ul className="space-y-3 text-slate-300 text-sm font-semibold">

                    <li>
                        • Minimum withdrawal amount is <span className="font-bold text-white">₹30</span>.
                    </li>

                    <li>
                        • Enter a valid UPI ID to receive your payment.
                    </li>

                    <li>
                        • Requests are usually processed within <span className="font-bold text-white">24 hours</span>.
                    </li>

                    <li>
                        • Wallet balance will be deducted only after your withdrawal is successfully processed.
                    </li>

                </ul>

            </div>
            {/* ===========================
                Withdraw Form
                =========================== */}

            <div className="mt-8 rounded-3xl border border-white/10 bg-[#1e293b] p-6">

                <div className="flex items-center gap-4 mb-6">

                    <div className="size-10 rounded-full bg-cyan-500/10 flex items-center justify-center">
                        <FaMoneyBillWave className="text-cyan-400 text-xl" />
                    </div>

                    <div>

                        <h2 className="text-xl font-semibold">
                            Request Withdrawal
                        </h2>

                        <p className="text-slate-400 text-sm">
                            Enter your withdrawal details below.
                        </p>

                    </div>

                </div>

                <form className="space-y-5" onSubmit={handleSubmitData}>

                    {/* Amount */}

                    <div>

                        <label className="block mb-2 text-sm text-slate-300">
                            Withdrawal Amount
                        </label>

                        <input
                            type="number"
                            placeholder="Enter amount"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    amount: e.target.value,
                                })
                            }
                            className="w-full rounded-2xl bg-[#0f172a] border border-white/10 px-4 py-3 outline-none focus:border-cyan-500 transition"
                        />

                    </div>

                    {/* UPI */}

                    <div>

                        <label className="block mb-2 text-sm text-slate-300">
                            UPI ID
                        </label>

                        <input
                            type="text"
                            placeholder="example@upi"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    upiId: e.target.value,
                                })
                            }
                            className="w-full rounded-2xl bg-[#0f172a] border border-white/10 px-4 py-3 outline-none focus:border-cyan-500 transition"
                        />

                    </div>

                    {/* Note */}

                    <div>

                        <label className="block mb-2 text-sm text-slate-300">
                            Note (Optional)
                        </label>

                        <textarea
                            rows={4}
                            placeholder="Write something..."
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    adminNote: e.target.value,
                                })
                            }
                            className="w-full resize-none rounded-2xl bg-[#0f172a] border border-white/10 px-4 py-3 outline-none focus:border-cyan-500 transition"
                        />

                    </div>

                    {/* Info */}

                    <div className="rounded-2xl bg-cyan-500/10 border border-cyan-500/20 p-4">

                        <p className="text-sm text-cyan-300">
                            • Minimum withdrawal amount is <strong>₹50</strong>.
                        </p>

                        <p className="text-sm text-cyan-300 mt-2">
                            • Make sure your UPI ID is correct before submitting.
                        </p>

                    </div>

                    {/* Button */}

                    <button
                        type="submit"
                        className="w-full py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-700 transition font-semibold"
                    >
                        Request Withdrawal
                    </button>

                </form>

            </div>

            {/* ===========================
      Withdrawal History
=========================== */}

            <div className="mt-8 rounded-3xl border border-white/10 bg-[#1e293b] p-6">

                {/* Header */}

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div>

                        <h2 className="text-xl font-semibold">
                            Withdrawal History
                        </h2>

                        <p className="text-slate-400 text-sm mt-1">
                            View all your withdrawal requests.
                        </p>

                    </div>

                    <button className="px-4 py-2 rounded-xl bg-[#0f172a] border border-white/10 hover:border-cyan-500 transition">
                        Refresh
                    </button>

                </div>

                {/* Cards */}

                <div className="mt-6 space-y-5">

                    {withdrawHistory?.length > 0 ? (

                        withdrawHistory.map((item) => (

                            <motion.div
                                key={item._id}
                                whileHover={{ y: -2 }}
                                className="rounded-2xl border border-white/10 bg-[#0f172a] p-5"
                            >

                                <div className="flex justify-between items-start">

                                    <div>

                                        <h2 className="text-2xl font-bold">
                                            ₹{item.amount}
                                        </h2>

                                        <p className="text-slate-400 text-sm mt-1">
                                            Withdrawal Request
                                        </p>

                                    </div>

                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium capitalize
                            ${item.status === "paid"
                                                ? "bg-green-500/20 text-green-400"
                                                : item.status === "pending"
                                                    ? "bg-yellow-500/20 text-yellow-400"
                                                    : "bg-red-500/20 text-red-400"
                                            }`}
                                    >
                                        {item.status}
                                    </span>

                                </div>

                                <div className="border-t border-white/10 mt-5 pt-5 space-y-3">

                                    <div className="flex justify-between text-sm">

                                        <span className="text-slate-400">
                                            UPI ID
                                        </span>

                                        <span className="font-medium">
                                            {item.upiId}
                                        </span>

                                    </div>

                                    <div className="flex justify-between text-sm">

                                        <span className="text-slate-400">
                                            Requested On
                                        </span>

                                        <span>
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </span>

                                    </div>

                                    {item.adminNote && (

                                        <div>

                                            <p className="text-sm text-slate-400 mb-1">
                                                Note
                                            </p>

                                            <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-sm">
                                                {item.adminNote}
                                            </div>

                                        </div>

                                    )}

                                </div>

                            </motion.div>

                        ))

                    ) : (

                        <div className="text-center py-12">

                            <FaMoneyBillWave className="mx-auto text-5xl text-slate-600" />

                            <h3 className="mt-5 text-xl font-semibold">
                                No Withdrawals Yet
                            </h3>

                            <p className="mt-2 text-slate-400">
                                Your withdrawal requests will appear here.
                            </p>

                        </div>

                    )}

                </div>

            </div>
        </div>
    );
}