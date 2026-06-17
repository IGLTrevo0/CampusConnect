import axios from "axios";
import { API_URL } from "../config/api";

const CONNECTIONS_URL = `${API_URL}/connections`;

export const sendConnectionRequest = async (userId) => {
  const response = await axios.post(`${CONNECTIONS_URL}/send/${userId}`);
  return response.data;
};
