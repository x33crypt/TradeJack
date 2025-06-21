
import DOMPurify from "dompurify"; // make sure you import this if you use it
import api from "../http/api";

const sanitizeInput = (input) => {
  const cleaned = DOMPurify.sanitize(input);
  return cleaned.replace(/\s+/g, "").trim();
};

export async function editMobile(mobileDetails) {
  console.log("Hey, updating mobile!");

  const baseUrl = import.meta.env.VITE_API_URL;
  console.log("API URL:", baseUrl);

  if (!mobileDetails) {
    return { success: false, error: "No mobile details provided." };
  }

  // Destructure before sanitizing
  const { code, number } = mobileDetails;

  if (!code) {
    return { success: false, error: "Missing required field: Country Code" };
  }

  if (!number) {
    return { success: false, error: "Missing required field: Mobile Number" };
  }

  // Sanitize after checking existence
  const sanitizedCode = sanitizeInput(code);
  const sanitizedNumber = sanitizeInput(number);

  const payload = {
    code: sanitizedCode,
    number: sanitizedNumber,
  };

  try {
    const response = await api.post(`${baseUrl}/auth/update/password`, payload);

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
