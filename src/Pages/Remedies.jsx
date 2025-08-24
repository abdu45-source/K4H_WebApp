"use client";

import { useState, useEffect } from "react";
import { getData, addData } from "../services/api";
import { motion } from "framer-motion";
import {
  FaPlus,
  FaPaperPlane,
  FaLeaf,
  FaUsers,
  FaBroadcastTower,
  FaSpinner,
  FaCheckCircle,
  FaStethoscope,
  FaHeart,
  FaGlobe,
} from "react-icons/fa";
import SMSModal from "../components/SMSModal";

const communityMembers = [
  { name: "Abebe Bikila", mobile: "+251911111111" },
  { name: "Fatuma Roba", mobile: "+251911222222" },
  { name: "Kebede Alemu", mobile: "+251911333333" },
];
const radioStations = [
  { name: "Radio Ethiopia", email: "info@radioethiopia.et" },
  { name: "FM Addis", email: "contact@fmaddis.et" },
  { name: "Community Radio", email: "hello@communityradio.et" },
];

export default function Remedies() {
  const [remedies, setRemedies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedRadios, setSelectedRadios] = useState([]);
  const [newRemedy, setNewRemedy] = useState({
    title: "",
    description: "",
    created_by: "",
  });
  const [customMessage, setCustomMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("");

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const data = await getData("remedies");
      setRemedies(data);
      setIsLoading(false);
    };
    loadData();
  }, []);

  const handleAddRemedy = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback("");
    try {
      const addedRemedy = await addData("remedies", newRemedy);
      setRemedies([...remedies, addedRemedy]);
      setNewRemedy({ title: "", description: "", created_by: "" });
      setFeedback("Traditional remedy added successfully!");
      setFeedbackType("success");
      setTimeout(() => setFeedback(""), 3000);
    } catch (error) {
      console.error("Error adding remedy:", error);
      setFeedback("Failed to add remedy. Please try again.");
      setFeedbackType("error");
      setTimeout(() => setFeedback(""), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRemedy((prev) => ({ ...prev, [name]: value }));
  };

  const openSmsModal = () => {
    const membersStr = communityMembers
      .filter((m) => selectedMembers.includes(m.mobile))
      .map((m) => `${m.name} (${m.mobile})`)
      .join(", ");
    const radiosStr = radioStations
      .filter((r) => selectedRadios.includes(r.email))
      .map((r) => `${r.name} (${r.email})`)
      .join(", ");
    const smsMessage = `Remedy Update:\n${customMessage}\nSend SMS to: ${membersStr}\nSend Email to: ${radiosStr}`;
    setModalContent(smsMessage);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-4 rounded-2xl shadow-lg mr-3">
              <FaLeaf className="text-white text-4xl" />
            </div>
            <div className="bg-gradient-to-r from-green-500 to-teal-500 p-4 rounded-2xl shadow-lg">
              <FaHeart className="text-white text-4xl" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-2">
            Traditional Remedies
          </h1>
          <p className="text-gray-600 text-lg">
            Preserve and share cultural healing knowledge with communities
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
                <FaGlobe className="text-white text-2xl" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {remedies.length}
                </h3>
                <p className="text-gray-600">Cultural Remedies Documented</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">
                Sharing traditional wisdom
              </p>
              <p className="text-sm text-gray-500">with modern communities</p>
            </div>
          </div>
        </motion.div>

        {/* Add New Remedy Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-white/20"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <FaPlus className="mr-3 text-emerald-500" />
            Document New Traditional Remedy
          </h2>
          <form onSubmit={handleAddRemedy} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Remedy Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={newRemedy.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                  placeholder="e.g., Eucalyptus Steam for Respiratory Relief"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Documenting Doctor ID
                </label>
                <input
                  type="number"
                  name="created_by"
                  value={newRemedy.created_by}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                  placeholder="Enter doctor ID"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Detailed Description & Preparation
              </label>
              <textarea
                name="description"
                value={newRemedy.description}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 resize-none"
                rows={4}
                placeholder="Provide detailed instructions on preparation, ingredients, usage, and traditional knowledge..."
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <span>Documenting Remedy...</span>
                </>
              ) : (
                <>
                  <FaPlus />
                  <span>Add to Traditional Knowledge Base</span>
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Feedback Message */}
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl mb-6 flex items-center space-x-2 ${
              feedbackType === "success"
                ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                : "bg-red-100 text-red-800 border border-red-200"
            }`}
          >
            <FaCheckCircle
              className={
                feedbackType === "success" ? "text-emerald-600" : "text-red-600"
              }
            />
            <span className="font-semibold">{feedback}</span>
          </motion.div>
        )}

        {/* Broadcast Remedy Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl shadow-xl p-8 mb-8 border border-green-200"
        >
          <h2 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
            <FaPaperPlane className="mr-3" />
            Broadcast Cultural Remedy Knowledge
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Traditional Remedy Message
              </label>
              <textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="w-full px-4 py-3 border-2 border-green-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 resize-none"
                rows={4}
                placeholder="Share traditional healing knowledge, preparation methods, and cultural wisdom with communities..."
                required
              />
              <p className="text-sm text-green-600 mt-2">
                {customMessage.length}/500 characters recommended
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2 flex items-center">
                  <FaUsers className="mr-2 text-green-600" />
                  Community Members (SMS)
                </label>
                <div className="border-2 border-green-300 rounded-xl p-3 max-h-32 overflow-y-auto">
                  {communityMembers.map((member) => (
                    <label
                      key={member.mobile}
                      className="flex items-center space-x-2 py-2 hover:bg-green-50 rounded cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        value={member.mobile}
                        checked={selectedMembers.includes(member.mobile)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedMembers([
                              ...selectedMembers,
                              member.mobile,
                            ]);
                          } else {
                            setSelectedMembers(
                              selectedMembers.filter((m) => m !== member.mobile)
                            );
                          }
                        }}
                        className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                      />
                      <span className="text-gray-700">
                        {member.name}{" "}
                        <span className="text-gray-500">({member.mobile})</span>
                      </span>
                    </label>
                  ))}
                </div>
                {selectedMembers.length > 0 && (
                  <p className="text-sm text-green-600 mt-2 flex items-center">
                    <FaCheckCircle className="mr-1" />
                    {selectedMembers.length} members selected
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2 flex items-center">
                  <FaBroadcastTower className="mr-2 text-blue-600" />
                  Radio Stations (Email)
                </label>
                <div className="border-2 border-blue-300 rounded-xl p-3 max-h-32 overflow-y-auto">
                  {radioStations.map((radio) => (
                    <label
                      key={radio.email}
                      className="flex items-center space-x-2 py-2 hover:bg-blue-50 rounded cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        value={radio.email}
                        checked={selectedRadios.includes(radio.email)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedRadios([...selectedRadios, radio.email]);
                          } else {
                            setSelectedRadios(
                              selectedRadios.filter((r) => r !== radio.email)
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
                    {selectedRadios.length} stations selected
                  </p>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={openSmsModal}
              disabled={
                !customMessage.trim() ||
                (selectedMembers.length === 0 && selectedRadios.length === 0)
              }
              className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              <FaPaperPlane />
              <span>Share Traditional Knowledge</span>
            </button>
          </div>
        </motion.div>

        {/* Remedies List */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <FaStethoscope className="mr-3 text-emerald-500" />
            Documented Traditional Remedies ({remedies.length})
          </h3>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
              <p className="text-gray-600 mt-4">
                Loading traditional remedies...
              </p>
            </div>
          ) : remedies.length === 0 ? (
            <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
              <FaLeaf className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">
                No traditional remedies documented yet
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Start building your cultural knowledge base
              </p>
            </div>
          ) : (
            remedies.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-3 rounded-xl flex-shrink-0">
                    <FaLeaf className="text-white text-xl" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-800 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 mb-3 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <FaCheckCircle className="mr-1 text-emerald-500" />
                      <span>Documented by Doctor ID: {item.created_by}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Cultural Knowledge Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-12 p-6 bg-emerald-50 rounded-2xl border border-emerald-200"
        >
          <h3 className="font-bold text-emerald-800 mb-3 flex items-center">
            <FaHeart className="mr-2" />
            Preserving Traditional Healing Wisdom
          </h3>
          <p className="text-emerald-700 text-sm leading-relaxed">
            This platform helps preserve and share centuries-old traditional
            healing knowledge with modern communities. By documenting these
            remedies, we bridge the gap between ancestral wisdom and
            contemporary healthcare, ensuring valuable cultural knowledge is not
            lost and can benefit future generations.
          </p>
        </motion.div>
      </div>

      {showModal && (
        <SMSModal content={modalContent} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
