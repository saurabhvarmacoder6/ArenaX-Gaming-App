import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-[#0B0B12] flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        
        <motion.div
          className="relative h-20 w-20"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "linear",
          }}
        >
          <div className="absolute inset-0 rounded-full border-4 border-white/10"></div>

          <div className="absolute inset-0 rounded-full border-t-4 border-cyan-400 border-r-4 border-r-transparent border-b-transparent border-l-transparent"></div>
        </motion.div>

        <div className="text-center">
          <motion.h2
            className="text-white text-2xl font-bold"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
            }}
          >
            ArenaX
          </motion.h2>

          <p className="text-gray-400 text-sm mt-2">
            Loading...
          </p>
        </div>
      </div>
    </div>
  );
}