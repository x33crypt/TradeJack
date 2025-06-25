import api from "../http/api";

export const dashboard = async (setDashboard) => {
  try {
    const response = await api.get("/profile/dashboard");

    if (response?.success) {
      setDashboard(response?.data?.data);
    }

    return { success: true, data: res.data };
  } catch (err) {
    return {
      success: false,
      error:
        err?.response?.data?.errorMessage || err?.message || "Unknown error",
    };
  }
};
