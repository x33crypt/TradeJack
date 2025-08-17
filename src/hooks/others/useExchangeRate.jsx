import { useState, useEffect } from "react";
import axios from "axios";

/**
 * useExchangeRate - Custom hook to calculate adjusted currency rate with margin.
 *
 * @param {string} from - Base currency (e.g., "USD")
 * @param {string} to - Target currency (e.g., "NGN")
 * @param {number} margin - Profit margin percentage
 */
export function useExchangeRate(from, to, margin) {
  const [rateInfo, setRateInfo] = useState({
    baseRate: 0, // Raw exchange rate
    finalRate: 0, // Rate after applying margin
    profit: 0, // Calculated profit from margin
  });

  useEffect(() => {
    if (!from || !to || margin == null) return;

    const getRate = async () => {
      try {
        const res = await axios.get(
          `https://api.coinbase.com/v2/prices/${from}-${to}/spot`
        );

        const raw = parseFloat(res.data?.data?.amount || 0);
        const profit = raw * (margin / 100);
        const final = raw - profit;

        setRateInfo({
          baseRate: raw.toFixed(2),
          finalRate: final.toFixed(2),
          profit: profit.toFixed(2),
        });
      } catch (err) {
        console.error("Failed to fetch exchange rate:", err.message);
      }
    };

    getRate();
  }, [from, to, margin]);

  return { rateInfo };
}
