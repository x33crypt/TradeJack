import { useState, useCallback, useEffect } from "react";
import api from "@/utils/http/api";
import { useUserFeedback } from "@/context/userContext/FeedbackContext";

export function useFetchFeedbacks() {
  const { feedback, setFeedback } = useUserFeedback();

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [displayedCount, setDisplayedCount] = useState(0);

  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  const FEEDBACK_LIMIT = 10; // adjust as needed

  // ───────────────────────────────
  // Fetch feedbacks
  // ───────────────────────────────
  const fetchFeedbacks = useCallback(
    async (pageToLoad = 1) => {
      if (pageToLoad === 1) setLoadingInitial(true);
      else setLoadingMore(true);

      setError(null);

      try {
        let url = "/profile/feedback";
        const params = new URLSearchParams();

        // add filters from context
        if (feedback?.offerId) params.append("offerId", feedback.offerId);
        if (feedback?.type) params.append("type", feedback.type);

        // add pagination
        params.append("page", pageToLoad);
        params.append("limit", FEEDBACK_LIMIT);

        url += `?${params.toString()}`;

        console.log("Feedbacks url:", url);

        const res = await api.get(url);
        console.log("Feedbacks response:", res);

        if (res?.status === 200 && res.data?.success) {
          const { data, pagination: pg } = res.data;

          setFeedback((prev) => ({
            ...prev,
            data:
              pageToLoad === 1
                ? data
                : [...(prev?.data || []), ...(data || [])],
          }));

          setPage(pageToLoad);
          setPagination(pg);

          setDisplayedCount((prevCount) =>
            pageToLoad === 1
              ? data.length
              : Math.min(prevCount + data.length, pg.totalItems)
          );
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (err) {
        setError(
          err?.response?.data?.errorMessage || err?.message || "Unknown error"
        );
      } finally {
        setLoadingInitial(false);
        setLoadingMore(false);
      }
    },
    [feedback?.offerId, feedback?.type, setFeedback]
  );

  // ───────────────────────────────
  // Auto-fetch on first load or when filters change
  // ───────────────────────────────
  useEffect(() => {
    fetchFeedbacks(1);
  }, [feedback?.offerId, feedback?.type]);

  // ───────────────────────────────
  // Load next page
  // ───────────────────────────────
  const nextPage = async () => {
    if (
      pagination?.hasNextPage &&
      displayedCount < (pagination?.totalItems || 0)
    ) {
      await fetchFeedbacks(page + 1);
    }
  };

  return {
    feedback,
    loadingInitial,
    loadingMore,
    error,
    pagination,
    page,
    displayedCount,
    fetchFeedbacks,
    nextPage,
  };
}
