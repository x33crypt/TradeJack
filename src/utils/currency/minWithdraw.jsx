export async function getMinimumWithdrawal(localCurrency = "NGN") {
  const API_KEY = "d53707af3046be4d0da2f936";
  const minUsd = 1;

  try {
    const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/USD/${localCurrency}/${minUsd}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.result === "success") {
      return {
        success: true,
        minimum: data.conversion_result,
      };
    }

    throw new Error("Failed to fetch minimum withdrawal");
  } catch (error) {
    console.error("Minimum Withdrawal Error:", error);
    return {
      success: false,
      error,
      message: error.message || "Something went wrong",
    };
  }
}
