import { useEffect, useMemo, useState } from "react";
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
  FaClock,
  FaMapMarkedAlt,
  FaCrosshairs,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import Swal from "sweetalert2"


export default function Tournaments() {

  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("BR");
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    fetchTournaments();
  }, [filter]);

  async function fetchTournaments() {
    try {
      const { data } = await api.get(`/api/auth/tournaments?mode=${filter}`);
      setTournaments(data.tournaments);
    } catch (error) {
      console.error(error);
    }
  }

  const handleDelete = async (id) => {

    const result = await Swal.fire({
      title: "Delete Tournament?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {

      const { data } = await api.delete(`/api/auth/tournament/${id}`);

      if (data.success) {

        Swal.fire({
          icon: "success",
          title: "Deleted",
          text: data.msg,
          timer: 1500,
          showConfirmButton: false,
        });

        fetchTournaments();

      }

    } catch (error) {

      console.error(error);

    }

  };

  const filteredTournament = useMemo(() => {
    return tournaments.filter((item) => {
      if (!search) return true;

      const keyword = search.toLowerCase();

      return (
        item.title.toLowerCase().includes(keyword) ||
        item.mode.toLowerCase().includes(keyword) ||
        item.type.toLowerCase().includes(keyword) ||
        item.map.toLowerCase().includes(keyword)
      );
    });
  }, [search, tournaments]);


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

        {["BR", "CS", "LW"].map((item) => (

          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-5 py-2 rounded-xl transition
            ${filter === item
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

              {/* Header */}

              <div className="flex justify-between items-start">

                <div>

                  <h2 className="text-2xl font-bold text-gray-900">
                    {item.title}
                  </h2>

                  <div className="flex items-center gap-2 mt-2">

                    <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-semibold">
                      {item.mode}
                    </span>

                    <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-semibold">
                      {item.type}
                    </span>

                  </div>

                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold
      ${item.status === "Live"
                      ? "bg-green-100 text-green-700"
                      : item.status === "Upcoming"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                >
                  {item.status}
                </span>

              </div>

              {/* Tournament Details */}

              <div className="grid grid-cols-2 gap-5 mt-7">

                <div className="flex items-center gap-3">

                  <FaCoins className="text-yellow-500 text-xl" />

                  <div>

                    <p className="text-xs text-gray-500">
                      Entry Fee
                    </p>

                    <h3 className="font-bold">
                      ₹{item.entryFee}
                    </h3>

                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <FaWallet className="text-emerald-500 text-xl" />

                  <div>

                    <p className="text-xs text-gray-500">
                      Prize Pool
                    </p>

                    <h3 className="font-bold">
                      ₹{item.prizePool}
                    </h3>

                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <FaCrosshairs className="text-red-500 text-xl" />

                  <div>

                    <p className="text-xs text-gray-500">
                      Per Kill
                    </p>

                    <h3 className="font-bold">
                      ₹{item.perKill}
                    </h3>

                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <FaUsers className="text-indigo-500 text-xl" />

                  <div>

                    <p className="text-xs text-gray-500">
                      Slots
                    </p>

                    <h3 className="font-bold">
                      {item.totalSlots}
                    </h3>

                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <FaMapMarkedAlt className="text-orange-500 text-xl" />

                  <div>

                    <p className="text-xs text-gray-500">
                      Map
                    </p>

                    <h3 className="font-bold">
                      {item.map}
                    </h3>

                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <FaCalendarAlt className="text-pink-500 text-xl" />

                  <div>

                    <p className="text-xs text-gray-500">
                      Match Date
                    </p>

                    <h3 className="font-bold">
                      {new Date(item.matchDate).toLocaleDateString()}
                    </h3>

                  </div>

                </div>

                <div className="flex items-center gap-3 col-span-2">

                  <FaClock className="text-sky-500 text-xl" />

                  <div>

                    <p className="text-xs text-gray-500">
                      Match Time
                    </p>

                    <h3 className="font-bold">
                      {item.matchTime}
                    </h3>

                  </div>

                </div>

              </div>

              <div className="flex gap-3 mt-8">

                <button
                  onClick={() =>
                    navigate(`/admin/update-tournaments/${item._id}`)
                  }
                  className="flex-1 py-3 rounded-xl bg-sky-600 text-white hover:bg-sky-700 flex items-center justify-center gap-2">

                  <FaEdit />

                  Edit

                </button>

                <button
                onClick={()=>navigate(`/admin/see-players/${item._id}`)}
                className="flex-1 py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 flex items-center justify-center gap-2">

                  <FaEye />

                  Players

                </button>

                <button
                  onClick={()=>handleDelete(item._id)}
                  className="flex-1 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 flex items-center justify-center gap-2">

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