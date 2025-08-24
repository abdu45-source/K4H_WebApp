"use client";

import { useState } from "react";
import { addData } from "../services/api";
import {
  FaVial,
  FaBroadcastTower,
  FaPaperPlane,
  FaMobileAlt,
  FaSpinner,
  FaExclamationTriangle,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";
import SMSModal from "../components/SMSModal";
import { motion } from "framer-motion";

const communitiesList = [
  { name: "Mr.Abebe", mobile: "0911000001" },
  { name: "Mr.Alemu", mobile: "0911000002" },
  { name: "Mr.", mobile: "0911000003" },
];
const radioStations = [
  { name: "Radio Ethiopia", email: "info@radioethiopia.com" },
  { name: "FM Addis", email: "contact@fmaddis.com" },
  { name: "Community Radio", email: "hello@communityradio.com" },
];

export default function Pandemics() {
  const [update, setUpdate] = useState("");
  const [selectedCommunities, setSelectedCommunities] = useState([]);
  const [selectedRadios, setSelectedRadios] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleSendPandemicUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedback("");

    const communityMobiles = selectedCommunities
      .map((c) => communitiesList.find((com) => com.name === c)?.mobile)
      .filter(Boolean)
      .join(", ");
    const radioEmails = selectedRadios
      .map((r) => radioStations.find((rs) => rs.name === r)?.email)
      .filter(Boolean)
      .join(", ");
    const message = `Pandemic Update!\n\n${update}\n\nTo Communities (Mobile): ${communityMobiles}\nTo Radio Stations (Email): ${radioEmails}`;

    try {
      await addData("pandemics", {
        message,
        communityMobiles,
        radioEmails,
      });
      setFeedback(
        "Pandemic update sent successfully to all selected recipients!"
      );
      setModalContent(message);
      setShowModal(true);
      setUpdate("");
      setSelectedCommunities([]);
      setSelectedRadios([]);
    } catch (err) {
      console.error("Error sending pandemic update:", err);
      setFeedback("Failed to send pandemic update. Please try again.");
    } finally {
      setIsLoading(false);
      setTimeout(() => setFeedback(""), 5000);
    }
  };

  const totalRecipients = selectedCommunities.length + selectedRadios.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-orange-600 p-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center mb-4"
          >
            <div className="bg-white/20 p-4 rounded-2xl">
              <FaExclamationTriangle className="text-white text-4xl" />
            </div>
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Pandemic Alert Center
          </h1>
          <p className="text-red-100 text-lg">
            Critical health information distribution system
          </p>
        </div>

        {/* Form Content */}
        <div className="p-8">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-800 font-semibold flex items-center">
              <FaExclamationTriangle className="mr-2 text-red-500" />
              Emergency Communication Protocol
            </p>
            <p className="text-red-700 text-sm mt-1">
              This system sends critical health updates to communities via SMS
              and radio stations via email.
            </p>
          </div>

          <form onSubmit={handleSendPandemicUpdate} className="space-y-6">
            {/* Message Input */}
            <div>
              <label className="flex items-center text-gray-700 font-semibold mb-3">
                <FaVial className="mr-2 text-red-500" />
                Pandemic Update Message
              </label>
              <textarea
                value={update}
                onChange={(e) => setUpdate(e.target.value)}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 text-gray-700 resize-none"
                rows={5}
                placeholder="Enter critical pandemic information, safety measures, or health guidelines..."
                required
              />
              <p className="text-sm text-gray-500 mt-2">
                {update.length}/500 characters recommended
              </p>
            </div>

            {/* Recipients Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Communities */}
              <div>
                <label className="flex items-center text-gray-700 font-semibold mb-3">
                  <FaMobileAlt className="mr-2 text-green-600" />
                  End User Communities (SMS)
                </label>
                <div className="border-2 border-gray-200 rounded-xl p-3 max-h-40 overflow-y-auto">
                  {communitiesList.map((community) => (
                    <label
                      key={community.name}
                      className="flex items-center space-x-2 py-2 hover:bg-gray-50 rounded cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        value={community.name}
                        checked={selectedCommunities.includes(community.name)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCommunities([
                              ...selectedCommunities,
                              community.name,
                            ]);
                          } else {
                            setSelectedCommunities(
                              selectedCommunities.filter(
                                (c) => c !== community.name
                              )
                            );
                          }
                        }}
                        className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                      />
                      <span className="text-gray-700">
                        {community.name}{" "}
                        <span className="text-gray-500">
                          ({community.mobile})
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
                {selectedCommunities.length > 0 && (
                  <p className="text-sm text-green-600 mt-2 flex items-center">
                    <FaCheckCircle className="mr-1" />
                    {selectedCommunities.length} communities selected
                  </p>
                )}
              </div>

              {/* Radio Stations */}
              <div>
                <label className="flex items-center text-gray-700 font-semibold mb-3">
                  <FaBroadcastTower className="mr-2 text-blue-600" />
                  Radio Stations (Email)
                </label>
                <div className="border-2 border-gray-200 rounded-xl p-3 max-h-40 overflow-y-auto">
                  {radioStations.map((radio) => (
                    <label
                      key={radio.name}
                      className="flex items-center space-x-2 py-2 hover:bg-gray-50 rounded cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        value={radio.name}
                        checked={selectedRadios.includes(radio.name)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedRadios([...selectedRadios, radio.name]);
                          } else {
                            setSelectedRadios(
                              selectedRadios.filter((r) => r !== radio.name)
                            );
                          }
                        }}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-700">
                        {radio.name}{" "}
                        <span className="text-gray-500">({radio.email})</span>
                      </span>
                    </label>
                  ))}
                </div>
                {selectedRadios.length > 0 && (
                  <p className="text-sm text-blue-600 mt-2 flex items-center">
                    <FaCheckCircle className="mr-1" />
                    {selectedRadios.length} radio stations selected
                  </p>
                )}
              </div>
            </div>

            {/* Send Button */}
            <button
              type="submit"
              disabled={isLoading || !update.trim() || totalRecipients === 0}
              className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <span>Broadcasting Emergency Update...</span>
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  <span>
                    Send to {totalRecipients} recipient
                    {totalRecipients !== 1 ? "s" : ""}
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
                feedback.includes("successfully")
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : "bg-red-100 text-red-800 border border-red-200"
              }`}
            >
              {feedback.includes("successfully") ? (
                <FaCheckCircle className="text-green-600" />
              ) : (
                <FaExclamationTriangle className="text-red-600" />
              )}
              <span className="font-semibold">{feedback}</span>
            </motion.div>
          )}

          {/* Emergency Guidelines */}
          <div className="mt-8 p-6 bg-orange-50 rounded-xl border border-orange-200">
            <h3 className="font-bold text-orange-800 mb-3 flex items-center">
              <FaUsers className="mr-2" />
              Emergency Communication Guidelines
            </h3>
            <ul className="text-sm text-orange-700 space-y-2">
              <li>• Verify information accuracy before broadcasting</li>
              <li>• Include clear, actionable instructions for communities</li>
              <li>• Provide contact information for additional support</li>
              <li>• Follow up with updates as situation develops</li>
              <li>• Coordinate with local health authorities</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 text-center border-t">
          <p className="text-gray-600 text-sm">
            © 2025 |{" "}
            <span className="font-semibold">
              Developed by Abduselam Ibrahim
            </span>
          </p>
        </div>
      </motion.div>

      {showModal && (
        <SMSModal content={modalContent} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
