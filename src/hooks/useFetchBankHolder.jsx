import { useState } from "react";
import api from "@/utils/http/api";

export function useFetchBankHolder() {
  const [holder, setHolder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHolder = async ({ bankAccount, bank }) => {
    console.log(bankAccount, bank);

    if (!bankAccount || !bank) {
      setError("bank and bank account are required.");
      return;
    }

    setLoading(true);
    setError(null);
    setHolder(null);

    const payload = { bank_account_number: bankAccount, bank_name: bank };

    try {
      const res = await api.post("/payment/verify-bank-account", payload);

      if (res?.status === 200 && res.data?.success) {
        setHolder(res.data.data); // { account_name, bank_name, account_number }
      } else {
        setError(res?.data?.message || "Failed to fetch bank holder.");
      }
    } catch (err) {
      setError(
        err?.response?.data?.errorMessage ||
          err.message ||
          "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return { fetchHolder, holder, loading, error };
}
