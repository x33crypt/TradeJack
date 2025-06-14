import axios from "axios";
import DOMPurify from "dompurify"; // make sure you import this if you use it

const sanitizeInput = (input) => {
  const cleaned = DOMPurify.sanitize(input);
  return cleaned.replace(/\s+/g, "").trim();
};

const validateEmail = (email) => {
  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export async function editEmail(email) {
  console.log("Hey, updating email!");

  const baseUrl = import.meta.env.VITE_API_URL;
  console.log("API URL:", baseUrl);

  if (!email) {
    return { success: false, error: "Missing required field: Email Address" };
  }

  // Sanitize after checking existence
  const sanitizedEmail = sanitizeInput(email);

  if (!validateEmail(sanitizedEmail)) {
    return { success: false, error: "Invalid email format" };
  }

  const payload = {
    email: sanitizedEmail,
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
      error: err?.response?.data?.errormessage || "Unknown error",
    };
  }
}
