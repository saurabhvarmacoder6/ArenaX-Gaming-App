import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    FaGamepad,
    FaCalendarAlt,
    FaCoins,
    FaImage,
    FaClock,
    FaUsers,
} from "react-icons/fa";
import api from "../api/api"
import { useParams } from "react-router-dom";
export default function UpdateTournament() {
    const { id } = useParams()

    const [formData, setFormData] = useState({
        title: "",
        mode: "",
        type: "",
        entryFee: "",
        perKill: "",
        prizePool: "",
        totalSlots: "",
        map: "",
        matchDate: "",
        matchTime: "",
        status: "upcoming",
        roomId: "",
        roomPassword: "",
    });

    // const [title, setTitle] = useState("")
    // const [mode, setMode] = useState("")
    // const [type, setType] = useState("")
    // const [entryFee, setEntryFee] = useState(0)
    // const [perKill, setPerKill] = useState(0)
    // const [prizePool, setPrizePool] = useState(0)
    // const [totalSlots, setTotalSlots] = useState(0)
    // const [map, setMap] = useState("")
    // const [matchDate, setMatchDate] = useState("")
    // const [matchTime, setMatchTime] = useState("")
    // const [status, setStatus] = useState("")

    useEffect(() => {
        getData()
    }, [])

    function handleChange(e) {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    }

    async function getData() {

        try {
            const { data } = await api.get(`/api/auth/tournament/${id}`);
            if (data.success) {
                setFormData({
                    title: data.tournament.title,
                    mode: data.tournament.mode,
                    type: data.tournament.type,
                    entryFee: data.tournament.entryFee,
                    perKill: data.tournament.perKill,
                    prizePool: data.tournament.prizePool,
                    totalSlots: data.tournament.totalSlots,
                    map: data.tournament.map,
                    matchDate: new Date(data.tournament.matchDate)
                        .toISOString()
                        .split("T")[0],
                    matchTime: data.tournament.matchTime,
                    status: data.tournament.status,
                    roomId: data.tournament.roomId,
                    roomPassword: data.tournament.roomPassword,
                });
            }
        } catch (error) {
            console.error(error);
        }

    }


    async function handleSubmit() {

        try {
            const { data } = await api.put(`/api/auth/tournament/${id}`, formData)
            if (data.success) {
                alert("Data updated")
            }
        } catch (error) {
            console.error(error);
        }

    }


    return (

        <div className="max-w-6xl mx-auto">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 space-y-8"
            >

                <div>

                    <h1 className="text-3xl font-bold">
                        Create Tournament
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Fill all tournament details carefully.
                    </p>

                </div>

                {/* Tournament Info */}

                <div className="grid md:grid-cols-2 gap-6">

                    <Input
                        label="Tournament Name"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />

                    <Select
                        label="Mode"
                        name="mode"
                        value={formData.mode}
                        onChange={handleChange}
                        options={["BR", "CS", "LW"]}
                    />

                    <Select
                        label="Type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        options={["Solo", "Duo", "Squad"]}
                    />

                    <Input
                        label="Map"
                        name="map"
                        value={formData.map}
                        onChange={handleChange}
                    />

                </div>

                {/* Pricing */}

                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

                    <Input
                        label="Entry Fee"
                        name="entryFee"
                        type="number"
                        value={formData.entryFee}
                        onChange={handleChange}
                    />

                    <Input
                        label="Prize Pool"
                        name="prizePool"
                        type="number"
                        value={formData.prizePool}
                        onChange={handleChange}
                    />

                    <Input
                        label="Per Kill Reward"
                        name="perKill"
                        type="number"
                        value={formData.perKill}
                        onChange={handleChange}
                    />

                    <Input
                        label="Total Slots"
                        name="totalSlots"
                        type="number"
                        value={formData.totalSlots}
                        onChange={handleChange}
                    />

                </div>

                {/* Date */}

                <div className="grid md:grid-cols-3 gap-6">

                    <Input
                        label="Tournament Date"
                        type="date"
                        name="matchDate"
                        value={formData.matchDate}
                        onChange={handleChange}
                    />

                    <Input
                        label="Tournament Time"
                        type="time"
                        name="matchTime"
                        value={formData.matchTime}
                        onChange={handleChange}
                    />

                </div>

                {/* Room Info */}

                <div className="grid md:grid-cols-2 gap-6">

                    <Input
                        label="Room ID (Optional)"
                        name="roomId"
                        value={formData.roomId}
                        onChange={handleChange}
                    />

                    <Input
                        label="Room Password (Optional)"
                        name="roomPassword"
                        value={formData.roomPassword}
                        onChange={handleChange}
                    />

                    <Select
                        label="Status (Optional)"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        options={["Upcoming", "Live", "Completed"]}
                    />

                </div>

                {/* Button */}

                <button
                    onClick={handleSubmit}
                    className="w-full py-4 rounded-2xl bg-gray-600 hover:bg-gray-700 text-white font-semibold text-lg"
                >
                    Update Tournament
                </button>

            </motion.div>

        </div>

    );
}

function Input({ label, ...props }) {

    return (

        <div>

            <label className="block mb-2 font-medium">
                {label}
            </label>

            <input
                {...props}
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-sky-500"
            />

        </div>

    );

}

function Select({ label, options, ...props }) {

    return (

        <div>

            <label className="block mb-2 font-medium">
                {label}
            </label>

            <select
                {...props}
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-sky-500"
            >

                <option value="">
                    Select
                </option>

                {options.map((item) => (

                    <option
                        key={item}
                        value={item}
                    >
                        {item}
                    </option>

                ))}

            </select>

        </div>

    );

}