"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { User, Microscope, ArrowLeft } from "lucide-react";

export default function RequestTypePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6 relative">
      {/* 🔙 Кнопка назад */}
      <motion.button
        whileHover={{ x: -3 }}
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Назад</span>
      </motion.button>

      {/* Контейнер */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-200 p-10 max-w-2xl w-full text-center"
      >
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">
          Оберіть тип реєстрації
        </h1>
        <p className="text-gray-500 mb-10 text-sm">
          Вкажіть вашу роль, щоб продовжити створення заявки
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Користувач */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/auth/request")}
            className="cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-300 rounded-xl p-6 border border-gray-200 flex flex-col items-center shadow-sm hover:shadow-md"
          >
            <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center mb-4">
              <User className="w-7 h-7 text-gray-700" />
            </div>
            <h2 className="text-lg font-medium text-gray-900 mb-2">Користувач</h2>
            <p className="text-sm text-gray-500 leading-relaxed text-center">
              Звичайна реєстрація для доступу до основних матеріалів.
            </p>
          </motion.div>

          {/* Дослідник */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/auth/request/researcher")}
            className="cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-300 rounded-xl p-6 border border-gray-200 flex flex-col items-center shadow-sm hover:shadow-md"
          >
            <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center mb-4">
              <Microscope className="w-7 h-7 text-gray-700" />
            </div>
            <h2 className="text-lg font-medium text-gray-900 mb-2">Дослідник</h2>
            <p className="text-sm text-gray-500 leading-relaxed text-center">
              Розширена реєстрація з додатковими даними для науковців.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
