import React, { useState, useEffect } from "react";
import Loading from "../others/Loading";
import NetworkError from "../others/NetworkError";

const Balance = ({ dashboard, loading }) => {
  const [dateTime, setDateTime] = useState({ date: "", time: "" });

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      // Day with leading zero (e.g., 04)
      const day = String(now.getDate()).padStart(2, "0");

      // Month in uppercase
      const month = now
        .toLocaleString("en-US", { month: "long" })
        .toUpperCase();

      const formattedDate = `${day} - ${month}`;

      // Time in 12-hour format (e.g., 11:45 AM)
      const formattedTime = now.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      setDateTime({ date: formattedDate, time: formattedTime });
    };

    updateDateTime(); // initial call
    const interval = setInterval(updateDateTime, 60000); // update every 1 min

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <div className="flex flex-1 flex-col md:border border-neutral-800 gap-[20px">
      <div className="flex flex-col md:flex-row px-[15px] py-[12px] md:border-b border-tradeAshLight gap-[2px]">
        <div className="flex gap-[2px] justify-between w-full items-center ">
          <div className="flex md:flex-row flex-col gap-[2px] md:text-lg text-2xl">
            <p className=" font-semibold text-white">Welcome Back,</p>
            <p className="font-semibold text-white">
              {dashboard?.userProfile?.userName || "User"}
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:gap-2 gap-1 text-sm items-end">
            <p className="font-semibold text-white">{dateTime.date}</p>
            <p className="font-semibold text-tradeFadeWhite">{dateTime.time}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 min-h-[144.5px] p-[15px]">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-1">
            {dashboard === null ? (
              <NetworkError />
            ) : (
              <div className="flex flex-1 flex-col gap-[10px] bg-tradeAsh rounded-[15px] border border-tradeAshLight p-[12px]"></div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Balance;
