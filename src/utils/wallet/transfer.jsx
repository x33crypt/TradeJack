import api from "../http/api";
import DOMPurify from "dompurify";

// Sanitize input
const sanitizeInput = (input) => {
  if (typeof input !== "string") return "";
  const cleaned = DOMPurify.sanitize(input);
  return cleaned.trim();
};

export async function submitTransfer(transferDetails) {
  console.log("Initiating Wallet Transfer...");

  const baseUrl = import.meta.env.VITE_API_URL;

  if (!transferDetails) {
    return { success: false, error: "No Transfer details provided." };
  }

  const { username, amount } = transferDetails;

  const sanitizedUsername = sanitizeInput(username);
  const sanitizedAmountNgn = sanitizeInput(amount?.NGN);
  const sanitizedAmountUsd = sanitizeInput(amount?.USD);

  const payload = {
    username: sanitizedUsername,
    amount_ngn: sanitizedAmountNgn,
    amount_usd: sanitizedAmountUsd,
  };

  try {
    const response = await api.post(`${baseUrl}/payment/transfer`, payload);

    console.log("Transfer Response:", response);

    return {
      success: true,
      message: response?.data?.data?.message,
      amount: response?.data?.data?.amount,
      recipient: response?.data?.data?.recipient,
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
