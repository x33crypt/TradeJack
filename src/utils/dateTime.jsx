import { BsDot } from "react-icons/bs";

/**
 * Parses a date string (e.g. "Jun 25, 2025" or "Jun 25, 2025, 02:11:39 PM")
 * and returns a JSX element showing the date and optional time.
 * @param {string} dateString
 * @returns {JSX.Element | null}
 */
export function dateTime(dateString) {
  const date = new Date(dateString);

  if (isNaN(date)) return null;

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const hasTime = dateString.includes(":");

  const time = hasTime
    ? date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
    : null;

  return (
    <span>
      {month} {day}, {year}
      {hasTime && (
        <>
          <BsDot className="inline" />
          {time}
        </>
      )}
    </span>
  );
}
