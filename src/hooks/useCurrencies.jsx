import { useState, useEffect } from "react";
import axios from "axios";

/**
 * useCurrencies - Custom hook to fetch and return a list of unique currencies.
 * Each currency includes a code and name, sorted alphabetically by code.
 */
export function useCurrencies() {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countries = response.data;

        const currencyMap = new Map();

        countries.forEach((country) => {
          if (country.currencies) {
            Object.entries(country.currencies).forEach(([code, { name }]) => {
              if (!currencyMap.has(code)) {
                currencyMap.set(code, {
                  code,
                  name: name || "Unknown",
                });
              }
            });
          }
        });

        const sortedCurrencies = Array.from(currencyMap.values()).sort((a, b) =>
          a.code.localeCompare(b.code)
        );

        setCurrencies(sortedCurrencies);
      } catch (error) {
        console.error("Failed to fetch currency data:", error.message);
      }
    };

    fetchCurrencies();
  }, []);

  return { currencies };
}
