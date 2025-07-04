import api from "../http/api";
import DOMPurify from "dompurify";

// Sanitize input
const sanitizeInput = (input) => {
  if (typeof input !== "string") return "";
  const cleaned = DOMPurify.sanitize(input);
  return cleaned.trim();
};

// Validate basic email format
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const validateFile = (file) =>
  file instanceof File && file.size > 0 && file.type.startsWith("image/");

export async function kycVerify(kycDetails) {
  console.log("Verifying KYC...");

  const baseUrl = import.meta.env.VITE_API_URL;

  if (!kycDetails) {
    return { success: false, error: "No KYC details provided." };
  }

  const {
    firstName,
    lastName,
    dateOfBirth,
    gender,
    address,
    documentType,
    email,
    frontIdImage,
    backIdImage,
  } = kycDetails;

  // Client-side validation
  if (!firstName?.trim()) {
    return { success: false, error: "Missing required field: First Name" };
  }
  if (!lastName?.trim()) {
    return { success: false, error: "Missing required field: Last Name" };
  }
  if (!dateOfBirth?.year || !dateOfBirth?.month || !dateOfBirth?.day) {
    return { success: false, error: "Missing or invalid Date of Birth" };
  }
  if (!gender) {
    return { success: false, error: "Missing required field: Gender" };
  }
  if (!address?.country?.trim()) {
    return { success: false, error: "Missing required field: Country" };
  }
  if (!address?.state?.trim()) {
    return { success: false, error: "Missing required field: State/Province" };
  }
  if (!address?.city?.trim()) {
    return { success: false, error: "Missing required field: City/Area" };
  }
  if (!address?.street?.trim()) {
    return { success: false, error: "Missing required field: Street Address" };
  }
  if (!documentType?.trim()) {
    return { success: false, error: "Missing required field: Document Type" };
  }
  if (!email?.trim()) {
    return { success: false, error: "Missing required field: Email Address" };
  }
  if (!validateEmail(email)) {
    return { success: false, error: "Invalid email format." };
  }
  if (!validateFile(frontIdImage)) {
    return { success: false, error: "Missing or invalid Front ID Image" };
  }
  if (!validateFile(backIdImage)) {
    return { success: false, error: "Missing or invalid Back ID Image" };
  }

  // Sanitize inputs
  const sanitizedFirstName = sanitizeInput(firstName);
  const sanitizedLastName = sanitizeInput(lastName);
  const sanitizedGender = sanitizeInput(gender);
  const sanitizedDocumentType = sanitizeInput(documentType);
  const sanitizedAddress = {
    country: sanitizeInput(address?.country),
    state: sanitizeInput(address?.state),
    city: sanitizeInput(address?.city),
    street: sanitizeInput(address?.street),
  };
  const sanitizedDateOfBirth = {
    year: sanitizeInput(dateOfBirth.year),
    month: sanitizeInput(dateOfBirth.month),
    day: sanitizeInput(dateOfBirth.day),
  };
  const sanitizedEmail = sanitizeInput(email);

  // Extra verification to ensure alignment with backend expectations
  if (sanitizedFirstName.length > 50) {
    return { success: false, error: "First Name cannot exceed 50 characters" };
  }
  if (sanitizedLastName.length > 50) {
    return { success: false, error: "Last Name cannot exceed 50 characters" };
  }
  if (sanitizedAddress.street.length > 100) {
    return { success: false, error: "Street cannot exceed 100 characters" };
  }
  if (sanitizedAddress.city.length > 50) {
    return { success: false, error: "City cannot exceed 50 characters" };
  }
  if (sanitizedAddress.state.length > 50) {
    return { success: false, error: "State cannot exceed 50 characters" };
  }
  if (sanitizedAddress.country.length > 50) {
    return { success: false, error: "Country cannot exceed 50 characters" };
  }
  if (
    !["passport", "driver_license", "national_id"].includes(
      sanitizedDocumentType
    )
  ) {
    return { success: false, error: "Invalid Document Type" };
  }

  // Construct FormData
  const formData = new FormData();
  formData.append("firstName", sanitizedFirstName);
  formData.append("lastName", sanitizedLastName);
  formData.append("email", sanitizedEmail);
  formData.append("dateOfBirth.day", sanitizedDateOfBirth.day);
  formData.append("dateOfBirth.month", sanitizedDateOfBirth.month);
  formData.append("dateOfBirth.year", sanitizedDateOfBirth.year);
  formData.append("gender", sanitizedGender);
  formData.append("address.street", sanitizedAddress.street);
  formData.append("address.city", sanitizedAddress.city);
  formData.append("address.state", sanitizedAddress.state);
  formData.append("address.country", sanitizedAddress.country);
  formData.append("documentType", sanitizedDocumentType);
  formData.append("frontIdImage", frontIdImage);
  formData.append("backIdImage", backIdImage);

  // Log FormData for debugging
  for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }

  try {
    const response = await api.post(
      `${baseUrl}/profile/kyc/submit `,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response?.data?.success) {
      return {
        success: true,
        message: response?.data?.message,
      };
    }
  } catch (err) {
    console.error("KYC submission error:", err);
    return {
      success: false,
      error: err?.response?.data?.message || err?.message || "Unknown error",
    };
  }
}
