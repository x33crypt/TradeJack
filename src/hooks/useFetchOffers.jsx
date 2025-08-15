import { useState, useEffect, useCallback } from "react";
import api from "@/utils/http/api";
import { useUserOffer } from "@/context/userContext/OffersContext";

export function useFetchUserOffers(initialPage = 1, limit = 10) {
  const { setOffers, filter } = useUserOffer();
  const [page, setPage] = useState(initialPage);
  const [pagination, setPagination] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [displayedCount, setDisplayedCount] = useState(0);

  // ─────────────────────────────────────────────────────────────
  // stable fetch helper (doesn't depend on `page`)
  // ─────────────────────────────────────────────────────────────
  const fetchPage = useCallback(
    async (pageToLoad) => {
      setLoading(true);
      setError(null);

      const buildUrl = () => {
        const params = new URLSearchParams();

        if (filter?.asset && filter.asset !== "All assets") {
          params.append("assets", filter.type.toLowerCase());
        }

        if (filter?.status && filter.status !== "All status") {
          params.append("status", filter.status.toLowerCase());
        }

        if (filter?.date?.monthNo) {
          params.append("month", filter.date.monthNo);
        }

        if (filter?.date?.year) {
          params.append("year", filter.date.year);
        }

        return `/service-provider/my-offers?${params.toString()}`;
      };

      try {
        const url = buildUrl();
        console.log(url);

        const res = await api.get(url, {
          params: { page: pageToLoad, limit },
        });

        if (res.status === 200 && res.data?.success) {
          const { data, pagination } = res.data;

          if (pageToLoad === 1) {
            setOffers(res.data);
            setDisplayedCount(data.length);
          } else {
            setOffers((prev) => ({
              ...res.data,
              data: [...prev.data, ...data],
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
    [limit, filter]
  );

  // first load – run once
  useEffect(() => {
    fetchPage(1);
  }, [filter, fetchPage]);

  // 🔁 Refetch
  const refetchMyOffers = () => {
    fetchPage(1); // then fetch fresh with empty filter
  };

  // ───────────── helper for “Next” (Prev removed) ─────────────
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
    refetchMyOffers,
  };
}
