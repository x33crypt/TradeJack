import { useState, useEffect, useRef } from "react";
import api from "@/utils/http/api";
import { useUserOffer } from "@/context/userContext/OffersContext";

export function useFetchAboutOffers(id) {
  const { aboutOffer, setAboutOffer } = useUserOffer();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const lastFetchedId = useRef(null);

  useEffect(() => {
    if (!id || lastFetchedId.current === id) return;

    const fetchAboutOffers = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/service-provider/offers/${id}`);
        if (response?.status === 200 && response?.data?.success) {
          setAboutOffer(response.data.data);
          lastFetchedId.current = id; // ✅ Update last fetched id
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

    fetchAboutOffers();
  }, [id, aboutOffer]);

  return { loading, error };
}
