import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import logo from "../img/logo.png";
import {
    FaUser,
    FaEnvelope,
    FaGamepad,
    FaIdCard,
    FaLock,
    FaEye,
    FaEyeSlash,
} from "react-icons/fa";

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate()
    const { setUser } = useContext(AuthContext)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        gameName: "",
        uid: "",
        password: ""
    });

    const handleSubmit = async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        let result = await res.json();
        if (result.success) {
            console.log(result.user);
            setUser(result.user)
            navigate("/home")
        } else {
            alert("Enter Vaild Data")
        }
    }

    return (
        <div className="min-h-screen bg-[#0B0B11] flex items-center justify-center px-5 py-10">

            {/* Background Blur */}
            <div className="absolute w-72 h-72 bg-violet-600/20 blur-[140px] rounded-full top-0 left-0" />
            <div className="absolute w-72 h-72 bg-fuchsia-600/20 blur-[140px] rounded-full bottom-0 right-0" />

            <motion.div
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: .5 }}
                className="relative z-10 w-full max-w-md"
            >

                {/* Logo */}
                <div className="flex justify-center mb-7">

                    <motion.div
                        whileHover={{ scale: 1.08 }}
                        className="w-20 h-20 rounded-full shadow-[0_0_40px_rgba(139,92,246,.45)]"
                    >
                        <img src={logo} alt="Logo" className="size-20 overflow-hidden object-contain rounded-full" />

                    </motion.div>

                </div>

                {/* Heading */}

                <div className="text-center mb-8">

                    <h1 className="text-3xl font-bold text-white">
                        Create Account
                    </h1>

                    <p className="text-gray-400 mt-2">
                        Join ArenaX & start winning tournaments.
                    </p>

                </div>

                {/* Card */}

                <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 space-y-5">

                    {/* Full Name */}

                    <div>

                        <label className="text-sm text-gray-300">
                            Full Name
                        </label>

                        <div className="mt-2 flex items-center gap-3 rounded-2xl bg-[#181824] border border-white/10 px-4 h-14">

                            <FaUser className="text-violet-400" />

                            <input
                                type="text"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value,
                                    })
                                }
                                className="bg-transparent outline-none text-white w-full placeholder:text-gray-500"
                            />

                        </div>

                    </div>

                    {/* Email */}

                    <div>

                        <label className="text-sm text-gray-300">
                            Email
                        </label>

                        <div className="mt-2 flex items-center gap-3 rounded-2xl bg-[#181824] border border-white/10 px-4 h-14">

                            <FaEnvelope className="text-violet-400" />

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })
                                }
                                className="bg-transparent outline-none text-white w-full placeholder:text-gray-500"
                            />

                        </div>

                    </div>

                    {/* Game Name */}

                    <div>

                        <label className="text-sm text-gray-300">
                            Free Fire Game Name
                        </label>

                        <div className="mt-2 flex items-center gap-3 rounded-2xl bg-[#181824] border border-white/10 px-4 h-14">

                            <FaGamepad className="text-violet-400" />

                            <input
                                type="text"
                                placeholder="Enter your IGN"
                                value={formData.gameName}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        gameName: e.target.value,
                                    })
                                }
                                className="bg-transparent outline-none text-white w-full placeholder:text-gray-500"
                            />

                        </div>

                    </div>

                    {/* Game UID */}

                    <div>

                        <label className="text-sm text-gray-300">
                            Free Fire UID
                        </label>

                        <div className="mt-2 flex items-center gap-3 rounded-2xl bg-[#181824] border border-white/10 px-4 h-14">

                            <FaIdCard className="text-violet-400" />

                            <input
                                type="number"
                                placeholder="Enter your UID"
                                value={formData.uid}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        uid: e.target.value,
                                    })
                                }
                                className="bg-transparent outline-none text-white w-full placeholder:text-gray-500"
                            />

                        </div>

                    </div>

                    {/* Password */}

                    <div>

                        <label className="text-sm text-gray-300">
                            Password
                        </label>

                        <div className="mt-2 flex items-center gap-3 rounded-2xl bg-[#181824] border border-white/10 px-4 h-14">

                            <FaLock className="text-violet-400" />

                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Create password"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        password: e.target.value,
                                    })
                                }
                                className="bg-transparent outline-none text-white w-full placeholder:text-gray-500"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <FaEyeSlash className="text-gray-400" />
                                ) : (
                                    <FaEye className="text-gray-400" />
                                )}
                            </button>

                        </div>

                    </div>

                    {/* Password Strength */}

                    <div className="space-y-2">

                        <div className="h-2 rounded-full bg-[#202030] overflow-hidden">

                            <motion.div
                                initial={{ width: 0 }}
                                animate={{
                                    width:
                                        formData.password.length === 0
                                            ? "0%"
                                            : formData.password.length < 6
                                                ? "35%"
                                                : formData.password.length < 8
                                                    ? "70%"
                                                    : "100%",
                                }}
                                transition={{ duration: .3 }}
                                className={`h-full rounded-full ${formData.password.length < 6
                                    ? "bg-red-500"
                                    : formData.password.length < 8
                                        ? "bg-yellow-400"
                                        : "bg-green-500"
                                    }`}
                            />

                        </div>

                        <p className="text-xs text-gray-400">

                            {formData.password.length === 0
                                ? "Password must contain at least 8 characters."
                                : formData.password.length < 6
                                    ? "Weak Password"
                                    : formData.password.length < 8
                                        ? "Medium Password"
                                        : "Strong Password"}

                        </p>

                    </div>

                    {/* Signup Button */}

                    <motion.button
                        whileTap={{ scale: .97 }}
                        whileHover={{ scale: 1.02 }}
                        onClick={handleSubmit}
                        className="w-full h-14 rounded-2xl bg-linear-to-r from-violet-600 to-fuchsia-600 text-white font-semibold shadow-[0_0_35px_rgba(139,92,246,.35)]"
                    >
                        Create Account
                    </motion.button>

                    {/* Divider */}

                    <div className="flex items-center gap-3">

                        <div className="flex-1 h-px bg-white/10" />

                        <span className="text-xs text-gray-500">
                            OR
                        </span>

                        <div className="flex-1 h-px bg-white/10" />

                    </div>

                    {/* Login */}

                    <p className="text-center text-gray-400 text-sm">

                        Already have an account?{" "}

                        <Link
                            to="/login"
                            className="text-violet-400 hover:text-violet-300 font-semibold"
                        >
                            Login
                        </Link>

                    </p>

                </div>

            </motion.div>

        </div>
    );
};

export default Signup;