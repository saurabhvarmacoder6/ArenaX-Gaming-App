import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import api from "../api/api";
import { useParams } from "react-router-dom";
import { showError, showSuccess } from "../utils/toast";
export default function SeePlayers() {
    const { id } = useParams()
    const [players, setPlayers] = useState([])
    const [saving, setSaving] = useState(false);
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

    function handleKillChange(id, value) {
        if (value < 0) return;

        setPlayers((prev) =>
            prev.map((player) =>
                player._id === id
                    ? { ...player, kill: Number(value) }
                    : player
            )
        );
    }

    async function handleSave() {

        try {

            setSaving(true);

            const { data } = await api.patch("/api/auth/player/kills", {
                players: players.map((player) => ({
                    id: player._id,
                    kill: player.kill,
                })),
            });

            showSuccess(data.msg)

        } catch (error) {

            console.log(error);
            showError(error)

        } finally {

            setSaving(false);

        }

    }

    const sortedPlayers = [...players].sort((a, b) => b.kill - a.kill);
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="
        rounded-3xl
        bg-white
        border border-white/10
        overflow-hidden
        min-h-screen
        w-full
      "
        >
            {/* Header */}

            <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold text-black">
                        Match Leaderboard
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Edit player kills and save changes.
                    </p>

                </div>

                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="
            px-6
            py-3
            rounded-xl
            bg-sky-600
            hover:bg-sky-700
            text-white
            font-semibold
            transition
        "
                >
                    {saving ? "Saving..." : "Save Changes"}
                </button>

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

                                <div className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center w-full justify-between">

                                    <div className="flex items-center gap-4">

                                        <div className="
            w-12
            h-12
            rounded-full
            bg-sky-100
            flex
            items-center
            justify-center
            font-bold
            text-sky-600
        ">
                                            #{index + 1}
                                        </div>

                                        <div>

                                            <h2 className="font-semibold text-lg">
                                                {player.user.gameName}
                                            </h2>

                                            <p className="text-gray-500 text-sm">
                                                Player
                                            </p>

                                        </div>

                                    </div>

                                    <div className="flex items-center gap-3">

                                        <span className="text-gray-500">
                                            Kills
                                        </span>

                                        <input
                                            type="number"
                                            min="0"
                                            value={player.kill}
                                            onChange={(e) =>
                                                handleKillChange(
                                                    player._id,
                                                    e.target.value
                                                )
                                            }
                                            className="
                w-24
                rounded-xl
                border
                border-gray-300
                px-3
                py-2
                text-center
                outline-none
                focus:border-sky-500
            "
                                        />

                                    </div>

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