import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || "https://tradejack.onrender.com/api/v1",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// --- State ---
let csrfToken = null;
let refreshing = false;

// --- Helpers ---
const getCsrfFromCookies = () => {
  try {
    const token = document.cookie
      .split(";")
      .map((c) => c.trim().split("="))
      .find(([name]) => name === "XSRF-TOKEN")?.[1];
    return token || null;
  } catch {
    return null;
  }
};

const clearSession = () => {
  csrfToken = null;
  document.cookie = "XSRF-TOKEN=; Max-Age=0; path=/;";
  document.cookie = "token=; Max-Age=0; path=/;";
  sessionStorage.clear();
};

// --- Refresh Token Logic ---
const refreshToken = async () => {
  if (refreshing) return false; // Prevent multiple refresh calls
  refreshing = true;
  try {
    await api.post("/auth/refresh-token");
    refreshing = false;
    return true;
  } catch {
    refreshing = false;
    return false;
  }
};

// --- Request Interceptor ---
api.interceptors.request.use((config) => {
  const exemptRoutes = [
    "/auth/login",
    "/auth/signup",
    "/auth/refresh-token",
    "/auth/logout",
  ];

  if (
    ["post", "put", "delete", "patch"].includes(config.method.toLowerCase()) &&
    csrfToken &&
    !exemptRoutes.some((route) => config.url.includes(route))
  ) {
    config.headers["X-CSRF-Token"] = csrfToken;
  }

  return config;
});

// --- Response Interceptor ---
api.interceptors.response.use(
  (response) => {
    if (response.config.method === "get") {
      const newToken = response.headers["x-csrf-token"] || getCsrfFromCookies();
      if (newToken) csrfToken = newToken;
    }
    return response;
  },
  async (error) => {
    const { response, config } = error;

    if (!response) {
      return Promise.reject({
        success: false,
        message: "Network error. Please check your connection.",
      });
    }

    const { status, data } = response;

    // --- Handle 401 Unauthorized ---
    if (status === 401) {
      const exempt = ["/auth/login", "/auth/signup", "/auth/logout"];
      if (exempt.some((route) => config.url.includes(route))) {
        return Promise.reject({
          success: false,
          status,
          message: data?.error?.message || "Authentication failed",
        });
      }

      const refreshed = await refreshToken();
      if (refreshed) {
        return api(config); // Retry original request
      }

      // Refresh failed → clear session and redirect
      const lastRoute = window.location.pathname + window.location.search;
      localStorage.setItem("lastRoute", lastRoute);
      clearSession();
      window.location.replace("/signin?sessionExpired=true");

      return Promise.reject({
        success: false,
        status,
        message: "Session expired. Please sign in again.",
      });
    }

    // --- CSRF Missing ---
    if (status === 403 && data?.error?.code === "ERR_CSRF_MISSING") {
      return Promise.reject({
        success: false,
        status,
        message: "CSRF token missing or invalid. Refresh the page.",
      });
    }

    // --- Too many requests ---
    if (status === 429) {
      return Promise.reject({
        success: false,
        status,
        message: "Too many requests. Please slow down.",
      });
    }

    return Promise.reject({
      success: false,
      status,
      message: data?.error?.message || "An error occurred",
    });
  }
);

export default api;
