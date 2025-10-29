/**
 * Formats a date string into "YYYY-MM-DD HH:mm:ss" format.
 * Example: "Jun 25, 2025, 02:11:39 PM" → "2025-06-25 14:11:39"
 * @param {string} dateString
 * @returns {string | null}
 */
export function dateTime(dateString) {
  const date = new Date(dateString);

  if (isNaN(date)) return null;

  const pad = (num) => String(num).padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day} ${" "} ${hours}:${minutes}:${seconds}`;
}
