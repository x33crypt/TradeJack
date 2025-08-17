import { useState, useEffect } from "react";
import api from "@/utils/http/api";
import { useDashboard } from "@/context/userContext/DashboardContext";

export function useFetchDashboard() {
  const { dashboard, setDashboard } = useDashboard();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get("/profile/dashboard");

        console.log("Dashboard response:", response); // Log the response for debugging

        if (response?.status === 200 && response?.data?.success) {
          setDashboard(response?.data?.data);
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

    fetchDashboard(); // ✅ Call the function here
  }, []);

  return { loading, error };
}
