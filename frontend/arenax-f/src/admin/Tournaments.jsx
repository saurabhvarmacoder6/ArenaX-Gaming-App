import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaGamepad,
  FaCalendarAlt,
  FaCoins,
  FaUsers,
  FaEdit,
  FaTrash,
  FaEye,
  FaPlus,
  FaWallet,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const dummyTournament = [
  {
    _id: "1",
    title: "BR Solo #12",
    category: "BR",
    entryFee: 50,
    prizePool: 2000,
    joined: 45,
    slots: 50,
    date: "02 Aug 2026",
    status: "active",
  },
  {
    _id: "2",
    title: "CS Squad",
    category: "CS",
    entryFee: 100,
    prizePool: 5000,
    joined: 8,
    slots: 12,
    date: "03 Aug 2026",
    status: "upcoming",
  },
  {
    _id: "3",
    title: "Lone Wolf",
    category: "LW",
    entryFee: 20,
    prizePool: 400,
    joined: 16,
    slots: 16,
    date: "04 Aug 2026",
    status: "completed",
  },
];

export default function Tournaments() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [tournaments] = useState(dummyTournament);

  const filteredTournament = useMemo(() => {
    return tournaments.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(search.toLowerCase());

      const matchFilter =
        filter === "all" ? true : item.category === filter;

      return matchSearch && matchFilter;
    });
  }, [search, filter, tournaments]);

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between gap-5">

        <div>

          <h1 className="text-3xl font-bold text-gray-900">
            Tournament Management
          </h1>

          <p className="text-gray-500 mt-2">
            Create, edit and manage ArenaX tournaments.
          </p>

        </div>

        <button
          onClick={() => navigate("/admin/create-tournaments")}
          className="px-6 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white flex items-center gap-3"
        >
          <FaPlus />
          Create Tournament
        </button>

      </div>

      {/* Search */}

      <div className="relative">

        <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

        <input
          type="text"
          placeholder="Search Tournament..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-2xl border border-gray-200 bg-white py-4 pl-14 pr-4 outline-none focus:border-sky-500"
        />

      </div>

      {/* Filter */}

      <div className="flex gap-3 flex-wrap">

        {["all", "BR", "CS", "LW"].map((item) => (

          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-5 py-2 rounded-xl transition
            ${
              filter === item
                ? "bg-sky-600 text-white"
                : "bg-white border border-gray-200"
            }`}
          >
            {item}
          </button>

        ))}

      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {filteredTournament.length > 0 ? (

          filteredTournament.map((item) => (

            <motion.div
              key={item._id}
              whileHover={{ y: -3 }}
              className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6"
            >

              <div className="flex justify-between items-start">

                <div>

                  <h2 className="text-2xl font-bold">
                    {item.title}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    {item.category}
                  </p>

                </div>

                <span
                  className={`px-3 py-1 rounded-full capitalize text-sm
                  ${
                    item.status === "active"
                      ? "bg-green-100 text-green-700"
                      : item.status === "upcoming"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {item.status}
                </span>

              </div>

              <div className="grid grid-cols-2 gap-5 mt-6">

                <div className="flex items-center gap-3">
                  <FaCoins className="text-sky-600" />
                  <div>
                    <p className="text-gray-500 text-sm">Entry Fee</p>
                    <h3 className="font-semibold">
                      ₹ {item.entryFee}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FaWallet className="text-green-600" />
                  <div>
                    <p className="text-gray-500 text-sm">Prize Pool</p>
                    <h3 className="font-semibold">
                      ₹ {item.prizePool}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FaUsers className="text-orange-500" />
                  <div>
                    <p className="text-gray-500 text-sm">Slots</p>
                    <h3 className="font-semibold">
                      {item.joined}/{item.slots}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-indigo-500" />
                  <div>
                    <p className="text-gray-500 text-sm">Date</p>
                    <h3 className="font-semibold">
                      {item.date}
                    </h3>
                  </div>
                </div>

              </div>

              <div className="flex gap-3 mt-8">

                <button className="flex-1 py-3 rounded-xl bg-sky-600 text-white hover:bg-sky-700 flex items-center justify-center gap-2">

                  <FaEdit />

                  Edit

                </button>

                <button className="flex-1 py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 flex items-center justify-center gap-2">

                  <FaEye />

                  Players

                </button>

                <button className="flex-1 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 flex items-center justify-center gap-2">

                  <FaTrash />

                  Delete

                </button>

              </div>

            </motion.div>

          ))

        ) : (

          <div className="col-span-full bg-white rounded-3xl border border-gray-200 py-20">

            <div className="flex flex-col items-center">

              <FaGamepad className="text-5xl text-gray-400" />

              <h2 className="text-2xl font-bold mt-6">
                No Tournament Found
              </h2>

              <p className="text-gray-500 mt-2">
                Create your first tournament.
              </p>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}