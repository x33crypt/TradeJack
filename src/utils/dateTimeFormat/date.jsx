/**
 * Parses a date string (e.g. "Jun 25, 2025" or "Jun 25, 2025, 02:11:39 PM")
 * and returns an object with day, month, year, and optional time.
 * @param {string} dateString
 * @returns {{ day: number, month: string, year: number, time: string | null } | null}
 */

export function date(dateString) {
  const date = new Date(dateString);

  if (isNaN(date)) return null;

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" }); // e.g., "June"
  const year = date.getFullYear();

  // Check if time was included in the input string
  const hasTime = dateString.includes(":");

  const time = hasTime
    ? date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
    : null;

  return hasTime && `${month} ${day}, ${year}`;
}
