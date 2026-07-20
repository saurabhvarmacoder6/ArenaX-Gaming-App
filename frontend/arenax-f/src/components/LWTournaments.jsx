// ===============================================
// IMPORTS
// ===============================================

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import lwsolo from "../img/lwsolo.png";
import lwduo from "../img/lwduo.png";
import {
  FaArrowLeft,
  FaSearch,
  FaCrosshairs,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// ===============================================
// LW TOURNAMENT PAGE
// ===============================================

const LWTournament = () => {

  const navigate = useNavigate();

  // ===============================================
  // STATES
  // ===============================================

  const [selectedFilter, setSelectedFilter] = useState("All");
  const [search, setSearch] = useState("");

  // ===============================================
  // DUMMY DATA
  // Backend se replace hoga
  // ===============================================

  const tournaments = [

    {
      id: 1,
      title: "LW 1v1 Night",
      mode: "1v1",
      banner: lwsolo,
      entryFee: 20,
      prizePool: 200,
      totalSlots: 2,
      joinedSlots: 1,
      map: "Iron Cage",
      date: "25 July",
      time: "08:00 PM",
      status: "LIVE",
    },

    {
      id: 2,
      title: "Weekend Duel",
      mode: "1v1",
      banner: lwsolo,
      entryFee: 30,
      prizePool: 350,
      totalSlots: 2,
      joinedSlots: 2,
      map: "Iron Cage",
      date: "26 July",
      time: "09:00 PM",
      status: "UPCOMING",
    },

    {
      id: 3,
      title: "LW Duo Clash",
      mode: "2v2",
      banner: lwduo,
      entryFee: 50,
      prizePool: 600,
      totalSlots: 4,
      joinedSlots: 3,
      map: "Iron Cage",
      date: "27 July",
      time: "07:30 PM",
      status: "LIVE",
    },

    {
      id: 4,
      title: "Pro Duo League",
      mode: "2v2",
      banner: lwduo,
      entryFee: 80,
      prizePool: 1000,
      totalSlots: 4,
      joinedSlots: 2,
      map: "Iron Cage",
      date: "28 July",
      time: "10:00 PM",
      status: "UPCOMING",
    },

  ];

  // ===============================================
  // SEARCH + FILTER LOGIC
  // ===============================================

  const filteredTournament = useMemo(() => {

    return tournaments.filter((item) => {

      const filterMatch =
        selectedFilter === "All"
          ? true
          : item.mode === selectedFilter;

      const searchMatch =
        item.title
          .toLowerCase()
          .includes(search.toLowerCase());

      return filterMatch && searchMatch;

    });

  }, [selectedFilter, search]);

  // ===============================================
  // UI
  // ===============================================

  return (

    <div className="min-h-screen bg-[#09090F] text-white pb-20">

      {/* ===============================================
          HEADER
      =============================================== */}

      <div className="sticky top-0 z-50 backdrop-blur-xl bg-[#09090F]/90 border-b border-white/10">

        <div className="px-5 pt-5 pb-4">

          <div className="flex items-center justify-between">

            <button
              onClick={() => navigate(-1)}
              className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-600 transition"
            >
              <FaArrowLeft />
            </button>

            <div className="text-start flex-1 ml-4">

              <h1 className="text-2xl font-bold">
                Lone Wolf
              </h1>

              <p className="text-sm font-semibold text-gray-400">
                Challenge Your Opponent
              </p>

            </div>

            <div className="w-11" />

          </div>

        </div>

      </div>

      {/* ===============================================
          PAGE CONTENT
      =============================================== */}

      <div className="px-5 pt-6">

        {/* Title */}

        <motion.div

          initial={{ opacity: 0, y: 20 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ duration: .5 }}

        >

          <div className="flex items-center gap-3">

            <FaCrosshairs className="text-red-500 text-2xl" />

            <h2 className="text-3xl font-bold">
              Find Your Opponent
            </h2>

          </div>

          <p className="text-gray-400 mt-2 font-semibold">
            Enter the arena and prove your skills.
          </p>

        </motion.div>

        {/* ===============================================
            SEARCH BAR
        =============================================== */}

        <motion.div

          initial={{ opacity: 0 }}

          animate={{ opacity: 1 }}

          transition={{ delay: .2 }}

          className="mt-7"

        >

          <div className="flex items-center bg-[#171722] rounded-2xl px-4 py-4 border border-white/10">

            <FaSearch className="text-gray-400" />

            <input

              type="text"

              placeholder="Search duel..."

              value={search}

              onChange={(e) => setSearch(e.target.value)}

              className="bg-transparent outline-none ml-3 w-full placeholder:text-gray-500"

            />

          </div>

        </motion.div>

        {/* ===============================================
            FILTER BUTTONS
        =============================================== */}

        <motion.div

          initial={{ opacity: 0 }}

          animate={{ opacity: 1 }}

          transition={{ delay: .3 }}

          className="flex gap-3 mt-7 overflow-x-auto scrollbar-hide"

        >

          {["All", "1v1", "2v2"].map((item) => (

            <button

              key={item}

              onClick={() => setSelectedFilter(item)}

              className={`px-6 py-3 rounded-full whitespace-nowrap transition-all duration-300

              ${
                selectedFilter === item
                  ? "bg-red-600 shadow-lg shadow-red-600/30"
                  : "bg-[#171722] border border-white/10 hover:border-red-500"
              }

              `}

            >

              {item}

            </button>

          ))}

        </motion.div>

        {/* ===============================================
            TOURNAMENT CARDS
            PART 2 STARTS HERE
        =============================================== */}

      {/* ===============================================
    TOURNAMENT CARDS
=============================================== */}

<div className="mt-8 space-y-6">

  {filteredTournament.length > 0 ? (

    filteredTournament.map((tournament, index) => {

      const progress =
        (tournament.joinedSlots / tournament.totalSlots) * 100;

      const matchReady =
        tournament.joinedSlots === tournament.totalSlots;

      return (

        <motion.div
          key={tournament.id}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: .45,
            delay: index * .08,
          }}
          whileHover={{
            scale: 1.015,
          }}
          className="rounded-3xl overflow-hidden border border-white/10 bg-[#171722]"
        >

          {/* ===============================================
              TOP SECTION
          =============================================== */}

          <div className="relative h-44 ">
            <img src={tournament.banner} alt={tournament.title} className="h-full w-full object-cover" />
            {/* Status */}

            <div
              className={`absolute top-1 left-1 px-4 py-2 rounded-full text-xs font-bold tracking-wider

              ${
                tournament.status === "LIVE"
                  ? "bg-red-400"
                  : "bg-emerald-500"
              }

              `}
            >
              {tournament.status}
            </div>

          </div>

          {/* ===============================================
              CONTENT
          =============================================== */}

          <div className="p-5">

            <h2 className="text-2xl font-bold">

              {tournament.title}

            </h2>

            <p className="text-gray-400 font-semibold mt-1">

              Only the strongest survives.

            </p>

            

            {/* INFO */}

            <div className="grid grid-cols-2 gap-3 font-semibold mt-6">

              <div className="bg-white/5 rounded-xl  p-4">

                <p className="text-gray-400 text-sm">

                  Entry Fee

                </p>

                <h3 className="font-bold text-xl mt-1">

                  ₹{tournament.entryFee}

                </h3>

              </div>

              <div className="bg-white/5 rounded-xl p-4">

                <p className="text-gray-400 text-sm">

                  Prize Pool

                </p>

                <h3 className="font-bold text-xl text-yellow-400 mt-1">

                  ₹{tournament.prizePool}

                </h3>

              </div>

            </div>

            {/* MAP */}

            <div className="flex font-semibold justify-between mt-6 text-sm text-gray-400">

              <span>

                📍 {tournament.map}

              </span>

              <span>

                👥 {tournament.joinedSlots}/{tournament.totalSlots}

              </span>

            </div>

            <div className="flex font-semibold justify-between mt-2 text-sm text-gray-400">

              <span>

                📅 {tournament.date}

              </span>

              <span>

                🕒 {tournament.time}

              </span>

            </div>

            {/* PROGRESS */}

            <div className="mt-6">

              <div className="flex font-semibold justify-between text-sm mb-2">

                <span>

                  Players Joined

                </span>

                <span>

                  {Math.floor(progress)}%

                </span>

              </div>

              <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">

                <motion.div

                  initial={{ width: 0 }}

                  animate={{
                    width: `${progress}%`,
                  }}

                  transition={{
                    duration: 1,
                  }}

                  className="h-full rounded-full bg-linear-to-r from-red-500 to-orange-500"

                />

              </div>

            </div>

            {/* BUTTONS */}

            <div className="flex gap-3 mt-7">

              <button
              onClick={() => navigate("/detail")}
              className="flex-1 py-3 rounded-2xl border border-red-500 text-red-400 hover:bg-red-500 hover:text-white transition">

                Details

              </button>

              <button className="flex-1 py-3 rounded-2xl bg-linear-to-r from-red-600 to-orange-500 hover:scale-[1.03] transition font-semibold">

                Join Battle

              </button>

            </div>

          </div>

        </motion.div>

      );

    })

  ) : (

    <motion.div

      initial={{ opacity: 0 }}

      animate={{ opacity: 1 }}

      className="text-center py-24"

    >

      <h2 className="text-3xl font-bold">

         No Duel Found

      </h2>

      <p className="text-gray-400 mt-3">

        Try changing the filter or search keyword.

      </p>

    </motion.div>

  )}

</div>

      </div>

    </div>

  );

};

export default LWTournament;