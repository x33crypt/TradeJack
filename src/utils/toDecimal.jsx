export function toDecimal(value, options = {}) {
  if (value === null || value === undefined || value === "") return "";

  const defaultOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  let num;

  try {
    if (typeof value === "object" && value?.$numberDecimal) {
      num = parseFloat(value.$numberDecimal);
    } else if (typeof value === "string" || typeof value === "number") {
      // Remove all non-numeric characters except minus and dot
      num = parseFloat(value.toString().replace(/[^0-9.-]/g, ""));
    } else {
      return "0";
    }
  } catch {
    return "0";
  }

  if (isNaN(num)) return "0";

  return num.toLocaleString("en-US", {
    ...defaultOptions,
    ...options,
  });
}

export default toDecimal;
