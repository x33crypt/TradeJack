import { useState, useEffect, useCallback } from "react";
import api from "@/utils/http/api";
import { useTransferContext } from "@/context/wallet/TransferContext";

export function useFetchTransferTxt(initialPage = 1, limit = 10) {
  const { transfer, setTransfer } = useTransferContext();
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

      try {
        const url = "/payment/wallet-history?type=transfer";
        console.log(url);

        const res = await api.get(url, {
          params: { page: pageToLoad, limit },
        });

        if (res.status === 200 && res.data?.success) {
          const { data, pagination } = res.data;

          if (pageToLoad === 1) {
            setTransfer((prev) => ({
              ...prev,
              recentTransfer: res.data, // or whatever change you want
            }));
            setDisplayedCount(data.length);
          } else {
            setTransfer((prev) => ({
              ...prev,
              recentTransfer: [...prev.data, ...data], // or whatever change you want
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
    [limit]
  );

  // first load – run once
  useEffect(() => {
    fetchPage(1);
  }, [fetchPage]);

  // 🔁 Refetch
  const refetchTransferTxt = () => {
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
    refetchTransferTxt,
  };
}
