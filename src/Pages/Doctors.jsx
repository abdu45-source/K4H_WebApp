import React, { useEffect, useState } from "react";
import { getData, addData } from "../services/api";
import { motion } from "framer-motion";
import {
  FaUserMd,
  FaPlus,
  FaTimes,
  FaEnvelope,
  FaPhone,
  FaStethoscope,
  FaUsers,
} from "react-icons/fa";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    specialty: "",
    mobile: "",
    email: "",
    password: "",
  });
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setIsLoading(true);
    const data = await getData("doctors");
    setDoctors(data);
    setIsLoading(false);
  };

  const handleInputChange = (e) => {
    setNewDoctor({ ...newDoctor, [e.target.name]: e.target.value });
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();

    const { name, specialty, mobile, email, password } = newDoctor;
    if (!name || !specialty || !mobile || !email || !password) {
      setFeedback("Please fill all fields.");
      return;
    }

    try {
      const added = await addData("doctors", newDoctor);
      setFeedback(added.message || "Doctor added successfully!");
      setShowForm(false);
      setNewDoctor({
        name: "",
        specialty: "",
        mobile: "",
        email: "",
        password: "",
      });
      fetchDoctors();
      setTimeout(() => setFeedback(""), 3000);
    } catch (err) {
      setFeedback(err.message || "Failed to add doctor.");
      setTimeout(() => setFeedback(""), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-2xl shadow-lg">
              <FaUserMd className="text-white text-4xl" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Doctors Management
          </h1>
          <p className="text-gray-600 text-lg">
            Manage healthcare professionals in your system
          </p>
        </motion.div>

        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-white/20"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-xl">
                <FaUsers className="text-white text-2xl" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {doctors.length}
                </h3>
                <p className="text-gray-600">Total Doctors</p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {showForm ? <FaTimes /> : <FaPlus />}
              <span>{showForm ? "Cancel" : "Add Doctor"}</span>
            </button>
          </div>
        </motion.div>

        {/* Add Doctor Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-white/20"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <FaPlus className="mr-3 text-blue-500" />
              Add New Doctor
            </h2>
            <form onSubmit={handleAddDoctor} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Full Name
                  </label>
                  <input
                    name="name"
                    value={newDoctor.name}
                    onChange={handleInputChange}
                    placeholder="Dr. John Smith"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Specialty
                  </label>
                  <input
                    name="specialty"
                    value={newDoctor.specialty}
                    onChange={handleInputChange}
                    placeholder="Cardiology, Pediatrics, etc."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Mobile Number
                  </label>
                  <input
                    name="mobile"
                    value={newDoctor.mobile}
                    onChange={handleInputChange}
                    placeholder="+251911234567"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={newDoctor.email}
                    onChange={handleInputChange}
                    placeholder="doctor@hospital.com"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  value={newDoctor.password}
                  onChange={handleInputChange}
                  placeholder="Secure password"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Add Doctor to System
              </button>
            </form>
          </motion.div>
        )}

        {/* Feedback Message */}
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl mb-6 ${
              feedback.includes("successfully")
                ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                : "bg-red-100 text-red-800 border border-red-200"
            }`}
          >
            {feedback}
          </motion.div>
        )}

        {/* Doctors List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading doctors...</p>
            </div>
          ) : doctors.length === 0 ? (
            <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
              <FaUserMd className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No doctors registered yet</p>
            </div>
          ) : (
            doctors.map((doc, index) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-xl">
                    <FaStethoscope className="text-white text-xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800">
                      {doc.name}
                    </h3>
                    <p className="text-blue-600 font-semibold">
                      {doc.specialty}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-gray-600">
                      <div className="flex items-center space-x-1">
                        <FaPhone className="text-emerald-500" />
                        <span>{doc.mobile}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaEnvelope className="text-blue-500" />
                        <span>{doc.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
