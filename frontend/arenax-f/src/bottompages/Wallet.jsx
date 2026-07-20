import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaArrowLeft,
    FaWallet,
    FaPlus,
    FaBolt,
} from "react-icons/fa";

function Wallet() {

    const navigate = useNavigate();
    const [selectedAmount, setSelectedAmount] = useState("");
    // ================================
    // TODO: Fetch wallet balance
    // ================================

    const walletBalance = 0;

    // ================================
    // TODO: Fetch quick amounts
    // ================================

    const quickAmounts = [50, 100, 200, 500, 1000, 2000];

    return (

        <div className="min-h-screen bg-[#09090F] text-white pb-28">

            {/* ================= Header ================= */}

            <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#09090F]/80 border-b border-white/10">

                <div className="max-w-5xl mx-auto flex items-center justify-between px-5 py-4">

                    <button
                        onClick={() => navigate(-1)}
                        className="w-11 h-11 rounded-full bg-white/5 border border-white/10 hover:bg-violet-600 duration-300 flex items-center justify-center"
                    >
                        <FaArrowLeft />
                    </button>

                    <h2 className="text-xl font-bold">
                        Wallet
                    </h2>

                    <div className="w-11" />

                </div>

            </header>

            <div className="max-w-5xl mx-auto px-5">

                {/* ================= Wallet Card ================= */}

                <motion.div
                    initial={{ opacity: 0, y: 35 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: .4 }}
                    className="mt-8"
                >

                    <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-violet-700 via-fuchsia-700 to-indigo-800 p-7 shadow-[0_0_45px_rgba(139,92,246,.30)]">

                        {/* Background Blur */}

                        <div className="absolute -top-20 -right-16 w-48 h-48 rounded-full bg-white/10 blur-3xl"></div>

                        <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-pink-400/20 blur-3xl"></div>

                        <div className="relative z-10">

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-white/70 text-sm tracking-widest uppercase">

                                        Available Balance

                                    </p>

                                    <h1 className="text-5xl font-black mt-2">

                                        ₹{walletBalance}

                                    </h1>

                                </div>

                                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-lg flex items-center justify-center border border-white/20">

                                    <FaWallet className="text-3xl text-white" />

                                </div>

                            </div>

                            <div className="mt-10 flex items-center justify-between">

                                <div>

                                    <p className="text-white/60 text-xs uppercase tracking-[3px]">

                                        ArenaX Wallet

                                    </p>

                                    <h3 className="font-semibold mt-1">

                                        Secure Tournament Payments

                                    </h3>

                                </div>

                                <div className="px-4 py-2 rounded-full bg-white/15 border border-white/20 text-sm font-semibold">

                                    Active

                                </div>

                            </div>

                        </div>

                    </div>

                </motion.div>

                {/* ================= Quick Add ================= */}

                <motion.div
                    initial={{ opacity: 0, y: 35 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: .15 }}
                    className="mt-10"
                >

                    <div className="flex items-center justify-between mb-5">

                        <div>

                            <h2 className="text-2xl font-bold">

                                Quick Add

                            </h2>

                            <p className="text-gray-400 text-sm mt-1">

                                Select an amount to add instantly.

                            </p>

                        </div>

                        <FaBolt className="text-yellow-400 text-xl" />

                    </div>

                    <div className="grid grid-cols-3 gap-4">

                        {quickAmounts.map((amount) => (

                            <button
                                key={amount}
                                onClick={() => setSelectedAmount(amount)}
                                className={`rounded-2xl border py-5 transition-all duration-300 group
                                ${Number(selectedAmount) === amount
                                        ? "bg-violet-600 border-violet-500"
                                        : "bg-[#171722] border-white/10 hover:border-violet-500 hover:bg-violet-500/10"
                                    }`}
                            >

                                <FaPlus className="mx-auto text-violet-400 mb-3 group-hover:scale-110 transition-all" />

                                <h3 className="text-xl font-bold">

                                    ₹{amount}

                                </h3>

                            </button>

                        ))}

                    </div>

                </motion.div>

                <div className="mt-5">

                    <input
                        type="number"
                        placeholder="Or Enter Custom Amount"
                        value={selectedAmount}
                        onChange={(e) => setSelectedAmount(e.target.value)}
                        className="w-full h-14 rounded-2xl bg-[#171722] border border-white/10 px-5 outline-none focus:border-violet-500 transition-all"
                    />

                </div>

                {/* ================= Selected Amount ================= */}

                <motion.div
                    initial={{ opacity: 0, y: 35 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: .25 }}
                    className="mt-10"
                >

                    <div className="rounded-3xl bg-[#171722] border border-white/10 p-6">

                        <h2 className="text-xl font-bold">
                            Selected Amount
                        </h2>

                        <p className="text-gray-400 text-sm mt-1">
                            Choose any amount above and continue to payment.
                        </p>

                        <div className="mt-6 flex items-center justify-between">

                            <div>

                                <p className="text-gray-400 text-sm">
                                    Amount
                                </p>

                                {/* TODO: Replace with selected amount */}
                                <h1 className="text-4xl font-black mt-2">
                                    ₹{selectedAmount || 0}
                                </h1>

                            </div>

                            <div className="w-16 h-16 rounded-2xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center">

                                <FaWallet className="text-3xl text-violet-400" />

                            </div>

                        </div>

                    </div>

                </motion.div>

                {/* ================= Proceed Button ================= */}

                <motion.button
                    initial={{ opacity: 0, y: 35 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: .35 }}
                    disabled={!selectedAmount}
                    className={`mt-8 w-full h-16 rounded-2xl font-bold text-lg transition-all duration-300
                     ${selectedAmount
                            ? "bg-linear-to-r from-violet-600 to-fuchsia-600 hover:scale-[1.02]"
                            : "bg-gray-700 cursor-not-allowed"
                        }`}
                >

                    Proceed To Pay

                </motion.button>

                {/* ================= Transactions ================= */}

                <motion.div

                    initial={{ opacity: 0, y: 35 }}

                    animate={{ opacity: 1, y: 0 }}

                    transition={{ delay: .45 }}

                    className="mt-12"

                >

                    <div className="flex items-center justify-between mb-5">

                        <div>

                            <h2 className="text-2xl font-bold">

                                Recent Transactions

                            </h2>

                            <p className="text-gray-400 text-sm mt-1">

                                Your latest wallet activity.

                            </p>

                        </div>

                    </div>

                    {/* ========================================= */}

                    {/* TODO:
             Fetch Transactions From Backend

             if(transactions.length===0)
             show Empty State

          */}

                    {/* ================= Empty State ================= */}

                    <div className="rounded-3xl border border-dashed border-white/10 bg-[#171722] p-12 text-center">

                        <div className="w-20 h-20 rounded-full bg-violet-500/10 flex items-center justify-center mx-auto">

                            <FaWallet className="text-4xl text-violet-400" />

                        </div>

                        <h2 className="text-2xl font-bold mt-6">

                            No Transactions Yet

                        </h2>

                        <p className="text-gray-400 mt-3 max-w-sm mx-auto">

                            Your wallet activity will appear here after adding money
                            or joining tournaments.

                        </p>

                    </div>

                    {/* ================= Transaction Card Example ================= */}

                    {/*
          <div className="space-y-4 mt-6">

            <div className="rounded-2xl bg-[#171722] border border-white/10 p-5 flex justify-between items-center">

              <div>

                <h3 className="font-semibold text-green-400">

                  + ₹200

                </h3>

                <p className="text-gray-400 text-sm">

                  Money Added

                </p>

              </div>

              <span className="text-xs text-gray-500">

                Today

              </span>

            </div>

          </div>
          */}

                </motion.div>

            </div>

        </div>

    );

}

export default Wallet;