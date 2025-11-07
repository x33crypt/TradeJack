import { GrStatusGoodSmall } from "react-icons/gr";

export function lastSeen(lastSeen) {
  // Placeholder when no data at all
  if (!lastSeen) {
    return (
      <div className="flex gap-1 items-center">
        <div className="flex items-center gap-1">
          <GrStatusGoodSmall className="flex text-tradeAshLight text-[10px] flex-shrink-0" />
          <p className="text-tradeFadeWhite text-[13px] font-semibold leading-none">
            Offline
          </p>
        </div>
        <p className="text-tradeAshLight leading-none">|</p>
        <p className="text-white text-[13px] font-semibold">—</p>
      </div>
    );
  }

  const lastSeenDate = new Date(lastSeen);
  if (isNaN(lastSeenDate)) {
    return (
      <div className="flex gap-1 items-center">
        <GrStatusGoodSmall className="flex text-tradeAshLight text-[10px] flex-shrink-0" />
        <p className="text-tradeFadeWhite text-[13px] font-semibold leading-none">
          Unknown
        </p>
      </div>
    );
  }

  const now = new Date();
  const diffMs = Math.max(0, now - lastSeenDate);
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  // Format time as 12-hour HH:MM AM/PM
  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  // Helper to build relative string (seconds, mins, hours, days, weeks, months, years)
  const relativeString = () => {
    if (diffSeconds < 60) {
      return `${diffSeconds} ${diffSeconds === 1 ? "sec" : "secs"} ago`;
    }
    if (diffMinutes < 60) {
      return `${diffMinutes} ${diffMinutes === 1 ? "min" : "mins"} ago`;
    }
    if (diffHours < 24) {
      return `${diffHours} ${diffHours === 1 ? "hour" : "hours"} ago`;
    }
    if (diffDays < 7) {
      return `${diffDays} ${diffDays === 1 ? "day" : "days"} ago`;
    }
    const weeks = Math.floor(diffDays / 7);
    if (weeks < 5) {
      return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
    }
    const months = Math.floor(diffDays / 30);
    if (months < 12) {
      return `${months} ${months === 1 ? "month" : "months"} ago`;
    }
    const years = Math.floor(diffDays / 365);
    return `${years} ${years === 1 ? "year" : "years"} ago`;
  };

  // Consider user "online" if last seen within the last 20 minutes
  const ONLINE_THRESHOLD_MINUTES = 20;
  if (diffMinutes <= ONLINE_THRESHOLD_MINUTES) {
    return (
      <div className="flex gap-1 items-center">
        <div className="flex items-center gap-1">
          <GrStatusGoodSmall className="flex text-tradeGreen text-[10px] flex-shrink-0" />
          <p className="text-tradeFadeWhite text-[13px] font-semibold leading-none">
            Online
          </p>
        </div>
        <p className="text-tradeAshLight leading-none">|</p>
        <p className="text-white text-[13px] font-semibold">
          {formatTime(lastSeenDate)}
        </p>
      </div>
    );
  }

  // Not online -> show Offline and relative time
  return (
    <div className="flex gap-1 items-center">
      <div className="flex items-center gap-1">
        <GrStatusGoodSmall className="flex text-tradeFadeWhite text-[10px] flex-shrink-0" />
        <p className="text-tradeFadeWhite text-[13px] font-semibold leading-none">
          Offline
        </p>
      </div>
      <p className="text-tradeAshLight leading-none">|</p>
      <p className="text-white text-[13px] font-semibold">{relativeString()}</p>
    </div>
  );
}

export default lastSeen;
