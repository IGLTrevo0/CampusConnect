import axios from "axios";
import { API_URL } from "../config/api";

const USERS_URL = `${API_URL}/users`;

export const searchUsers = async (params = {}) => {
  const response = await axios.get(USERS_URL, { params });
  return response.data;
};

export const getUserById = async (id) => {
  const response = await axios.get(`${USERS_URL}/${id}`);
  return response.data;
};

export const updateProfile = async (payload) => {
  const response = await axios.put(`${USERS_URL}/profile`, payload);
  return response.data;
};
