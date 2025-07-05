export const toLocal = (value) => {
  if (!value || isNaN(value)) return "";
  return Number(value).toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
