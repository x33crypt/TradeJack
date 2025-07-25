import DOMPurify from "dompurify"; // make sure you import this if you use it
import api from "../http/api";

const sanitizeInput = (input) => {
  if (typeof input !== "string") return "";
  const cleaned = DOMPurify.sanitize(input);
  return cleaned.trim();
};

const validateUsername = (username) => {
  const regex = /^(?!-)(?!.*--)[a-zA-Z0-9]+(-[a-zA-Z0-9]+)?$/;
  return regex.test(username);
};

export async function editUsername(username) {
  console.log("Hey, updating username!");

  const baseUrl = import.meta.env.VITE_API_URL;
  console.log("API URL:", baseUrl);

  if (!username) {
    return { success: false, error: "Missing required field: Username" };
  }

  // Sanitize after checking existence
  const sanitizedUsername = sanitizeInput(username);

  if (!validateUsername(sanitizedUsername)) {
    return { success: false, error: "Username doesn't meet the requirements." };
  }

  const payload = {
    newUsername: sanitizedUsername,
  };

  try {
    const response = await api.patch(
      `${baseUrl}/user/updateprofile/username`,
      payload
    );

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
