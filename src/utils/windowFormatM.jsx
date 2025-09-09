export const windowFormatMinutes = (hours = 0, minutes = 0) => {
  const totalMinutes = hours * 60 + minutes;

  if (totalMinutes <= 0) return "0 Min";

  return `${totalMinutes} ${totalMinutes === 1 ? "Min" : "Mins"}`;
};
