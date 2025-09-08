import { useState, useEffect, useCallback } from "react";
import api from "@/utils/http/api";
import { usePublicOffers } from "@/context/publicContext/OffersContext";

export function useFetchPublicOffers(initialPage = 1, limit = 10) {
  const { setOffers, filter } = usePublicOffers();
  const [page, setPage] = useState(initialPage);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [displayedCount, setDisplayedCount] = useState(0);

  // ─────────────────────────────────────────────
  // Build URL dynamically (corrected `?` issue)
  // ─────────────────────────────────────────────
  const buildUrl = (pageToLoad) => {
    const params = new URLSearchParams();

    if (filter?.asset) params.append("asset", filter.asset);
    if (filter?.currency) params.append("currency", filter.currency);
    if (filter?.amount) params.append("amount", filter.amount);
    if (filter?.sortBy) params.append("sort", filter.sortBy);

    return `/service-provider/offers?${params.toString()}&page=${pageToLoad}&limit=${limit}`;
  };

  // ─────────────────────────────────────────────
  // Fetch data helper
  // ─────────────────────────────────────────────
  const fetchPage = useCallback(
    async (pageToLoad = 1) => {
      setLoading(true);
      setError(null);

      try {
        const url = buildUrl(pageToLoad);
        console.log("Fetching:", url);

        const res = await api.get(url);

        if (res.status === 200 && res.data?.success) {
          const { data, pagination } = res.data;

          if (pageToLoad === 1) {
            setOffers(res.data); // Replace
            setDisplayedCount(data.length);
          } else {
            setOffers((prev) => ({
              ...res.data,
              data: [...prev.data, ...data], // Append
            }));
            setDisplayedCount((prev) => prev + data.length);
          }

          setPagination(pagination);
          setPage(pageToLoad);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (err) {
        setError(
          err?.response?.data?.errorMessage || err?.message || "Unknown error"
        );
      } finally {
        setLoading(false);
      }
    },
    [filter, limit, setOffers] // dependency on filter
  );

  // ─────────────────────────────────────────────
  // Refetch when filter changes
  // ─────────────────────────────────────────────
  useEffect(() => {
    fetchPage(1);
  }, [filter, fetchPage]);

  // Manual fetch for reset or refresh
  const fetchOffers = () => {
    fetchPage(1);
  };

  // Load next page
  const next = async () => {
    if (pagination?.hasNextPage) {
      await fetchPage(page + 1);
    }
  };

  return {
    loading,
    error,
    pagination,
    page,
    displayedCount,
    next,
    fetchOffers,
  };
}
