import { useState, useEffect } from "react";
import axios from "axios";

/**
 * Fetch cities for a given country + state using CountriesNow API.
 * - Call with (countryName, stateName) where both are strings.
 * - Returns { cities: string[], loading: boolean, error: string|null }.
 */
export function useStateCities(countryName, stateName) {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // reset when inputs change
    setCities([]);
    setError(null);

    // guard: require both country and state
    if (
      !countryName ||
      typeof countryName !== "string" ||
      !countryName.trim() ||
      !stateName ||
      typeof stateName !== "string" ||
      !stateName.trim()
    ) {
      return;
    }

    const source = axios.CancelToken.source();
    let isActive = true;

    const fetchCities = async () => {
      setLoading(true);
      try {
        const payload = {
          country: countryName.trim(),
          state: stateName.trim(),
        };

        const res = await axios.post(
          "https://countriesnow.space/api/v0.1/countries/state/cities",
          payload,
          { cancelToken: source.token, timeout: 15000 }
        );

        // API shape: res.data.data is expected to be an array of city names
        const cityArray = res?.data?.data;

        if (!isActive) return;

        if (Array.isArray(cityArray) && cityArray.length > 0) {
          const normalized = cityArray
            .map((c) => (typeof c === "string" ? c.trim() : null))
            .filter(Boolean)
            .sort((a, b) => a.localeCompare(b));

          setCities(normalized);
          setError(null);
        } else {
          setCities([]);
          setError("No cities found for that state (verify country/state).");
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          // cancelled — ignore
        } else {
          console.error("[useStateCities] fetch error:", err);
          setCities([]);
          setError(err?.message || "Failed to fetch cities");
        }
      } finally {
        if (isActive) setLoading(false);
      }
    };

    fetchCities();

    return () => {
      isActive = false;
      source.cancel(
        "Canceled useStateCities request (component unmounted or inputs changed)."
      );
    };
  }, [countryName, stateName]);

  return { cities, loading, error };
}
