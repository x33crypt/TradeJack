import React from "react";
import { useAccount } from "@/context/AccountContext";

const ViewOptions = () => {
  const { account, setAccount } = useAccount();
  const { view } = account;

  return (
    <div className="sticky md:top-[65px] top-[57px] z-50 bg-black py-[12px] px-[15px] border-b border-dashed border-tradeAshLight">
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
                ? "text-tradeGreen bg-tradeGreen/20 border-tradeGreen"
                : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
            } inline-block w-max px-[12px] py-[4px] text-[13px] font-medium rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
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
                ? "text-tradeGreen bg-tradeGreen/20 border-tradeGreen"
                : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
            } inline-block w-max px-[12px] py-[4px] text-[13px] font-medium rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
          >
            <p>Stats & Feedbacks</p>
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
                ? "text-tradeGreen bg-tradeGreen/20 border-tradeGreen"
                : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
            } inline-block w-max px-[12px] py-[4px] text-[13px] font-medium rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
          >
            <p>Promotions</p>
          </div>
          <div
            onClick={() =>
              setAccount((prev) => ({
                ...prev,
                view: "Security & Access",
              }))
            }
            className={`${
              view === "Security & Access"
                ? "text-tradeGreen bg-tradeGreen/20 border-tradeGreen"
                : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
            } inline-block w-max px-[12px] py-[4px] text-[13px] font-medium rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
          >
            <p>Security & Access</p>
          </div>
          <div
            onClick={() =>
              setAccount((prev) => ({
                ...prev,
                view: "Privacy & Safety",
              }))
            }
            className={`${
              view === "Privacy & Safety"
                ? "text-tradeGreen bg-tradeGreen/20 border-tradeGreen"
                : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
            } inline-block w-max px-[12px] py-[4px] text-[13px] font-medium rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
          >
            <p>Privacy & Safety</p>
          </div>
          <div
            onClick={() =>
              setAccount((prev) => ({
                ...prev,
                view: "Notifications",
              }))
            }
            className={`${
              view === "Notifications"
                ? "text-tradeGreen bg-tradeGreen/20 border-tradeGreen"
                : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
            } inline-block w-max px-[12px] py-[4px] text-[13px] font-medium rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
          >
            <p>Notifications</p>
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
                ? "text-tradeGreen bg-tradeGreen/20 border-tradeGreen"
                : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
            } inline-block w-max px-[12px] py-[4px] text-[13px] font-medium rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
          >
            <p>Invite a Friend</p>
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
                ? "text-tradeGreen bg-tradeGreen/20 border-tradeGreen"
                : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
            } inline-block w-max px-[12px] py-[4px] text-[13px] font-medium rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
          >
            <p>Rewards</p>
          </div>
          <div
            onClick={() =>
              setAccount((prev) => ({
                ...prev,
                view: "Help & Support",
              }))
            }
            className={`${
              view === "Help & Support"
                ? "text-tradeGreen bg-tradeGreen/20 border-tradeGreen"
                : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
            } inline-block w-max px-[12px] py-[4px] text-[13px] font-medium rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
          >
            <p>Help & Support</p>
          </div>
        </div>
        <div className="flex items-cente gap-[5px] bg-transparent flex-shrink-0 py-[1px] px-[2px]">
          <div
            onClick={() =>
              setAccount((prev) => ({
                ...prev,
                view: "Community",
              }))
            }
            className={`${
              view === "Community"
                ? "text-tradeGreen bg-tradeGreen/20 border-tradeGreen"
                : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
            } inline-block w-max px-[12px] py-[4px] text-[13px] font-medium rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
          >
            <p>Community</p>
          </div>
          <div
            onClick={() =>
              setAccount((prev) => ({
                ...prev,
                view: "About",
              }))
            }
            className={`${
              view === "About"
                ? "text-tradeGreen bg-tradeGreen/20 border-tradeGreen"
                : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
            } inline-block w-max px-[12px] py-[4px] text-[13px] font-medium rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
          >
            <p>About</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOptions;
