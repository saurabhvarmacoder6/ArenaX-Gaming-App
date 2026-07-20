import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaGamepad } from "react-icons/fa";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/signup"); // Change to /login if needed
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden bg-[#09090B]">

      {/* Glow */}
      <div className="absolute h-72 w-72 rounded-full bg-violet-600/20 blur-3xl"></div>

      {/* Content */}
      <div className="z-10 flex flex-col items-center">

        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex h-28 w-28 items-center justify-center rounded-full border border-violet-500/40 bg-zinc-900 shadow-[0_0_50px_rgba(124,58,237,.45)]"
        >
          <FaGamepad className="text-5xl text-violet-500" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-5xl font-extrabold tracking-wider text-white"
        >
          Arena
          <span className="text-violet-500">X</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-2 text-zinc-400 tracking-[5px] uppercase text-sm"
        >
          Compete • Win • Repeat
        </motion.p>

        {/* Loader */}
        <div className="mt-12 flex gap-2">
          <motion.span
            animate={{ y: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="h-3 w-3 rounded-full bg-violet-500"
          />
          <motion.span
            animate={{ y: [5, -5, 5] }}
            transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
            className="h-3 w-3 rounded-full bg-violet-400"
          />
          <motion.span
            animate={{ y: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
            className="h-3 w-3 rounded-full bg-violet-300"
          />
        </div>

      </div>

      {/* Bottom Blur */}
      <div className="absolute bottom-0 h-32 w-full bg-linear-to-t from-violet-600/10 to-transparent"></div>
    </div>
  );
};

export default Splash;