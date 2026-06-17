import axios from "axios";
import { API_URL } from "../config/api";

const POSTS_URL = `${API_URL}/posts`;

export const getPosts = async () => {
  const response = await axios.get(POSTS_URL);
  return response.data;
};

export const createPost = async (payload) => {
  const response = await axios.post(POSTS_URL, payload);
  return response.data;
};

export const applyToPost = async (postId, message) => {
  const response = await axios.post(`${POSTS_URL}/${postId}/apply`, { message });
  return response.data;
};
