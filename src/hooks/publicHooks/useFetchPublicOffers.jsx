import { useState, useEffect, useCallback } from "react";
import api from "@/utils/http/api";
import { usePublicOffers } from "@/context/publicContext/OffersContext";

export function useFetchPublicOffers() {
  const { setOffers, filter } = usePublicOffers();
  const [error, setError] = useState(null);

  // initial loading state (only on mount/refetch all)
  const [initialLoading, setInitialLoading] = useState(true);

  // recent states
  const [recentPage, setRecentPage] = useState(1);
  const [recentPagination, setRecentPagination] = useState(null);
  const [recentDisplayedCount, setRecentDisplayedCount] = useState(0);
  const [recentLoading, setRecentLoading] = useState(false);

  // top states
  const [topPage, setTopPage] = useState(1);
  const [topPagination, setTopPagination] = useState(null);
  const [topDisplayedCount, setTopDisplayedCount] = useState(0);
  const [topLoading, setTopLoading] = useState(false);

  // limits
  const RECENT_LIMIT = 10;
  const TOP_LIMIT = 5;

  // ─────────────────────────────────────────────
  // Build URL dynamically (separate keys for top/recent)
  // ─────────────────────────────────────────────
  const buildUrl = (type, pageToLoad) => {
    const params = new URLSearchParams();

    if (filter?.asset) params.append("asset", filter.asset);
    if (filter?.currency) params.append("currency", filter.currency);
    if (filter?.amount) params.append("amount", filter.amount);
    if (filter?.sortBy) params.append("sort", filter.sortBy);

    if (type === "recent") {
      params.append("recent_page", pageToLoad);
      params.append("recent_limit", RECENT_LIMIT);
    } else {
      params.append("top_page", pageToLoad);
      params.append("top_limit", TOP_LIMIT);
    }

    return `/service-provider/explore-offers?${params.toString()}`;
  };

  // ─────────────────────────────────────────────
  // Fetch data helper
  // ─────────────────────────────────────────────
  const fetchPage = useCallback(
    async ({ type = "recent", pageToLoad = 1 }) => {
      setError(null);

      if (type === "recent") setRecentLoading(true);
      if (type === "top") setTopLoading(true);

      try {
        const url = buildUrl(type, pageToLoad);
        console.log("Fetching:", url);

        const res = await api.get(url);

        if (res.status === 200 && res.data?.success) {
          const { recentOffers, topOffers } = res.data.data;

          setOffers((prev) => ({
            ...prev,
            recent:
              type === "recent"
                ? {
                    data:
                      pageToLoad === 1
                        ? recentOffers.data
                        : [...(prev.recent?.data || []), ...recentOffers.data],
                    pagination: recentOffers.pagination,
                  }
                : prev.recent,
            top:
              type === "top"
                ? {
                    data:
                      pageToLoad === 1
                        ? topOffers.data
                        : [...(prev.top?.data || []), ...topOffers.data],
                    pagination: topOffers.pagination,
                  }
                : prev.top,
          }));

          // update pagination + counters
          if (type === "recent") {
            setRecentPage(pageToLoad);
            setRecentPagination(recentOffers.pagination);

            setRecentDisplayedCount((prev) => {
              const newCount =
                pageToLoad === 1
                  ? recentOffers.data.length
                  : prev + recentOffers.data.length;
              return Math.min(newCount, recentOffers.pagination.totalItems);
            });
          } else {
            setTopPage(pageToLoad);
            setTopPagination(topOffers.pagination);

            setTopDisplayedCount((prev) => {
              const newCount =
                pageToLoad === 1
                  ? topOffers.data.length
                  : prev + topOffers.data.length;
              return Math.min(newCount, topOffers.pagination.totalItems);
            });
          }
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (err) {
        setError(
          err?.response?.data?.errorMessage || err?.message || "Unknown error"
        );
      } finally {
        if (type === "recent") setRecentLoading(false);
        if (type === "top") setTopLoading(false);
      }
    },
    [filter, setOffers]
  );

  // ─────────────────────────────────────────────
  // First load & when filters change
  // ─────────────────────────────────────────────
  useEffect(() => {
    let mounted = true;

    const loadBoth = async () => {
      // always reset to true at the start
      setInitialLoading(true);

      try {
        await Promise.all([
          fetchPage({ type: "recent", pageToLoad: 1 }),
          fetchPage({ type: "top", pageToLoad: 1 }),
        ]);
      } finally {
        if (mounted) {
          // only reset when results are back
          setInitialLoading(false);
        }
      }
    };

    loadBoth();

    return () => {
      mounted = false;
    };
  }, [filter, fetchPage]);

  // ─────────────────────────────────────────────
  // Helpers for manual fetch / pagination
  // ─────────────────────────────────────────────
  const fetchRecent = () => fetchPage({ type: "recent", pageToLoad: 1 });
  const fetchTop = () => fetchPage({ type: "top", pageToLoad: 1 });

  const nextRecent = async () => {
    if (
      recentPagination?.hasNextPage &&
      recentDisplayedCount < (recentPagination?.totalItems || 0)
    ) {
      await fetchPage({ type: "recent", pageToLoad: recentPage + 1 });
    }
  };

  const nextTop = async () => {
    if (
      topPagination?.hasNextPage &&
      topDisplayedCount < (topPagination?.totalItems || 0)
    ) {
      await fetchPage({ type: "top", pageToLoad: topPage + 1 });
    }
  };

  return {
    error,
    // global loading
    initialLoading,
    // recent
    recentPage,
    recentPagination,
    recentDisplayedCount,
    recentLoading,
    fetchRecent,
    nextRecent,
    // top
    topPage,
    topPagination,
    topDisplayedCount,
    topLoading,
    fetchTop,
    nextTop,
  };
}
