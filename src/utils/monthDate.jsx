// utils/formatDate.js
export function monthDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);

  // Format: "April 20"
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
}
