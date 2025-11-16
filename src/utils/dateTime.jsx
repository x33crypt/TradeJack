/**
 * Formats a date string into "hh:mm a - DD Mon YYYY" format.
 * Example: "2025-11-11T11:04:00Z" → "11:04 AM - 11 Nov 2025"
 * @param {string} dateString
 * @returns {string | null}
 */
export function dateTime(dateString) {
  const date = new Date(dateString);
  if (isNaN(date)) return null;

  const pad = (num) => String(num).padStart(2, "0");
  const hours = date.getHours();
  const minutes = pad(date.getMinutes());
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  const day = pad(date.getDate());
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year} - ${formattedHours}:${minutes} ${ampm}`;
}
