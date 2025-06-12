import axios from "axios";
import DOMPurify from "dompurify"; // make sure you import this if you use it

const sanitizeInput = (input) => {
  if (typeof input !== "string") return "";
  const cleaned = DOMPurify.sanitize(input);
  return cleaned.trim();
};

const validatePassword = (password) => {
  // At least 8 characters, including uppercase, lowercase, number, and special character
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

const validateEmail = (email) => {
  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateUsername = (username) => {
  const regex = /^(?!-)(?!.*--)[a-zA-Z0-9]+(-[a-zA-Z0-9]+)?$/;
  return regex.test(username);
};

export async function signup(signupDetails) {
  console.log("Hey, signing you up!");

  const baseUrl = import.meta.env.VITE_API_URL;
  console.log("API URL:", baseUrl);

  if (!signupDetails) {
    return { success: false, error: "No sign-in details provided." };
  }

  // Destructure before sanitizing
  const { username, email, password } = signupDetails;

  if (!username) {
    return { success: false, error: "Missing required field: Username" };
  }

  if (!email) {
    return { success: false, error: "Missing required field: Email Address" };
  }

  if (!password) {
    return { success: false, error: "Missing required field: Password" };
  }

  // Sanitize after checking existence
  const sanitizedUsername = sanitizeInput(username);
  const sanitizedEmail = sanitizeInput(email);
  const sanitizedPassword = sanitizeInput(password);

  if (!validateUsername(sanitizedUsername)) {
    return { success: false, error: "Username doesn't meet the requirements." };
  }

  if (!validateEmail(sanitizedEmail)) {
    return { success: false, error: "Invalid email format." };
  }

  if (!validatePassword(sanitizedPassword)) {
    return {
      success: false,
      error:
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character.",
    };
  }

  const payload = {
    userName: sanitizedUsername,
    email: sanitizedEmail,
    password: sanitizedPassword,
  };

  try {
    const response = await axios.post(`${baseUrl}/auth/signup`, payload);
    return { success: true, data: response.data };
  } catch (err) {
    console.log(err);

    return {
      success: false,
      error: err?.response?.data?.message || err.message || "Unknown error",
    };
  }
}
