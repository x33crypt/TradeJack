export const windowFormat = (hours = 0, minutes = 0) => {
  const totalMinutes = hours * 60 + minutes;

  if (totalMinutes < 60) {
    return `${totalMinutes} ${totalMinutes === 1 ? "Min" : "Mins"}`;
  }

  const displayHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  let result = `${displayHours} ${displayHours === 1 ? "Hr" : "Hrs"}`;
  if (remainingMinutes > 0) {
    result += ` ${remainingMinutes} ${remainingMinutes === 1 ? "Min" : "Mins"}`;
  }

  return result;
};
