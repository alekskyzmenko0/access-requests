"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Microscope, Send, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ResearcherRequestPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    about: "",
    passportNumber: "",
    passportIssuedBy: "",
    directorLetterUrl: "",
    requestedRole: "researcher",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Заявку дослідника успішно відправлено!");
        setForm({
          fullName: "",
          email: "",
          phone: "",
          about: "",
          passportNumber: "",
          passportIssuedBy: "",
          directorLetterUrl: "",
          requestedRole: "researcher",
        });
      } else {
        setMessage(`❌ Помилка: ${data.error || "невідомо"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Сталася помилка при відправці форми");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 relative">
      {/* 🔙 Кнопка назад */}
      <motion.button
        whileHover={{ x: -3 }}
        onClick={() => router.push("/auth/request/type")}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Назад</span>
      </motion.button>

      {/* Основний контейнер */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-200 p-10 w-full max-w-2xl"
      >
        {/* Заголовок */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 flex items-center justify-center bg-gray-100 rounded-full mb-4">
            <Microscope className="w-7 h-7 text-gray-700" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 text-center">
            Запит на реєстрацію (Дослідник)
          </h1>
          <p className="text-gray-500 text-sm mt-1 text-center max-w-md">
            Для доступу як дослідник, заповніть усі поля нижче.
          </p>
        </div>

        {/* Форма */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Основні дані */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1 text-sm font-medium">
                ПІБ
              </label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-800 outline-none transition placeholder-gray-400"
                placeholder="Ваше ім’я та прізвище"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1 text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-800 outline-none transition placeholder-gray-400"
                placeholder="example@gmail.com"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1 text-sm font-medium">
                Телефон
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-800 outline-none transition placeholder-gray-400"
                placeholder="+380..."
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1 text-sm font-medium">
                Номер паспорта
              </label>
              <input
                type="text"
                name="passportNumber"
                value={form.passportNumber}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-800 outline-none transition placeholder-gray-400"
                placeholder="AA123456"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1 text-sm font-medium">
              Ким виданий паспорт
            </label>
            <input
              type="text"
              name="passportIssuedBy"
              value={form.passportIssuedBy}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-800 outline-none transition placeholder-gray-400"
              placeholder="Відділ ДМС м. Києва"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 text-sm font-medium">
              Посилання на заяву директора
            </label>
            <div className="flex gap-2">
              <FileText className="w-5 h-5 text-gray-500 mt-2" />
              <input
                type="url"
                name="directorLetterUrl"
                value={form.directorLetterUrl}
                onChange={handleChange}
                required
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-800 outline-none transition placeholder-gray-400"
                placeholder="https://..."
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1 text-sm font-medium">
              Про себе
            </label>
            <textarea
              name="about"
              value={form.about}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-800 outline-none resize-none transition placeholder-gray-400"
              placeholder="Опишіть напрям ваших досліджень"
            />
          </div>

          {/* Кнопка */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 w-full bg-gray-900 text-white py-2.5 rounded-lg font-medium shadow hover:bg-black transition disabled:opacity-50"
          >
            {loading ? "Відправлення..." : "Надіслати заявку"}
            {!loading && <Send className="w-5 h-5" />}
          </motion.button>

          {message && (
            <p className="text-center text-sm mt-4 text-gray-700">{message}</p>
          )}
        </form>
      </motion.div>
    </div>
  );
}
