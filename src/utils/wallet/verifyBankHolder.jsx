import api from "@/utils/http/api";

export async function verifyBankHolder({ bankAccount, bank }) {
  if (!bank) {
    return { data: null, error: "Missing required field: Bank" };
  }

  if (!bankAccount) {
    return { data: null, error: "Missing required field: Bank account" };
  }

  const payload = {
    bank_account_number: bankAccount,
    bank_name: bank,
  };

  try {
    const res = await api.post("/payment/verify-bank-account", payload);

    if (res?.status === 200 && res.data?.success) {
      return { data: res.data.data, error: null };
    } else {
      return {
        data: null,
        error: res?.data?.message || "Failed to fetch bank holder.",
      };
    }
  } catch (err) {
    return {
      data: null,
      error:
        err?.response?.data?.errorMessage ||
        err.message ||
        "An unknown error occurred",
    };
  }
}
