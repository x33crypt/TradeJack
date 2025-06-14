import { useState, useEffect } from "react";
import axios from "axios";

export function useCountryCodes() {
  const [countryCodes, setCountryCodes] = useState([]);

  useEffect(() => {
    const fetchCountryCodes = async () => {
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

        setCountryCodes(sortedCurrencies);
      } catch (error) {
        console.error("Failed to fetch currency data:", error.message);
      }
    };

    fetchCountryCodes();
  }, []);

  return { countryCodes };
}
