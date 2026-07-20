import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { IoMdHeartEmpty } from "react-icons/io";
import { useState } from "react";

import {
    FaChevronDown,
    FaChevronUp,
    FaShieldAlt,
    FaCheckCircle,
} from "react-icons/fa";

import {
    FaArrowLeft,
    FaCalendarAlt,
    FaClock,
    FaMapMarkedAlt,
    FaUsers,
    FaCoins,
    FaTrophy,
    FaCrosshairs,
    FaGamepad,
} from "react-icons/fa";


const TournamentDetails = () => {

    const navigate = useNavigate();
    const [showRules, setShowRules] = useState(false);
    const tournament = {
        title: "BR Ranked Solo Cup",
        status: "LIVE",
        banner:
            "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=1400",

        entryFee: 20,
        prizePool: 500,
        perKill: 8,

        date: "25 July 2026",
        time: "8:00 PM",

        map: "Bermuda",

        mode: "Solo",

        joined: 42,

        totalSlots: 50,
    };

    const progress =
        (tournament.joined / tournament.totalSlots) * 100;

    return (

        <div className="min-h-screen bg-[#09090F] text-white pb-24">
            <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-xl border-b border-white/10">

                <div className="max-w-5xl mx-auto flex items-center justify-between px-5 py-4">

                    <button

                        onClick={() => navigate(-1)}

                        className="w-11 h-11 rounded-full bg-white/10 hover:bg-violet-600 duration-300 flex items-center justify-center"

                    >

                        <FaArrowLeft />

                    </button>

                    <h2 className="font-bold text-lg">

                        Tournament Details

                    </h2>

                    <button

                        className="w-11 h-11 rounded-full bg-white/10 hover:bg-red-500 duration-300 flex items-center justify-center"

                    >

                        <IoMdHeartEmpty size={20} />

                    </button>

                </div>

            </header>

            <motion.div

                initial={{ opacity: 0 }}

                animate={{ opacity: 1 }}

                className="relative mt-19"

            >

                <img

                    src={tournament.banner}

                    alt=""

                    className="w-full h-67.5 object-cover"

                />

                <div className="absolute inset-0 bg-linear-to-t from-[#09090F] via-black/40 to-transparent" />

                

            </motion.div>

            <div className="max-w-5xl mx-auto px-5">

                <motion.div

                    initial={{ opacity: 0, y: 25 }}

                    animate={{ opacity: 1, y: 0 }}

                    transition={{ duration: .4 }}

                >

                    <h1 className="text-3xl font-black mt-6">

                        {tournament.title}

                    </h1>

                    <p className="text-gray-400 mt-2">

                        Compete with the best players and dominate the battlefield.

                    </p>

                    <div className="flex gap-3 mt-5">

                        <span className="px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-sm">

                            Battle Royale

                        </span>

                        <span className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-sm">

                            {tournament.mode}

                        </span>

                    </div>

                    <motion.div

                        initial={{ opacity: 0, y: 30 }}

                        animate={{ opacity: 1, y: 0 }}

                        transition={{ delay: .2 }}

                        className="mt-8"

                    >

                        <div className="rounded-3xl bg-[#171722] border border-white/10 overflow-hidden">

                            <div className="px-6 py-6 bg-linear-to-r from-violet-600/20 via-fuchsia-600/10 to-transparent border-b border-white/10">

                                <h2 className="text-2xl font-extrabold tracking-wide">
                                    Tournament Overview
                                </h2>

                                <p className="text-sm text-gray-400 mt-1">
                                    Complete tournament information at a glance.
                                </p>

                            </div>

                            <div className="p-5 space-y-4">

                                <div className="flex justify-between items-center px-6 py-5">

                                    <div className="flex items-center gap-4">

                                        <FaCoins className="text-green-400" />

                                        <span>Entry Fee</span>

                                    </div>

                                    <span className="font-bold text-green-400">

                                        ₹{tournament.entryFee}

                                    </span>

                                </div>

                                <div className="flex justify-between items-center px-6 py-5">

                                    <div className="flex items-center gap-4">

                                        <FaTrophy className="text-yellow-400" />

                                        <span>Prize Pool</span>

                                    </div>

                                    <span className="font-bold text-yellow-400">

                                        ₹{tournament.prizePool}

                                    </span>

                                </div>

                                <div className="flex justify-between items-center px-6 py-5">

                                    <div className="flex items-center gap-4">

                                        <FaCrosshairs className="text-red-400" />

                                        <span>Per Kill Reward</span>

                                    </div>

                                    <span className="font-bold text-red-400">

                                        ₹{tournament.perKill}

                                    </span>

                                </div>

                                <div className="flex justify-between items-center px-6 py-5">

                                    <div className="flex items-center gap-4">

                                        <FaCalendarAlt className="text-violet-400" />

                                        <span>Date</span>

                                    </div>

                                    <span>{tournament.date}</span>

                                </div>

                                <div className="flex justify-between items-center px-6 py-5">

                                    <div className="flex items-center gap-4">

                                        <FaClock className="text-blue-400" />

                                        <span>Time</span>

                                    </div>

                                    <span>{tournament.time}</span>

                                </div>

                                <div className="flex justify-between items-center px-6 py-5">

                                    <div className="flex items-center gap-4">

                                        <FaMapMarkedAlt className="text-orange-400" />

                                        <span>Map</span>

                                    </div>

                                    <span>{tournament.map}</span>

                                </div>

                                <div className="flex justify-between items-center px-6 py-5">

                                    <div className="flex items-center gap-4">

                                        <FaGamepad className="text-cyan-400" />

                                        <span>Mode</span>

                                    </div>

                                    <span>{tournament.mode}</span>

                                </div>

                                <div className="flex justify-between items-center px-6 py-5">

                                    <div className="flex items-center gap-4">

                                        <FaUsers className="text-pink-400" />

                                        <span>Slots</span>

                                    </div>

                                    <span>

                                        {tournament.joined}/{tournament.totalSlots}

                                    </span>

                                </div>

                            </div>

                        </div>

                    </motion.div>

                    {/* ================= Players Joined ================= */}

                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: .3 }}
                        className="mt-8"
                    >

                        <div className="rounded-3xl bg-[#171722] border border-white/10 p-6">

                            <div className="flex justify-between items-center">

                                <h2 className="text-xl font-bold">
                                    Players Joined
                                </h2>

                                <span className="text-violet-400 font-bold">
                                    {tournament.joined}/{tournament.totalSlots}
                                </span>

                            </div>

                            <div className="w-full h-3 bg-white/10 rounded-full mt-6 overflow-hidden">

                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 1 }}
                                    className="h-full rounded-full bg-linear-to-r from-violet-500 to-pink-500"
                                />

                            </div>

                            <p className="text-center text-gray-400 text-sm mt-4">

                                {Math.round(progress)}% Slots Filled

                            </p>

                        </div>

                    </motion.div>

                    {/* ================= Tournament Rules ================= */}

                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: .4 }}
                        className="mt-8 mb-10"
                    >

                        <div className="rounded-3xl bg-[#171722] border border-white/10 overflow-hidden">

                            <button
                                onClick={() => setShowRules(!showRules)}
                                className="w-full px-6 py-5 flex items-center justify-between"
                            >

                                <div className="flex items-center gap-3">

                                    <FaShieldAlt className="text-violet-400 text-xl" />

                                    <h2 className="text-xl font-bold">

                                        Tournament Rules

                                    </h2>

                                </div>

                                {
                                    showRules ?

                                        <FaChevronUp />

                                        :

                                        <FaChevronDown />

                                }

                            </button>

                            {

                                showRules && (

                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        transition={{ duration: .35 }}
                                        className="border-t border-white/10 px-6 py-5"
                                    >

                                        <div className="space-y-5">

                                            <div className="flex gap-3">

                                                <FaCheckCircle className="text-green-400 mt-1 shrink-0" />

                                                <p className="text-gray-300">
                                                    Hacks or third-party tools will result in a permanent ban.
                                                </p>

                                            </div>

                                            <div className="flex gap-3">

                                                <FaCheckCircle className="text-green-400 mt-1 shrink-0" />

                                                <p className="text-gray-300">
                                                    Join the custom room at least 10 minutes before match start.
                                                </p>

                                            </div>

                                            <div className="flex gap-3">

                                                <FaCheckCircle className="text-green-400 mt-1 shrink-0" />

                                                <p className="text-gray-300">
                                                    Internet or device issues are the player's responsibility.
                                                </p>

                                            </div>

                                            <div className="flex gap-3">

                                                <FaCheckCircle className="text-green-400 mt-1 shrink-0" />

                                                <p className="text-gray-300">
                                                    Do not share Room ID or Password with other players.
                                                </p>

                                            </div>

                                            <div className="flex gap-3">

                                                <FaCheckCircle className="text-green-400 mt-1 shrink-0" />

                                                <p className="text-gray-300">
                                                    Respect all players and tournament admins during the match.
                                                </p>

                                            </div>

                                            <div className="flex gap-3">

                                                <FaCheckCircle className="text-green-400 mt-1 shrink-0" />

                                                <p className="text-gray-300">
                                                    ArenaX administration reserves the right to make the final decision.
                                                </p>

                                            </div>

                                        </div>

                                    </motion.div>

                                )

                            }

                        </div>

                    </motion.div>

                </motion.div>

            </div>

        </div>

    );

};

export default TournamentDetails;