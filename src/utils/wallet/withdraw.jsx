import api from "../http/api";
import DOMPurify from "dompurify";

// Sanitize input
const sanitizeInput = (input) => {
  const cleaned = DOMPurify.sanitize(input);
  return cleaned.trim();
};

export async function submitWithdraw(details) {
  console.log("Initiating Wallet Withdraw...");

  const baseUrl = import.meta.env.VITE_API_URL;

  if (!details) {
    return { success: false, error: "No withdraw details provided." };
  }

  const { amount, bankId } = details;

  const sanitizedAmount = sanitizeInput(amount);

  const payload = {
    amount_ngn: sanitizedAmount,
    bankId: bankId,
  };

  console.log(payload);

  try {
    const response = await api.post(`${baseUrl}/payment/withdraw`, payload);

    console.log("Withdraw Response 1:", response);

    return {
      success: true,
      message: response?.data?.data?.message,
      amount: {
        NGN: response?.data?.data?.amount_ngn,
        USD: response?.data?.data?.amount_usd,
      },
      reference: response?.data?.data?.reference,
    };
  } catch (err) {
    console.log(err);

    return {
      success: false,
      error: err?.data?.error?.details || err?.message || "Unknown error",
    };
  }
}
