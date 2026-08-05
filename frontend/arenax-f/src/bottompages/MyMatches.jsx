import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import brsolo from "../img/brsolo.png"
import brduo from "../img/brduo.png"
import cssolo from "../img/cssolo.png"
import csduo from "../img/csduo.png"
import cssquad from "../img/cssquad.png"
import lwsolo from "../img/lwsolo.png"
import lwduo from "../img/lwduo.png"
import {
    FaArrowLeft,
    FaGamepad,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../api/api"
export default function MyMatches() {

    const navigate = useNavigate();

    const bannerImages = {
        BR: {
            Solo: brsolo,
            Duo: brduo,
        },

        CS: {
            Solo: cssolo,
            Duo: csduo,
            Squad: cssquad,
        },

        LW: {
            Solo: lwsolo,
            Duo: lwduo,
        },
    };

    const [selectedStatus, setSelectedStatus] = useState("Upcoming");
    const [myMatchData, setMyMatchData] = useState([]);

    useEffect(() => {
        HandleGetMatchData()
    }, [])

    async function HandleGetMatchData() {
        try {
            const { data } = await api.get("/api/auth/my-matches")
            setMyMatchData(data.matches)
        } catch (error) {
            console.log(error);
        }
    }

    const filteredMatches = myMatchData.filter(
        (item) => item.tournament?.status === selectedStatus
    );
    return (

        <div className="min-h-screen w-full bg-[#0E1015] text-white">

            {/* ==========================
                HEADER
            ========================== */}

            <div className="sticky top-0 z-20 bg-[#171722]/90 backdrop-blur-xl border-b border-white/10">

                <div className="max-w-5xl mx-auto px-5 py-5 flex items-center justify-between">

                    <div className="flex items-center gap-4">

                        <button
                            onClick={() => navigate(-1)}
                            className="w-11 h-11 rounded-2xl bg-[#222737] border border-white/10
                            flex items-center justify-center hover:border-cyan-500 transition"
                        >
                            <FaArrowLeft />
                        </button>

                        <div>

                            <h1 className="text-2xl font-bold">
                                My Matches
                            </h1>

                            <p className="text-sm text-gray-400">
                                All your joined tournaments
                            </p>

                        </div>

                    </div>

                </div>

            </div>

            {/* ==========================
                STATUS FILTER
            ========================== */}

            <div className="max-w-5xl mx-auto flex justify-center items-center px-5 mt-6">

                <motion.div
                    layout

                    className="
                    w-full
                    flex
                    gap-3
                    overflow-x-auto
                    scrollbar-hide
                "
                >

                    {["Live", "Upcoming", "Completed"].map((status) => (

                        <button
                            key={status}
                            onClick={() => setSelectedStatus(status)}
                            className={`
                            w-full
                            px-4
                            py-3
                            rounded-full
                            text-sm
                            font-semibold
                            whitespace-nowrap
                            transition-all
                            duration-300

                            ${selectedStatus === status
                                    ? status === "Live"
                                        ? "bg-red-500 text-white shadow-lg shadow-red-500/30"
                                        : status === "Upcoming"
                                            ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
                                            : "bg-slate-600 text-white shadow-lg shadow-slate-500/20"
                                    : "bg-[#1B1E29] border border-white/10 hover:border-cyan-500"
                                }
                        `}
                        >
                            {status}
                        </button>

                    ))}

                </motion.div>

            </div>

            {/* ==========================
    MATCH LIST
========================== */}

            <div className="max-w-5xl mx-auto px-5 mt-8 pb-32">

                {/* Dummy Data */}

                {filteredMatches.length === 0 ? (

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-16 flex flex-col items-center justify-center text-center"
                    >

                        <div className="w-24 h-24 rounded-full bg-[#1B1E29] flex items-center justify-center mb-5">

                            <FaGamepad className="text-4xl text-cyan-400" />

                        </div>

                        <h2 className="text-2xl font-bold">
                            No Matches Found
                        </h2>

                        <p className="text-gray-400 mt-2 max-w-sm">
                            You don't have any {selectedStatus.toLowerCase()} tournaments yet.
                        </p>

                    </motion.div>

                ) : (

                    filteredMatches.map((item, index) => {

                        const banner =
                            bannerImages[item.tournament.mode]?.[item.tournament.type] || brsolo;

                        return (

                            <motion.div
                                key={item._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-[#171722] rounded-3xl border border-white/10 overflow-hidden mb-6"
                            >


                                <div className="relative">

                                    <img
                                        src={banner}
                                        alt={item.tournament.title}
                                        className="w-full h-44 object-cover"
                                    />

                                    <div className="absolute inset-0 bg-linear-to-t from-[#171722] to-transparent"></div>

                                    <div className="absolute bottom-4 left-5">

                                        <h2 className="text-2xl font-bold">
                                            {item.tournament.title}
                                        </h2>

                                        <p className="text-gray-300">
                                            {item.tournament.map}
                                        </p>

                                    </div>


                                </div>

                                <div className="p-6">

                                    <div className="grid grid-cols-2 gap-5">

                                        <div>

                                            <p className="text-gray-400 text-sm">
                                                Match Date
                                            </p>

                                            <h3 className="font-semibold mt-1">
                                                {new Date(item.tournament.matchDate).toLocaleDateString()}
                                            </h3>

                                        </div>

                                        <div>

                                            <p className="text-gray-400 text-sm">
                                                Match Time
                                            </p>

                                            <h3 className="font-semibold mt-1">
                                                {item.tournament.matchTime}
                                            </h3>

                                        </div>

                                        <div>

                                            <p className="text-gray-400 text-sm">
                                                Slot
                                            </p>

                                            <h3 className="font-semibold mt-1 text-cyan-400">
                                                {item.slot}
                                            </h3>

                                        </div>

                                        <div>

                                            <p className="text-gray-400 text-sm">
                                                Entry Fee
                                            </p>

                                            <h3 className="font-semibold mt-1 text-yellow-400">
                                                ₹{item.tournament.entryFee}
                                            </h3>

                                        </div>

                                    </div>

                                    {/* Button */}

                                    <button
                                        onClick={() => navigate(`/mydetail/${item.tournament._id}`)}
                                        className="
                    mt-6
                    w-full
                    py-4
                    rounded-2xl
                    bg-linear-to-r
                    from-cyan-500
                    to-blue-600
                    font-bold
                    hover:opacity-90
                    transition
                    "
                                    >
                                        View Match
                                    </button>

                                </div>

                            </motion.div>

                        );

                    })

                )}

            </div>

        </div>

    );

}