export function toDecimal(value, options = {}) {
  if (value === null || value === undefined || value === "") return "";

  const defaultOptions = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  };

  let num;

  // Handle MongoDB Decimal128
  if (typeof value === "object" && value?.$numberDecimal) {
    num = parseFloat(value.$numberDecimal);
  } else if (typeof value === "string" || typeof value === "number") {
    num = parseFloat(value);
  } else {
    return "0"; // fallback
  }

  if (isNaN(num)) return "0";

  return num.toLocaleString("en-US", {
    ...defaultOptions,
    ...options,
  });
}
