// utils/http/api.js
import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || "https://tradejack.onrender.com/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Store CSRF token
let csrfToken = null;
let isRedirecting = false;

// Fetch CSRF token from cookies
const getCsrfTokenFromCookies = () => {
  try {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split("=");
      if (name === "XSRF-TOKEN") {
        return value;
      }
    }
    return null;
  } catch (error) {
    console.error("Error reading XSRF-TOKEN cookie:", error);
    return null;
  }
};

// Clear session cookies
const clearSession = () => {
  csrfToken = null;
  document.cookie = "XSRF-TOKEN=; Max-Age=0; path=/;";
  document.cookie = "token=; Max-Age=0; path=/;";
};

// ✅ Response Interceptor
api.interceptors.response.use(
  (response) => {
    // Store CSRF token on GET requests
    if (response.config.method === "get") {
      const newCsrfToken =
        response.headers["x-csrf-token"] || getCsrfTokenFromCookies();
      if (newCsrfToken) csrfToken = newCsrfToken;
    }
    return response;
  },
  (error) => {
    const { response } = error;

    if (response) {
      const { status, data } = response;
      let message = data?.error?.message || "An error occurred";

      if (status === 401) {
        if (
          data?.error?.message === "Access denied. Session token expired" &&
          !isRedirecting
        ) {
          isRedirecting = true;

          clearSession();

          // Dispatch toast notification (optional listener)
          setToast({
            ...toast,
            error: true,
            errorMessage: "Your session has expired. Please log in again.",
          });

          // Redirect to signin
          window.location.href = "/signin?sessionExpired=true";

          // Reset flag
          setTimeout(() => {
            isRedirecting = false;
          }, 1000);

          return Promise.reject(error);
        }
        message = "Unauthorized – please log in again.";
      } else if (status === 403 && data?.error?.code === "ERR_CSRF_MISSING") {
        message = "CSRF token missing or invalid. Please refresh the page.";
      } else if (status === 429) {
        message = "Too many requests. Please slow down.";
      }

      return Promise.reject({
        success: false,
        status,
        message,
        data,
      });
    }

    return Promise.reject({
      success: false,
      message: "Network Error. Please check your connection.",
      error: error.message,
    });
  }
);

// ✅ Request Interceptor
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
