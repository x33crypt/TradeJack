import api from "../http/api";

export const dashboard = async () => {
  try {
    const res = await api.get("/profile/dashboard");
    return { success: true, data: res.data };
  } catch (err) {
    return {
      success: false,
      error:
        err?.response?.data?.errorMessage || err?.message || "Unknown error",
    };
  }
};
