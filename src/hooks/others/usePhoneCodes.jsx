import { useState, useEffect } from "react";
import axios from "axios";

export function usePhoneCodes() {
  const [phoneCodes, setPhoneCodes] = useState([]);

  useEffect(() => {
    const fetchCountryCodes = async () => {
      try {
        const response = await axios.get(
          "https://restcountries.com/v3.1/all?fields=name,idd"
        );

        const data = response.data
          .map((country) => {
            const root = country.idd?.root || "";
            const suffix = country.idd?.suffixes?.[0] || "";
            const phoneCode = root && suffix ? `${root}${suffix}` : null;

            if (phoneCode) {
              return {
                name: country.name.common,
                code: phoneCode,
              };
            }
            return null;
          })
          .filter(Boolean)
          .sort((a, b) => a.name.localeCompare(b.name));

        setPhoneCodes(data);
      } catch (error) {
        console.error("Failed to fetch country codes:", error.message);
      }
    };

    fetchCountryCodes();
  }, []);

  return { phoneCodes };
}
