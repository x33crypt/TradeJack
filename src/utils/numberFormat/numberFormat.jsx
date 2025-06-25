// utils/formatDecimal.js

export function formatDecimal(value, options = {}) {
  const defaultOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  let num;

  // Handle MongoDB Decimal128 format
  if (typeof value === "object" && value?.$numberDecimal) {
    num = parseFloat(value.$numberDecimal);
  } else if (typeof value === "string" || typeof value === "number") {
    num = parseFloat(value);
  } else {
    return "0.00"; // fallback
  }

  if (isNaN(num)) return "0.00";

  return num.toLocaleString("en-US", {
    ...defaultOptions,
    ...options,
  });
}
