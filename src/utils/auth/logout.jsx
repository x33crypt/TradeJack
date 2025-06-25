import api from "../http/api";

// ✅ MAIN FUNCTION
export async function logout() {
  try {
    const response = await api.post("/auth/logout");

    if (response?.data?.success) {
      return {
        success: true,
        message: response?.data?.message,
      };
    } else {
      return {
        success: false,
        error:
          response?.data?.errorMessage || "Unexpected error during logout.",
      };
    }
  } catch (err) {
    return {
      success: false,
      error:
        err?.response?.data?.errorMessage || err?.message || "Unknown error",
    };
  }
}
