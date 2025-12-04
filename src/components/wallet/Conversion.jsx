import { useState, useEffect } from "react";
import { useConvert } from "@/hooks/others/useConvert";
import toDecimal from "@/utils/toDecimal";

export default function Conversion({ amount, from = "USD", to = "NGN" }) {
  const [debouncedAmount, setDebouncedAmount] = useState(amount);

  // Debounce the typing to avoid spam
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedAmount(amount);
    }, 700);

    return () => clearTimeout(timeout);
  }, [amount]);

  // Coerce debouncedAmount to numeric value (allow 0)
  const numericAmount = (() => {
    const n = Number(debouncedAmount);
    return Number.isFinite(n) ? n : null; // null means "no valid amount"
  })();

  const { result, loading, error, refetch } = useConvert(
    numericAmount,
    from,
    to
  );

  console.log("Conversion Result:", result);

  // Build display strings
  const convertedText = (() => {
    if (numericAmount == null) return `${to} ${toDecimal(0)}`; // no input
    if (loading) return "Converting...";
    if (error) return "Conversion unavailable.";
    const conv = result?.conversion_result;
    if (conv != null && Number.isFinite(Number(conv))) {
      return `${to} ${toDecimal(conv)}`;
    }
    return "Conversion unavailable.";
  })();

  // inside component, after `result` available
  const rawRate = result?.conversion_rate;
  let formattedRate = null;

  if (rawRate != null && Number.isFinite(Number(rawRate))) {
    const r = Number(rawRate);
    // choose precision: small rates get more decimals
    const precision = Math.abs(r) < 0.01 ? 6 : 2;
    formattedRate = `1 ${from} = ${Number(r).toFixed(precision)} ${to}`;
  }

  return (
    <div className="space-y-1">
      <p className="text-tradeOrange text-xs font-semibold">{convertedText}</p>

      {formattedRate && !loading && !error && (
        <p className="text-xs text-tradeFadeWhite">{formattedRate}</p>
      )}

      {error && (
        <div className="flex items-center space-x-2">
          <p className="text-red-400 text-[10px] italic">
            Conversion unavailable.
          </p>
          {/* tiny retry button */}
          <button
            onClick={() => refetch({ force: true })}
            className="text-[10px] underline text-gray-600"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
}
