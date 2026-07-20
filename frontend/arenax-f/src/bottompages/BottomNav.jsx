import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

import { FaHouse, FaWallet, FaUser } from "react-icons/fa6";
import { MdEmojiEvents } from "react-icons/md";

function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const menus = [
    {
      name: "Home",
      icon: <FaHouse />,
      path: "/home",
    },
    {
      name: "Matches",
      icon: <MdEmojiEvents />,
      path: "/mymatches",
    },
    {
      name: "Wallet",
      icon: <FaWallet />,
      path: "/wallet",
    },
    {
      name: "Profile",
      icon: <FaUser />,
      path: "/profile",
    },
  ];

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[94%] max-w-md z-50"
    >
      <div className="rounded-full border border-white/10 bg-[#15151F]/85 backdrop-blur-2xl shadow-[0_0_40px_rgba(139,92,246,.15)] px-3 py-2">

        <div className="grid grid-cols-4">

          {menus.map((item) => {

            const active = location.pathname === item.path;

            return (

              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center gap-1 py-2"
              >

                <div className="relative flex items-center justify-center w-12 h-12">

                  {active && (

                    <motion.div
                      layoutId="activeTab"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 28,
                      }}
                      className="absolute inset-0 rounded-full bg-linear-to-br from-violet-600 to-fuchsia-600 shadow-lg shadow-violet-500/40"
                    />

                  )}

                  <span
                    className={`relative z-10 text-lg transition-all duration-300 ${
                      active
                        ? "text-white scale-110"
                        : "text-gray-400 group-hover:text-violet-400"
                    }`}
                  >
                    {item.icon}
                  </span>

                </div>

                <span
                  className={`text-[11px] font-medium transition-all duration-300 ${
                    active ? "text-white" : "text-gray-400"
                  }`}
                >
                  {item.name}
                </span>

              </button>

            );

          })}

        </div>

      </div>
    </motion.div>
  );
}

export default BottomNav;