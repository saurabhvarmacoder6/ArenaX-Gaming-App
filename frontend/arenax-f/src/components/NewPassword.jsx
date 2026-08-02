import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    FaLock,
    FaEye,
    FaEyeSlash,
    FaCheckCircle,
} from "react-icons/fa";
import logo from "../img/logo.png";
import api from "../api/api";
import { useLocation, useNavigate } from "react-router-dom";
const NewPassword = () => {

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isPasswordChanged, setIsPasswordChanged] = useState(false);
    const navigate = useNavigate();

    const location = useLocation();

    const email = location.state?.email;

    const handleNewPasswordChange = async () => {
        try {
            const response = await api.post("/api/auth/reset-password", {
                email,
                password: newPassword,
            });

            if (response.data.success) {
                setIsPasswordChanged(true);
                setNewPassword("");
                setConfirmPassword("");
                navigate("/login");
            }
        } catch (error) {
            console.error("Error resetting password:", error);
        }
    };


    const passwordsMatch =
        confirmPassword === "" || newPassword === confirmPassword;
    return (

        <div className="min-h-screen bg-[#0B0B11] flex items-center justify-center px-5 py-10">

            {/* Background */}

            <div className="absolute w-72 h-72 bg-sky-600/20 blur-[140px] rounded-full top-0 left-0" />

            <div className="absolute w-72 h-72 bg-cyan-500/20 blur-[140px] rounded-full bottom-0 right-0" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-md"
            >

                {/* Logo */}

                <div className="flex justify-center mb-8">

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="size-20 rounded-full shadow-[0_0_35px_rgba(14,165,233,.35)]"
                    >

                        <img
                            src={logo}
                            alt=""
                            className="size-20 rounded-full object-cover"
                        />

                    </motion.div>

                </div>

                {/* Heading */}

                <div className="text-center mb-8">

                    <h1 className="text-3xl font-bold text-white">
                        Create New Password
                    </h1>

                    <p className="text-gray-400 mt-2">
                        Your new password must be different from your previous password.
                    </p>

                </div>

                {/* Card */}

                <div className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl p-6 space-y-5">

                    {/* New Password */}

                    <div>

                        <label className="text-sm text-gray-300">
                            New Password
                        </label>

                        <div className="mt-2 flex items-center h-14 rounded-2xl bg-[#181824] border border-white/10 px-4">

                            <FaLock className="text-sky-400" />

                            <input
                                type={showNew ? "text" : "password"}
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="flex-1 bg-transparent outline-none px-3 text-white placeholder:text-gray-500"
                            />

                            <button
                                type="button"
                                onClick={() => setShowNew(!showNew)}
                                className="text-gray-400"
                            >

                                {showNew ? <FaEyeSlash /> : <FaEye />}

                            </button>

                        </div>

                    </div>





                    {/* Confirm Password */}

                    <div>

                        <label className="text-sm text-gray-300">
                            Confirm Password
                        </label>

                        <div
                            className={`mt-2 flex items-center h-14 rounded-2xl bg-[#181824] px-4 border ${passwordsMatch
                                ? "border-white/10"
                                : "border-red-500"
                                }`}
                        >

                            <FaLock className="text-sky-400" />

                            <input
                                type={showConfirm ? "text" : "password"}
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                className="flex-1 bg-transparent outline-none px-3 text-white placeholder:text-gray-500"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirm(!showConfirm)
                                }
                                className="text-gray-400"
                            >

                                {showConfirm ? (
                                    <FaEyeSlash />
                                ) : (
                                    <FaEye />
                                )}

                            </button>

                        </div>

                        {confirmPassword && !passwordsMatch && (
                            <p className="text-red-400 text-sm mt-2">
                                Passwords do not match.
                            </p>
                        )}

                        {confirmPassword && passwordsMatch && (
                            <p className="text-green-400 text-sm mt-2">
                                Passwords match.
                            </p>
                        )}

                    </div>

                    {/* Password Tips */}

                    <div className="rounded-2xl bg-sky-500/10 border border-sky-500/20 p-4">

                        <div className="flex gap-3">

                            <FaCheckCircle className="text-sky-400 mt-1" />

                            <div className="text-sm text-gray-300 leading-6">

                                <p>
                                    Password should contain at least
                                    <span className="text-sky-400 font-semibold">
                                        {" "}8 characters
                                    </span>.
                                </p>

                                <p>
                                    Use uppercase, lowercase, number and special character for better security.
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* Button */}

                    <motion.button

                        onClick={handleNewPasswordChange}
                        disabled={
                            !newPassword ||
                            !confirmPassword ||
                            !passwordsMatch
                        }
                        className={`w-full h-14 rounded-2xl text-white font-semibold transition ${!newPassword ||
                            !confirmPassword ||
                            !passwordsMatch
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-sky-600 hover:bg-sky-700"
                            }`}
                    >
                        Reset Password
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

                        Back to{" "}

                        <Link
                            to="/login"
                            className="text-sky-400 hover:text-sky-300 font-semibold"
                        >

                            Login

                        </Link>

                    </p>

                </div>

            </motion.div>

        </div>

    );
};

export default NewPassword;