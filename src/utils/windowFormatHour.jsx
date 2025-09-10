export const windowFormatHour = (hours = 0, minutes = 0) => {
  const totalMinutes = hours * 60 + minutes;

  if (totalMinutes < 60) {
    return `${totalMinutes}${totalMinutes === 1 ? "m" : "ms"}`;
  }

  const displayHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  let result = `${displayHours}${displayHours === 1 ? "hr" : "hrs"}`;
  if (remainingMinutes > 0) {
    result += ` ${remainingMinutes}${remainingMinutes === 1 ? "m" : "ms"}`;
  }

  return result;
};
