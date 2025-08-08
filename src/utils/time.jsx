// utils/formatTime.js
export function time(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);

  // Format: "5:00 PM"
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
