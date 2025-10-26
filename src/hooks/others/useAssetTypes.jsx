import { useEffect, useState } from "react";
import api from "@/utils/http/api";

export const useAssetTypes = () => {
  const [fullData, setFullData] = useState([]);
  const [assetTypes, setAssetTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await api.get("/services");
        const data = Array.isArray(response.data?.data)
          ? response.data.data
          : [];

        setFullData(data);

        // Only keep names in assetTypes
        const namesOnly = data.map((item) => item.name);
        setAssetTypes(namesOnly);
      } catch (error) {
        console.error("Error fetching services:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
  }, []);

  return { assetTypes, fullData, loading, error };
};
