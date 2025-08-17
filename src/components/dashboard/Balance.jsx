import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { useFetchBalance } from "@/hooks/userHooks/useFetchBalance";
import { toDecimal } from "@/utils/toDecimal";
import Info from "../alerts/Info";
import { useBalance } from "@/context/userContext/BalanceContext";
import Loading from "../others/Loading";
import { FaQuestionCircle } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import { RiDashboard2Line } from "react-icons/ri";

const Balance = ({ dashboard }) => {
  const { balance, setBalance } = useBalance();
  const { loading, error, refetch } = useFetchBalance();
  const [showBalance, setShowBalance] = useState(false);

  console.log("Balance:", balance);

  const toggleBalanceVisibility = () => {
    setShowBalance((prev) => !prev);
  };

  console.log(showBalance);

  return (
    <div className="flex flex-col md:border border-neutral-800">
      <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight ">
        <p className="text-lg font-medium text-tradeFadeWhite flex items-center gap-1">
          Welcome back,{" "}
          <span className=" text-white font-semibold ">
            {dashboard?.profile?.username || "User"}
          </span>
        </p>
      </div>

      <div className="flex flex-col gap-[10px] p-[15px]">
        <div className="p-[12px] bg-tradeAsh h-[115px] rounded-[15px]"></div>
      </div>
    </div>
  );
};

export default Balance;
