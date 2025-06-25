import { useState, useEffect } from "react";
import api from "@/utils/http/api";
import { useAboutOffer } from "@/context/offer/AboutOfferContext";

export function useFetchAboutOffers(id) {
  const { aboutOffer, setAboutOffer } = useAboutOffer();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return; // ⛔ prevent firing if no ID

    const FetchAboutOffers = async () => {
      try {
        const response = await api.get(`/service-provider/offers/${id}`);

        console.log("About Offer response:", response); // Log the response for debugging

        if (response?.status === 200 && response?.data?.success) {
          setAboutOffer(response?.data?.data);
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

    FetchAboutOffers(); // ✅ Call the function here
  }, [id]);

  return { loading, error };
}
