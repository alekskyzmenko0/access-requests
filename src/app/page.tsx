"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-6">
      {/* Лого та назва */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
            <UserPlus className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
            Реєстраційна система доступу
          </h1>
        </div>
        <p className="text-gray-600 max-w-xl mx-auto">
          Подайте запит на реєстрацію як <b>Користувач</b> або <b>Дослідник</b> -  
          і після підтвердження адміністратором отримаєте логін і пароль на email.
        </p>
      </motion.div>

      {/* Кнопка переходу */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push("/auth/request/type")}
        className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium shadow hover:bg-black transition"
      >
        Зареєструватися
      </motion.button>

      {/* Посилання для адміністратора */}
      <p className="text-gray-400 text-sm mt-8">
        <a
          href="/admin/requests"
          className="hover:text-gray-600 transition underline"
        >
          Увійти як адміністратор
        </a>
      </p>
    </div>
  );
}
