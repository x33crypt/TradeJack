const withComma = (value) => {
  if (!value) return "";
  const num = parseFloat(value);
  if (isNaN(num)) return value;
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};

export default withComma;
