import { useState } from "react";
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
import { showError, showSuccess } from "../utils/toast";
export default function CreateTournament() {

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
    });

    const [disable, setDisable] = useState(false)

    function handleChange(e) {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {
            const { data } = await api.post("/api/auth/tournament/create", formData);
            showSuccess(data.msg);
            if (data.success) {
                setDisable(true)
                setTimeout(() => {
                    setDisable(false)
                }, 3000)
            }

        } catch (error) {
            console.error(error);
            showError(error)
        }

    }

    return (

        <div className="max-w-6xl mx-auto">

            <motion.form
                onSubmit={handleSubmit}
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

                {/* Button */}

                <button
                    disabled={disable}
                    className={`w-full rounded-xl py-3 text-white font-semibold transition
    ${disable
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-violet-600 hover:bg-violet-500"
                        }`}
                >
                    {disable ? "Tournament Created" : "Create Tournament"}
                </button>

            </motion.form>

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