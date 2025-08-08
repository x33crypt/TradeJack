import React from "react";
import { useAccount } from "@/context/AccountContext";

const ViewOptions = () => {
  const { account, setAccount } = useAccount();
  const { view } = account;

  return (
    <div className="sticky md:top-[64px] top-[57px] z-20 bg-black py-[12px] px-[15px] border-y border-dashed border-tradeAshLight">
      <div className="custom-x-scrollbar flex justify-between items-center gap-[5px] ">
        <div className="flex items-cente gap-[5px] bg-transparent flex-shrink-0 py-[1px] px-[2px]">
          <div
            onClick={() =>
              setAccount((prev) => ({
                ...prev,
                view: "Profile",
              }))
            }
            className={`${
              view === "Profile"
                ? "text-white bg-tradeAsh border-tradeGreen"
                : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
            } flex items-center gap-1  w-max px-[12px] py-[4px] text-[13px] font-semibold rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
          >
            <p>Profile</p>
          </div>
          <div
            onClick={() =>
              setAccount((prev) => ({
                ...prev,
                view: "Stats",
              }))
            }
            className={`${
              view === "Stats"
                ? "text-white bg-tradeAsh border-tradeGreen"
                : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
            } flex md:hidden items-center gap-1  w-max px-[12px] py-[4px] text-[13px] font-semibold rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
          >
            <p>Stats</p>
          </div>
          <div
            onClick={() =>
              setAccount((prev) => ({
                ...prev,
                view: "Promotions",
              }))
            }
            className={`${
              view === "Promotions"
                ? "text-white bg-tradeAsh border-tradeGreen"
                : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
            } flex items-center gap-1  w-max px-[12px] py-[4px] text-[13px] font-semibold rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
          >
            <p>Promotions</p>
          </div>
          <div
            onClick={() =>
              setAccount((prev) => ({
                ...prev,
                view: "Rewards",
              }))
            }
            className={`${
              view === "Rewards"
                ? "text-white bg-tradeAsh border-tradeGreen"
                : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
            } flex items-center gap-1  w-max px-[12px] py-[4px] text-[13px] font-semibold rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
          >
            <p>Rewards</p>
          </div>
          <div
            onClick={() =>
              setAccount((prev) => ({
                ...prev,
                view: "Invite a Friend",
              }))
            }
            className={`${
              view === "Invite a Friend"
                ? "text-white bg-tradeAsh border-tradeGreen"
                : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
            } flex items-center gap-1  w-max px-[12px] py-[4px] text-[13px] font-semibold rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
          >
            <p>Invite a Friend</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOptions;
