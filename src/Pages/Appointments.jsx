import React, { useState } from "react";
import { sendSmsUpdate } from "../services/api";
import { motion } from "framer-motion";
import {
  FaSms,
  FaPaperPlane,
  FaUsers,
  FaSpinner,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function Appointments() {
  const [message, setMessage] = useState("");
  const [recipients, setRecipients] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [feedbackType, setFeedbackType] = useState("");

  const handleSendSms = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setFeedback("");
    setFeedbackType("");

    const numbers = recipients.split(",").map((num) => num.trim());

    try {
      const res = await sendSmsUpdate({ message, recipients: numbers });
      setFeedback(res.message || "SMS sent successfully to all recipients!");
      setFeedbackType("success");
      setMessage("");
      setRecipients("");
    } catch (err) {
      console.error(err);
      setFeedback(
        "Failed to send SMS. Please check the numbers and try again."
      );
      setFeedbackType("error");
    } finally {
      setIsSending(false);
      setTimeout(() => {
        setFeedback("");
        setFeedbackType("");
      }, 5000);
    }
  };

  const recipientCount = recipients
    .split(",")
    .filter((num) => num.trim()).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center mb-4"
          >
            <div className="bg-white/20 p-4 rounded-2xl">
              <FaSms className="text-white text-4xl" />
            </div>
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-2">
            SMS Appointment Center
          </h1>
          <p className="text-emerald-100 text-lg">
            Send appointment updates to patients instantly
          </p>
        </div>

        {/* Form Content */}
        <div className="p-8">
          <form onSubmit={handleSendSms} className="space-y-6">
            {/* Recipients Input */}
            <div>
              <label className="flex items-center text-gray-700 font-semibold mb-3">
                <FaUsers className="mr-2 text-emerald-500" />
                Recipients Phone Numbers
              </label>
              <input
                type="text"
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 text-gray-700"
                placeholder="+251900000000, +251911111111, +251922222222"
                required
              />
              {recipientCount > 0 && (
                <p className="text-sm text-emerald-600 mt-2 flex items-center">
                  <FaCheckCircle className="mr-1" />
                  {recipientCount} recipient{recipientCount > 1 ? "s" : ""}{" "}
                  ready
                </p>
              )}
            </div>

            {/* Message Input */}
            <div>
              <label className="flex items-center text-gray-700 font-semibold mb-3">
                <FaPaperPlane className="mr-2 text-blue-500" />
                Appointment Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-700 resize-none"
                rows={6}
                placeholder="Dear patient, your appointment is scheduled for..."
                required
              />
              <p className="text-sm text-gray-500 mt-2">
                {message.length}/160 characters
              </p>
            </div>

            {/* Send Button */}
            <button
              type="submit"
              disabled={isSending || !message.trim() || !recipients.trim()}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              {isSending ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <span>Sending SMS...</span>
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  <span>
                    Send SMS to {recipientCount} recipient
                    {recipientCount !== 1 ? "s" : ""}
                  </span>
                </>
              )}
            </button>
          </form>

          {/* Feedback Message */}
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-6 p-4 rounded-xl flex items-center space-x-2 ${
                feedbackType === "success"
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                  : "bg-red-100 text-red-800 border border-red-200"
              }`}
            >
              {feedbackType === "success" ? (
                <FaCheckCircle className="text-emerald-600" />
              ) : (
                <FaExclamationTriangle className="text-red-600" />
              )}
              <span className="font-semibold">{feedback}</span>
            </motion.div>
          )}

          {/* Help Text */}
          <div className="mt-8 p-4 bg-gray-50 rounded-xl">
            <h3 className="font-semibold text-gray-800 mb-2">
              Tips for effective SMS:
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Keep messages clear and concise</li>
              <li>• Include appointment date, time, and location</li>
              <li>• Add contact information for questions</li>
              <li>• Use comma-separated phone numbers with country code</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
