import { useState, useEffect } from "react";
import api from "@/utils/http/api";
import { useProfile } from "@/context/ProfileContext";

export function useFetchProfile() {
  const { profile, setProfile } = useProfile();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const FetchProfile = async () => {
      try {
        const response = await api.get("/user");

        console.log("Profile response:", response); // Log the response for debugging

        if (response?.status === 200 && response?.data?.success) {
          setProfile(response?.data?.data?.user);
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
