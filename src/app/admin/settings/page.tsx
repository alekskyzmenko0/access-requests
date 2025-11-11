"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import AdminNavbar from "@/components/AdminNavbar";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    emailFrom: "",
    smtpHost: "",
    smtpPort: "",
    smtpUser: "",
    smtpPass: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Settings saved:", settings);
    setMessage("✅ Налаштування збережено (імітація)");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <AdminNavbar />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 w-full max-w-3xl mt-8"
      >
        <h1 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Налаштування системи
        </h1>

        <form onSubmit={handleSave} className="space-y-4">
          {[
            { label: "Email відправника", name: "emailFrom", placeholder: "admin@example.com" },
            { label: "SMTP Host", name: "smtpHost", placeholder: "smtp.example.com" },
            { label: "SMTP Port", name: "smtpPort", placeholder: "587" },
            { label: "SMTP User", name: "smtpUser", placeholder: "login" },
            { label: "SMTP Password", name: "smtpPass", placeholder: "••••••••" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-gray-700 mb-1 text-sm font-medium">
                {field.label}
              </label>
              <input
                type="text"
                name={field.name}
                value={(settings as any)[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-800 outline-none transition"
              />
            </div>
          ))}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="flex items-center justify-center gap-2 w-full bg-gray-900 text-white py-2.5 rounded-lg font-medium shadow hover:bg-black transition"
          >
            <Save className="w-5 h-5" />
            Зберегти зміни
          </motion.button>

          {message && (
            <p className="text-center text-sm mt-4 text-gray-700">{message}</p>
          )}
        </form>
      </motion.div>
    </div>
  );
}
