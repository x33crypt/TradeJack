import { useState, useEffect } from "react";
import axios from "axios";

/**
 * Fetch states for a given country name.
 * - Defensive: won't call API for empty/invalid countryName
 * - Cancels previous request on country change/unmount
 * - Logs responses for easy debugging
 */

export function useCountryStates(countryName) {
  const [states, setStates] = useState([]); // array of strings
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // reset when countryName changes
    setStates([]);
    setError(null);

    // guard: do nothing for falsy or very short names
    if (
      !countryName ||
      typeof countryName !== "string" ||
      !countryName.trim()
    ) {
      return;
    }

    const source = axios.CancelToken.source();
    let isActive = true;

    const fetchStates = async () => {
      setLoading(true);
      try {
        console.log("[useCountryStates] fetching states for:", countryName);

        const res = await axios.post(
          "https://countriesnow.space/api/v0.1/countries/states",
          { country: countryName.trim() },
          { cancelToken: source.token, timeout: 15000 }
        );

        // debug raw response
        console.log("[useCountryStates] response:", res?.data);

        // normalized extraction
        const stateArray = res?.data?.data?.states;
        if (!isActive) return;

        if (Array.isArray(stateArray) && stateArray.length > 0) {
          // map to string list, handle both {name} objects and plain strings
          const list = stateArray
            .map((s) => (typeof s === "string" ? s : s?.name))
            .filter(Boolean)
            .sort((a, b) => a.localeCompare(b));

          setStates(list);
          setError(null);
        } else {
          // empty response — could be name mismatch
          setStates([]);
          setError("No states found for that country (verify country name).");
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("[useCountryStates] request cancelled");
        } else {
          console.error("[useCountryStates] error:", err?.message || err);
          setStates([]);
          setError(err?.message || "Failed to fetch states");
        }
      } finally {
        if (isActive) setLoading(false);
      }
    };

    fetchStates();

    return () => {
      isActive = false;
      source.cancel("Component unmounted or country changed");
    };
  }, [countryName]);

  return { states, loading, error };
}
