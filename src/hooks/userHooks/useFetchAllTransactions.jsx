import { useState, useEffect, useCallback, useRef } from "react";
import api from "@/utils/http/api";
import { useTransaction } from "@/context/userContext/TransactionContext";

/**
 * useFetchAllTransactions
 * Reworked to match the structure/robustness of the user-offers hook:
 * - separate initialLoading vs loading (load more)
 * - request cancellation / mounted guard
 * - buildQueryParams helper
 * - merge & dedupe when appending pages
 */
export function useFetchAllTransactions(initialPage = 1, limit = 10) {
  const { setTransactions, filter } = useTransaction();

  const [page, setPage] = useState(initialPage);
  const [pagination, setPagination] = useState(null);
  const [error, setError] = useState(null);

  // separate loading states
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const [displayedCount, setDisplayedCount] = useState(0);

  // mounted guard + abort controller ref
  const mountedRef = useRef(true);
  const abortRef = useRef(null);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (abortRef.current) {
        // cancel any in-flight request on unmount
        try {
          abortRef.current.abort();
        } catch (e) {
          // ignore
        }
        abortRef.current = null;
      }
    };
  }, []);

  // build query params object (axios-friendly)
  const buildQueryParams = useCallback(
    (pageToLoad) => {
      const params = {};

      if (filter?.type && filter.type !== "All types") {
        params.type = filter.type.toLowerCase();
      }

      if (filter?.status && filter.status !== "All status") {
        params.status = filter.status.toLowerCase();
      }

      if (filter?.date?.monthNo) params.month = filter.date.monthNo;
      if (filter?.date?.year) params.year = filter.date.year;

      // pagination
      params.page = pageToLoad;
      params.limit = limit;

      return params;
    },
    [filter, limit]
  );

  // merge & dedupe helper (keeps newest first by createdAt)
  const mergeAndDedupe = useCallback((oldList = [], newList = []) => {
    const map = new Map();
    // keep newest from newList when conflicts: put old first then new overrides
    [...oldList, ...newList].forEach((t) => map.set(t.id, t));
    return Array.from(map.values()).sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, []);

  // stable fetch helper
  const fetchPage = useCallback(
    async (pageToLoad = 1, isInitial = false) => {
      // cancel previous request if any
      if (abortRef.current) {
        try {
          abortRef.current.abort();
        } catch (e) {
          // ignore
        }
      }

      const controller = new AbortController();
      abortRef.current = controller;
      const signal = controller.signal;

      if (isInitial) setInitialLoading(true);
      else setLoading(true);

      setError(null);

      try {
        const params = buildQueryParams(pageToLoad);

        const res = await api.get("/payment/wallet-history", {
          params,
          signal, // ensure your api wrapper forwards AbortController.signal
        });

        if (!mountedRef.current) return;

        if (res.status === 200 && res.data?.success) {
          const { data = [], pagination: pageInfo } = res.data;

          if (pageToLoad === 1) {
            // replace full set for first page
            setTransactions(res.data);
            setDisplayedCount(data.length);
          } else {
            // append & dedupe
            setTransactions((prev) => {
              const prevData = (prev && prev.data) || [];
              const merged = mergeAndDedupe(prevData, data);
              return {
                ...res.data,
                data: merged,
              };
            });
            setDisplayedCount((prev) => prev + data.length);
          }

          setPagination(pageInfo);
          setPage(pageToLoad);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (err) {
        if (err?.name === "CanceledError" || err?.code === "ERR_CANCELED") {
          // request cancelled — ignore
          // console.log("fetchPage cancelled");
        } else {
          const serverMsg =
            err?.response?.data?.errorMessage || err?.message || "Unknown error";
          setError(serverMsg);
        }
      } finally {
        if (mountedRef.current) {
          if (isInitial) setInitialLoading(false);
          else setLoading(false);
        }
        // clear abortRef for this finished request
        if (abortRef.current === controller) abortRef.current = null;
      }
    },
    [buildQueryParams, mergeAndDedupe, setTransactions]
  );

  // first load & whenever filter changes -> initial load
  useEffect(() => {
    fetchPage(1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]); // fetchPage depends on filter via buildQueryParams

  // helpers
  const refetchAllTransactions = () => fetchPage(1, true);

  const next = async () => {
    if (pagination?.hasNextPage) {
      await fetchPage(page + 1, false);
    }
  };

  return {
    error,
    pagination,
    page,
    displayedCount,
    loading, // load more loading
    initialLoading, // initial load
    next,
    refetchAllTransactions,
  };
}
