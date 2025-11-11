"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, UserCircle } from "lucide-react";
import AdminNavbar from "@/components/AdminNavbar";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // 🔹 Завантажуємо користувачів
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data.users || []);
    } catch (err) {
      console.error(err);
      setMessage("❌ Помилка при завантаженні користувачів");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <AdminNavbar />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 w-full max-w-5xl mt-8"
      >
        <h1 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Користувачі системи
        </h1>

        {message && (
          <p className="text-center text-sm text-gray-700 mb-4">{message}</p>
        )}

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
          </div>
        ) : users.length === 0 ? (
          <p className="text-center text-gray-500">Користувачів поки немає</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b text-sm text-gray-600">
                  <th className="py-3 px-4 text-left">Ім’я</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Роль</th>
                  <th className="py-3 px-4 text-left">Дата створення</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr
                    key={u._id}
                    className="border-b last:border-0 hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4 flex items-center gap-2 text-gray-800">
                      <UserCircle className="w-5 h-5 text-gray-500" />
                      {u.name || "—"}
                    </td>
                    <td className="py-3 px-4 text-gray-700">{u.email}</td>
                    <td className="py-3 px-4 capitalize text-gray-700">
                      {u.role}
                    </td>
                    <td className="py-3 px-4 text-gray-500 text-sm">
                      {new Date(u.createdAt).toLocaleString("uk-UA", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}
