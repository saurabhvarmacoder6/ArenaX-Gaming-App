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

export default function CreateTournament() {

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        mode: "",
        map: "",
        entryFee: "",
        prizePool: "",
        perKill: "",
        slots: "",
        date: "",
        time: "",
        registrationDeadline: "",
        banner: "",
        roomId: "",
        roomPassword: "",
        rules: "",
    });

    function handleChange(e) {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    }

    function handleSubmit(e) {

        e.preventDefault();

        console.log(formData);

        // Backend API

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
                        label="Category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        options={["BR", "CS", "LW"]}
                    />

                    <Select
                        label="Mode"
                        name="mode"
                        value={formData.mode}
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
                        name="slots"
                        type="number"
                        value={formData.slots}
                        onChange={handleChange}
                    />

                </div>

                {/* Date */}

                <div className="grid md:grid-cols-3 gap-6">

                    <Input
                        label="Tournament Date"
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                    />

                    <Input
                        label="Tournament Time"
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                    />

                    <Input
                        label="Registration Deadline"
                        type="datetime-local"
                        name="registrationDeadline"
                        value={formData.registrationDeadline}
                        onChange={handleChange}
                    />

                </div>

                {/* Banner */}

                <div className="grid md:grid-cols-2 gap-6">

                    <Input
                        label="Banner URL"
                        name="banner"
                        value={formData.banner}
                        onChange={handleChange}
                    />

                    <div></div>

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

                </div>

                {/* Rules */}

                <div>

                    <label className="font-medium mb-2 block">
                        Rules
                    </label>

                    <textarea
                        rows={5}
                        name="rules"
                        value={formData.rules}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-gray-200 p-4 outline-none"
                        placeholder="Tournament rules..."
                    />

                </div>

                {/* Button */}

                <button
                    className="w-full py-4 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-lg"
                >
                    Create Tournament
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