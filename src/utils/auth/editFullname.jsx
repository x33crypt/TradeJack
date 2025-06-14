import axios from "axios";
import DOMPurify from "dompurify"; // make sure you import this if you use it

const sanitizeInput = (input) => {
  if (typeof input !== "string") return "";
  const cleaned = DOMPurify.sanitize(input);
  return cleaned.trim();
};

export async function editFullname(nameDetails) {
  console.log("Hey, updating full name!");

  const baseUrl = import.meta.env.VITE_API_URL;
  console.log("API URL:", baseUrl);

  if (!nameDetails) {
    return { success: false, error: "No change details provided." };
  }

  // Destructure before sanitizing
  const { firstname, lastname } = nameDetails;

  if (!firstname) {
    return { success: false, error: "Missing required field: First Name" };
  }

  if (!lastname) {
    return { success: false, error: "Missing required field: Last Name" };
  }

  // Sanitize after checking existence
  const sanitizedFirstname = sanitizeInput(firstname);
  const sanitizedLastname = sanitizeInput(lastname);

  const payload = {
    firstname: sanitizedFirstname,
    lastname: sanitizedLastname,
  };

  try {
    const config = { withCredentials: true };
    const response = await axios.post(
      `${baseUrl}/auth/update/fullname`,
      payload,
      config
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
