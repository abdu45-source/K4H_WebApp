"use client";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaUserShield, FaUserMd, FaHeartbeat, FaGlobe } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-200 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-200 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-teal-200 rounded-full opacity-15 blur-lg"></div>
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-10 max-w-4xl w-full text-center relative z-10"
      >
        {/* Header with icon */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center mb-6"
        >
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4 rounded-2xl shadow-lg mr-4">
            <FaHeartbeat className="text-white text-3xl" />
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4 rounded-2xl shadow-lg">
            <FaGlobe className="text-white text-3xl" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent mb-6 leading-tight"
        >
          Knowledge for Health <br />
          <span className="text-4xl md:text-5xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            ዕውቀት ለጤና
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl text-gray-700 mb-4 font-semibold">
            Welcome!{" "}
            <span className="text-emerald-600 font-bold">
              We are grateful for your trust.
            </span>
          </h2>

          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-6 border border-emerald-100">
            <p className="text-lg text-gray-700 leading-relaxed">
              <span className="font-bold text-emerald-700 text-xl">
                Our Mission:
              </span>
              <br />
              Connecting rural communities with vital health information. We
              bridge the gap by empowering doctors and administrators to deliver
              timely updates on appointments, epidemics, and local health
              practices via SMS and radio.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-6 justify-center mb-8"
        >
          <Link to="/login?role=admin" className="group">
            <button className="flex items-center justify-center w-72 px-8 py-5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:from-emerald-600 hover:to-emerald-700 group-hover:-translate-y-1">
              <div className="bg-white/20 p-2 rounded-lg mr-4">
                <FaUserShield size={24} />
              </div>
              <span className="text-lg">Super Admin Login</span>
            </button>
          </Link>

          <Link to="/login?role=doctor" className="group">
            <button className="flex items-center justify-center w-72 px-8 py-5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:from-blue-600 hover:to-blue-700 group-hover:-translate-y-1">
              <div className="bg-white/20 p-2 rounded-lg mr-4">
                <FaUserMd size={24} />
              </div>
              <span className="text-lg">Doctor Login</span>
            </button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-r from-emerald-100 to-blue-100 rounded-2xl p-6 border border-emerald-200"
        >
          <span className="text-emerald-700 font-bold text-xl">
            🤝 Thank you for being part of our health journey!🎉
          </span>
        </motion.div>
      </motion.div>

      {/* Enhanced Footer */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
        className="w-full text-center mt-10 relative z-10"
      >
        <footer className="bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-lg border border-white/20 inline-block">
          <p className="text-gray-600 text-base">
            © 2025 &nbsp;|&nbsp;
            <span className="font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Developed by Abduselam Ibrahim
            </span>
          </p>
        </footer>
      </motion.div>
    </div>
  );
}
