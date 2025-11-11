import { useState, useCallback } from "react";
import api from "@/utils/http/api";

/**
 * usePreTradeAuth Hook
 * Returns { preTradeLoading, preTradeError, authorizePreTrade }
 * authorizePreTrade returns a structured object:
 *  - on success: { success: true, data }
 *  - on failure: { success: false, status, error } where error is server response body (if any)
 */
export function usePreTradeAuth() {
  const [preTradeLoading, setPreTradeLoading] = useState(false);
  const [preTradeError, setPreTradeError] = useState(null);

  const authorizePreTrade = useCallback(async (offerId, amount) => {
    if (!offerId || !amount) {
      const msg = "Missing trade parameters. Please check your offer details.";
      setPreTradeError(msg);
      return { success: false, status: null, error: { message: msg } };
    }

    setPreTradeLoading(true);
    setPreTradeError(null);

    try {
      const response = await api.post("/transaction/pre-trade-check", {
        offerId,
        amount,
      });

      setPreTradeLoading(false);
      // return server response (structured)
      return { success: true, data: response.data };
    } catch (err) {
      // full debug log (dev only)
      console.error("[usePreTradeAuth] axios error:", err);

      // Try to extract a server-provided payload (common axios shape: err.response.data)
      const status = err?.response?.status ?? null;
      const serverData = err?.response?.data ?? null;

      // Fallback message resolution
      const friendlyMessage =
        serverData?.ui?.componentProps?.message ||
        serverData?.message ||
        serverData?.error ||
        (typeof serverData === "string" ? serverData : null) ||
        (status ? `Request failed with status ${status}` : null) ||
        err?.message ||
        "Unable to initiate transaction. Please try again later.";

      // Set a concise error message for quick UI display (e.g., toast)
      setPreTradeError(friendlyMessage);

      setPreTradeLoading(false);

      // Return the structured payload so the caller can inspect UI props, checks, payload, etc.
      return {
        success: false,
        error: err,
      };
    }
  }, []);

  return {
    preTradeLoading,
    preTradeError,
    authorizePreTrade,
  };
}

export default usePreTradeAuth;
