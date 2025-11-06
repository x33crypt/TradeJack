import { useState, useEffect } from "react";
import axios from "axios";

export function useCountries() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://restcountries.com/v3.1/all?fields=name"
        );

        const data = response.data
          .map((country) => country.name?.common)
          .filter(Boolean)
          .sort((a, b) => a.localeCompare(b));

        setCountries(data);
      } catch (err) {
        setError(err.message || "Failed to fetch countries");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return { countries, loading, error };
}
