import axios from "axios";
import DOMPurify from "dompurify"; // make sure you import this if you use it

const sanitizeInput = (input) => {
  if (typeof input !== "string") return "";
  const cleaned = DOMPurify.sanitize(input);
  return cleaned.trim();
};

// At least 8 characters, including uppercase, lowercase, number, and special character
const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// Basic email format validation
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export async function signin(signinDetails) {
  console.log("Hey, signing you in!");

  const baseUrl = import.meta.env.VITE_API_URL;
  console.log("API URL:", baseUrl);

  if (!signinDetails) {
    return { success: false, error: "No sign-in details provided." };
  }

  // Destructure before sanitizing
  const { email, password } = signinDetails;

  if (!email) {
    return { success: false, error: "Missing required field: Email Address" };
  }

  if (!password) {
    return { success: false, error: "Missing required field: Password" };
  }

  // Sanitize after checking existence
  const sanitizedEmail = sanitizeInput(email);
  const sanitizedPassword = sanitizeInput(password);

  if (!validateEmail(sanitizedEmail)) {
    return { success: false, error: "Invalid email format." };
  }

  if (!validatePassword(sanitizedPassword)) {
    return {
      success: false,
      error: "Invalid password format.",
    };
  }

  const payload = {
    email: sanitizedEmail,
    password: sanitizedPassword,
  };

  try {
    const config = { withCredentials: true };
    const response = await axios.post(`${baseUrl}/auth/login`, payload, config);

    console.log(response);
    return { success: true, data: response.data };
  } catch (err) {
    console.log(err);

    return {
      success: false,
      error: err?.response?.data?.message || err.message || "Unknown error",
    };
  }
}
