import api from "../http/api";

export async function closeOffer(offerId) {
  console.log("Hey, Editting Offer Ok!");

  const baseUrl = import.meta.env.VITE_API_URL;
  console.log("API URL:", baseUrl);

  if (!offerId) return { success: false, error: "No offer Id provided" };
}
