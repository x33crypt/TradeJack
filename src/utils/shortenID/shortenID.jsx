// utils/shortenValue.js

/**
 * Shortens a string or number by keeping the first and last few characters/digits.
 * @param {string | number} value - The value to shorten (e.g. transaction ID or long number)
 * @param {number} [start=6] - Number of characters/digits to keep at the start
 * @param {number} [end=4] - Number of characters/digits to keep at the end
 * @returns {string} - Shortened string (e.g. "123456...7890")
 */
export function shortenID(value, start = 6, end = 4) {
  if (value === undefined || value === null) return "";

  const str = String(value);
  if (str.length <= start + end) return str;

  return `${str.slice(0, start)}...${str.slice(-end)}`;
}
