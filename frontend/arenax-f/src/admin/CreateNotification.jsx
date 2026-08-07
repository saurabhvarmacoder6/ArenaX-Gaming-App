import { useState } from "react";
import { motion } from "framer-motion";
import {
    FaBell,
    FaHeading,
    FaAlignLeft,
    FaThumbtack,
} from "react-icons/fa";
import api from "../api/api";
import { showError, showSuccess } from "../utils/toast";

export default function CreateNotification() {

    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [type, setType] = useState("General");
    const [isPinned, setIsPinned] = useState(false);

    async function handleSubmit() {
        try {
        const {data} = await api.post("/api/auth/notification",{title,message,type,isPinned});
            showSuccess(data.msg)
        } catch (error) {
            console.log(error);
            showError(error)
        }        
    }

    return (

        <div className="max-w-5xl mx-auto">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="
                    bg-white
                    rounded-3xl
                    border
                    border-gray-200
                    shadow-sm
                    p-8
                    space-y-8
                "
            >

                {/* Header */}

                <div>

                    <h1 className="text-3xl font-bold text-gray-900">
                        Create Notification
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Send notifications to all ArenaX users.
                    </p>

                </div>

                {/* Title */}

                <div>

                    <label className="font-medium flex items-center gap-2 mb-2">

                        <FaHeading className="text-sky-600" />

                        Notification Title

                    </label>

                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter notification title"
                        className="
                            w-full
                            rounded-2xl
                            border
                            border-gray-200
                            px-4
                            py-3
                            outline-none
                            focus:border-sky-500
                        "
                    />

                </div>

                {/* Message */}

                <div>

                    <label className="font-medium flex items-center gap-2 mb-2">

                        <FaAlignLeft className="text-sky-600" />

                        Notification Message

                    </label>

                    <textarea
                        rows={6}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write notification message..."
                        className="
                            w-full
                            rounded-2xl
                            border
                            border-gray-200
                            px-4
                            py-3
                            resize-none
                            outline-none
                            focus:border-sky-500
                        "
                    />

                </div>

                {/* Type */}

                <div>

                    <label className="font-medium mb-2 block">
                        Notification Type
                    </label>

                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="
                            w-full
                            rounded-2xl
                            border
                            border-gray-200
                            px-4
                            py-3
                            outline-none
                            focus:border-sky-500
                        "
                    >

                        <option value="General">
                            General
                        </option>

                        <option value="Tournament">
                            Tournament
                        </option>

                        <option value="Update">
                            Update
                        </option>

                    </select>

                </div>

                {/* Pin Notification */}

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        rounded-2xl
                        border
                        border-gray-200
                        p-5
                    "
                >

                    <div>

                        <h3 className="font-semibold flex items-center gap-2">

                            <FaThumbtack className="text-sky-600" />

                            Pin Notification

                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                            Pinned notification will appear at the top.
                        </p>

                    </div>

                    <button
                        onClick={() => setIsPinned(!isPinned)}
                        className={`
                            w-14
                            h-8
                            rounded-full
                            transition
                            relative
                            ${isPinned ? "bg-sky-600" : "bg-gray-300"}
                        `}
                    >

                        <div
                            className={`
                                absolute
                                top-1
                                w-6
                                h-6
                                rounded-full
                                bg-white
                                transition-all
                                ${isPinned ? "left-7" : "left-1"}
                            `}
                        />

                    </button>

                </div>

                {/* Live Preview */}

                <div
                    className="
                        rounded-3xl
                        bg-slate-900
                        text-white
                        p-6
                        border
                        border-slate-700
                    "
                >

                    <div className="flex items-center justify-between">

                        <div className="flex items-center gap-3">

                            <div
                                className="
                                    w-12
                                    h-12
                                    rounded-2xl
                                    bg-sky-600/20
                                    flex
                                    items-center
                                    justify-center
                                "
                            >

                                <FaBell className="text-sky-400 text-xl" />

                            </div>

                            <div>

                                <h3 className="font-bold text-lg">
                                    {title || "Notification Title"}
                                </h3>

                                <span className="text-sky-400 text-sm">
                                    {type}
                                </span>

                            </div>

                        </div>

                        {isPinned && (
                            <span
                                className="
                                    bg-yellow-500/20
                                    text-yellow-400
                                    px-3
                                    py-1
                                    rounded-full
                                    text-xs
                                    font-semibold
                                "
                            >
                                PINNED
                            </span>
                        )}

                    </div>

                    <p className="text-gray-300 mt-5 leading-7">
                        {message || "Notification preview will appear here..."}
                    </p>

                </div>

                {/* Submit */}

                <button
                    onClick={handleSubmit}
                    className="
                        w-full
                        py-4
                        rounded-2xl
                        bg-sky-600
                        hover:bg-sky-700
                        transition
                        text-white
                        font-bold
                        text-lg
                    "
                >

                    <div className="flex items-center justify-center gap-3">

                        <FaBell />

                        Publish Notification

                    </div>

                </button>

            </motion.div>

        </div>

    );

}