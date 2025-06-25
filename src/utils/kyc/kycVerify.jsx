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

// ✅ MAIN FUNCTION
export async function kycVerify(kycDetails) {
  console.log("hello, verifying your kyc");

  const baseUrl = import.meta.env.VITE_API_URL;

  if (!kycDetails) {
    return { success: false, error: "No KYC details provided." };
  }

  const {
    firstname,
    lastname,
    dateOfBirth,
    gender,
    addressDetails,
    documentType,
    email,
    frontImage,
    backImage,
  } = kycDetails;

  if (!firstname?.trim()) {
    return { success: false, error: "Missing required field: First Name" };
  }

  if (!lastname?.trim()) {
    return { success: false, error: "Missing required field: Last Name" };
  }

  // Check for a valid date of birth structure
  if (!dateOfBirth?.year || !dateOfBirth?.month || !dateOfBirth?.date) {
    return { success: false, error: "Missing or invalid Date of Birth" };
  }

  if (!gender) {
    return { success: false, error: "Missing required field: Gender" };
  }

  if (!addressDetails?.country?.trim()) {
    return { success: false, error: "Missing required field: Country" };
  }

  if (!addressDetails?.state?.trim()) {
    return {
      success: false,
      error: "Missing required field: State/Province",
    };
  }

  if (!addressDetails?.city?.trim()) {
    return { success: false, error: "Missing required field: City/Area" };
  }

  if (!addressDetails?.street?.trim()) {
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

  if (!validateFile(frontImage)) {
    return { success: false, error: "Missing or invalid Front Image" };
  }

  if (!validateFile(backImage)) {
    return { success: false, error: "Missing or invalid Back Image" };
  }

  const sanitizedFirstname = sanitizeInput(firstname);
  const sanitizedLastname = sanitizeInput(lastname);
  const sanitizedGender = sanitizeInput(gender);
  const sanitizedDocumentType = sanitizeInput(documentType);
  const sanitizedAddress = {
    country: sanitizeInput(addressDetails?.country),
    state: sanitizeInput(addressDetails?.state),
    city: sanitizeInput(addressDetails?.city),
    street: sanitizeInput(addressDetails?.street),
  };
  const sanitizedDatateOfBirth = {
    year: sanitizeInput(dateOfBirth.year),
    month: sanitizeInput(dateOfBirth.month),
    day: sanitizeInput(dateOfBirth.date),
  };
  const sanitizedEmail = sanitizeInput(email);

  const payload = {
    firstName: sanitizedFirstname,
    lastName: sanitizedLastname,
    email: sanitizedEmail,
    dateOfBirth: {
      day: sanitizedDatateOfBirth.day,
      month: sanitizedDatateOfBirth.month,
      year: sanitizedDatateOfBirth.year,
    },
    gender: sanitizedGender,
    address: {
      street: sanitizedAddress?.street,
      city: sanitizedAddress?.city,
      state: sanitizedAddress?.state,
      country: sanitizedAddress?.country,
    },
    documentType: sanitizedDocumentType,
    frontIdImage: frontImage instanceof File ? frontImage : null,
    backIdImage: backImage instanceof File ? backImage : null,
  };

  // Log the payload for debugging
  console.log("KYC Payload:", payload);

  try {
    const response = await api.post(`${baseUrl}/profile/kyc/submit`, payload);

    if (response?.data?.success)
      return {
        success: true,
        message: response?.data?.message,
      };
  } catch (err) {
    console.log(err);

    console.log();
    return {
      success: false,
      error: err?.data?.error?.message || "Unknown error",
    };
  }
}
