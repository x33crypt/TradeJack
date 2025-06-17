import api from "../http/api";
import DOMPurify from "dompurify";

// Sanitize input
const sanitizeInput = (input) => {
  if (typeof input !== "string") return "";
  const cleaned = DOMPurify.sanitize(input);
  return cleaned.trim();
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
    email,
    dateOfBirth,
    gender,
    addressDetails,
    documentType,
    frontImage,
    backImage,
  } = kycDetails;

  if (!firstname?.trim()) {
    return { success: false, error: "Missing required field: First Name" };
  }

  if (!lastname?.trim()) {
    return { success: false, error: "Missing required field: Last Name" };
  }

  if (!email?.trim()) {
    return { success: false, error: "Missing required field: Email Address" };
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

  if (!frontImage) {
    return { success: false, error: "Missing required field: Front Image" };
  }

  if (!backImage) {
    return { success: false, error: "Missing required field: Back Image" };
  }

  const sanitizedFirstname = sanitizeInput(firstname);
  const sanitizedLastname = sanitizeInput(lastname);
  const sanitizedEmail = sanitizeInput(email);
  const sanitizedGender = sanitizeInput(gender);
  const sanitizedDocumentType = sanitizeInput(documentType);
  const sanitizedAddress = {
    country: sanitizeInput(addressDetails?.country),
    state: sanitizeInput(addressDetails?.state),
    city: sanitizeInput(addressDetails?.city),
    street: sanitizeInput(addressDetails?.street),
  };

  if (!validateFile(frontImage)) {
    return { success: false, error: "Missing or invalid Front Image" };
  }

  if (!validateFile(backImage)) {
    return { success: false, error: "Missing or invalid Back Image" };
  }

  const payload = {
    firstName: sanitizedFirstname,
    lastName: sanitizedLastname,
    email: sanitizedEmail,
    gender: sanitizedGender,
    documentType: sanitizedDocumentType,
    address: {
      country: sanitizedAddress?.country,
      state: sanitizedAddress?.state,
      city: sanitizedAddress?.city,
      street: sanitizedAddress?.street,
    },
  };

  console.log("Not Done Yet");
}
