import React from "react";
import { useProfile } from "@/context/ProfileContext";
import { useFetchProfile } from "@/hooks/useFetchProfile";

const Achievements = () => {
  const { loading, error } = useFetchProfile();
  const { profile, setProfile } = useProfile();

  return (
    <div className="flex-1 flex flex-col md:border border-neutral-800">
      <div className="flex items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">Achievements</p>
      </div>
      <div className="flex flex-1 p-[15px] min-h-[120px]"></div>
    </div>
  );
};

export default Achievements;
