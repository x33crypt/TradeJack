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

const OfferMenu = () => {
  const { offers, filter, setFilter } = useUserOffer();
  const { select, setSelect } = useSelectElement();
  const [assets, setAssets] = useState(["All asset"]);

  const offerStatus = ["All status", "Active", "Paused", "Suspended", "Closed"];

  // handling asset type change
  useEffect(() => {
    if (select?.page !== "my offer" || !select?.pick) return;

    if (select.element === "asset type") {
      const selectedStatus = select.pick === "All asset" ? null : select.pick;

      setFilter((prev) => ({
        ...prev,
        asset: selectedStatus,
      }));
    }
  }, [select]);

  // handling offer status change
  useEffect(() => {
    if (select?.page !== "my offer" || !select?.pick) return;

    if (select.element === "offer status") {
      console.log("Offer status selected:", select.pick);
      const selectedType = select.pick === "All status" ? null : select.pick;

      setFilter((prev) => ({
        ...prev,
        status: selectedType,
      }));
    }
  }, [select]);

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

  const handleDateChange = (e) => {
    const value = e.target.value; // format: "YYYY-MM"

    if (!value) {
      // Clear the filter if input is cleared
      setFilter((prev) => ({
        ...prev,
        date: { monthNo: null, monthName: null, year: null },
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
        monthNo: monthNum,
        monthName: monthName,
        year: Number(year),
      },
    }));
  };

  const handleClearFilter = () => {
    setFilter((prev) => ({
      ...prev,
      date: { monthNo: null, monthName: null, year: null },
      asset: null,
      status: null,
      search: null,
    }));
  };

  const join = new Date();
  const now = new Date();

  const min = `${join.getFullYear()}-${String(join.getMonth() + 1).padStart(
    2,
    "0"
  )}`;
  const max = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
    2,
    "0"
  )}`;

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
                element: "asset type",
                options: assets,
                pick: "",
                page: "my offer",
              })
            }
            className="flex items-center gap-2"
          >
            <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
            <p className="text-tradeFadeWhite hover:text-white text-[15px] font-bold transition-all duration-300 cursor-pointer">
              {filter?.asset ? filter?.asset : "ASSET"}
            </p>
          </div>
          <div
            onClick={() =>
              setSelect({
                ...select,
                state: true,
                selectOne: true,
                selectTwo: false,
                element: "offer status",
                options: offerStatus,
                pick: "",
                page: "my offer",
              })
            }
            className="flex items-center gap-2"
          >
            <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
            <p className="text-tradeFadeWhite hover:text-white text-[15px] font-bold transition-all duration-300 cursor-pointer">
              {filter?.status ? filter?.status : " STATUS"}
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

export default OfferMenu;
