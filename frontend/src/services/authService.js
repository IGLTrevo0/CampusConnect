import axios from "axios";
const API_URL = "http://localhost:5000/api/auth";

export const register = async (userData) => {
  console.log(userData);
  console.log(`${API_URL}/register`);
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

export const getme = async (token) => {
  const response = await axios.get(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
