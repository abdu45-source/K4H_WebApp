import axios from "axios";

const API_URL = "/api";

// 🔹 Generic error handler
const handleApiError = (error, defaultMessage) => {
  console.error(defaultMessage, error);
  const message = error.response?.data?.error || defaultMessage;
  throw new Error(message);
};

// 🔹 Unified login
export const loginUser = async ({ role, email, password }) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      role,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    handleApiError(error, `Login failed for role: ${role}`);
  }
};

export const getData = async (resource) => {
  try {
    const response = await axios.get(`${API_URL}/${resource}`);
    return response.data;
  } catch (error) {
    handleApiError(error, `Failed to fetch ${resource}`);
  }
};

// 🔹 Add data
export const addData = async (resource, data) => {
  try {
    const response = await axios.post(`/api/${resource}`, data);
    return response.data;
  } catch (error) {
    handleApiError(error, `Failed to add ${resource}`);
  }
};

export const sendSmsUpdate = async ({ message, recipients }) => {
  try {
    const res = await axios.post("/api/send-sms", { message, recipients });
    return res.data;
  } catch (error) {
    console.error("Failed to send SMS", error);
    throw new Error("Failed to send SMS");
  }
};
