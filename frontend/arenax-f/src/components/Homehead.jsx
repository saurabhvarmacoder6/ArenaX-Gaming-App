import { motion } from "framer-motion";
import { FaBell } from "react-icons/fa";
import logo from "../img/logo.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/api";

const Homehead = () => {
  const navigate = useNavigate()
  const [notificationLength, setNotificationLength] = useState(0)

  useEffect(() => {
    getNotifications();
  }, []);

  async function getNotifications() {

    try {

      const { data } = await api.get("/api/auth/get-notifications");
      setNotificationLength(data.total);

    } catch (error) {

      console.log(error);

    }

  }
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 border-b w-full border-zinc-800/50 bg-[#09090B]/90 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-20 items-center w-full justify-between px-5">

        {/* Logo */}
        <div className="flex items-center gap-3">

          <div className="flex size-12 z-50 items-center justify-center rounded-full shadow-[0_0_25px_rgba(139,92,246,0.45)]">
            <img src={logo} alt="Logo" className="size-12 overflow-hidden object-contain rounded-full" />
          </div>

          <div>
            <h1 className="text-xl font-extrabold tracking-wide text-white">
              Arena<span className="text-violet-500">X</span>
            </h1>

            <p className="text-xs tracking-[3px] uppercase text-zinc-500">
              Esports Platform
            </p>
          </div>

        </div>

        {/* Notification */}
        <motion.button
          onClick={() => navigate("/show-notification")}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex h-12 w-12 items-center justify-center rounded-2xl border  transition-all duration-300 hover:border-violet-500 hover:bg-zinc-800"
        >
          <FaBell className="text-lg text-white" />

          {/* Badge */}
          {notificationLength > 0 && (
            <span className="absolute right-2 top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
              {notificationLength > 99 ? "99+" : notificationLength}
            </span>
          )}
        </motion.button>

      </div>
    </motion.header>
  );
};

export default Homehead;