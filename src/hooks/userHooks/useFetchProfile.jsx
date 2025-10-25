import { useState, useEffect } from "react";
import api from "@/utils/http/api";
import { useProfile } from "@/context/userContext/ProfileContext";

export function useFetchProfile() {
  const { setProfile } = useProfile();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const FetchProfile = async () => {
      try {
        const response = await api.get("/profile/me");

        console.log("Profile response:", response); // Log the response for debugging

        if (response?.status === 200 && response?.data?.success) {
          setProfile((prev) => ({
            ...prev,
            account: response?.data?.data?.account || null,
            info: response?.data?.data?.profileInformation || null,
            stats: response?.data?.data?.activityStats || null,
            feedbacks: response?.data?.data?.feedbacks || null,
          }));
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

    FetchProfile(); // ✅ Call the function here
  }, []);

  return { loading, error };
}
