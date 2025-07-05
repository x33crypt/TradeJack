export async function getMinimumWithdrawal(localCurrency = "NGN") {
  const API_KEY = "d53707af3046be4d0da2f936";
  const minUsd = 20;

  try {
    const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/USD/${localCurrency}/${minUsd}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.result === "success") {
      return data.conversion_result; // This is the local value of $20
    }

    throw new Error("Failed to fetch minimum withdrawal");
  } catch (error) {
    console.error("Minimum Withdrawal Error:", error);
    return null;
  }
}
