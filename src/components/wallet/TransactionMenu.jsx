import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDashboard } from "@/context/userContext/DashboardContext";
import { IoMdArrowDropright } from "react-icons/io";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { IoCloseSharp } from "react-icons/io5";
import { TbArrowsSort } from "react-icons/tb";
import { LuCalendarClock } from "react-icons/lu";
import { useUserOffer } from "@/context/userContext/OffersContext";
import { useSelectElement } from "@/context/otherContext/SelectElementContext";
import { IoNuclearSharp } from "react-icons/io5";
import { useTransaction } from "@/context/userContext/TransactionContext";
import { date } from "@/utils/date";

const TransactionMenu = () => {
  const { transactions, filter, setFilter } = useTransaction();
  const { select, setSelect } = useSelectElement();

  const transactionTypes = ["All types", "Transfer", "Deposit", "Withdraw"];

  const transactionStatus = [
    "All status",
    "Pending",
    "Failed",
    "Successful",
    "Processing",
  ];

  const inputRef = useRef(null);
  const handleDateClick = () => {
    if (!inputRef.current) return;
    if (inputRef.current.showPicker) {
      // works in Chromium ≥ 111
      inputRef.current.showPicker();
    } else {
      // fallback
      inputRef.current.focus();
    }
  };

  const joinDate = transactions?.transactionDateRange?.firstTransaction
    ? date(transactions.transactionDateRange.firstTransaction)
    : "N/A";

  const join = new Date(joinDate);
  const now = new Date();

  const min = `${join.getFullYear()}-${String(join.getMonth() + 1).padStart(
    2,
    "0"
  )}`;
  const max = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
    2,
    "0"
  )}`;

  const handleDateChange = (e) => {
    const value = e.target.value; // format: "YYYY-MM"

    if (!value) {
      // Clear the filter if input is cleared
      setFilter((prev) => ({
        ...prev,
        date: null,
      }));
      return;
    }

    const [year, month] = value.split("-");
    const monthNum = Number(month);
    const monthName = new Date(`${year}-${month}-01`).toLocaleString(
      "default",
      {
        month: "long",
      }
    );

    setFilter((prev) => ({
      ...prev,
      date: {
        year: Number(year),
        monthNo: monthNum,
        monthName: monthName,
      },
    }));
  };

  // handling transaction type change
  useEffect(() => {
    if (select?.page !== "transaction history" || !select?.pick) return;

    if (select.element === "type") {
      console.log("Transaction type selected:", select.pick);
      const selectedType = select.pick === "All types" ? null : select.pick;

      setFilter((prev) => ({
        ...prev,
        type: selectedType,
      }));
    }
  }, [select]);

  // handling transaction status change
  useEffect(() => {
    if (select?.page !== "transaction history" || !select?.pick) return;

    if (select.element === "status") {
      const selectedStatus = select.pick === "All status" ? null : select.pick;

      setFilter((prev) => ({
        ...prev,
        status: selectedStatus,
      }));
    }
  }, [select]);

  const handleClearFilter = () => {
    setFilter((prev) => ({
      ...prev,
      date: { monthNo: null, monthName: null, year: null },
      type: null,
      status: null,
      search: null,
    }));
  };

  return (
    <div className="hidden lg:flex sticky top-[70px] h-max w-[250px] gap-[10px] flex-col lg:mb-[15px] ">
      <div className="flex flex-col p-[15px] bg-tradeAshLight gap-[20px] rounded-[15px] border border-tradeAsh">
        {/* <div className="flex px-2.5 py-1.5 gap-2 items-center bg-tradeAsh flex-1 rounded-sm ">
          <div className="text-lg text-tradeFadeWhite">
            <HiOutlineMagnifyingGlass />
          </div>
          <div>
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent w-[150px] h-full text-[13px] font-medium outline-none text-white placeholder:text-tradeFadeWhite"
            />
          </div>
          <div className="text-lg text-tradeFadeWhite">
            <IoCloseSharp />
          </div>
        </div> */}
        <div className="flex flex-col gap-[15px]">
          <div
            onClick={() =>
              setSelect({
                ...select,
                state: true,
                selectOne: true,
                selectTwo: false,
                element: "type",
                options: transactionTypes,
                pick: "",
                page: "transaction history",
              })
            }
            className="flex items-center gap-2"
          >
            <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
            <p className="text-tradeFadeWhite hover:text-white text-[15px] font-bold transition-all duration-300 cursor-pointer">
              <p>{filter?.type ? filter?.type : "TYPE"}</p>
            </p>
          </div>
          <div
            onClick={() =>
              setSelect({
                ...select,
                state: true,
                selectOne: true,
                selectTwo: false,
                element: "status",
                options: transactionStatus,
                pick: "",
                page: "transaction history",
              })
            }
            className="flex items-center gap-2"
          >
            <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
            <p className="text-tradeFadeWhite hover:text-white text-[15px] font-bold transition-all duration-300 cursor-pointer">
              <p>{filter?.status ? filter?.status : " STATUS"}</p>
            </p>
          </div>
          <div className="flex items-center gap-5">
            <div onClick={handleDateClick} className="flex items-center gap-2">
              <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
              <p className="text-tradeFadeWhite hover:text-white text-[15px] font-bold transition-all duration-300 cursor-pointer">
                {filter.date?.monthName ? filter.date?.monthName : "MONTH"},{" "}
                {filter.date?.year ? filter.date?.year : "YEAR"}
              </p>
            </div>

            <input
              type="month"
              min={min}
              max={max}
              onChange={handleDateChange}
              ref={inputRef}
              className="absolute opacity-0 w-0 h-0 pointer-events-none"
            />
          </div>
          <div onClick={handleClearFilter} className="flex items-center gap-2">
            <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
            <p className="text-tradeFadeWhite hover:text-white text-[15px] font-bold transition-all duration-300 cursor-pointer">
              RESET FILTER
            </p>
          </div>
        </div>
      </div>

      {/* <div></div> */}
    </div>
  );
};

export default TransactionMenu;
