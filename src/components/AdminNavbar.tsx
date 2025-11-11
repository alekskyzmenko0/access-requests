"use client";

import { useState } from "react";
import { LogOut, Settings, Users, ListChecks, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminNavbar() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    router.push("/");
  };

  const menuItems = [
    { label: "Заявки", icon: <ListChecks className="w-4 h-4" />, path: "/admin/requests" },
    { label: "Користувачі", icon: <Users className="w-4 h-4" />, path: "/admin/users" },
    { label: "Налаштування", icon: <Settings className="w-4 h-4" />, path: "/admin/settings" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-5 py-3">
        {/* Логотип */}
        <div
          onClick={() => router.push("/admin/requests")}
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <ListChecks className="w-6 h-6 text-gray-800" />
          <span className="text-lg font-semibold text-gray-800">Admin Dashboard</span>
        </div>

        {/* Десктоп-меню */}
        <div className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => router.push(item.path)}
              className="flex items-center gap-1 text-gray-700 hover:text-black transition font-medium"
            >
              {item.icon}
              {item.label}
            </button>
          ))}

          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-red-600 hover:text-red-700 transition font-medium"
          >
            <LogOut className="w-4 h-4" />
            Вийти
          </button>
        </div>

        {/* Мобільне меню */}
        <button
          className="md:hidden text-gray-800 hover:text-black transition"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Випадаюче меню для мобільних */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-gray-200 shadow-lg"
          >
            <div className="flex flex-col p-4 space-y-3">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    router.push(item.path);
                    setMobileOpen(false);
                  }}
                  className="flex items-center gap-2 text-gray-700 hover:text-black transition"
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  handleLogout();
                  setMobileOpen(false);
                }}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 transition"
              >
                <LogOut className="w-4 h-4" />
                Вийти
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
