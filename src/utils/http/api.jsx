// api.js (improved)
// Replace your existing file with this. Update API_BASE and APP_ORIGIN as needed.

import axios from "axios";

const API_BASE =
  import.meta.env.VITE_API_URL || "https://tradejack.onrender.com/api/v1";
const APP_ORIGIN = import.meta.env.VITE_APP_ORIGIN || window.location.origin; // optional

// Primary axios instance (used by your app)
const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
  // you may want a small timeout for client responsiveness
  timeout: 30000,
});

// A minimal axios instance without interceptors to use for refresh requests.
// Important: it should not share the response interceptor to avoid recursion.
const refreshClient = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

// --- State ---
let csrfToken = null;
let isRefreshing = false;
// queue of functions to call when refresh completes: (success) => { resolve/reject replay }
let subscribers = [];

// --- Helpers ---
const subscribeRefresh = (cb) => subscribers.push(cb);
const onRefreshed = (ok) => {
  subscribers.forEach((cb) => cb(ok));
  subscribers = [];
};

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
  // Attempt to remove cookies (domain/path attributes might vary)
  document.cookie = "XSRF-TOKEN=; Max-Age=0; path=/;";
  document.cookie = "token=; Max-Age=0; path=/;";
  sessionStorage.clear();
  localStorage.removeItem("lastRoute");
};

function isInAppBrowser() {
  const ua = navigator.userAgent || "";
  const inAppRegex = /FBAN|FBAV|Twitter|Line|Instagram|LinkedIn|Puffin/i;
  return inAppRegex.test(ua);
}

// --- Refresh Token Logic (improved) ---
const refreshToken = async () => {
  if (isRefreshing) return false;
  isRefreshing = true;
  try {
    // Use refreshClient (no interceptors) to avoid recursion
    const r = await refreshClient.post(
      "/auth/refresh-token",
      {},
      { withCredentials: true }
    );
    isRefreshing = false;
    return r.status >= 200 && r.status < 300;
  } catch (err) {
    isRefreshing = false;
    return false;
  }
};

// --- Request Interceptor ---
api.interceptors.request.use(
  (config) => {
    // safety guards
    const url = config?.url || "";
    const method = (config?.method || "get").toLowerCase();

    const exemptRoutes = [
      "/signin",
      "/signup",
      "/logout",
      "/auth/login",
      "/auth/signup",
      "/auth/logout",
    ];

    // attach CSRF header for state-changing requests if we have token
    if (
      ["post", "put", "delete", "patch"].includes(method) &&
      csrfToken &&
      !exemptRoutes.some((r) => url.includes(r))
    ) {
      config.headers["X-CSRF-Token"] = csrfToken;
    }

    // Ensure credentials are always true
    config.withCredentials = true;

    return config;
  },
  (err) => Promise.reject(err)
);

// --- Response Interceptor (with queueing) ---
api.interceptors.response.use(
  (response) => {
    // update CSRF from header or cookies when GET returns one
    try {
      const method = (response?.config?.method || "get").toLowerCase();
      if (method === "get") {
        const newToken =
          response.headers["x-csrf-token"] || getCsrfFromCookies();
        if (newToken) csrfToken = newToken;
      }
    } catch (e) {
      // ignore
    }
    return response;
  },
  async (error) => {
    const { response, config } = error || {};
    // network error (no response)
    if (!response) {
      return Promise.reject({
        success: false,
        message: "Network error. Please check your connection.",
      });
    }

    const { status, data } = response;

    // --- Handle 401 Unauthorized with queueing and single refresh attempt ---
    if (status === 401) {
      const originalReq = config || {};
      const url = originalReq.url || "";
      const exempt = [
        "/auth/login",
        "/auth/signup",
        "/auth/logout",
        "/signin",
        "/signup",
      ];

      if (exempt.some((route) => url.includes(route))) {
        return Promise.reject({
          success: false,
          status,
          message: data?.error?.message || "Authentication failed",
        });
      }

      // If already retrying this request, don't attempt again
      if (originalReq.__isRetry) {
        // fallback: clear and redirect
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

      // Create a promise that will be resolved once refresh finishes
      return new Promise((resolve, reject) => {
        subscribeRefresh(async (ok) => {
          if (!ok) {
            // refresh failed → clear and redirect
            const lastRoute = window.location.pathname + window.location.search;
            localStorage.setItem("lastRoute", lastRoute);
            clearSession();
            window.location.replace("/signin?sessionExpired=true");
            return reject({
              success: false,
              status,
              message: "Session expired. Please sign in again.",
            });
          }

          // mark retry to avoid infinite loops
          originalReq.__isRetry = true;
          try {
            const resp = await api(originalReq);
            resolve(resp);
          } catch (e) {
            reject(e);
          }
        });

        // If not currently refreshing, start it
        if (!isRefreshing) {
          (async () => {
            const ok = await refreshToken();
            onRefreshed(ok);
          })();
        }
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

    // --- Rate limiting ---
    if (status === 429) {
      return Promise.reject({
        success: false,
        status,
        message: "Too many requests. Please slow down.",
      });
    }

    // generic fallback
    return Promise.reject({
      success: false,
      status,
      message: data?.error?.message || "An error occurred",
    });
  }
);

export default api;
export { isInAppBrowser };
