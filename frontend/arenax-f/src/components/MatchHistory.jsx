import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import api from "../api/api";
import { useParams } from "react-router-dom";
export default function MatchHistory() {
    const { id } = useParams()
    const [players, setPlayers] = useState([])
    const [totalPlayers, setTotalPlayers] = useState(0)
    useEffect(() => {
        handleJoinedPlayers()
    }, [])

    async function handleJoinedPlayers() {
        try {
            const { data } = await api.get(`/api/auth/tournament/${id}/joined-players`)
            setTotalPlayers(data.totalPlayers)
            setPlayers(data.players)
        } catch (error) {
            console.log(error);
        }
    }

    const sortedPlayers = [...players].sort((a, b) => b.kill - a.kill);
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="
        rounded-3xl
        bg-[#171722]
        border border-white/10
        overflow-hidden
        min-h-screen
        w-full
      "
        >
            {/* Header */}

            <div className="px-6 py-5 border-b border-white/10">

                <h2 className="text-2xl font-bold text-white">
                    🏆 Leaderboard
                </h2>

                <p className="text-sm text-gray-400 mt-2">
                    Ranked by Total Kills
                </p>

            </div>

            {/* List */}
            {totalPlayers > 0 ? (
                <div className="divide-y divide-white/10">

                    {sortedPlayers.map((player, index) => {

                        const bg =
                            index === 0
                                ? "bg-yellow-500/15 border-yellow-500/30"
                                : index === 1
                                    ? "bg-gray-400/15 border-gray-400/30"
                                    : index === 2
                                        ? "bg-orange-500/15 border-orange-500/30"
                                        : "bg-transparent";

                        const medal =
                            index === 0
                                ? "🥇"
                                : index === 1
                                    ? "🥈"
                                    : index === 2
                                        ? "🥉"
                                        : `#${index + 1}`;

                        return (

                            <motion.div
                                key={player._id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className={`
                    flex
                    items-center
                    justify-between
                    px-6
                    py-4
                    ${bg}
                `}
                            >

                                <div className="flex items-center gap-4">

                                    <div
                                        className="
                        w-11
                        h-11
                        rounded-full
                        bg-white/10
                        flex
                        items-center
                        justify-center
                        font-bold
                    "
                                    >
                                        {medal}
                                    </div>

                                    <div>

                                        <h3 className="text-white font-semibold">
                                            {player.user.gameName}
                                        </h3>

                                        <p className="text-gray-400 text-sm">
                                            Rank #{index + 1}
                                        </p>

                                    </div>

                                </div>

                                <div className="text-right">

                                    <p className="text-cyan-400 text-xl font-bold">
                                        {player.kill}
                                    </p>

                                    <p className="text-gray-400 text-sm">
                                        Kills
                                    </p>

                                </div>

                            </motion.div>

                        );

                    })}

                </div>) : (

                <div className="py-14 text-center">

                    <h3 className="text-xl text-white font-bold">
                        No Results Yet
                    </h3>

                    <p className="text-gray-400 mt-2">
                        Match has not been completed.
                    </p>

                </div>
            )}
        </motion.div>
    );
}