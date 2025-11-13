import { useState, useCallback } from "react";
import api from "@/utils/http/api";

/**
 * usePreTradeAuth Hook
 * - Manages pre-trade authorization state and stores the last response payload.
 * - authorizePreTrade returns a structured object:
 *    - on success: { success: true, data: response.data }
 *    - on failure: { success: false, status, error: serverData | message }
 */
export function usePreTradeAuth() {
  const [preTradeLoading, setPreTradeLoading] = useState(false);
  const [preTradeError, setPreTradeError] = useState(null);
  const [preTradeData, setPreTradeData] = useState(null); // <-- stores last server response payload

  const authorizePreTrade = useCallback(async (offerId, amount) => {
    if (!offerId || !amount) {
      const msg = "Missing trade parameters. Please check your offer details.";
      setPreTradeError(msg);
      setPreTradeData(null);
      return { success: false, status: null, error: { message: msg } };
    }

    setPreTradeLoading(true);
    setPreTradeError(null);
    setPreTradeData(null);

    try {
      const response = await api.post("/transaction/pre-trade-check", {
        offerId,
        amount,
      });

      // store server payload in state for later consumption by UI
      setPreTradeData(response.data);
      setPreTradeLoading(false);

      return { success: true, data: response.data };
    } catch (err) {
      console.error("[usePreTradeAuth] axios error:", err);

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

      // save concise message for quick UI display and full server payload for inspection
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
    preTradeData, // <-- expose stored server payload (success or failure)
    authorizePreTrade,
  };
}

export default usePreTradeAuth;
