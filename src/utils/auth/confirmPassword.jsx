import api from "../http/api";

export async function confirmPassword(password) {
  const baseUrl = import.meta.env.VITE_API_URL;
  console.log("API URL:", baseUrl);

  if (!password) {
    return { success: false, error: "Missing required field: Password" };
  }

  try {
    const response = await api.post(
      `${baseUrl}/auth/confirm-password`,
      password
    );

    return {
      success: true,
      message: response?.data?.message,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      error: err?.response?.data?.errormessage || "Unknown error",
    };
  }
}
