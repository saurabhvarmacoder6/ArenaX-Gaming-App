import { motion } from "framer-motion";
import {
    FaUsers,
    FaGamepad,
    FaWallet,
    FaMoneyCheckAlt,
    FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../api/api";
import { useEffect, useState } from "react";

const actions = [
    {
        title: "Withdrawal Requests",
        desc: "Approve or reject pending withdrawals.",
        path: "/admin/withdraw",
    },
    {
        title: "Payment Orders",
        desc: "View wallet recharge payment orders.",
        path: "/admin/payment-orders",
    },
    {
        title: "Tournament Manager",
        desc: "Create, edit and delete tournaments.",
        path: "/admin/tournaments",
    },
    {
        title: "Users",
        desc: "Manage registered ArenaX users.",
        path: "/admin/users",
    },
];

export default function Dashboard() {

    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        fetchTotalUsers();
    }, []);

    async function fetchTotalUsers() {
        try {
            const { data } = await api.get("/api/auth/users");
            setTotalUsers(data.data.length);
        } catch (error) {
            console.error("Error fetching total users:", error);
        }
    }

    return (
        <div className="space-y-8 overflow-auto p-6 h-full w-full bg-gray-100">

            {/* Welcome */}

            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8"
            >

                <h1 className="text-3xl font-bold text-gray-900">
                    Welcome Back 👋
                </h1>

                <p className="text-gray-500 mt-2">
                    Manage users, tournaments, payments and withdrawals from one place.
                </p>

            </motion.div>

            {/* Stats */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <div className="bg-white flex gap-4 justify-between items-center rounded-3xl border border-gray-200 shadow-sm p-6">

                    <h2 className="text-lg font-semibold flex gap-4 items-center text-gray-900">
                        <FaUsers /> Total Users
                    </h2>
                    <p className="text-3xl font-bold text-blue-400 font-mono">
                        {totalUsers}
                    </p>

                </div>

            </div>

            {/* Quick Actions */}

            <div>

                <h2 className="text-2xl font-bold text-gray-900 mb-5">
                    Quick Actions
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {actions.map((item) => (

                        <motion.div
                            whileHover={{ y: -2 }}
                            key={item.title}
                            className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6"
                        >

                            <h3 className="text-xl font-semibold text-gray-900">
                                {item.title}
                            </h3>

                            <p className="text-gray-500 mt-2">
                                {item.desc}
                            </p>

                            <Link
                                to={item.path}
                                className="inline-flex items-center gap-2 mt-6 text-sky-600 font-medium hover:gap-3 transition-all"
                            >
                                Open
                                <FaArrowRight />
                            </Link>

                        </motion.div>

                    ))}

                </div>

            </div>

        </div>
    );
}