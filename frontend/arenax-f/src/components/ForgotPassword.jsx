import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaEnvelope, FaKey } from "react-icons/fa";
import logo from "../img/logo.png";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [timer, setTimer] = useState(0); // 5 minutes in seconds
    const navigate = useNavigate(); // Import useNavigate from react-router-dom

    useEffect(() => {
        if (timer <= 0) {
            setIsOtpSent(false);
            return;
        }

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);

    }, [timer]);

    const handleSendOtp = async () => {
        try {
            const { data } = await api.post("/api/auth/forgot-password", { email });
            if (data.success) {
                setIsOtpSent(true);
                setTimer(300);
            } else {
                console.error("Error sending OTP:", data.msg);
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const { data } = await api.post("/api/auth/verify-otp", { email, otp });
            if (data.success) {
                setIsOtpVerified(true);
                navigate("/new-password", { state: { email } }); // Navigate to reset password page with email
            } else {
                console.error("Error verifying OTP:", data.msg);
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
        }
    };



    return (
        <div className="min-h-screen bg-[#0B0B11] flex items-center justify-center px-5 py-10">

            {/* Background Blur */}

            <div className="absolute w-72 h-72 bg-violet-600/20 blur-[140px] rounded-full top-0 left-0" />
            <div className="absolute w-72 h-72 bg-fuchsia-600/20 blur-[140px] rounded-full bottom-0 right-0" />

            <motion.div
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
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
                        Forgot Password
                    </h1>

                    <p className="text-gray-400 mt-2 leading-relaxed">
                        Enter your registered email address.
                        <br />
                        We'll send you a 6-digit verification code.
                    </p>

                </div>

                {/* Card */}

                <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 space-y-5">

                    {/* Email */}

                    <div>

                        <label className="text-sm text-gray-300">
                            Registered Email
                        </label>

                        <div className="mt-2 flex items-center gap-3 rounded-2xl bg-[#181824] border border-white/10 px-4 h-14">

                            <FaEnvelope className="text-violet-400" />

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-transparent outline-none text-white w-full placeholder:text-gray-500"
                            />



                        </div>

                        <div className="mt-2 flex items-center gap-3 rounded-2xl bg-[#181824] border border-white/10 px-4 h-14">

                            <FaKey className="text-violet-400" />

                            <input
                                type="text"
                                maxLength={6}
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="flex-1 bg-transparent outline-none text-white w-full placeholder:text-gray-500"
                            />

                            <button

                                onClick={() => {
                                    handleSendOtp();
                                }}

                                disabled={isOtpSent}
                                className="px-2 py-2 rounded-xl text-sm bg-violet-600 text-white font-semibold hover:bg-violet-500 transition">

                               {isOtpSent ? "Sent" : "Send OTP"}

                            </button>

                        </div>

                        <div className="flex justify-between items-center mt-2">
                            <p className="text-sm text-gray-400 mt-2">
                                Didn't receive the code?{" "}
                                <button
                                    onClick={async () => {
                                        await handleSendOtp();
                                    }}
                                    disabled={timer > 0}
                                    className="text-violet-400 hover:text-violet-300 font-semibold">
                                    Resend
                                </button>
                            </p>
                            <p className="text-sm text-gray-400 mt-2">
                                {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}
                            </p>
                        </div>

                    </div>

                    {/* Send Reset Link Button */}

                    <motion.button
                        onClick={() => {
                            // Handle verify OTP logic here
                            handleVerifyOtp();

                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full h-14 rounded-2xl bg-linear-to-r from-violet-600 to-fuchsia-600 text-white font-semibold shadow-[0_0_35px_rgba(139,92,246,.35)]"
                    >
                        Verify OTP
                    </motion.button>

                    {/* Info */}

                    <div className="rounded-2xl border border-sky-500/20 bg-sky-500/10 p-4">

                        <p className="text-sm text-gray-300 text-center leading-relaxed">
                            A 6-digit verification code will be sent to your registered email.
                            The code will expire in 5 minutes.
                        </p>

                    </div>

                    {/* Divider */}

                    <div className="flex items-center gap-3">

                        <div className="flex-1 h-px bg-white/10" />

                        <span className="text-xs text-gray-500">
                            OR
                        </span>

                        <div className="flex-1 h-px bg-white/10" />

                    </div>

                    {/* Back to Login */}

                    <p className="text-center text-gray-400 text-sm">

                        Remember your password?{" "}

                        <Link
                            to="/login"
                            className="text-violet-400 hover:text-violet-300 font-semibold"
                        >
                            Back to Login
                        </Link>

                    </p>

                </div>

            </motion.div>

        </div>
    );
};

export default ForgotPassword;