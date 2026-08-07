import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    FaBell,
    FaThumbtack,
    FaBullhorn,
    FaTrophy,
    FaSyncAlt,
} from "react-icons/fa";
import api from "../api/api";

export default function ShowNotification() {

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        getNotifications();
    }, []);

    async function getNotifications() {

        try {

            const { data } = await api.get("/api/auth/get-notifications");
            setNotifications(data.notifications);

        } catch (error) {

            console.log(error);

        }

    }

    return (

        <div className="min-h-screen bg-[#09090F] w-full pb-24">

            {/* Header */}

            <div className="sticky top-0 z-20 bg-[#171722] border-b border-white/10">

                <div className="px-5 py-5 flex items-center gap-3">

                    <div className="
                        w-12
                        h-12
                        rounded-2xl
                        bg-cyan-500/15
                        flex
                        items-center
                        justify-center
                    ">

                        <FaBell className="text-cyan-400 text-xl" />

                    </div>

                    <div>

                        <h1 className="text-2xl font-bold text-white">
                            Notifications
                        </h1>

                        <p className="text-sm text-gray-400">
                            Latest updates from ArenaX
                        </p>

                    </div>

                </div>

            </div>

            <div className="max-w-4xl mx-auto p-5 space-y-4">                {notifications.length > 0 ? (

                notifications.map((item) => (

                    <motion.div
                        key={item._id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -2 }}
                        className="
                                rounded-3xl
                                bg-[#171722]
                                border border-white/10
                                p-5
                            "
                    >

                        {/* Top */}

                        <div className="flex justify-between items-start">

                            <div className="flex items-center gap-3">

                                <div
                                    className="
                                            w-12
                                            h-12
                                            rounded-2xl
                                            bg-white/5
                                            flex
                                            items-center
                                            justify-center
                                        "
                                >

                                    {item.type === "Tournament" ? (

                                        <FaTrophy className="text-yellow-400 text-xl" />

                                    ) : item.type === "Update" ? (

                                        <FaSyncAlt className="text-green-400 text-xl" />

                                    ) : (

                                        <FaBullhorn className="text-cyan-400 text-xl" />

                                    )}

                                </div>

                                <div>

                                    <h2 className="text-lg font-bold text-white">
                                        {item.title}
                                    </h2>

                                    <div className="flex items-center gap-2 mt-1">

                                        <span
                                            className={`
                                                    px-2
                                                    py-1
                                                    rounded-full
                                                    text-xs
                                                    font-semibold

                                                    ${item.type === "Tournament"
                                                    ? "bg-yellow-500/20 text-yellow-400"
                                                    : item.type === "Update"
                                                        ? "bg-green-500/20 text-green-400"
                                                        : "bg-cyan-500/20 text-cyan-400"
                                                }
                                                `}
                                        >
                                            {item.type}
                                        </span>

                                        {item.isPinned && (

                                            <span
                                                className="
                                                        flex
                                                        items-center
                                                        gap-1
                                                        px-2
                                                        py-1
                                                        rounded-full
                                                        bg-red-500/20
                                                        text-red-400
                                                        text-xs
                                                    "
                                            >
                                                <FaThumbtack />

                                                Pinned
                                            </span>

                                        )}

                                    </div>

                                </div>

                            </div>

                            <span className="text-xs text-gray-500">
                                {new Date(item.createdAt).toLocaleDateString()}
                            </span>

                        </div>

                        {/* Message */}

                        <p className="text-gray-300 leading-7 mt-5">
                            {item.message}
                        </p>

                    </motion.div>

                ))

            ) : (

                <div
                    className="
                            rounded-3xl
                            bg-[#171722]
                            border border-white/10
                            py-20
                            text-center
                        "
                >

                    <div
                        className="
                                w-16
                                h-16
                                mx-auto
                                rounded-full
                                bg-white/5
                                flex
                                items-center
                                justify-center
                            "
                    >

                        <FaBell className="text-3xl text-gray-500" />

                    </div>

                    <h2 className="text-2xl font-bold text-white mt-6">
                        No Notifications
                    </h2>

                    <p className="text-gray-400 mt-2">
                        New notifications will appear here.
                    </p>

                </div>

            )}

            </div>

        </div>

    );

}