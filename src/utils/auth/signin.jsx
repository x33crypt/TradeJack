import api from "../http/api";
import DOMPurify from "dompurify";

// ✅ Sanitize input
const sanitizeInput = (input) => {
  if (typeof input !== "string") return "";
  return DOMPurify.sanitize(input).trim();
};

// ✅ Basic email format check
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export async function signin(signinDetails) {
  if (!signinDetails) {
    return { success: false, error: "No sign-in details provided." };
  }

  const { email, password } = signinDetails;

  if (!email)
    return { success: false, error: "Missing required field: Email Address" };
  if (!password)
    return { success: false, error: "Missing required field: Password" };

  const sanitizedEmail = sanitizeInput(email);
  const sanitizedPassword = sanitizeInput(password);

  if (!validateEmail(sanitizedEmail)) {
    return { success: false, error: "Invalid email format." };
  }

  const payload = { email: sanitizedEmail, password: sanitizedPassword };

  try {
    const response = await api.post("/auth/login", payload);

    if (response?.data?.success) {
      // ✅ Optional: Add small delay for Safari cookie sync
      await new Promise((resolve) => setTimeout(resolve, 200));

      return {
        success: true,
        message: response?.data?.message,
        user: response?.data?.user,
      };
    }

    return {
      success: false,
      error: response?.data?.errorMessage || "Unexpected error during login.",
    };
  } catch (err) {
    return {
      success: false,
      error:
        err?.response?.data?.errorMessage || err?.message || "Unknown error",
    };
  }
}
