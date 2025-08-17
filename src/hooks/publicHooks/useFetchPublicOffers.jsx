import { useState, useEffect, useCallback } from "react";
import api from "@/utils/http/api";
import { usePublicOffers } from "@/context/publicContext/OffersContext";

export function useFetchPublicOffers(initialPage = 1, limit = 10) {
  const { setOffers, filter, setFilter } = usePublicOffers();
  const [page, setPage] = useState(initialPage);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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

        if (filter?.asset && filter.type !== "") {
          params.append("asset", filter.type.toLowerCase());
        }

        if (filter?.currency && filter?.currency?.code !== "") {
          params.append("currency", filter.currency.code.toLowerCase());
        }

        if (filter?.amount && filter?.amount !== "") {
          params.append("amount", filter.amount);
        }

        if (filter?.sortBy && filter?.sortBy !== "") {
          params.append("sort", filter.sortBy);
        }

        if (filter?.activeTraders !== false) {
          params.append("active", filter.activeTraders);
        }

        if (filter?.verifiedOffers !== false) {
          params.append("verified", filter.verifiedOffers);
        }

        if (filter?.topPicks !== false) {
          params.append("top-picks", filter.topPicks);
        }

        return `/service-provider/offers?page=${page}&limit=10?${params.toString()}`;
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
    [limit, filter, setOffers]
  );

  // first load – run once
  // useEffect(() => {
  //   fetchPage(1);
  // }, [filter, fetchPage]);

  const fetchOffers = () => {
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
    displayedCount, // how many txs are on screen
    next,
    fetchOffers,
  };
}
