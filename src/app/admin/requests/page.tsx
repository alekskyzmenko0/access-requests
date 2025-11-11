"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import AdminNavbar from "@/components/AdminNavbar";


export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  // 🔹 Завантаження всіх заявок
  const fetchRequests = async () => {
    try {
      const res = await fetch("/api/requests");
      const data = await res.json();
      setRequests(data.requests || []);
    } catch (err) {
      console.error(err);
      setMessage("❌ Помилка при завантаженні заявок");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // 🔹 Підтвердити заявку
  const handleApprove = async (id: string) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/requests/${id}/approve`, { method: "POST" });
      const data = await res.json();
      setMessage(data.message || "✅ Заявку підтверджено");
      fetchRequests();
    } catch (err) {
      console.error(err);
      setMessage("❌ Помилка при підтвердженні");
    } finally {
      setActionLoading(null);
    }
  };

  // 🔹 Відхилити заявку
  const handleReject = async (id: string) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/requests/${id}/reject`, { method: "POST" });
      const data = await res.json();
      setMessage(data.message || "✅ Заявку відхилено");
      fetchRequests();
    } catch (err) {
      console.error(err);
      setMessage("❌ Помилка при відхиленні");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
        <AdminNavbar /> 
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 w-full max-w-5xl"
      >
        <h1 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Панель адміністратора — Заявки
        </h1>

        {message && (
          <p className="text-center text-sm text-gray-700 mb-4">{message}</p>
        )}

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
          </div>
        ) : requests.length === 0 ? (
          <p className="text-center text-gray-500">Немає заявок</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b text-sm text-gray-600">
                  <th className="py-3 px-4 text-left">ПІБ</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Роль</th>
                  <th className="py-3 px-4 text-left">Статус</th>
                  <th className="py-3 px-4 text-center">Дії</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((r) => (
                  <tr
                    key={r._id}
                    className="border-b last:border-0 hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4">{r.fullName}</td>
                    <td className="py-3 px-4 text-gray-600">{r.email}</td>
                    <td className="py-3 px-4 capitalize text-gray-700">
                      {r.requestedRole}
                    </td>
                    <td
                      className={`py-3 px-4 font-medium ${
                        r.status === "approved"
                          ? "text-green-600"
                          : r.status === "rejected"
                          ? "text-red-600"
                          : "text-gray-500"
                      }`}
                    >
                      {r.status}
                    </td>
                    <td className="py-3 px-4 text-center flex justify-center gap-3">
                      {r.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(r._id)}
                            disabled={actionLoading === r._id}
                            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                          >
                            {actionLoading === r._id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <CheckCircle className="w-4 h-4" />
                            )}
                            Підтвердити
                          </button>
                          <button
                            onClick={() => handleReject(r._id)}
                            disabled={actionLoading === r._id}
                            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                          >
                            {actionLoading === r._id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <XCircle className="w-4 h-4" />
                            )}
                            Відхилити
                          </button>
                        </>
                      )}
                      {r.status !== "pending" && (
                        <span className="text-gray-400 text-sm italic">
                          {r.status === "approved"
                            ? "✅ Підтверджено"
                            : "❌ Відхилено"}
                        </span>
                      )}
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
