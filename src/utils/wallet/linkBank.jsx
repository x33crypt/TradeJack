import api from "@/utils/http/api";

export async function linkBankAccount({ bankAccount, bank, holdersName }) {
  if (!bank) {
    return { data: null, error: "Missing required field: Bank" };
  }

  if (!bankAccount) {
    return { data: null, error: "Missing required field: Bank account number" };
  }

  if (!holdersName) {
    return {
      data: null,
      error: "Holder's name is required to link this account.",
    };
  }

  console.log(bank, bankAccount, holdersName);

  const payload = {
    bank_account_number: bankAccount,
    bank_name: bank,
    account_holder_name: holdersName,
  };

  try {
    const res = await api.post("/payment/add-bank-account", payload);

    console.log("Server Link Accounts res:", res);

    if (res.data?.success) {
      return { data: res?.data, error: null };
    }

    return {
      data: null,
      error: res?.data?.message || "Failed to link bank account",
    };
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
