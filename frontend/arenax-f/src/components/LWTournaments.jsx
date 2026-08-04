
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import lwsolo from "../img/lwsolo.png";
import lwduo from "../img/lwduo.png";
import {
  FaArrowLeft,
  FaSearch,
  FaFire,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

// ===============================
// LW TOURNAMENT PAGE
// ===============================

const LWTournament = () => {

  const navigate = useNavigate();

  // ===============================
  // FILTER STATE
  // ===============================
  const [selectedStatus, setSelectedStatus] = useState("Upcoming");
  const [selectedFilter, setSelectedFilter] = useState("Solo");
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    fetchTournaments();
  }, []);

  async function fetchTournaments() {
    try {
      const { data } = await api.get("/api/auth/tournaments?mode=LW");
      setTournaments(data.tournaments);
    } catch (err) {
      console.log(err);
    }
  }


  // ===============================
  // FILTER + SEARCH LOGIC
  // ===============================

  const filteredTournament = useMemo(() => {
    return tournaments.filter((item) => {
      const typeMatch = item.type === selectedFilter;
      const statusMatch = item.status === selectedStatus;

      return typeMatch && statusMatch;
    });
  }, [tournaments, selectedFilter, selectedStatus]);

  // ===============================
  // UI
  // ===============================

  return (

    <div className="min-h-screen bg-[#09090F] text-white pb-40">

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
                Join Premium CS Tournaments
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


        <motion.div

          initial={{ opacity: 0 }}

          animate={{ opacity: 1 }}

          transition={{ delay: .2 }}

          className="mt-7"

        >

        </motion.div>


        {/* ===============================
    STATUS FILTER
=============================== */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .25 }}
          className="flex gap-3 mt-7 overflow-x-auto scrollbar-hide"
        >

          {["Live", "Upcoming", "Completed"].map((item) => (

            <button
              key={item}
              onClick={() => setSelectedStatus(item)}
              className={`px-5 py-3 text-sm rounded-full whitespace-nowrap font-semibold transition-all duration-300

      ${selectedStatus === item
                  ? item === "Live"
                    ? "bg-red-600 shadow-lg shadow-red-600/30"
                    : item === "Upcoming"
                      ? "bg-emerald-600 shadow-lg shadow-emerald-600/30"
                      : "bg-gray-600 shadow-lg shadow-gray-600/30"
                  : "bg-[#171722] border border-white/10 hover:border-violet-500"
                }
      `}
            >
              {item}
            </button>

          ))}

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

          {["Solo", "Duo"].map((item) => (
            <button
              key={item}
              onClick={() => setSelectedFilter(item)}
              className={`px-6 py-3 rounded-full transition

      ${selectedFilter === item
                  ? "bg-orange-600"
                  : "bg-[#171722] border border-white/10"
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
                (tournament.joinedPlayers / tournament.totalSlots) * 100;

              return (

                <motion.div
                  key={tournament._id}
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
                    <img
                      src={
                        tournament.type === "Solo"
                          ? lwsolo : lwduo
                      }
                      alt={tournament.title}
                      className="h-full w-full object-cover"
                    />
                    {/* Status */}

                    <div
                      className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold

  ${tournament.status === "Upcoming"
                          ? "bg-emerald-500"
                          : tournament.status === "Live"
                            ? "bg-red-500"
                            : "bg-gray-500"
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
                        📅{" "}
                        {new Date(tournament.matchDate).toLocaleDateString("en-IN")}
                      </span>

                    </div>

                    <div className="flex justify-between mt-2 font-semibold text-sm text-gray-400">

                      <span>
                        ⏰ {tournament.matchTime}
                      </span>

                      <span>
                        👥 {tournament.joinedPlayers}/{tournament.totalSlots}
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

                          className="h-full rounded-full bg-linear-to-r from-orange-500 to-yellow-500"

                        />

                      </div>

                    </div>

                    {/* ===============================
                BUTTONS
            =============================== */}
                    <div className="flex gap-3 mt-7">

                      <button
                        onClick={() => navigate(`/detail/${tournament._id}`)}
                        hidden={tournament.status === "Live" ? true : false}
                        className="flex-1 py-3 rounded-2xl border border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white transition"
                      >
                        Details
                      </button>


                      {tournament.status === "Live" ?
                        <button
                          className="flex-1 py-3 rounded-2xl bg-red-600 font-semibold hover:scale-[1.03] transition"
                        >
                          On Live
                        </button>
                        : <button
                         onClick={()=>navigate(`/join-tournament/${tournament._id}`)}
                          className="flex-1 py-3 rounded-2xl bg-linear-to-r from-orange-600 to-yellow-600 font-semibold hover:scale-[1.03] transition"
                        >
                          Join Now
                        </button>}



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

export default LWTournament;