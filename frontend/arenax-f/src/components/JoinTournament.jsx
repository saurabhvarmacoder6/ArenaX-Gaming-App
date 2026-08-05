import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import { FaChessKnight } from "react-icons/fa";
import { showError, showSuccess } from "../utils/toast";

export default function JoinTournament() {

    const { id } = useParams()

    const [selectedSlot, setSelectedSlot] = useState(null)

    const [tournamentDetail, setTournamentDetail] = useState(null);

    const [walletBalance, setWalletBalance] = useState()

    const [occupiedSlots, setOccupiedSlots] = useState([])

    useEffect(() => {
        fetchTournament();
        getBalance();
        handleOccupiedSlots();
    }, []);

    async function fetchTournament() {
        try {
            const { data } = await api.get(`/api/auth/tournament/${id}`);
            setTournamentDetail(data.tournament);
        } catch (err) {
            console.log(err);
        }
    }

    async function getBalance() {
        try {
            const { data } = await api.get("/api/auth/balance")
            const objData = data.data
            setWalletBalance(objData.balance)
        } catch (error) {
            console.error(error);
        }

    }

    async function handleTournament(id) {
        try {
            const { data } = await api.post(`/api/auth/join-tournament/${id}`, {
                slot: selectedSlot,
            })
            showSuccess(data.msg)

        } catch (error) {
            console.error(error);
            showError(error)

        }

    }

    async function handleOccupiedSlots() {
        try {
            const { data } = await api.get(
                `/api/auth/tournament/${id}/occupied-slots`
            );
            setOccupiedSlots(data.occupiedSlots);
        } catch (error) {
            console.error(error);
        }

    }

    if (!tournamentDetail) {
        return <div className="text-white p-5">Loading...</div>;
    }

    const teamSize =
        tournamentDetail.type === "Solo"
            ? 1
            : tournamentDetail.type === "Duo"
                ? 2
                : 4;

    const totalTeams = tournamentDetail.totalSlots / teamSize;

    const teamLetters =
        tournamentDetail.type === "Solo"
            ? ["Slot"]
            : tournamentDetail.type === "Duo"
                ? ["A", "B"]
                : ["A", "B", "C", "D"];

    return (
        <div className="mt-8 rounded-3xl bg-[#171722] border border-white/10 p-6 pb-40">

            <h2 className="text-xl text-white font-bold mb-2">
                Select Your Slot
            </h2>

            <p className="text-gray-400 text-sm mb-6">
                Choose any available slot to join the tournament app.
            </p>

            {/* Slots */}
            {/* ===================== SLOT UI ===================== */}

            {
                tournamentDetail.type === "Solo" ? (

                    <div className="grid grid-cols-4 gap-x-10 gap-y-4">

                        {Array.from({ length: tournamentDetail.totalSlots }, (_, index) => {

                            const slot = index + 1;
                            const selected = selectedSlot === slot;
                            const isOccupied = occupiedSlots.includes(slot);
                            return (

                                <button
                                    key={slot}
                                    onClick={() => setSelectedSlot(slot)}
                                    disabled={isOccupied}
                                    className="flex items-center gap-3"
                                >

                                    <span className="text-white font-semibold w-5">
                                        {slot}
                                    </span>

                                    <div
                                        className={`w-7 h-7 rounded-md border-2 transition-all

                                         ${selected
                                                ? "bg-orange-600 border-orange-600"
                                                : "border-orange-500"
                                            }
                                             ${isOccupied ? "bg-orange-500" : "bg-[#1A1A24]"
                                            }
                                         `}
                                    />

                                </button>

                            );

                        })}

                    </div>

                ) : (

                    <div className="rounded-2xl overflow-hidden border border-white/10">

                        {/* Header */}

                        <div className={`grid bg-[#09090F] py-3 text-white font-bold

  ${tournamentDetail.type === "Duo"
                                ? "grid-cols-3"
                                : "grid-cols-5"
                            }
  `}>

                            <div className="text-center">
                                Team
                            </div>

                            {teamLetters.map((letter) => (

                                <div
                                    key={letter}
                                    className="text-center"
                                >
                                    {letter}
                                </div>

                            ))}

                        </div>

                        {/* Teams */}

                        {Array.from({ length: totalTeams }, (_, teamIndex) => {

                            return (

                                <div
                                    key={teamIndex}
                                    className={`grid border-t border-white/10 py-2

        ${tournamentDetail.type === "Duo"
                                            ? "grid-cols-3"
                                            : "grid-cols-5"
                                        }
        `}
                                >

                                    <div className="text-center text-sm font-semibold text-gray-300">

                                        Team {teamIndex + 1}

                                    </div>

                                    {Array.from({ length: teamSize }, (_, playerIndex) => {

                                        const slot = teamIndex * teamSize + playerIndex + 1;

                                        const selected = selectedSlot === slot;
                                        const isOccupied = occupiedSlots.includes(slot);

                                        return (

                                            <div
                                                key={slot}
                                                className="flex flex-col items-center gap-2"
                                            >

                                                <button
                                                    onClick={() => setSelectedSlot(slot)}
                                                    disabled={isOccupied}

                                                    className={`
                w-6 h-6 rounded-md border-2 transition-all

                ${selected
                                                            ? "bg-orange-600 border-orange-600"
                                                            : "border-orange-500"
                                                        }
                                                         ${isOccupied ? "bg-orange-500" : "bg-[#1A1A24]"
                                                        }
                `}
                                                />

                                                <span className="text-white text-sm">
                                                    {slot}
                                                </span>

                                            </div>

                                        );

                                    })}

                                </div>

                            );

                        })}

                    </div>

                )
            }

            {/* Bottom Info */}

            {/* ===================== BOTTOM CARD ===================== */}

            <div className="mt-8 rounded-3xl bg-[#09090F] border border-white/10 overflow-hidden">

                {/* Selected Slot */}

                <div className="flex justify-between items-center p-5 border-b border-white/10">

                    <div>

                        <p className="text-gray-400 text-sm">
                            Selected Slot
                        </p>

                        <h2 className="text-xl font-bold text-white mt-1">
                            {selectedSlot || "--"}
                        </h2>

                    </div>

                    <div className="size-10 rounded-2xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400 text-xl">
                        <FaChessKnight />
                    </div>

                </div>

                {/* Details */}

                <div className="p-5 space-y-5">

                    <div className="flex justify-between">

                        <span className="text-gray-400">
                            Entry Fee
                        </span>

                        <span className="text-yellow-400 font-bold text-lg">
                            ₹{tournamentDetail.entryFee}
                        </span>

                    </div>

                    <div className="flex justify-between">

                        <span className="text-gray-400">
                            Wallet Balance
                        </span>

                        <span className="text-green-400 font-bold text-lg">
                            ₹{walletBalance}
                        </span>

                    </div>

                    <div className="flex justify-between">

                        <span className="text-gray-400">
                            Tournament Type
                        </span>

                        <span className="text-violet-400 font-semibold">
                            {tournamentDetail.type}
                        </span>

                    </div>

                    <div className="flex justify-between">

                        <span className="text-gray-400">
                            Tournament Mode
                        </span>

                        <span className="text-violet-400  font-semibold">
                            {tournamentDetail.mode}
                        </span>

                    </div>

                </div>

                {/* Join Button */}

                <div className="p-5 pt-0">

                    <button

                        onClick={() => handleTournament(tournamentDetail._id)}
                        disabled={!selectedSlot}
                        className={`
      w-full
      py-4
      rounded-2xl
      font-bold
      text-lg
      transition-all
      duration-300

      ${selectedSlot
                                ? "bg-linear-to-r from-violet-600 to-fuchsia-600 text-white hover:scale-[1.02]"
                                : "bg-white/10 text-gray-500 cursor-not-allowed"
                            }
      `}
                    >
                        {selectedSlot ? `Join Slot ${selectedSlot}` : "Select Any Slot"}
                    </button>

                </div>

            </div>

        </div>
    )
}