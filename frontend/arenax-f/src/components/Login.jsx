import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import logo from "../img/logo.png";
import {
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
} from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const {setUser}=useContext(AuthContext)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async () => {
     
        const res = await fetch("https://arenax-gaming-app.onrender.com/api/auth/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        let result = await res.json();
        if (result.success) {
            setUser(result.user)
            navigate("/home")
        } else {
            alert("Enter Vaild Email Or Password")
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
                        Welcome Back
                    </h1>

                    <p className="text-gray-400 mt-2">
                        Login to continue your ArenaX journey.
                    </p>

                </div>

                {/* Card */}

                <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 space-y-5">

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

                    {/* Password */}

                    <div>

                        <label className="text-sm text-gray-300">
                            Password
                        </label>

                        <div className="mt-2 flex items-center gap-3 rounded-2xl bg-[#181824] border border-white/10 px-4 h-14">

                            <FaLock className="text-violet-400" />

                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
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

                    {/* Forgot Password */}

                    <div className="flex justify-end">

                        <Link
                            to="/forgot-password"
                            className="text-sm text-violet-400 hover:text-violet-300 transition"
                        >
                            Forgot Password?
                        </Link>

                    </div>

                    {/* Login Button */}

                    <motion.button
                        onClick={handleSubmit}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full h-14 rounded-2xl bg-linear-to-r from-violet-600 to-fuchsia-600 text-white font-semibold shadow-[0_0_35px_rgba(139,92,246,.35)]"
                    >
                        Login
                    </motion.button>

                    {/* Divider */}

                    <div className="flex items-center gap-3">

                        <div className="flex-1 h-px bg-white/10" />

                        <span className="text-xs text-gray-500">
                            OR
                        </span>

                        <div className="flex-1 h-px bg-white/10" />

                    </div>

                    {/* Signup */}

                    <p className="text-center text-gray-400 text-sm">

                        Don't have an account?{" "}

                        <Link
                            to="/signup"
                            className="text-violet-400 hover:text-violet-300 font-semibold"
                        >
                            Create Account
                        </Link>

                    </p>

                </div>

            </motion.div>

        </div>
    );
};

export default Login;