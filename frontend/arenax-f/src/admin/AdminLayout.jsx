import { NavLink, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import img from "../img/logo.png";
import {
    FaTachometerAlt,
    FaMoneyCheckAlt,
    FaWallet,
    FaGamepad,
    FaUsers,
    FaSignOutAlt,
    FaSignInAlt,
} from "react-icons/fa";

const navItems = [
    {
        name: "Dashboard",
        path: "/admin",
        icon: <FaTachometerAlt />,
    },
    {
        name: "Withdraw Requests",
        path: "/admin/withdraw",
        icon: <FaMoneyCheckAlt />,
    },
    {
        name: "Payment Orders",
        path: "/admin/payment-orders",
        icon: <FaWallet />,
    },
    {
        name: "Tournaments",
        path: "/admin/tournaments",
        icon: <FaGamepad />,
    },
    {
        name: "Users",
        path: "/admin/users",
        icon: <FaUsers />,
    },
];

export default function AdminLayout() {
    return (
        <div className="bg-white h-screen w-full flex" >
            <div>
                <div className="h-full fixed left-0 top-0 w-63 bg-linear-to-b from-slate-700 via-gray-600 to-gray-800 p-6">
                    <div className="pb-16 pt-2 border-b-2 border-gray-300 mb-5">
                        <h1 className="text-2xl font-bold text-white"><span className="pr-2">➤</span> ArenaX</h1>
                    </div>
                    <nav className="flex flex-col text-sm font-bold space-y-2">

                        {navItems.map((item) => (

                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === "/admin"}
                                className={({ isActive }) =>
                                    `flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300
                                ${isActive
                                        ? "border-l-4 border-gray-400 text-white"
                                        : "hover:bg-white/5 text-slate-300"}`
                                }
                            >

                                <span className="text-lg">
                                    {item.icon}
                                </span>

                                <span>
                                    {item.name}
                                </span>

                            </NavLink>

                        ))}

                    </nav>
                </div>
            </div>
            <div className="flex flex-col w-full ml-64">
                <div className="w-full p-6 shadow-lg shadow-gray-200 z-10 flex justify-between items-center sticky top-0 bg-white border-b border-gray-200">
                    <h1 className="text-xl font-bold text-gray-800"><FaSignInAlt className="inline-block mr-2 text-2xl" />
                        Manage ArenaX Platform</h1>
                    <div className="flex gap-3 justify-center items-center">
                        <div className="size-8 rounded-full overflow-hidden">
                            <img src={img} alt="arenax" />
                        </div>
                        <p className="font-bold ">ArenaX Admin</p>
                    </div>
                </div>
                <div className="flex-1 p-6  bg-gray-100 overflow-y-auto scrollbar-hide">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}