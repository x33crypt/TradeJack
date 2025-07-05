export async function convertToUSD(amountInLocal, localCurrency = "NGN") {
  const API_KEY = "d53707af3046be4d0da2f936";
  console.log(API_KEY);

  if (!amountInLocal || isNaN(amountInLocal)) return null;

  try {
    const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${localCurrency}/USD/${amountInLocal}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.result === "success") {
      console.log(data);

      return {
        amount: data.conversion_result,
        rate: data.conversion_rate,
      };
    }

    throw new Error("Failed to fetch exchange rate");
  } catch (error) {
    console.error("Currency Conversion Error:", error);
    return null;
  }
}
