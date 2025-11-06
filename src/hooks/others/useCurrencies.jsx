import { useState, useEffect } from "react";
import axios from "axios";

export function useCurrencies() {
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get(
          "https://restcountries.com/v3.1/all?fields=currencies"
        );

        const data = response.data;
        const currencyMap = new Map();

        data.forEach((country) => {
          if (country.currencies) {
            Object.entries(country.currencies).forEach(([code, info]) => {
              if (!currencyMap.has(code)) {
                currencyMap.set(code, {
                  code,
                });
              }
            });
          }
        });

        const sorted = Array.from(currencyMap.values()).sort((a, b) =>
          a.code.localeCompare(b.code)
        );

        setCurrencies(sorted);
      } catch (err) {
        setError(err.message || "Failed to fetch currencies");
      } finally {
        setLoading(false);
      }
    };

    fetchCurrencies();
  }, []);

  return { currencies, loading, error };
}
