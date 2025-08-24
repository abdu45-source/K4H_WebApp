import React, { useState } from "react";
import { sendSmsUpdate } from "../services/api";

const SMSModal = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  const handleSend = async () => {
    try {
      const res = await sendSmsUpdate(message);
      setStatus(res.message);
    } catch (error) {
      setStatus("❌ Failed to send SMS");
    }
  };

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-lg font-bold mb-2">Send SMS</h2>
      <textarea
        className="w-full border p-2 mb-2"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your SMS..."
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Send
      </button>
      {status && <p className="mt-2">{status}</p>}
    </div>
  );
};

export default SMSModal;
