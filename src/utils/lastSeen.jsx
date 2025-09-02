export function lastSeen(lastSeen) {
  if (!lastSeen) {
    return null; // ⬅️ Don't show anything
  }

  const lastSeenDate = new Date(lastSeen);
  if (isNaN(lastSeenDate)) {
    return null; // ⬅️ Invalid date
  }

  const now = new Date();
  const diffMs = now - lastSeenDate;
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMinutes / 60);

  // ✅ Online (<= 20 mins)
  if (diffMinutes <= 20) {
    return { text: "Online", className: "text-tradeGreen font-semibold" };
  }

  // ✅ Within 24h → minutes/hours ago
  if (diffHours < 24) {
    if (diffHours < 1) {
      const unit = diffMinutes === 1 ? "min" : "mins";
      return { text: `${diffMinutes} ${unit} ago`, className: "text-white" };
    }
    const unit = diffHours === 1 ? "hour" : "hours";
    return { text: `${diffHours} ${unit} ago`, className: "text-white" };
  }

  // ✅ Over 24h → just Offline
  return { text: "Offline", className: "white" };
}

export default lastSeen;
