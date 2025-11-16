import { useState, useCallback } from "react";
import api from "@/utils/http/api";

export function usePreTradeAuth() {
  const [preTradeLoading, setPreTradeLoading] = useState(false);
  const [preTradeError, setPreTradeError] = useState(null);
  const [preTradeData, setPreTradeData] = useState(null);

  const authorizePreTrade = useCallback(async (offerId, amount) => {
    // clear and log immediately so you always see something in console
    console.log("[usePreTradeAuth] ▶ called with:", { offerId, amount });

    // --- Parameter presence check (accepts 0)
    const amountIsMissing =
      amount === null || amount === undefined || amount === "";
    if (!offerId || amountIsMissing) {
      const msg = "Missing trade parameters. Please check your offer details.";
      console.warn("[usePreTradeAuth] ⚠ Missing parameters:", {
        offerId,
        amount,
      });
      setPreTradeError(msg);
      setPreTradeData(null);
      return { success: false, status: null, error: { message: msg } };
    }

    // Optional: if you require amount > 0, use this:
    const numericAmount = Number(amount);
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      const msg = "Amount must be a positive number.";
      console.warn("[usePreTradeAuth] ⚠ Invalid amount:", amount);
      setPreTradeError(msg);
      setPreTradeData(null);
      return { success: false, status: null, error: { message: msg } };
    }

    setPreTradeLoading(true);
    setPreTradeError(null);
    setPreTradeData(null);

    try {
      console.log("[usePreTradeAuth] 🚀 Sending request...");
      const response = await api.post("/transaction/pre-trade-check", {
        offerId,
        amount: numericAmount,
      });
      console.log("[usePreTradeAuth] ✅ Response received:", response?.data);

      setPreTradeData(response.data);
      setPreTradeLoading(false);

      return { success: true, data: response.data };
    } catch (err) {
      console.error("[usePreTradeAuth] ❌ Request failed:", err);

      const status = err?.response?.status ?? null;
      const serverData = err?.response?.data ?? null;

      const friendlyMessage =
        serverData?.ui?.componentProps?.message ||
        serverData?.message ||
        serverData?.error ||
        (typeof serverData === "string" ? serverData : null) ||
        (status ? `Request failed with status ${status}` : null) ||
        err?.message ||
        "Unable to initiate transaction. Please try again later.";

      setPreTradeError(friendlyMessage);
      setPreTradeData(serverData ?? { message: friendlyMessage });
      setPreTradeLoading(false);

      return {
        success: false,
        status,
        error: serverData ?? { message: friendlyMessage },
      };
    }
  }, []);

  return {
    preTradeLoading,
    preTradeError,
    preTradeData,
    authorizePreTrade,
  };
}

export default usePreTradeAuth;
