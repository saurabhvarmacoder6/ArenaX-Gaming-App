import { motion } from "framer-motion";
import {
    FaWallet,
    FaMoneyBillWave,
    FaClock,
    FaUniversity,
    FaInfoCircle,
} from "react-icons/fa";
import api from "../api/api";
import { useState, useEffect } from "react";
import { showError, showSuccess } from "../utils/toast";

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

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
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
            const { data } = await api.post("/api/payment/money-withdraw", formData)
            showSuccess(data.msg)
        } catch (error) {
            showError(error)
        }
    }

    return (
        <div className="min-h-screen bg-[#0B0B14] px-5 pt-6 pb-32 text-white">

            {/* ================= Header ================= */}

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
            >

                <h1 className="text-4xl font-extrabold">
                    Withdraw
                </h1>

                <p className="text-gray-400 mt-3 font-bold">
                    Transfer your ArenaX earnings directly
                    to your UPI account.
                </p>

            </motion.div>

            {/* ================= Wallet Card ================= */}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: .1 }}
                className="rounded-3xl
    bg-[#171722]
    border border-white/10
    p-6
    flex
    justify-between
    items-center"
            >

                <div>

                    <p className="text-gray-400 font-bold">
                        Wallet Balance
                    </p>

                    <h2 className="text-4xl font-bold mt-2">
                        ₹{balance}
                    </h2>

                    <p className="text-green-400 mt-2 text-sm font-semibold">
                        Available to Withdraw
                    </p>

                </div>

                <div
                    className="
      w-16
      h-16
      rounded-2xl
      bg-cyan-500/15
      flex
      items-center
      justify-center
      "
                >
                    <FaWallet
                        className="text-cyan-400"
                        size={28}
                    />
                </div>

            </motion.div>

            {/* ================= Withdraw Form ================= */}

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: .2 }}
                className="mt-8
    rounded-3xl
    bg-[#171722]
    border border-white/10
    p-6"
            >

                <div className="flex items-center gap-3">

                    <div
                        className="
        w-12
        h-12
        rounded-xl
        bg-violet-500/20
        flex
        items-center
        justify-center
        "
                    >
                        <FaMoneyBillWave
                            className="text-violet-400"
                        />
                    </div>

                    <div>

                        <h2 className="text-2xl font-bold">
                            Withdraw Request
                        </h2>

                        <p className="text-gray-400 text-sm font-semibold">
                            Enter withdrawal details
                        </p>

                    </div>

                </div>

                {/* Amount */}

                <div className="mt-8">

                    <label className="text-gray-300 font-semibold">
                        Withdrawal Amount
                    </label>

                    <input
                        type="text"
                        name="amount"
                        value={formData.amount}
                        onChange={(e) => {
                            let value = e.target.value;

                            // Sirf numbers allow
                            if (!/^\d*$/.test(value)) return;

                            // Leading zero remove (0 ko allow karega)
                            if (value.length > 1 && value.startsWith("0")) {
                                value = value.replace(/^0+/, "");
                            }

                            setFormData({
                                ...formData,
                                amount: value,
                            });
                        }}
                        placeholder="Enter Amount"
                        className="
    mt-3
    w-full
    rounded-2xl
    bg-[#09090F]
    border border-white/10
    px-5
    py-4
    outline-none
    focus:border-violet-500
  "
                    />

                </div>

                {/* UPI */}

                <div className="mt-6">

                    <label className="text-gray-300 font-semibold">
                        UPI ID
                    </label>

                    <input
                        type="text"
                        name="upiId"
                        value={formData.upiId}
                        onChange={handleChange}
                        placeholder="example@upi"
                        className="
        mt-3
        w-full
        rounded-2xl
        bg-[#09090F]
        border
        border-white/10
        px-5
        py-4
        outline-none
        focus:border-violet-500
        "
                    />

                </div>

                {/* Note */}

                <div className="mt-6">

                    <label className="text-gray-300 font-semibold">
                        Note (Optional)
                    </label>

                    <textarea
                        rows={4}
                        name="note"
                        value={formData.note}
                        onChange={handleChange}
                        placeholder="Write something..."
                        className="
        mt-3
        w-full
        rounded-2xl
        bg-[#09090F]
        border
        border-white/10
        px-5
        py-4
        outline-none
        resize-none
        focus:border-violet-500
        "
                    />

                </div>

                {/* Withdraw */}

                <button
                    onClick={handleSubmitData}
                    className="
      mt-8
      w-full
      py-4
      rounded-2xl
      bg-linear-to-r
      from-violet-600
      to-fuchsia-600
      font-bold
      text-lg
      hover:opacity-90
      transition
      "
                >
                    Withdraw Now
                </button>

            </motion.div>

            {/* ================= Rules ================= */}

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: .3 }}
                className="
    mt-8
    rounded-3xl
    bg-[#171722]
    border
    border-white/10
    p-6"
            >

                <div className="flex gap-3 items-center">

                    <FaInfoCircle
                        className="text-cyan-400"
                        size={22}
                    />

                    <h2 className="text-xl font-bold">
                        Withdrawal Rules
                    </h2>

                </div>

                <ul className="mt-5 space-y-3 text-gray-300 text-sm font-bold">

                    <li>• Minimum withdrawal amount is ₹30.</li>

                    <li>• Enter a valid UPI ID.</li>

                    <li>• Payment will be processed within 24 hours.</li>

                    <li>• Balance will be deducted after approval.</li>

                </ul>

            </motion.div>

            {/* ===========================
    WITHDRAW HISTORY
=========================== */}

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: .4 }}
                className="mt-8"
            >

                <div className="flex items-center justify-between mb-5">

                    <h2 className="text-2xl font-bold">
                        Withdrawal History
                    </h2>

                    <span className="text-sm text-gray-400">
                        {withdrawHistory?.length || 0} Requests
                    </span>

                </div>

                {
                    withdrawHistory?.length > 0 ? (

                        <div className="space-y-4">

                            {withdrawHistory.map((item) => (

                                <motion.div
                                    key={item._id}
                                    whileHover={{ scale: 1.01 }}
                                    className="
            rounded-3xl
            bg-[#171722]
            border
            border-white/10
            p-5"
                                >

                                    {/* Amount */}

                                    <div className="flex justify-between items-center">

                                        <div>

                                            <p className="text-gray-400 text-sm font-bold">
                                                Withdrawal Amount
                                            </p>

                                            <h2 className="text-3xl font-bold mt-1">
                                                ₹{item.amount}
                                            </h2>

                                        </div>

                                        <div>

                                            {
                                                item.status === "pending" ? (

                                                    <span className="
                    px-4
                    py-2
                    rounded-full
                    bg-yellow-500/15
                    text-yellow-400
                    text-sm
                    font-semibold">

                                                        Pending

                                                    </span>

                                                ) : item.status === "paid" ? (

                                                    <span className="
                    px-4
                    py-2
                    rounded-full
                    bg-green-500/15
                    text-green-400
                    text-sm
                    font-semibold">

                                                        Paid

                                                    </span>

                                                ) : (

                                                    <span className="
                    px-4
                    py-2
                    rounded-full
                    bg-red-500/15
                    text-red-400
                    text-sm
                    font-semibold">

                                                        Rejected

                                                    </span>

                                                )
                                            }

                                        </div>

                                    </div>

                                    {/* Divider */}

                                    <div className="h-px bg-white/10 my-5"></div>

                                    {/* Details */}

                                    <div className="space-y-3 text-sm">

                                        <div className="flex justify-between gap-2">

                                            <span className="text-gray-400 font-bold">
                                                UPI ID
                                            </span>

                                            <span className="font-semibold ">
                                                {item.upiId}
                                            </span>

                                        </div>

                                        <div className="flex justify-between">

                                            <span className="text-gray-400 font-bold">
                                                Date
                                            </span>

                                            <span className="font-semibold">

                                                {new Date(item.createdAt).toLocaleDateString("en-IN")}

                                            </span>

                                        </div>

                                        {
                                            item.note && (

                                                <div className="flex justify-between">

                                                    <span className="text-gray-400">
                                                        Note
                                                    </span>

                                                    <span className="text-right font-semibold max-w-45">
                                                        {item.note}
                                                    </span>

                                                </div>

                                            )
                                        }

                                    </div>

                                </motion.div>

                            ))}

                        </div>

                    ) : (

                        <div
                            className="
        rounded-3xl
        bg-[#171722]
        border
        border-dashed
        border-white/10
        py-16
        text-center"
                        >

                            <div className="text-6xl">
                                💸
                            </div>

                            <h2 className="text-2xl font-bold mt-5">

                                No Withdrawals Yet

                            </h2>

                            <p className="text-gray-400 mt-3">

                                Your withdrawal requests
                                will appear here.

                            </p>

                        </div>

                    )
                }

            </motion.div>

        </div>
    );
}