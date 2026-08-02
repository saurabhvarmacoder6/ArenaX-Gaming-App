import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
    FaWallet,
    FaSearch,
    FaCheckCircle,
    FaTimesCircle,
    FaClock,
    FaUserCircle,
    FaEye,
} from "react-icons/fa";
import api from "../api/api";

export default function PaymentOrders() {

    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");


    useMemo(() => {
        handlePaymentOrder();
    }, []);

    async function handlePaymentOrder() {
        try {
            const { data } = await api.get("/api/auth/order-data");
            setOrders(data.data)
        } catch (error) {
            console.error(error);
        }
    }

    const filteredOrders = useMemo(() => {

        return orders.filter((item) => {

            const matchSearch =
                item.userName.toLowerCase().includes(search.toLowerCase()) ||
                item.orderId.toLowerCase().includes(search.toLowerCase()) ||
                (item.paymentId &&
                    item.paymentId.toLowerCase().includes(search.toLowerCase()));

            const matchStatus =
                filter === "all" ? true : item.status === filter;

            return matchSearch && matchStatus;

        });

    }, [orders, search, filter]);

    return (

        <div className="space-y-6">

            {/* Header */}

            <div>

                <h1 className="text-3xl font-bold text-gray-900">
                    Payment Orders
                </h1>

                <p className="text-gray-500 mt-2">
                    View and manage wallet recharge orders.
                </p>

            </div>

            {/* Search */}

            <div className="relative">

                <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                    type="text"
                    placeholder="Search User, Order ID or Payment ID..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 bg-white py-4 pl-14 pr-4 outline-none focus:border-sky-500"
                />

            </div>

            {/* Filter */}

            <div className="flex gap-3 flex-wrap">

                {["all", "created", "paid", "failed"].map((item) => (

                    <button
                        key={item}
                        onClick={() => setFilter(item)}
                        className={`px-5 py-2 rounded-xl capitalize transition
                        ${filter === item
                                ? "bg-sky-600 text-white"
                                : "bg-white border border-gray-200"
                            }`}
                    >
                        {item}
                    </button>

                ))}

            </div>

            {/* Cards */}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                {filteredOrders.length > 0 ? (

                    filteredOrders.map((item) => (

                        <motion.div
                            key={item._id}
                            whileHover={{ y: -3 }}
                            className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6"
                        >

                            <div className="flex justify-between items-start">

                                <div className="flex gap-4">

                                    <div className="w-14 h-14 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 text-2xl">

                                        <FaUserCircle />

                                    </div>

                                    <div>

                                        <h2 className="text-xl font-semibold">
                                            {item.userName}
                                        </h2>

                                        <p className="text-gray-500 mt-1">
                                            ₹ {item.amount}
                                        </p>

                                    </div>

                                </div>

                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium capitalize
                                    ${item.status === "paid"
                                            ? "bg-green-100 text-green-700"
                                            : item.status === "created"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {item.status}
                                </span>

                            </div>

                            <div className="mt-6 space-y-3 text-sm">

                                <div className="flex justify-between">

                                    <span className="text-gray-500">
                                        Order ID
                                    </span>

                                    <span className="font-medium">
                                        {item.orderId}
                                    </span>

                                </div>

                                <div className="flex justify-between">

                                    <span className="text-gray-500">
                                        Payment ID
                                    </span>

                                    <span className="font-medium">

                                        {item.paymentId || "--"}

                                    </span>

                                </div>

                                <div className="flex justify-between">

                                    <span className="text-gray-500">
                                        Date
                                    </span>

                                    <span>

                                        {item.createdAt}

                                    </span>

                                </div>

                            </div>

                        </motion.div>

                    ))

                ) : (

                    <div className="col-span-full bg-white rounded-3xl border border-gray-200 py-20">

                        <div className="flex flex-col items-center">

                            <FaWallet className="text-5xl text-gray-400" />

                            <h2 className="text-2xl font-bold mt-6">
                                No Payment Orders
                            </h2>

                            <p className="text-gray-500 mt-2">
                                No payment order found.
                            </p>

                        </div>

                    </div>

                )}

            </div>

        </div>

    );
}