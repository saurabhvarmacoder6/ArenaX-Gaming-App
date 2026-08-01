import { motion } from "framer-motion";
import {
    FaUsers,
    FaGamepad,
    FaWallet,
    FaMoneyCheckAlt,
    FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const stats = [
    {
        title: "Total Users",
        value: 248,
        icon: <FaUsers />,
        color: "bg-sky-100 text-sky-600",
    },
    {
        title: "Tournaments",
        value: 18,
        icon: <FaGamepad />,
        color: "bg-violet-100 text-violet-600",
    },
    {
        title: "Pending Withdraw",
        value: 6,
        icon: <FaMoneyCheckAlt />,
        color: "bg-amber-100 text-amber-600",
    },
    {
        title: "Revenue",
        value: "₹12,480",
        icon: <FaWallet />,
        color: "bg-green-100 text-green-600",
    },
];

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

                {stats.map((item) => (

                    <motion.div
                        whileHover={{ y: -3 }}
                        key={item.title}
                        className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6"
                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    {item.title}
                                </p>

                                <h2 className="text-3xl font-bold mt-3 text-gray-900">
                                    {item.value}
                                </h2>

                            </div>

                            <div
                                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${item.color}`}
                            >
                                {item.icon}
                            </div>

                        </div>

                    </motion.div>

                ))}

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