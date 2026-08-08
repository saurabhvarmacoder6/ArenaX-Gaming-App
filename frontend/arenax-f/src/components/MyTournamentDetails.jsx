import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";

import { IoMdHeartEmpty } from "react-icons/io";
import { useEffect, useState } from "react";
import banner from "../img/detail.png";


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
import api from "../api/api";

const MyTournamentDetails = () => {
    const { id } = useParams()

    const navigate = useNavigate();
    const [showRules, setShowRules] = useState(false);
    const [tournamentDetail, setTournamentDetail] = useState({});

    useEffect(() => {
        fetchTournamentDetail();
    }, []);

    async function fetchTournamentDetail() {
        try {
            const { data } = await api.get(`/api/auth/tournament/${id}`);
            setTournamentDetail(data.tournament);

        } catch (err) {
            console.log(err);
        }
    }

    const progress = tournamentDetail.totalSlots
        ? (tournamentDetail.joinedPlayers / tournamentDetail.totalSlots) * 100
        : 0;

    const totalSlots = tournamentDetail.totalSlots ?? 0;
    const joinedPlayers = tournamentDetail.joinedPlayers ?? 0;
    const slotsLeft = totalSlots - joinedPlayers;


    return (
        <div className="min-h-screen bg-[#09090F] text-white pb-28 w-full">

            {/* ================= HEADER ================= */}

            <header className="sticky top-0 z-50 bg-[#09090F]/80 backdrop-blur-xl border-b border-white/10">

                <div className="flex items-center justify-between px-5 py-4">

                    <button
                        onClick={() => navigate(-1)}
                        className="w-11 h-11 rounded-full bg-[#171722] border border-white/10 flex items-center justify-center"
                    >
                        <FaArrowLeft />
                    </button>

                    <h2 className="font-bold text-lg">
                        Tournament Details
                    </h2>

                    <button
                        className="w-11 h-11 rounded-full bg-[#171722] border border-white/10 flex items-center justify-center"
                    >
                        <IoMdHeartEmpty />
                    </button>

                </div>

            </header>

            {/* ================= BANNER ================= */}

            <div className="relative h-56">

                <img
                    src={banner}
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-linear-to-t from-[#09090F] via-black/30 to-transparent" />

            </div>

            {/* ================= MAIN CARD ================= */}

            <div className="px-6 -mt-14 relative z-20">

                <motion.div

                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}

                    className="rounded-3xl
        bg-[#171722]
        border border-white/10
        overflow-hidden"

                >

                    {/* Top */}

                    <div className="px-2 py-6 border-b border-white/10">

                        <div className="flex px-2 justify-between gap-4 items-start">

                            <div>

                                <h1 className="text-2xl font-black">

                                    {tournamentDetail.title}

                                </h1>

                                <p className="text-gray-400 mt-1">

                                    Compete with the best players.

                                </p>

                            </div>

                        </div>

                        <div className="flex gap-2 mt-5 ">

                            <span className="px-6 py-2 text-sm font-semibold rounded-full bg-black text-purple-600 border border-purple-600">

                                {tournamentDetail.mode}

                            </span>

                            <span className="px-6 py-2 text-sm font-semibold rounded-full bg-black text-purple-600 border border-purple-600">

                                {tournamentDetail.type}

                            </span>
                            <span className="px-6 py-2 text-sm font-semibold rounded-full bg-black text-purple-600 border border-purple-600">

                                {tournamentDetail?.map}

                            </span>


                        </div>
                    </div>

                    <div className="flex ">
                        <button
                            onClick={() => navigate(`/join-player-name/${tournamentDetail._id}`)}
                            className="px-6 py-2 w-full text-sm font-bold bg-black text-slate-600 border border-slate-600">

                            Joined Players

                        </button>

                        <button
                            onClick={() => navigate(`/match-history/${tournamentDetail._id}`)}
                            className="px-6 py-2 w-full text-sm font-semibold bg-black text-slate-600 border border-slate-600">

                            Match History

                        </button>
                    </div>

                    {/* ================= GRID ================= */}

                    <div className="grid grid-cols-3">

                        <div className="border border-white/10 p-4 flex flex-col justify-center items-center gap-1">

                            <p className="text-gray-400 font-bold text-sm">
                                Entry Fee
                            </p>

                            <h2 className="text-xl font-bold text-white">

                                ₹{tournamentDetail.entryFee}

                            </h2>

                        </div>

                        <div className="border border-white/10 p-4 flex flex-col justify-center items-center gap-1">

                            <p className="text-gray-400 font-bold text-sm">

                                Per Kill

                            </p>

                            <h2 className="text-xl font-bold text-white ">

                                ₹{tournamentDetail.perKill}

                            </h2>

                        </div>

                        <div className="border border-white/10 p-4 flex flex-col justify-center items-center gap-1">

                            <p className="text-gray-400 font-bold text-sm">

                                Prize Pool

                            </p>

                            <h2 className="text-xl font-bold text-white ">

                                ₹{tournamentDetail.prizePool}

                            </h2>

                        </div>

                        <div className="border border-white/10 p-4 flex flex-col justify-center items-center gap-1">

                            <p className="text-gray-400 font-bold text-sm">

                                Players

                            </p>

                            <h2 className="text-xl font-bold ">

                                {tournamentDetail.joinedPlayers}/{tournamentDetail.totalSlots}

                            </h2>

                        </div>

                        <div className="border border-white/10 p-4 flex flex-col justify-center items-center gap-1">

                            <p className="text-gray-400 font-bold text-sm">

                                Date

                            </p>

                            <h2 className="font-bold ">

                                {new Date(
                                    tournamentDetail.matchDate
                                ).toLocaleDateString("en-IN")}

                            </h2>

                        </div>

                        <div className="border border-white/10 p-4 flex flex-col justify-center items-center gap-1">

                            <p className="text-gray-400 font-bold text-sm">

                                Time

                            </p>

                            <h2 className="font-bold ">

                                {tournamentDetail.matchTime}

                            </h2>

                        </div>

                    </div>

                    {/* ================= PROGRESS ================= */}

                    <div className="p-6 border border-white/10">

                        <div className="flex justify-between mb-3">

                            <span>

                                Slots Filled

                            </span>

                            <span>

                                {Math.floor(progress)}%

                            </span>

                        </div>

                        <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">

                            <motion.div

                                initial={{ width: 0 }}

                                animate={{
                                    width: `${progress}%`
                                }}

                                transition={{ duration: 1 }}

                                className="h-full rounded-full bg-linear-to-r from-violet-600 to-fuchsia-600"

                            />

                        </div>

                        <p className="text-center text-gray-400 text-sm mt-4">

                            {slotsLeft}

                            {" "}Slots Available

                        </p>

                    </div>

                </motion.div>
                {/* ================= ROOM DETAILS ================= */}

                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: .3 }}
                    className="mt-8"
                >

                    <div className="rounded-3xl overflow-hidden border border-white/10 bg-[#171722]">

                        <div className="grid grid-cols-2">

                            <div className="p-6 border-r border-white/10 text-center">

                                <p className="text-gray-400 text-sm">
                                    Room ID
                                </p>

                                <h2 className="text-lg font-bold mt-3 text-violet-400">

                                    {tournamentDetail.status === "Live"
                                        ? tournamentDetail.roomId || "Not Available"
                                        : "Hidden"}

                                </h2>

                            </div>

                            <div className="p-6 text-center">

                                <p className="text-gray-400 text-sm">
                                    Password
                                </p>

                                <h2 className="text-lg font-bold mt-3 text-violet-400">

                                    {tournamentDetail.status === "Live"
                                        ? tournamentDetail.roomPassword || "Not Available"
                                        : "Hidden"}

                                </h2>

                            </div>

                        </div>

                    </div>

                </motion.div>

                {/* ================= RULES ================= */}

                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: .4 }}
                    className="mt-8 mb-28"
                >

                    <div className="rounded-3xl bg-[#171722] border border-white/10 overflow-hidden">

                        <button

                            onClick={() => setShowRules(!showRules)}

                            className="w-full flex justify-between items-center px-6 py-5"

                        >

                            <h2 className="text-xl font-bold">

                                Tournament Rules

                            </h2>

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

                                    className="border-t border-white/10"

                                >

                                    <div className="space-y-5 p-6">

                                        {[
                                            "Join the room at least 10 minutes before the match starts.",
                                            "Hacks, scripts or cheats are strictly prohibited.",
                                            "Room ID & Password will be visible before match start.",
                                            "Internet or device issues are the player's responsibility.",
                                            "Sharing Room ID with outsiders will result in disqualification.",
                                            "ArenaX Admin's decision will be final."
                                        ].map((rule, index) => (

                                            <div
                                                key={index}
                                                className="flex gap-4 items-start"
                                            >

                                                <div className="w-7 h-7 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center text-sm font-bold">

                                                    {index + 1}

                                                </div>

                                                <p className="text-gray-300 leading-7">

                                                    {rule}

                                                </p>

                                            </div>

                                        ))}

                                    </div>

                                </motion.div>

                            )

                        }

                    </div>

                </motion.div>

            </div>

        </div>

    );
};

export default MyTournamentDetails;