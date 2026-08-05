import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import api from "../api/api";
import { useParams } from "react-router-dom";
export default function JoinedPlayersName() {
    const { id } = useParams()
    const [players, setPlayers] = useState([])
    const [totalPlayers , setTotalPlayers] = useState(0)
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

            <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-white">
                        Joined Players
                    </h2>

                    <p className="text-sm text-gray-400 mt-1 font-semibold">
                        {totalPlayers} Players Joined
                    </p>
                </div>
            </div>

            {/* List */}

            {totalPlayers > 0 ? (
                <div className="divide-y divide-white/10">

                    {players.map((player, index) => (

                        <motion.div
                            key={player._id || index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.03 }}
                            className="
                flex
                items-center
                justify-between
                px-6
                py-4
                hover:bg-white/5
                transition
              "
                        >
                            <div className="flex items-center gap-4">

                                <div
                                    className="
                    w-10
                    h-10
                    rounded-full
                    bg-cyan-500/15
                    border border-cyan-500/20
                    flex
                    items-center
                    justify-center
                    text-cyan-400
                    font-bold
                  "
                                >
                                    {index + 1}
                                </div>

                                <span className="text-white font-medium">
                                    {player.user.gameName}
                                </span>

                            </div>
                        </motion.div>

                    ))}

                </div>
            ) : (

                <div className="py-14 text-center">

                    <h3 className="text-lg font-semibold text-white">
                        No Players Joined
                    </h3>

                    <p className="text-gray-400 mt-2">
                        Players will appear here after joining.
                    </p>

                </div>

            )}
        </motion.div>
    );
}