import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { useConversion } from "@/context/otherContext/ConvertionContext";

/**
 * useConvert(amountNumber, fromCode, toCode)
 * - amountNumber: Number (0 is valid)
 * - fromCode, toCode: currency codes like "USD", "NGN"
 *
 * Returns: { result, loading, error, refetch }
 * - result is the API response object (contains conversion_rate & conversion_result)
 */
export function useConvert(amount, from, to) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setData } = useConversion();

  // simple in-memory cache
  const cacheRef = useRef({});
  // track current controller so we can abort when needed
  const controllerRef = useRef(null);
  // track the last numeric args used
  const lastArgsRef = useRef({ amount: null, from: null, to: null });

  const API_KEY =
    import.meta.env.VITE_EXCHANGE_API_KEY || "d53707af3046be4d0da2f936";

  const doFetch = useCallback(
    async (numericAmount, fromCode, toCode, { force = false } = {}) => {
      // basic validation: only bail for missing currency codes (amount 0 is fine)
      if (!fromCode || !toCode) {
        setError("Missing currency codes");
        setResult(null);
        setLoading(false);
        return null;
      }

      // normalize amount to finite number
      const n = Number(numericAmount);
      if (!Number.isFinite(n)) {
        setError("Invalid amount");
        setResult(null);
        setLoading(false);
        return null;
      }

      const cacheKey = `${fromCode}-${toCode}-${n}`;

      // return cached if present and not force-refresh
      if (!force && cacheRef.current[cacheKey]) {
        setResult(cacheRef.current[cacheKey]);
        setError(null);
        setLoading(false);
        lastArgsRef.current = { amount: n, from: fromCode, to: toCode };
        return cacheRef.current[cacheKey];
      }

      // abort any in-flight request
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
      const controller = new AbortController();
      controllerRef.current = controller;

      setLoading(true);
      setError(null);

      try {
        const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCode}/${toCode}/${n}`;
        const res = await axios.get(url, { signal: controller.signal });

        if (res?.status === 200) {
          const data = res.data ?? null;
          cacheRef.current[cacheKey] = data;
          lastArgsRef.current = { amount: n, from: fromCode, to: toCode };
          if (!controller.signal.aborted) {
            setResult(data);
            setError(null);
            setLoading(false);
          }

          if (data?.conversion_result != null) {
            setData(data);
          }

          return data;
        } else {
          const msg = res?.data?.message || "Failed to fetch conversion";
          if (!controller.signal.aborted) {
            setError(msg);
            setLoading(false);
          }
          return null;
        }
      } catch (err) {
        if (err?.name === "AbortError") {
          // aborted, just suppress
        } else {
          const msg =
            err?.response?.data?.errorMessage || err.message || "Unknown error";
          setError(msg);
          setResult(null);
        }
        setLoading(false);
        return null;
      } finally {
        // clear controller if it is still the one we created
        if (controllerRef.current === controller) controllerRef.current = null;
      }
    },
    [API_KEY]
  );

  // initial + reactive effect
  useEffect(() => {
    // treat null/undefined/empty string as "no amount" — but 0 is valid
    if (amount == null || amount === "") {
      setResult(null);
      setError(null);
      setLoading(false);
      return;
    }
    // call fetch with numeric coercion
    const numericAmount = Number(amount);
    // only proceed if numeric
    if (!Number.isFinite(numericAmount)) {
      setError("Invalid amount");
      setResult(null);
      setLoading(false);
      return;
    }

    doFetch(numericAmount, from, to);
    // cancel on unmount
    return () => {
      if (controllerRef.current) controllerRef.current.abort();
    };
  }, [amount, from, to, doFetch]);

  // stable refetch that uses last args
  const refetch = useCallback(
    (opts = { force: false }) => {
      const {
        amount: lastAmount,
        from: lastFrom,
        to: lastTo,
      } = lastArgsRef.current;
      // if we have last args use them, otherwise use current params
      const a = lastAmount != null ? lastAmount : Number(amount);
      const f = lastFrom || from;
      const t = lastTo || to;
      return doFetch(a, f, t, opts);
    },
    [amount, from, to, doFetch]
  );

  return { result, loading, error, refetch };
}
