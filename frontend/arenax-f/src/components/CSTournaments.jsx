import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import cssolo from "../img/cssolo.png";
import {
  FaArrowLeft,
  FaSearch,
  FaFire,
  FaCalendar,
  FaUser,
  FaClock
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { FaFaceFrown, FaPerson } from "react-icons/fa6";

// ===============================
// CS TOURNAMENT PAGE
// ===============================

const CSTournament = () => {

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
      const { data } = await api.get("/api/auth/tournaments?mode=CS");
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

    <div className="min-h-screen bg-[#09090F] w-full text-white pb-40">

      {/* ===============================
          TOP HEADER
      =============================== */}

      <div className="sticky top-0 z-50 backdrop-blur-xl shadow-sm shadow-purple-600 bg-[#09090F]/90 border-b border-white/10">

        <div className="px-5 pt-5 pb-4">

          <div className="flex items-center w-full justify-between">

            <button
              onClick={() => navigate(-1)}
              className="w-11 h-11 rounded-full  flex items-center justify-center hover:bg-violet-600 transition"
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

            <div>
              <FaFire className="text-purple-500 text-xl" />
            </div>

          </div>

        </div>

      </div>

      {/* ===============================
          PAGE CONTENT
      =============================== */}

      <div className="px-5">

        {/* Heading */}




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
          transition={{ delay: 0.25 }}
          className="
    mt-7
    p-1
    rounded-2xl
    bg-[#171722]
    border border-white/10
    shadow-[0_10px_30px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]
    grid grid-cols-3
    gap-1
  "
        >
          {["Live", "Upcoming", "Completed"].map((item) => (
            <button
              key={item}
              onClick={() => setSelectedStatus(item)}
              className={`
        py-3
        rounded-xl
        text-sm
        font-semibold
        transition-all
        duration-300

        ${selectedStatus === item
                  ? item === "Live"
                    ? "border border-red-500 text-white shadow-lg shadow-red-500/30"
                    : item === "Upcoming"
                      ? "border border-violet-600 text-white shadow-lg shadow-violet-500/30"
                      : "border border-slate-500 text-white shadow-lg shadow-slate-500/30"
                  : "hover:text-gray-400 text-white"
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

          {["Solo", "Duo", "Squad"].map((item) => (
            <button
              key={item}
              onClick={() => setSelectedFilter(item)}
              className={`px-7 py-2 font-semibold text-sm rounded-full transition

      ${selectedFilter === item
                  ? " border border-purple-600"
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
=============================== */}

        <div className="mt-8 space-y-6 border border-purple-600 rounded-xl">

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
                  className="rounded-xl overflow-hidden border border-white/10 bg-[#171722]"
                >

                  {/* ===============================
              CARD BANNER
          =============================== */}

                  <div className="relative h-44 ">
                    <img
                      src={cssolo}
                      alt={tournament.title}
                      className="h-full w-full object-cover"
                    />

                    <div className="
absolute
inset-0
bg-linear-to-r
from-black
via-black/65
to-transparent
"/>
                    <div className="
absolute
inset-0
bg-linear-to-t
from-black
via-transparent
to-transparent
"/>

                    <div
                      className="
absolute
left-0
top-0

w-60
h-full

bg-violet-500/15
blur-[90px]
"
                    />
                    {/* Status */}
                    <div
                      className={`absolute top-4 px-3 py-1 rounded-r-full text-xs font-bold

  ${tournament.status === "Upcoming"
                          ? "bg-purple-600"
                          : tournament.status === "Live"
                            ? "bg-red-500"
                            : "bg-gray-500"
                        }

`}
                    >
                      {tournament.status}
                    </div>

                    <div className="absolute top-16 left-4 right-4">
                      <h2 className="text-2xl font-bold text-gray-200">
                        {tournament.title}
                      </h2>

                      <p className="text-gray-400 text-sm font-semibold">
                        {tournament.map} Map
                      </p>

                      <h1 className="text-lg font-mono font-bold text-yellow-400">
                        Prize Pool : ₹ {tournament.prizePool}
                      </h1>
                      <div className="flex gap-2 mt-3">

                        <span className="text-gray-300 font-semibold">
                          Entry
                        </span>

                        <span className="
        px-2
        rounded-md
        bg-gray-600/20
        text-gray-300
        font-bold
    ">
                          ₹{tournament.entryFee}
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* ===============================
              CARD CONTENT
          =============================== */}
                  <div className="py-4 px-3 bg-[#000000]"></div>
                  <div
                    className="
px-4
py-4

bg-linear-to-b

from-[#111111]

to-[#171722]
"
                  ></div>
                  <div className="py-4 px-3 bg-[#000000]">
                    <div className="flex gap-4 justify-between items-center text-gray-400">
                      <span className="flex gap-2 items-center font-bold text-sm ">
                        <FaCalendar />{new Date(tournament.matchDate).toLocaleDateString("en-IN")}
                      </span>
                      <span className="text-sm flex gap-2 font-bold items-center">
                        <FaUser /> {tournament.joinedPlayers}/{tournament.totalSlots}
                      </span>
                      <span className="flex gap-2 items-center font-bold text-gray-400 text-sm">
                        <FaClock /> {tournament.matchTime}
                      </span>
                    </div>
                    <div className="mt-6">

                      <div className="flex justify-between mb-2">

                        <span className="text-xs uppercase tracking-wider text-gray-500">
                          Slots Filled
                        </span>

                        <span className="font-bold text-violet-400">
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

                    <div className="flex gap-3 mt-6">

                      {tournament.status === "Completed" ? (

                        <button
                          onClick={() => navigate(`/match-history/${tournament._id}`)}
                          className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition"
                        >
                          View History
                        </button>

                      ) : tournament.status === "Live" ? (

                        <button
                          className="w-full py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-semibold transition"
                        >
                          On Live
                        </button>

                      ) : (

                        <>
                          <button
                            onClick={() => navigate(`/detail/${tournament._id}`)}
                            className="flex-1 py-3 rounded-2xl border border-violet-500 text-violet-400 hover:bg-violet-500 hover:text-white transition"
                          >
                            Details
                          </button>

                          <button
                            onClick={() => navigate(`/join-tournament/${tournament._id}`)}
                            className="flex-1 py-3 rounded-2xl bg-linear-to-r from-violet-600 to-fuchsia-600 text-white font-semibold hover:scale-[1.03] transition"
                          >
                            Join Now
                          </button>
                        </>

                      )}

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
                Try changing filters .
              </p>

            </motion.div>

          )}

        </div>

      </div>

    </div>

  );

};

export default CSTournament;