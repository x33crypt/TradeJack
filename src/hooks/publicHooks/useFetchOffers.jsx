import { useState, useEffect, useCallback, useRef } from "react";
import api from "@/utils/http/api";
import { usePublicOffers } from "@/context/publicContext/OffersContext";

export function useFetchOffers() {
  const { setOffers, filter } = usePublicOffers();
  const [error, setError] = useState(null);

  // initial loading state (on mount / when filter changes)
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

  // keep a ref to avoid race when component unmounts
  const mountedRef = useRef(true);

  // Build URL using an explicit filter snapshot (so fetchPage is independent of closure)
  const buildUrlFromFilter = (type, pageToLoad, filterSnapshot) => {
    const params = new URLSearchParams();

    if (filterSnapshot?.asset) params.append("asset", filterSnapshot.asset);
    if (filterSnapshot?.currency)
      params.append("currency", filterSnapshot.currency);
    if (filterSnapshot?.amount) params.append("amount", filterSnapshot.amount);
    if (filterSnapshot?.sortBy) params.append("sort", filterSnapshot.sortBy);

    if (type === "recent") {
      params.append("recent_page", pageToLoad);
      params.append("recent_limit", RECENT_LIMIT);
    } else {
      params.append("top_page", pageToLoad);
      params.append("top_limit", TOP_LIMIT);
    }

    return `/service-provider/explore-offers?${params.toString()}`;
  };

  // fetchPage now takes an explicit filter snapshot so it's deterministic
  const fetchPage = useCallback(
    async ({ type = "recent", pageToLoad = 1, filterSnapshot = {} }) => {
      setError(null);

      if (type === "recent") setRecentLoading(true);
      if (type === "top") setTopLoading(true);

      try {
        const url = buildUrlFromFilter(type, pageToLoad, filterSnapshot);
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
    [setOffers]
  );

  // When the filter changes we always trigger initialLoading and fetch both lists.
  // We pass an immutable snapshot of the filter into fetchPage so it uses the intended filter.
  useEffect(() => {
    mountedRef.current = true;
    const filterSnapshot = filter ? JSON.parse(JSON.stringify(filter)) : {};

    let abort = false;

    const loadBoth = async () => {
      // mark loading immediately when a filter is applied
      setInitialLoading(true);
      try {
        await Promise.all([
          fetchPage({ type: "recent", pageToLoad: 1, filterSnapshot }),
          fetchPage({ type: "top", pageToLoad: 1, filterSnapshot }),
        ]);
      } finally {
        // only update state if still mounted and not aborted
        if (!abort && mountedRef.current) {
          setInitialLoading(false);
        }
      }
    };

    // always run on mount and whenever filter changes
    loadBoth();

    return () => {
      abort = true;
      mountedRef.current = false;
    };
  }, [filter, fetchPage]);

  // Helpers for manual fetch / pagination (use current filter snapshot)
  const fetchRecent = () =>
    fetchPage({
      type: "recent",
      pageToLoad: 1,
      filterSnapshot: filter ? JSON.parse(JSON.stringify(filter)) : {},
    });
  const fetchTop = () =>
    fetchPage({
      type: "top",
      pageToLoad: 1,
      filterSnapshot: filter ? JSON.parse(JSON.stringify(filter)) : {},
    });

  const nextRecent = async () => {
    if (
      recentPagination?.hasNextPage &&
      recentDisplayedCount < (recentPagination?.totalItems || 0)
    ) {
      await fetchPage({
        type: "recent",
        pageToLoad: recentPage + 1,
        filterSnapshot: filter ? JSON.parse(JSON.stringify(filter)) : {},
      });
    }
  };

  const nextTop = async () => {
    if (
      topPagination?.hasNextPage &&
      topDisplayedCount < (topPagination?.totalItems || 0)
    ) {
      await fetchPage({
        type: "top",
        pageToLoad: topPage + 1,
        filterSnapshot: filter ? JSON.parse(JSON.stringify(filter)) : {},
      });
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
