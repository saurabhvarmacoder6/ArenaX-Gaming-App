import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaBell,
  FaPlus,
  FaTrash,
  FaThumbtack,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../api/api";

export default function Notification() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  async function fetchNotifications() {
    try {
      const { data } = await api.get("/api/auth/get-notifications");

      if (data.success) {
        setNotifications(data.notifications);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id) {
    const result = await Swal.fire({
      title: "Delete Notification?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      const { data } = await api.delete(`/api/auth/notification/${id}`);

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Deleted",
          text: data.msg,
          timer: 1500,
          showConfirmButton: false,
        });

        fetchNotifications();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold text-gray-900">
            Notifications
          </h1>

          <p className="text-gray-500 mt-2">
            Manage ArenaX notifications.
          </p>

        </div>

        <button
          onClick={() => navigate("/admin/create-notification")}
          className="px-6 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white flex items-center gap-3"
        >
          <FaPlus />
          Create Notification
        </button>

      </div>

      {/* Cards */}

      <div className="grid lg:grid-cols-2 gap-6">

        {notifications.length > 0 ? (

          notifications.map((item) => (

            <motion.div
              key={item._id}
              whileHover={{ y: -3 }}
              className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6"
            >

              <div className="flex justify-between items-start">

                <div>

                  <div className="flex items-center gap-3">

                    <h2 className="text-xl font-bold text-gray-900">
                      {item.title}
                    </h2>

                    {item.isPinned && (
                      <FaThumbtack className="text-red-500" />
                    )}

                  </div>

                  <div className="flex gap-2 mt-3">

                    <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-semibold">
                      {item.type}
                    </span>

                  </div>

                </div>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="size-11 rounded-xl bg-red-100 hover:bg-red-600 hover:text-white transition flex items-center justify-center text-red-600"
                >
                  <FaTrash />
                </button>

              </div>

              <p className="text-gray-600 mt-5 leading-relaxed">
                {item.message}
              </p>

              <div className="mt-6 pt-5 border-t border-gray-200 flex justify-between text-sm text-gray-500">

                <span>
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>

                <span>
                  {new Date(item.createdAt).toLocaleTimeString()}
                </span>

              </div>

            </motion.div>

          ))

        ) : (

          <div className="col-span-full bg-white rounded-3xl border border-gray-200 py-20">

            <div className="flex flex-col items-center">

              <FaBell className="text-6xl text-gray-400" />

              <h2 className="text-2xl font-bold mt-6">
                No Notifications
              </h2>

              <p className="text-gray-500 mt-2">
                Create your first notification.
              </p>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}