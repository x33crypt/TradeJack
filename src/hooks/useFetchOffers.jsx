import { useState, useEffect } from "react";
import api from "@/utils/http/api";
import { useMyOffer } from "@/context/offer/MyOffersContext";

export function useFetchMyOffers() {
  const { myOffers, setMyOffers } = useMyOffer();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const FetchMyOffers = async () => {
      try {
        const response = await api.get("/service-provider/my-offers");

        console.log("My Offer response:", response); // Log the response for debugging

        if (response?.status === 200 && response?.data?.success) {
          setMyOffers(response?.data?.data);
        } else {
          setError("Unexpected response format");
        }
      } catch (err) {
        setError(
          err?.response?.data?.errorMessage || err?.message || "Unknown error"
        );
      } finally {
        setLoading(false);
      }
    };

    FetchMyOffers(); // ✅ Call the function here
  }, []);

  return { loading, error };
}
