const TOKEN_KEY = "token";
const USER_KEY = "user";

function parseJwtPayload(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  return JSON.parse(atob(padded));
}

export function isTokenValid(token) {
  if (!token || typeof token !== "string") return false;

  // MOCK - remove when real auth is working
  if (token === "mock-token") return true;

  const parts = token.split(".");
  if (parts.length !== 3) return false;

  try {
    const payload = parseJwtPayload(token);
    if (!payload.id) return false;
    if (payload.exp && payload.exp * 1000 <= Date.now()) return false;
    return true;
  } catch {
    return false;
  }
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getStoredToken() {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!isTokenValid(token)) {
    if (token) clearAuth();
    return null;
  }
  return token;
}

export function setAuthSession({ token, user }) {
  if (!token || !isTokenValid(token)) {
    throw new Error("Invalid token received from server");
  }
  localStorage.setItem(TOKEN_KEY, token);
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
}

export function isAuthenticated() {
  return !!getStoredToken();
}

export function getAuthHeaders() {
  const token = getStoredToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
