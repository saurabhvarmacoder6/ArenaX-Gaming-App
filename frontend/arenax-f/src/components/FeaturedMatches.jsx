import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
    FaFire,
    FaUsers,
    FaTrophy,
    FaArrowRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
export default function FeaturedMatches() {

    const navigate = useNavigate();
    const [tournaments, setTournaments] = useState([])

    useEffect(()=>{
        fetchTournaments()
    },[])

    // Sirf upcoming/live matches
    const featuredMatches = tournaments
        .filter(
            (item) =>
                item.status === "Upcoming" ||
                item.status === "Live"
        )
        .slice(0, 3);

    async function fetchTournaments() {
        try {
            const { data } = await api.get(`/api/auth/tournaments`);
            setTournaments(data.tournaments);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <section className="px-4 mt-8 mb-32">

            {/* ================= HEADER ================= */}

            <div className="flex items-end justify-between mb-4">

                <div>

                    <div className="flex items-center gap-2">

                        <FaFire className="text-orange-500 text-lg" />

                        <h2 className="text-xl font-bold text-white">
                            Featured Matches
                        </h2>

                    </div>

                    <p className="text-gray-500 text-xs mt-1">
                        Don't miss the next battle
                    </p>

                </div>

                <button
                    onClick={() => navigate("/br")}
                    className="
                        flex
                        items-center
                        gap-1
                        text-xs
                        font-semibold
                        text-violet-400
                        hover:text-violet-300
                        transition
                    "
                >
                    View All
                    <FaArrowRight className="text-[10px]" />
                </button>

            </div>


            {/* ================= EMPTY STATE ================= */}

            {featuredMatches.length === 0 ? (

                <div
                    className="
                        rounded-2xl
                        border
                        border-white/10
                        bg-[#111118]
                        px-5
                        py-8
                        text-center
                    "
                >

                    <div
                        className="
                            w-12
                            h-12
                            mx-auto
                            rounded-2xl
                            bg-violet-500/10
                            border
                            border-violet-500/20
                            flex
                            items-center
                            justify-center
                        "
                    >
                        <FaTrophy className="text-violet-400 text-xl" />
                    </div>

                    <h3 className="text-white font-semibold mt-4">
                        New Battles Coming Soon
                    </h3>

                    <p className="text-gray-500 text-xs mt-1">
                        Stay ready for the next tournament.
                    </p>

                </div>

            ) : (

                /* ================= MATCH LIST ================= */

                <div className="space-y-3">

                    {featuredMatches.map((tournament, index) => (

                        <motion.div
                            key={tournament._id}
                            initial={{
                                opacity: 0,
                                y: 15,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                delay: index * 0.08,
                            }}
                            whileTap={{
                                scale: 0.98,
                            }}
                            onClick={() =>
                                navigate(
                                    `/detail/${tournament._id}`
                                )
                            }
                            className="
                                relative
                                overflow-hidden
                                rounded-2xl
                                border
                                border-white/10
                                bg-[#14141d]
                                cursor-pointer
                                group
                            "
                        >

                            {/* TOP ACCENT */}

                            <div
                                className="
                                    absolute
                                    top-0
                                    left-0
                                    right-0
                                    h-0.5
                                    bg-linear-to-r
                                    from-violet-600
                                    via-fuchsia-500
                                    to-cyan-400
                                "
                            />

                            <div className="p-4">

                                {/* TOP */}

                                <div className="flex justify-between">

                                    <div>

                                        <span
                                            className={`
                                                inline-flex
                                                px-2
                                                py-1
                                                rounded-md
                                                text-[9px]
                                                font-bold
                                                uppercase
                                                tracking-wide

                                                ${tournament.status === "Live"
                                                    ? "bg-red-500/15 text-red-400"
                                                    : "bg-emerald-500/15 text-emerald-400"
                                                }
                                            `}
                                        >
                                            {tournament.status}
                                        </span>

                                        <h3 className="
                                            text-white
                                            font-bold
                                            text-base
                                            mt-2
                                        ">
                                            {tournament.title}
                                        </h3>

                                    </div>

                                    <div
                                        className="
                                            w-9
                                            h-9
                                            rounded-xl
                                            bg-violet-500/10
                                            flex
                                            items-center
                                            justify-center
                                        "
                                    >
                                        <FaTrophy className="text-violet-400 text-sm" />
                                    </div>

                                </div>


                                {/* INFO */}

                                <div className="
                                    flex
                                    items-center
                                    justify-between
                                    mt-4
                                    text-[11px]
                                    text-gray-400
                                ">

                                    <span>
                                        🎮 {tournament.type}
                                    </span>

                                    <span>
                                        💰 ₹{tournament.entryFee}
                                    </span>

                                    <span className="flex items-center gap-1">
                                        <FaUsers />
                                        {tournament.joinedPlayers}/
                                        {tournament.totalSlots}
                                    </span>

                                </div>


                                {/* BOTTOM */}

                                <div
                                    className="
                                        flex
                                        justify-between
                                        items-center
                                        mt-4
                                        pt-3
                                        border-t
                                        border-white/5
                                    "
                                >

                                    <div>

                                        <p className="text-[9px] text-gray-500">
                                            Prize Pool
                                        </p>

                                        <p className="
                                            text-sm
                                            font-bold
                                            text-emerald-400
                                        ">
                                            ₹{tournament.prizePool}
                                        </p>

                                    </div>


                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-2
                                            text-xs
                                            font-semibold
                                            text-violet-400
                                            group-hover:text-fuchsia-400
                                            transition
                                        "
                                    >
                                        View Match
                                        <FaArrowRight className="text-[10px]" />
                                    </div>

                                </div>

                            </div>

                        </motion.div>

                    ))}

                </div>

            )}

        </section>
    );
}