import api from "../http/api";
import DOMPurify from "dompurify";

// Sanitize input
const sanitizeInput = (input) => {
  if (typeof input !== "string") return "";
  const cleaned = DOMPurify.sanitize(input);
  return cleaned.trim();
};

export async function submitDeposit(transferDetails) {
  console.log("Initiating Wallet Deposit...");

  const baseUrl = import.meta.env.VITE_API_URL;

  if (!transferDetails) {
    return { success: false, error: "No deposit details provided." };
  }

  const { amount } = transferDetails;

  const sanitizedAmount = sanitizeInput(amount);

  const payload = {
    amount_ngn: sanitizedAmount,
  };

  try {
    const response = await api.post(`${baseUrl}/payment/deposit`, payload);

    console.log("Deposit Response:", response);

    return {
      success: true,
      message: response?.data?.message,
      redirectUrl: response?.data?.data?.authorization_url,
      reference: response?.data?.data?.reference,
    };
  } catch (err) {
    console.log(err);

    return {
      success: false,
      error:
        err?.response?.data?.errorMessage || err?.message || "Unknown error",
    };
  }
}
