
import DOMPurify from "dompurify"; // make sure you import this if you use it
import api from "../http/api";

const sanitizeInput = (input) => {
  const cleaned = DOMPurify.sanitize(input);
  return cleaned.replace(/\s+/g, "").trim();
};

export async function editAddress(addressDetails) {
  const baseUrl = import.meta.env.VITE_API_URL;
  console.log("API URL:", baseUrl);

  if (!addressDetails) {
    return { success: false, error: "No address details provided." };
  }

  // Destructure before sanitizing
  const { country, state, city, street } = mobileDetails;

  if (!country) {
    return { success: false, error: "Missing required field: Country" };
  }

  if (!state) {
    return { success: false, error: "Missing required field: State" };
  }

  if (!city) {
    return { success: false, error: "Missing required field: City" };
  }

  if (!street) {
    return { success: false, error: "Missing required field: Street" };
  }

  // Sanitize after checking existence
  const sanitizedCountry = sanitizeInput(country);
  const sanitizedState = sanitizeInput(state);
  const sanitizedCity = sanitizeInput(city);
  const sanitizedStreet = sanitizeInput(street);

  const payload = {
    country: sanitizedCountry,
    state: sanitizedState,
    city: sanitizedCity,
    street: sanitizedStreet,
  };

  try {
    const response = await api.post(
      `${baseUrl}/user/updateprofile/address`,
      payload
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
