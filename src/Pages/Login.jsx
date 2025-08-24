import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { motion } from "framer-motion";
import { FaSignInAlt, FaSpinner } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const query = new URLSearchParams(location.search);
  const [role, setRole] = useState(query.get("role") || "doctor");

  useEffect(() => {
    if (role === "admin") {
      setEmail("abduselamibrahim85@gmail.com");
      setPassword("abdu455219@");
    } else {
      setEmail("abduselamibrahim85@gmail.et");
      setPassword("password123");
    }
  }, [role]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login({ email, password, role });
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    } catch {
      setError("Login failed. Please check your credentials.");
      setIsLoading(false);
    }
  };

  const title = role === "admin" ? "Super Admin Login" : "Doctor Login";
  const colorClass =
    role === "admin"
      ? "from-green-500 to-green-700"
      : "from-blue-500 to-blue-700";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
          {title}
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Welcome back. Please login to your account.
        </p>

        {error && (
          <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center items-center bg-gradient-to-r ${colorClass} text-white font-bold py-3 px-4 rounded-md hover:opacity-90 transition duration-300 disabled:opacity-50`}
          >
            {isLoading ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <FaSignInAlt className="mr-2" />
            )}
            {isLoading ? "Logging In..." : "Login"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
