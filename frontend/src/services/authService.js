import axios from "axios";
import { API_URL } from "../config/api";
import { getStoredToken } from "../utils/auth";

const AUTH_URL = `${API_URL}/auth`;

export const manualSignup = async (userData) => {
  const response = await axios.post(`${AUTH_URL}/manual-signup`, userData);
  return response.data;
};

export const manualLogin = async (userData) => {
  const response = await axios.post(`${AUTH_URL}/manual-login`, userData);
  return response.data;
};

export const googleSignIn = async (credential, role) => {
  const response = await axios.post(`${AUTH_URL}/google`, { credential, role });
  return response.data;
};

export const verifyOTP = async ({ email, otp }) => {
  const response = await axios.post(`${AUTH_URL}/verify-otp`, { email, otp });
  return response.data;
};

export const resendOTP = async (email) => {
  const response = await axios.post(`${AUTH_URL}/resend-otp`, { email });
  return response.data;
};

export const getMe = async () => {
  const token = getStoredToken();
  if (!token) {
    throw new Error("Not authenticated");
  }
  const response = await axios.get(`${AUTH_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
