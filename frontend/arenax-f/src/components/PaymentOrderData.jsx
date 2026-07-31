import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
    FaWallet,
    FaSearch,
    FaCheckCircle,
    FaClock,
    FaTimesCircle,
    FaReceipt,
} from "react-icons/fa";
import api from "../api/api";
import { useNavigate } from "react-router-dom";



export default function PaymentOrderData() {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [orders, setOrders] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        handlePaymentOrder()
    }, [])


    async function handlePaymentOrder() {
        try {
            const { data } = await api.get("/api/auth/order-data")
            setOrders(data.data)
        } catch (error) {
            console.error(error);
        }
    }
    const filteredOrders = useMemo(() => {
        return orders.filter((item) => {
            const matchSearch =
                item.orderId.toLowerCase().includes(search.toLowerCase()) ||
                item.paymentId.toLowerCase().includes(search.toLowerCase());

            const matchFilter =
                filter === "all" ? true : item.status === filter;

            return matchSearch && matchFilter;
        });
    }, [orders, search, filter]);

    const total = orders.length;
    const paid = orders.filter((i) => i.status === "paid").length;
    const pending = orders.filter((i) => i.status === "pending").length;
    const failed = orders.filter((i) => i.status === "failed").length;

    return (
        <div className="min-h-screen bg-[#0f172a] text-white p-5 pb-40">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-bold">
                    Payment Orders
                </h1>

                <p className="text-slate-400 mt-2">
                    View all recharge payment orders.
                </p>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

                <div className="rounded-2xl border border-slate-700 bg-[#1e293b] p-5">
                    <FaReceipt className="text-cyan-400 text-xl mb-3" />
                    <h2 className="text-2xl font-bold">{total}</h2>
                    <p className="text-slate-400 text-sm">Total Orders</p>
                </div>

                <div className="rounded-2xl border border-slate-700 bg-[#1e293b] p-5">
                    <FaCheckCircle className="text-green-400 text-xl mb-3" />
                    <h2 className="text-2xl font-bold">{paid}</h2>
                    <p className="text-slate-400 text-sm">Paid</p>
                </div>

                <div className="rounded-2xl border border-slate-700 bg-[#1e293b] p-5">
                    <FaClock className="text-yellow-400 text-xl mb-3" />
                    <h2 className="text-2xl font-bold">{pending}</h2>
                    <p className="text-slate-400 text-sm">Pending</p>
                </div>

                <div className="rounded-2xl border border-slate-700 bg-[#1e293b] p-5">
                    <FaTimesCircle className="text-red-400 text-xl mb-3" />
                    <h2 className="text-2xl font-bold">{failed}</h2>
                    <p className="text-slate-400 text-sm">Failed</p>
                </div>

            </div>

            <div className="mt-8 flex flex-col md:flex-row gap-4">

                <div className="relative flex-1">

                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

                    <input
                        type="text"
                        placeholder="Search Order ID..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-[#1e293b] py-3 pl-11 pr-4 outline-none focus:border-cyan-500"
                    />

                </div>

                <div className="flex gap-2 flex-wrap">

                    {["all", "paid", "pending", "failed"].map((item) => (
                        <button
                            key={item}
                            onClick={() => setFilter(item)}
                            className={`px-4 py-2 rounded-xl border transition ${filter === item
                                ? "bg-cyan-600 border-cyan-600"
                                : "border-slate-700 bg-[#1e293b]"
                                }`}
                        >
                            {item}
                        </button>
                    ))}

                </div>

            </div>

            {filteredOrders.length === 0 ? (
                <div className="mt-10 rounded-2xl border border-slate-700 bg-[#1e293b] p-10 text-center">

                    <FaWallet className="mx-auto text-5xl text-slate-500" />

                    <h2 className="mt-5 text-2xl font-semibold">
                        No Payment Orders Found
                    </h2>

                    <p className="mt-2 text-slate-400">
                        You haven't made any wallet recharge yet.
                    </p>

                    <button
                        onClick={() => navigate("/wallet")}
                        className="mt-6 rounded-xl bg-cyan-600 px-6 py-3 font-medium hover:bg-cyan-700"
                    >
                        Add Money
                    </button>

                </div>
            ) : (
                <div className="grid lg:grid-cols-2 gap-5 mt-8">
                    {filteredOrders.map((item) => (
                        <motion.div
                            whileHover={{ y: -3 }}
                            key={item._id}
                            className="rounded-2xl border border-slate-700 bg-[#1e293b] p-5"
                        >

                            <div className="flex justify-between items-center">

                                <div>

                                    <p className="text-slate-400 text-sm">
                                        Wallet Recharge
                                    </p>

                                    <h2 className="text-3xl font-bold mt-2">
                                        ₹ {item.amount}
                                    </h2>

                                </div>

                                <span
                                    className={`px-3 py-1 rounded-full text-sm capitalize ${item.status === "paid"
                                        ? "bg-green-500/20 text-green-400"
                                        : item.status === "pending"
                                            ? "bg-yellow-500/20 text-yellow-400"
                                            : "bg-red-500/20 text-red-400"
                                        }`}
                                >
                                    {item.status}
                                </span>

                            </div>

                            <div className="mt-6 space-y-3 text-sm">

                                <div className="flex justify-between">
                                    <span className="text-slate-400">Order ID</span>
                                    <span>{item.orderId}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-slate-400">Payment ID</span>
                                    <span>{item.paymentId || "********"}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-slate-400">Date</span>
                                    <span>{item.createdAt}</span>
                                </div>

                            </div>

                        </motion.div>
                    ))}
                </div>
            )}



        </div>

  
    );
}