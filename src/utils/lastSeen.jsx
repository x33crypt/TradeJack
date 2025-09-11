export function lastSeen(lastSeen) {
  if (!lastSeen) {
    return null; // Don't show anything
  }

  const lastSeenDate = new Date(lastSeen);
  if (isNaN(lastSeenDate)) {
    return null; // Invalid date
  }

  const now = new Date();
  const diffMs = now - lastSeenDate;
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMinutes / 60);

  // Dot styles
  const dotStyles = {
    green: "bg-tradeGreen w-2 h-2 rounded-full inline-block",
    yellow: "bg-yellow-500 w-2 h-2 rounded-full inline-block",
    gray: "bg-tradeFadeWhite w-2 h-2 rounded-full inline-block",
  };

  // ✅ Online (<= 20 mins)
  if (diffMinutes <= 20) {
    return {
      text: "Online",
      className: "text-tradeGreen font-semibold",
      dot: <span className={dotStyles.green}></span>,
    };
  }

  // ✅ Recently Active (< 24h)
  if (diffHours < 1) {
    if (diffHours < 1) {
      const unit = diffMinutes === 1 ? "min" : "mins";
      return {
        text: `${diffMinutes} ${unit} ago`,
        className: "text-white",
        dot: <span className={dotStyles.yellow}></span>,
      };
    }
    const unit = diffHours === 1 ? "hour" : "hours";
    return {
      text: `${diffHours} ${unit} ago`,
      className: "text-white",
      dot: <span className={dotStyles.yellow}></span>,
    };
  }

  // ✅ Offline (> 24h)
  return {
    text: "Offline",
    className: "text-tradeFadeWhite",
    dot: <span className={dotStyles.gray}></span>,
  };
}

export default lastSeen;
