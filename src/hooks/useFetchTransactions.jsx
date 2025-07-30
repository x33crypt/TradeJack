import { useState, useEffect, useCallback } from "react";
import api from "@/utils/http/api";
import { useTransaction } from "@/context/wallet/TransactionContext";

export function useFetchTransactions(initialPage = 1, limit = 10) {
  const { setTransactions, filter, setFilter } = useTransaction();
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

        if (filter?.type && filter.type !== "All types") {
          params.append("type", filter.type.toLowerCase());
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

        return `/payment/wallet-history?${params.toString()}`;
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
            setTransactions(res.data);
            setDisplayedCount(data.length);
          } else {
            setTransactions((prev) => ({
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
    [limit, filter, setTransactions]
  );

  // first load – run once
  useEffect(() => {
    fetchPage(1); // Always reset to page 1 on filter change
  }, [filter, fetchPage]);

  // 🔁 Refetch AND reset filters
  const refetchTransactions = () => {
    const clearedFilter = {
      type: "All types",
      status: "All status",
      date: null,
    };

    setFilter(clearedFilter); // update context first
    fetchPage(1, clearedFilter); // then fetch fresh with empty filter
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
    refetchTransactions,
  };
}
