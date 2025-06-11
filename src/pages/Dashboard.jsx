import React, { useEffect } from "react";
import DashSideNav from "../components/dashboard/DashSideNav";
import DashTopNav from "../components/dashboard/DashTopNav";
import DashMain from "@/components/dashboard/DashMain";
import DashSide from "@/components/dashboard/DashSide";
import Footer from "@/components/Footer";
import InAppNav from "@/components/InAppNav";
import { useUserContext } from "@/context/UserContext";
import axios from "axios";

const Dashboard = () => {
  const { user, setUser } = useUserContext();

  const baseUrl = import.meta.env.VITE_API_URL;
  console.log("API URL:", baseUrl);

  const getDashboard = async () => {
    try {
      const config = { withCredentials: true };
      const response = await axios.get(`${baseUrl}/profile/dashboard`, config);
      console.log("Dasboard Retrived Successfully", response.data);
    } catch (err) {
      console.error(" Error While Fetching Dasboard:", err);
    }
  };

  useEffect(() => {
    getDashboard();
  }, []);

  return (
    <>
      <InAppNav />
      <div className="flex min-h-screen bg-black lg:px-[2%] md:px-[2.5%]">
        <DashSideNav />
        <DashMain />
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
