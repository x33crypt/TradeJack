// hooks/useLocationData.js
import { useState } from "react";
import axios from "axios";
import { useToast } from "@/context/ToastContext";

const BASE_URL = "https://countriesnow.space/api/v0.1/countries";

export const useLocationData = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const { toast, setToast } = useToast();

  // Fetch all countries
  const fetchCountries = async () => {
    try {
      const res = await axios.get(`${BASE_URL}`);
      setCountries(res.data.data.map((item) => item.country));
    } catch (err) {
      console.log(err);

      setToast({
        ...toast,
        error: true,
        errorMessage: "Failed to load countries",
      });
    }
  };

  // Fetch states by country
  const fetchStates = async (country) => {
    if (!country) {
      setToast({
        ...toast,
        error: true,
        errorMessage: "Country is missing",
      });
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/states`, { country });
      setStates(res.data.data.states.map((s) => s.name));
    } catch (err) {
      console.log(err);
      setToast({
        ...toast,
        error: true,
        errorMessage: "Failed to load states",
      });
    }
  };

  // Fetch cities by country and state
  const fetchCities = async (country, state) => {
    if (!country || !state) {
      setToast({
        ...toast,
        error: true,
        errorMessage: "Country or state is missing",
      });
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/state/cities`, {
        country,
        state,
      });
      console.log("Fetched cities:", res.data.data);
      setCities(res.data.data);
    } catch (err) {
      console.error("Fetch cities error:", err.response?.data || err.message);
      setToast({
        ...toast,
        error: true,
        errorMessage: "Failed to load cities",
      });
    }
  };

  return {
    countries,
    states,
    cities,
    fetchCountries,
    fetchStates,
    fetchCities,
  };
};
