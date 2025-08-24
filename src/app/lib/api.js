import axios from "axios";

const API_URL = "/api";

// Generic error handler
const handleApiError = (error, defaultMessage) => {
  console.error(defaultMessage, error);
  const message = error.response?.data?.error || defaultMessage;
  throw new Error(message);
};

export const loginUser = async ({ role, email, password }) => {
  try {
    const response = await axios.post(`${API_URL}/${role}s`, {
      username: email,
      password,
    });
    return response.data;
  } catch (error) {
    handleApiError(error, `Login failed for role: ${role}`);
  }
};

//Fetch data (patients / remedies)
export const getData = async (resource) => {
  try {
    const response = await axios.get(`${API_URL}/${resource}`);
    return response.data;
  } catch (error) {
    handleApiError(error, `Failed to fetch ${resource}`);
  }
};

// Add data (patients / remedies)
export const addData = async (resource, data) => {
  try {
    const response = await axios.post(`${API_URL}/${resource}`, data);
    return response.data;
  } catch (error) {
    handleApiError(error, `Failed to add ${resource}`);
  }
};

//  Send SMS or Email
export const sendSmsUpdate = async ({ message, to, email }) => {
  try {
    const response = await axios.post(`${API_URL}/sms`, { message, to, email });
    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to send SMS/email");
  }
};
