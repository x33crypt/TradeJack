// utils/http/api.js
import axios from "axios";

// Create Axios instance with defaults
const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || "https://tradejack.onrender.com/api/v1",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// --- State ---
let csrfToken = null; // Store CSRF token for safe requests
let isRedirecting = false; // Prevent duplicate redirects

// --- Helpers ---
// Read CSRF token from cookie
const getCsrfTokenFromCookies = () => {
  try {
    return (
      document.cookie
        .split(";")
        .map((c) => c.trim().split("="))
        .find(([name]) => name === "XSRF-TOKEN")?.[1] || null
    );
  } catch {
    return null;
  }
};

// Clear all session data (but don’t clear localStorage because we need lastRoute)
const clearSession = () => {
  csrfToken = null;

  // Clear cookies
  document.cookie = "XSRF-TOKEN=; Max-Age=0; path=/;";
  document.cookie = "token=; Max-Age=0; path=/;";

  // Clear session storage
  sessionStorage.clear();
};

// --- Response Interceptor ---
// Handle CSRF tokens, errors, and session expiration
api.interceptors.response.use(
  (response) => {
    // If it's a GET, refresh CSRF token from headers/cookies
    if (response.config.method === "get") {
      const newCsrfToken =
        response.headers["x-csrf-token"] || getCsrfTokenFromCookies();
      if (newCsrfToken) csrfToken = newCsrfToken;
    }
    return response;
  },
  async (error) => {
    const { response } = error;

    if (response) {
      const { status, data, config } = response;
      let message = data?.error?.message || "An error occurred";

      // --- Handle 401 Unauthorized ---
      if (status === 401 && !isRedirecting) {
        if (!config.url.includes("/auth/refresh-token")) {
          try {
            // Try refresh first
            await api.post("/auth/refresh-token");
            return api(config); // retry original request
          } catch {
            // ❌ Refresh failed → session expired
            isRedirecting = true;

            // ✅ Save last route before clearing session
            const lastRoute = window.location.pathname + window.location.search;
            localStorage.setItem("lastRoute", lastRoute);

            clearSession();

            // ✅ Replace history so user can’t "back" to old route
            window.history.replaceState({}, "", "/signin?sessionExpired=true");

            // ✅ Redirect to signin
            setTimeout(() => {
              window.location.href = "/signin?sessionExpired=true";
            }, 50);

            return Promise.reject({
              success: false,
              status,
              message: "Session expired. Please log in again.",
            });
          }
        }
      }

      // --- Handle other errors ---
      if (status === 403 && data?.error?.code === "ERR_CSRF_MISSING") {
        message = "CSRF token missing or invalid. Please refresh the page.";
      } else if (status === 429) {
        message = "Too many requests. Please slow down.";
      }

      return Promise.reject({ success: false, status, message, data });
    }

    // --- Network error fallback ---
    return Promise.reject({
      success: false,
      message: "Network Error. Please check your connection.",
      error: error.message,
    });
  }
);

// --- Request Interceptor ---
// Add CSRF token to unsafe requests
api.interceptors.request.use((config) => {
  const exemptRoutes = [
    "/api/v1/auth/login",
    "/api/v1/auth/signup",
    "/api/v1/auth/refresh-token",
    "/api/v1/auth/logout",
  ];

  if (
    ["post", "put", "delete", "patch"].includes(config.method.toLowerCase()) &&
    csrfToken &&
    !exemptRoutes.includes(config.url)
  ) {
    config.headers["X-CSRF-Token"] = csrfToken;
  }

  return config;
});

export default api;
