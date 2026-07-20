
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import cssolo from "../img/cssolo.png";
import csduo from "../img/csduo.png";
import cssquad from "../img/cssquad.png";
import {
  FaArrowLeft,
  FaSearch,
  FaFire,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// ===============================
// CS TOURNAMENT PAGE
// ===============================

const CSTournament = () => {

  const navigate = useNavigate();

  // ===============================
  // FILTER STATE
  // ===============================

  const [selectedFilter, setSelectedFilter] = useState("All");
  const [search, setSearch] = useState("");

  // ===============================
  // DUMMY TOURNAMENT DATA
  // ===============================

  const tournaments = [
  {
    id: 1,
    title: "CS 1v1 Night Clash",
    mode: "1v1",
    banner: cssolo,
    map: "Bermuda",
    entryFee: 40,
    prizePool: 800,
    totalSlots: 2,
    joinedSlots: 1,
    date: "25 July",
    time: "08:00 PM",
    status: "LIVE",
  },
  {
    id: 2,
    title: "CS 4v4 Championship",
    mode: "4v4",
    banner: cssquad,
    map: "Alpine",
    entryFee: 100,
    prizePool: 3000,
    totalSlots: 8,
    joinedSlots: 6,
    date: "26 July",
    time: "09:30 PM",
    status: "UPCOMING",
  },
  {
    id: 3,
    title: "Weekend 2v2 Cup",
    mode: "2v2",
    banner: csduo,
    map: "Nexterra",
    entryFee: 30,
    prizePool: 500,
    totalSlots: 4,
    joinedSlots: 3,
    date: "27 July",
    time: "07:00 PM",
    status: "UPCOMING",
  },
];

  // ===============================
  // FILTER + SEARCH LOGIC
  // ===============================

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

  // ===============================
  // UI
  // ===============================

  return (

    <div className="min-h-screen bg-[#09090F] text-white pb-20">

      {/* ===============================
          TOP HEADER
      =============================== */}

      <div className="sticky top-0 z-50 backdrop-blur-xl bg-[#09090F]/90 border-b border-white/10">

        <div className="px-5 pt-5 pb-4">

          <div className="flex items-center justify-between">

            <button
              onClick={() => navigate(-1)}
              className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-violet-600 transition"
            >
              <FaArrowLeft />
            </button>

            <div className="text-start flex-1 ml-4">

              <h1 className="text-2xl font-bold tracking-wide">
                Clash Squad 
              </h1>

              <p className="text-sm font-semibold text-gray-400">
                Fight With Your Squad
              </p>

            </div>

            <div className="w-11" />

          </div>

        </div>

      </div>

      {/* ===============================
          PAGE CONTENT
      =============================== */}

      <div className="px-5 pt-6">

        {/* Heading */}

        <motion.div

          initial={{ opacity: 0, y: 20 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ duration: .5 }}

        >

          <div className="flex items-center gap-2">

            <FaFire className="text-orange-500 text-xl" />

            <h2 className="text-3xl font-bold">
              Find Your Match
            </h2>

          </div>

          <p className="text-gray-400 font-semibold mt-2">
            Compete with the best players and win exciting rewards.
          </p>

        </motion.div>

        {/* ===============================
            SEARCH BAR
        =============================== */}

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

              placeholder="Search tournament..."

              value={search}

              onChange={(e) => setSearch(e.target.value)}

              className="bg-transparent outline-none ml-3 w-full placeholder:text-gray-500"

            />

          </div>

        </motion.div>

        {/* ===============================
            FILTER BUTTONS
        =============================== */}

        <motion.div

          initial={{ opacity: 0 }}

          animate={{ opacity: 1 }}

          transition={{ delay: .3 }}

          className="flex gap-3 mt-7 overflow-x-auto scrollbar-hide"

        >

          {["All", "1v1", "2v2" , "4v4"].map((item) => (

            <button

              key={item}

              onClick={() => setSelectedFilter(item)}

              className={`px-6 py-3 rounded-full whitespace-nowrap transition-all duration-300

              ${
                selectedFilter === item
                  ? "bg-violet-600 shadow-lg shadow-violet-600/30"
                  : "bg-[#171722] border border-white/10 hover:border-violet-500"
              }

              `}

            >

              {item}

            </button>

          ))}

        </motion.div>

        {/* ===============================
            TOURNAMENT CARDS
            PART - 2 START HERE
        =============================== */}
{/* ===============================
    TOURNAMENT CARDS
=============================== */}

<div className="mt-8 space-y-6">

  {filteredTournament.length > 0 ? (

    filteredTournament.map((tournament, index) => {

      const progress =
        (tournament.joinedSlots / tournament.totalSlots) * 100;

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

          {/* ===============================
              CARD BANNER
          =============================== */}

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

          {/* ===============================
              CARD CONTENT
          =============================== */}

          <div className="p-5">

            {/* Tournament Name */}

            <h2 className="text-2xl font-bold">
              {tournament.title}
            </h2>

            <p className="text-gray-400 font-semibold mt-1">
              Join and dominate the battlefield.
            </p>

            {/* Info Chips */}

            <div className="grid grid-cols-2 font-semibold gap-3 mt-6">

              <div className="bg-white/5 rounded-2xl p-4">

                <p className="text-gray-400 text-sm">
                  Entry Fee
                </p>

                <h3 className="text-xl font-bold mt-1">
                  ₹{tournament.entryFee}
                </h3>

              </div>

              <div className="bg-white/5 rounded-2xl p-4">

                <p className="text-gray-400 text-sm">
                  Prize Pool
                </p>

                <h3 className="text-xl font-bold mt-1 text-green-400">
                  ₹{tournament.prizePool}
                </h3>

              </div>

            </div>

            {/* Map & Time */}

            <div className="flex justify-between mt-6 font-semibold text-sm text-gray-400">

              <span>
                🗺 {tournament.map}
              </span>

              <span>
                📅 {tournament.date}
              </span>

            </div>

            <div className="flex justify-between mt-2 font-semibold text-sm text-gray-400">

              <span>
                ⏰ {tournament.time}
              </span>

              <span>
                👥 {tournament.joinedSlots}/{tournament.totalSlots}
              </span>

            </div>

            {/* ===============================
                SLOT PROGRESS
            =============================== */}

            <div className="mt-6">

              <div className="flex justify-between font-semibold text-sm mb-2">

                <span>Slots Filled</span>

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

                  className="h-full rounded-full bg-linear-to-r from-violet-500 to-fuchsia-500"

                />

              </div>

            </div>

            {/* ===============================
                BUTTONS
            =============================== */}

            <div className="flex gap-3 mt-7">

              <button
              onClick={() => navigate("/detail")}
                className="flex-1 py-3 rounded-2xl border border-violet-500 text-violet-400 hover:bg-violet-500 hover:text-white transition"
              >
                Details
              </button>

              <button
                className="flex-1 py-3 rounded-2xl bg-linear-to-r from-violet-600 to-fuchsia-600 font-semibold hover:scale-[1.03] transition"
              >
                Join Now
              </button>

            </div>

          </div>

        </motion.div>

      );

    })

  ) : (

    /* ===============================
        EMPTY STATE
    =============================== */

    <motion.div

      initial={{ opacity: 0 }}

      animate={{ opacity: 1 }}

      className="text-center py-24"

    >

      <h2 className="text-3xl font-bold">
         No Tournament Found
      </h2>

      <p className="text-gray-400 mt-3">
        Try changing filters or search keywords.
      </p>

    </motion.div>

  )}

</div>

      </div>

    </div>

  );

};

export default CSTournament;