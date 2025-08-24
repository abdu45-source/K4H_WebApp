"use client";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaVial,
  FaBookMedical,
  FaUserCog,
  FaSignOutAlt,
  FaHeartbeat,
  FaGlobe,
  FaUser,
} from "react-icons/fa";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    {
      to: "appointments",
      icon: <FaCalendarAlt />,
      label: "Appointments",
      color: "from-emerald-500 to-teal-500",
    },
    {
      to: "pandemics",
      icon: <FaVial />,
      label: "Pandemics",
      color: "from-red-500 to-orange-500",
    },
    {
      to: "remedies",
      icon: <FaBookMedical />,
      label: "Cultural Remedies",
      color: "from-green-500 to-emerald-500",
    },
  ];

  if (user?.role === "admin") {
    navItems.push({
      to: "doctors",
      icon: <FaUserCog />,
      label: "Manage Doctors",
      color: "from-blue-500 to-indigo-500",
    });
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Sidebar (fixed, its own scroll if needed) */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-72 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col shadow-2xl relative overflow-y-auto"
      >
        {/* Decorative bg */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-10 w-20 h-20 bg-blue-500 rounded-full opacity-10 blur-xl"></div>
          <div className="absolute bottom-20 left-10 w-16 h-16 bg-emerald-500 rounded-full opacity-10 blur-lg"></div>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 border-b border-gray-700/50 relative z-10"
        >
          <div className="flex items-center mb-4">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-xl shadow-lg mr-3">
              <FaHeartbeat className="text-white text-2xl" />
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-xl shadow-lg">
              <FaGlobe className="text-white text-2xl" />
            </div>
          </div>
          <h4 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
            Knowledge for Health
          </h4>
          <p className="text-gray-300 text-sm mt-1">ዕውቀት ለጤና</p>
        </motion.div>

        {/* User Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 border-b border-gray-700/50 relative z-10"
        >
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-full">
              <FaUser className="text-white text-lg" />
            </div>
            <div>
              <p className="font-semibold text-white">Welcome back!</p>
              <p className="text-sm text-gray-300 capitalize">
                {user?.role || "User"} Dashboard
              </p>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <nav className="flex-grow p-4 relative z-10">
          <ul className="space-y-2">
            {navItems.map((item, index) => (
              <motion.li
                key={item.to}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center p-4 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                      isActive
                        ? `bg-gradient-to-r ${item.color} shadow-lg transform scale-105`
                        : "hover:bg-gray-700/50 hover:transform hover:scale-105"
                    }`
                  }
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="mr-4 text-xl relative z-10">
                    {item.icon}
                  </span>
                  <span className="font-semibold relative z-10">
                    {item.label}
                  </span>
                </NavLink>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="p-6 border-t border-gray-700/50 relative z-10"
        >
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full p-4 bg-gradient-to-r from-red-500 to-red-600 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
          >
            <FaSignOutAlt className="mr-3 text-lg group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-semibold">Logout</span>
          </button>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="p-4 text-center border-t border-gray-700/50 relative z-10"
        >
          <p className="text-xs text-gray-400">
            © 2025 |{" "}
            <span className="font-semibold">
              Developed by Abduselam Ibrahim
            </span>
          </p>
        </motion.div>
      </motion.aside>

      {/* Main Content (scrollable) */}
      <main className="flex-1 overflow-y-auto relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-32 h-32 bg-blue-200 rounded-full opacity-20 blur-2xl"></div>
          <div className="absolute bottom-40 left-20 w-40 h-40 bg-emerald-200 rounded-full opacity-15 blur-2xl"></div>
          <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-indigo-200 rounded-full opacity-10 blur-xl"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-8 relative z-10 min-h-full"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}
