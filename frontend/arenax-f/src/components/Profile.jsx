import { motion } from "framer-motion";
import {
    FaUserCircle,
    FaChevronRight,
    FaCog,
    FaQuestionCircle,
    FaFileAlt,
    FaShieldAlt,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {useNavigate} from "react-router-dom"
import Homehead from "./Homehead";

export default function Profile() {
    const { user,setUser } = useContext(AuthContext);
    const navigate = useNavigate()

    const handleLogout = async () => {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
            method: "POST",
            credentials: "include",
        });

        const result = await res.json();

        if (res.ok) {
            setUser(null);
            navigate("/login", { replace: true });
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.log(error);
    }
};

    return (
        <div className="w-full">
            <Homehead />
            <div className="min-h-screen bg-[#09090B] text-white px-4 py-6">
                <div className="mx-auto p-4">

                    {/* Profile Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#171722] p-7"
                    >
                        {/* Glow */}
                        <div className="absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl"></div>

                        {/* Top Accent */}
                        <div className="absolute left-0 top-0 h-1 w-full bg-linear-to-r from-cyan-400 via-purple-500 to-pink-500"></div>

                        <div className="relative flex flex-col items-center">

                            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-linear-to-br from-cyan-500 via-blue-500 to-purple-600 shadow-[0_0_35px_rgba(59,130,246,.45)]">
                                <FaUserCircle className="text-[72px] text-white" />
                            </div>

                            <span className="mt-4 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-300">
                                ArenaX Player
                            </span>

                            <h2 className="mt-4 sm:text-3xl text-xl font-extrabold tracking-wide">
                                {user?.name}
                            </h2>

                            <p className="mt-2 text-sm text-gray-400">
                                {user?.email}
                            </p>

                            <div className="mt-6 rounded-full border border-white/10 bg-white/5 px-5 py-2">
                                <span className="text-xs text-gray-400">UID</span>

                                <span className="ml-2 font-semibold text-cyan-300">
                                    {user?.uid}
                                </span>
                            </div>

                        </div>
                    </motion.div>

                    {/* Menu */}
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: .2 }}
                        className="mt-6 bg-[#171722] text-sm sm:text-xl rounded-3xl border border-white/10 overflow-hidden"
                    >

                        <MenuItem
                            icon={<FaCog />}
                            title="Settings"
                        />

                        <MenuItem
                            icon={<FaQuestionCircle />}
                            title="Help & Support"
                        />

                        <MenuItem
                            icon={<FaFileAlt />}
                            title="Terms & Conditions"
                        />

                        <MenuItem
                            icon={<FaShieldAlt />}
                            title="Privacy Policy"
                        />

                    </motion.div>

                    {/* Logout */}
                    <motion.button
                        whileTap={{ scale: 0.97 }}
                        whileHover={{ scale: 1.02 }}
                        onClick={handleLogout}
                        className="mb-30 mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-linear-to-r from-red-500 to-red-600 py-4 font-semibold shadow-[0_10px_30px_rgba(239,68,68,.35)]"
                    >
                        <FiLogOut size={20} />
                        Logout
                    </motion.button>

                </div>
            </div>
        </div>
    );
}

function MenuItem({ icon, title }) {
    return (
        <button className="group flex w-full items-center justify-between border-b border-white/5 px-5 py-5 transition hover:bg-white/3">
            <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 transition group-hover:scale-110 group-hover:bg-cyan-500/20">
                    {icon}
                </div>

                <span className="font-medium">{title}</span>
            </div>

            <FaChevronRight className="text-gray-500 transition group-hover:translate-x-1 group-hover:text-cyan-400" />
        </button>
    );
}