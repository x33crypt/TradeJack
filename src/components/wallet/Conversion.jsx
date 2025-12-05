import { useState, useEffect } from "react";
import { useConvert } from "@/hooks/others/useConvert";
import toDecimal from "@/utils/toDecimal";

export default function Conversion({ amount, from = "NGN", to = "USD" }) {
  // Debounced amount for typing
  const [debouncedAmount, setDebouncedAmount] = useState(amount);

  // Step 1: Update debouncedAmount on typing with 700ms delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedAmount(amount);
    }, 700);
    return () => clearTimeout(timeout);
  }, [amount]);

  // Step 2: Ensure conversion runs immediately on mount or when from/to change
  const numericAmount = (() => {
    const n = Number(debouncedAmount);
    return Number.isFinite(n) ? n : 0;
  })();

  const { result, loading, error, refetch } = useConvert(
    numericAmount,
    from,
    to
  );

  console.log("Conversion result:", result);

  // Step 3: Build display strings
  const convertedText = (() => {
    if (numericAmount == null) return `${to} ${toDecimal(0)}`;
    if (loading) return "Converting...";
    if (error) return `${to ?? "N/A"} ${toDecimal(0)}`;
    const conv = result?.conversion_result;
    if (conv != null && Number.isFinite(Number(conv))) {
      return `${to} ${toDecimal(conv)}`;
    }
    return `${to ?? "N/A"} ${toDecimal(0)}`;
  })();

  const rateText = (() => {
    const rawRate = result?.conversion_rate;
    if (rawRate != null && Number.isFinite(Number(rawRate))) {
      // Show more decimals for small rates
      const precision = Math.abs(rawRate) < 0.01 ? 6 : 2;
      return `1 ${from} = ${Number(rawRate).toFixed(precision)} ${to}`;
    }
    return null;
  })();

  return (
    <div className="space-y-1">
      {/* Converted amount */}
      <p className="text-tradeOrange text-xs font-semibold">{convertedText}</p>

      {/* Exchange rate */}
      {rateText && !loading && !error && (
        <p className="text-[12px] text-tradeFadeWhite">{rateText}</p>
      )}

      {/* Error fallback with retry */}
      {error && (
        <div className="flex items-center space-x-2">
          <p className="text-red-400 text-[12px]">Conversion unavailable.</p>
          <button
            onClick={() => refetch({ force: true })}
            className="text-[12px] underline text-tradeFadeWhite"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
}
