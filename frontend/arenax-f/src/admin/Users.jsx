import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaUserCircle,
  FaUserCheck,
  FaUserSlash,
  FaWallet,
  FaGamepad,
} from "react-icons/fa";

const dummyUsers = [
  {
    _id: "1",
    name: "Saurabh Kumar",
    email: "saurabh@gmail.com",
    gameName: "ArenaXPro",
    uid: "123456789",
    role: "admin",
    wallet: 1250,
    tournaments: 8,
    status: "active",
  },
  {
    _id: "2",
    name: "Rahul",
    email: "rahul@gmail.com",
    gameName: "HeadHunter",
    uid: "987654321",
    role: "user",
    wallet: 350,
    tournaments: 3,
    status: "active",
  },
  {
    _id: "3",
    name: "Aman",
    email: "aman@gmail.com",
    gameName: "Sniper",
    uid: "555555555",
    role: "user",
    wallet: 0,
    tournaments: 0,
    status: "blocked",
  },
];

export default function Users() {
  const [users] = useState(dummyUsers);
  const [search, setSearch] = useState("");

  const filteredUsers = useMemo(() => {
    return users.filter((item) => {
      return (
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.gameName.toLowerCase().includes(search.toLowerCase()) ||
        item.uid.includes(search)
      );
    });
  }, [users, search]);

  return (
    <div className="space-y-6">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold text-gray-900">
          Users
        </h1>

        <p className="text-gray-500 mt-2">
          Manage all registered ArenaX users.
        </p>

      </div>

      {/* Search */}

      <div className="relative">

        <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

        <input
          type="text"
          placeholder="Search by Name, Email, Game Name or UID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-2xl border border-gray-200 bg-white py-4 pl-14 pr-4 outline-none focus:border-sky-500"
        />

      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {filteredUsers.length > 0 ? (

          filteredUsers.map((user) => (

            <motion.div
              key={user._id}
              whileHover={{ y: -3 }}
              className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6"
            >

              <div className="flex justify-between">

                <div className="flex gap-4">

                  <div className="w-14 h-14 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 text-2xl">

                    <FaUserCircle />

                  </div>

                  <div>

                    <h2 className="text-xl font-bold">
                      {user.name}
                    </h2>

                    <p className="text-gray-500">
                      {user.email}
                    </p>

                  </div>

                </div>

                <span
                  className={` text-sm capitalize
                  ${
                    user.role === "admin"
                      ? "font-bold text-green-600 text-xl"
                      : "font-bold text-blue-600 text-xl"
                  }`}
                >
                  {user.role}
                </span>

              </div>

              <div className="mt-6 space-y-3 text-sm">

                <div className="flex justify-between">
                  <span className="text-gray-500">Game Name</span>
                  <span>{user.gameName}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">UID</span>
                  <span>{user.uid}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500 flex items-center gap-2">
                    <FaWallet />
                    Wallet
                  </span>
                  <span>₹ {user.wallet}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500 flex items-center gap-2">
                    <FaGamepad />
                    Tournaments
                  </span>
                  <span>{user.tournaments}</span>
                </div>

              </div>

              <div className="mt-8 flex gap-3">

                {user.status === "active" ? (

                  <button className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2">

                    <FaUserSlash />

                    Block

                  </button>

                ) : (

                  <button className="flex-1 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2">

                    <FaUserCheck />

                    Unblock

                  </button>

                )}

              </div>

            </motion.div>

          ))

        ) : (

          <div className="col-span-full bg-white rounded-3xl border border-gray-200 py-20 text-center">

            <FaUserCircle className="mx-auto text-5xl text-gray-400" />

            <h2 className="text-2xl font-bold mt-6">
              No Users Found
            </h2>

            <p className="text-gray-500 mt-2">
              No registered users available.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}