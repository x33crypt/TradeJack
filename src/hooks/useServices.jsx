import { useEffect, useState } from "react";
import api from "../utils/http/api";

export const useServices = () => {
  const [fullData, setFullData] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
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

        // Only keep names in serviceTypes
        const namesOnly = data.map((item) => item.name);
        setServiceTypes(namesOnly);
      } catch (error) {
        console.error("Error fetching services:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
  }, []);

  return { serviceTypes, fullData, loading, error };
};
