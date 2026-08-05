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

const TournamentDetails = () => {
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
        <div className="min-h-screen bg-[#09090F] text-white pb-28">

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

            <div className="px-5 -mt-14 relative z-20">

                <motion.div

                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}

                    className="rounded-3xl
        bg-[#171722]
        border border-white/10
        overflow-hidden"

                >

                    {/* Top */}

                    <div className="p-6 border-b border-white/10">

                        <div className="flex justify-between gap-4 items-start">

                            <div>

                                <h1 className="text-2xl font-black">

                                    {tournamentDetail.title}

                                </h1>

                                <p className="text-gray-400 mt-1">

                                    Compete with the best players.

                                </p>

                            </div>

                        </div>

                        <div className="flex gap-3 mt-5">

                            <span className="px-6 py-2 text-sm font-semibold rounded-full bg-red-700 text-white">

                                {tournamentDetail.mode}

                            </span>

                            <span className="px-6 py-2 text-sm font-semibold rounded-full bg-blue-700 text-white">

                                {tournamentDetail.type}

                            </span>



                        </div>
                    </div>

                    

                    {/* ================= GRID ================= */}

                    <div className="grid grid-cols-2">

                        <div className="border-r border-b border-white/10 p-5">

                            <p className="text-gray-400 text-sm">
                                Entry Fee
                            </p>

                            <h2 className="text-2xl font-bold text-green-400 mt-2">

                                ₹{tournamentDetail.entryFee}

                            </h2>

                        </div>

                        <div className="border-b border-white/10 p-5">

                            <p className="text-gray-400 text-sm">

                                Per Kill

                            </p>

                            <h2 className="text-2xl font-bold text-red-400 mt-2">

                                ₹{tournamentDetail.perKill}

                            </h2>

                        </div>

                        <div className="border-r border-b border-white/10 p-5">

                            <p className="text-gray-400 text-sm">

                                Prize Pool

                            </p>

                            <h2 className="text-2xl font-bold text-yellow-400 mt-2">

                                ₹{tournamentDetail.prizePool}

                            </h2>

                        </div>

                        <div className="border-b border-white/10 p-5">

                            <p className="text-gray-400 text-sm">

                                Players

                            </p>

                            <h2 className="text-2xl font-bold mt-2">

                                {tournamentDetail.joinedPlayers}/{tournamentDetail.totalSlots}

                            </h2>

                        </div>

                        <div className="border-r border-b border-white/10 p-5">

                            <p className="text-gray-400 text-sm">

                                Date

                            </p>

                            <h2 className="font-bold mt-2">

                                {new Date(
                                    tournamentDetail.matchDate
                                ).toLocaleDateString("en-IN")}

                            </h2>

                        </div>

                        <div className="border-b border-white/10 p-5">

                            <p className="text-gray-400 text-sm">

                                Time

                            </p>

                            <h2 className="font-bold mt-2">

                                {tournamentDetail.matchTime}

                            </h2>

                        </div>

                        <div className="border-r border-white/10 p-5">

                            <p className="text-gray-400 text-sm">

                                Map

                            </p>

                            <h2 className="font-bold mt-2">

                                {tournamentDetail?.map}

                            </h2>

                        </div>

                        <div className="p-5">

                            <p className="text-gray-400 text-sm">

                                Slots Left

                            </p>

                            <h2 className="font-bold mt-2 text-violet-400">
                                {slotsLeft}
                            </h2>

                        </div>

                    </div>

                    {/* ================= PROGRESS ================= */}

                    <div className="p-6 border-t border-white/10">

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

export default TournamentDetails;