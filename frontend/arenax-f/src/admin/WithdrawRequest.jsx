import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
    FaMoneyCheckAlt,
    FaSearch,
    FaCheckCircle,
    FaTimesCircle,
    FaClock,
    FaUserCircle,
} from "react-icons/fa";
import api from "../api/api";



export default function WithdrawRequest() {
    const [requests, setRequests] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");


    useMemo(() => {
        handleWithdrawData();
    }, [])


    async function handleWithdrawData() {
        try {
            const { data } = await api.get("/api/payment/getWithdrawData")
            setRequests(data.data)
        } catch (error) {
            console.error(error);
        }
    }

    async function handleRejectWithdraw(id, adminNote) {
        try {
            const { data } = await api.patch(`/api/payment/withdraw/${id}/reject`, { adminNote });
            setRequests((prevRequests) =>
                prevRequests.map((request) =>
                    request._id === id ? { ...request, status: "rejected" } : request
                )
            );
        } catch (error) {
            console.error(error);
        }
    }

    async function handleMarkPaid(id) {
        try {
            const { data } = await api.patch(`/api/payment/withdraw/${id}/paid`);
            setRequests((prevRequests) =>
                prevRequests.map((request) =>
                    request._id === id ? { ...request, status: "paid" } : request
                )
            );
        } catch (error) {
            console.error(error);
        }
    }

    const filteredData = useMemo(() => {
        return requests.filter((item) => {
            const matchSearch =
                item.userName.toLowerCase().includes(search.toLowerCase()) ||
                item.upiId.toLowerCase().includes(search.toLowerCase());

            const matchStatus =
                filter === "all" ? true : item.status === filter;

            return matchSearch && matchStatus;
        });
    }, [requests, search, filter]);

    return (
        <div className="space-y-6">

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold text-gray-900">
                        Withdraw Requests
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage user withdrawal requests.
                    </p>

                </div>

            </div>

            {/* Search */}

            <div className="relative">

                <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                    type="text"
                    placeholder="Search by User or UPI ID..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 bg-white py-4 pl-14 pr-4 outline-none focus:border-sky-500"
                />

            </div>

            {/* Filters */}

            <div className="flex gap-3 flex-wrap">

                {["all", "pending", "paid", "rejected"].map((item) => (

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

                {filteredData.length > 0 ? (

                    filteredData.map((item) => (

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
                                            {item.upiId}
                                        </p>

                                    </div>

                                </div>

                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium capitalize
                  ${item.status === "pending"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : item.status === "paid"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {item.status}
                                </span>

                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-5">

                                <div>

                                    <p className="text-gray-500 text-sm">
                                        Amount
                                    </p>

                                    <h3 className="text-2xl font-bold mt-2">
                                        ₹ {item.amount}
                                    </h3>

                                </div>

                                <div>

                                    <p className="text-gray-500 text-sm">
                                        Requested On
                                    </p>

                                    <h3 className="font-semibold mt-2">
                                        {item.createdAt}
                                    </h3>

                                </div>

                            </div>

                            {item.status === "pending" && (

                                <div className="flex gap-3 mt-8">

                                    <button
                                        onClick={() => handleMarkPaid(item._id)}
                                        className="flex-1 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium flex items-center justify-center gap-2"
                                    >
                                        <FaCheckCircle />

                                        Mark Paid

                                    </button>

                                    <button
                                        onClick={() => handleRejectWithdraw(item._id, "Admin rejected the request.")}
                                        className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium flex items-center justify-center gap-2"
                                    >
                                        <FaTimesCircle />

                                        Reject

                                    </button>

                                </div>

                            )}

                            {item.status === "paid" && (

                                <div className="mt-8 rounded-xl bg-green-100 text-green-700 py-3 text-center font-medium flex items-center justify-center gap-2">

                                    <FaCheckCircle />

                                    Payment Completed

                                </div>

                            )}

                            {item.status === "rejected" && (

                                <div className="mt-8 rounded-xl bg-red-100 text-red-700 py-3 text-center font-medium flex items-center justify-center gap-2">

                                    <FaClock />

                                    Request Rejected

                                </div>

                            )}

                        </motion.div>

                    ))

                ) : (

                    <div className="col-span-full bg-white rounded-3xl border border-gray-200 py-20">

                        <div className="flex flex-col items-center">

                            <FaMoneyCheckAlt className="text-5xl text-gray-400" />

                            <h2 className="text-2xl font-bold mt-6">
                                No Withdraw Requests
                            </h2>

                            <p className="text-gray-500 mt-2">
                                No withdrawal request found.
                            </p>

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
}