import Footer from "@/components/Footer";
import InAppNav from "@/components/InAppNav";
import DasHboardMenu from "@/components/menuBars/DashboardMenu";
import React, { useRef, useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import TransactionCard from "@/components/cards/TransactionCard";
import { useTransaction } from "@/context/wallet/TransactionContext";
import { MdArrowDropDown } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { TiArrowSortedDown } from "react-icons/ti";
import { useFetchTransactions } from "@/hooks/useFetchTransactions";
import Button from "@/components/buttons/Button";
import { LuWalletCards } from "react-icons/lu";
import { RiArrowUpFill } from "react-icons/ri";
import { RiArrowRightUpFill } from "react-icons/ri";
import { RiArrowLeftDownFill } from "react-icons/ri";
import { CiWallet } from "react-icons/ci";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { SlCalender } from "react-icons/sl";
import { HiMiniCalendarDateRange } from "react-icons/hi2";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { IoIosWallet } from "react-icons/io";
import { IoWallet } from "react-icons/io5";
import { useSelectElement } from "@/context/SelectElementContext";
import { IoClose } from "react-icons/io5";
import { date } from "@/utils/date";

const TransactionHistory = () => {
  const topRef = useRef(null);
  const { loading, error, pagination, page, displayedCount, next } =
    useFetchTransactions();
  const { transactions, filter, setFilter } = useTransaction();
  const [triggerScroll, setTriggerScroll] = useState(false);
  const [loadingNext, setLoadingNext] = useState(false);
  const { select, setSelect } = useSelectElement();

  console.log("Transactions", transactions);
  console.log("Filter", filter);

  // This Function handles Filter changes

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

  const joinDate = date(transactions?.transactionDateRange?.firstTransaction);
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
    if (!value) return;

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

  const resetFilter = () => {
    setFilter((prev) => ({
      ...prev,
      date: { monthNo: null, monthName: null, year: null },
      type: null,
      status: null,
    }));
  };

  useEffect(() => {
    resetFilter();
  }, []);

  const transactionStatus = ["Pending", "Failed", "Successful"];

  const transactionTypes = ["Transfer", "Deposit"];

  // handling transaction type change
  useEffect(() => {
    if (select?.page !== "transaction history" || !select?.pick) return;

    if (select.element === "transaction type") {
      console.log("Transaction type selected:", select.pick);
      const selectedType = select.pick;

      setFilter((prev) => ({
        ...prev,
        type: selectedType,
      }));
    }
  }, [select]);

  // handling transaction status change
  useEffect(() => {
    if (select?.page !== "transaction history" || !select?.pick) return;

    if (select.element === "transaction status") {
      console.log("Transaction status selected:", select.pick);
      const selectedStatus = select.pick;

      setFilter((prev) => ({
        ...prev,
        status: selectedStatus,
      }));
    }
  }, [select]);

  // This Function handles Loading of transactions
  // 👇 Scroll after page changes
  useEffect(() => {
    if (triggerScroll && transactionRef.current) {
      transactionRef.current.scrollIntoView({ behavior: "smooth" });
      setTriggerScroll(false); // reset flag
    }
  }, [page, triggerScroll]);

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  const handleNext = async () => {
    setLoadingNext(true);
    await next();
    setLoadingNext(false);
  };

  const isEmpty = transactions?.data?.length === 0;
  const isEnd = pagination && !pagination.hasNextPage && !isEmpty;

  const message = isEmpty ? "No activity yet" : isEnd ? "End of list" : "";

  return (
    <>
      <InAppNav />
      <div
        ref={topRef}
        className="md:pt-[64px] pt-[57px] lg:px-[2%] md:px-[2.5%]  min-h-svh flex gap-[10px] bg-black "
      >
        <DasHboardMenu />
        <div className="flex-1 flex flex-col h-[100%] md:border border-neutral-800">
          <div className="flex  items-center justify-between px-[15px] py-[12px] md:py-[15px] border-b border-tradeAshLight">
            <p className="text-lg font-[700] text-white ">
              Transaction History
            </p>
          </div>
          <div className="flex flex-col p-[15px] gap-[10px]">
            <div className="flex lg:flex-row flex-col w-full gap-[10px]">
              <div className="flex-1 flex flex-col p-[12px] gap-[10px] bg-tradeAsh border border-tradeAshLight rounded-[15px]">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-transparent px-[4px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max cursor-pointer">
                    <IoWallet className=" text-tradeOrange" />
                  </div>

                  <p className="text-tradeFadeWhite text-xs font-semibold">
                    Total Transaction This Month
                  </p>
                </div>
                <div>
                  <p className="text-white text-[22px] font-semibold">
                    #23,200,000.68
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex text-xs font-semibold text-tradeGreen items-center gap-1">
                    <div className="flex items-center gap-1 bg-transparent px-[4px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max cursor-pointer">
                      <RiArrowUpFill className=" text-tradeGreen" />
                    </div>

                    <p className="">12.5%</p>
                  </div>
                  <p className="text-white text-xs font-medium">
                    Compared to last month
                  </p>
                </div>
              </div>
              <div className="flex-1 flex flex-col p-[12px] gap-[10px] bg-tradeAsh border border-tradeAshLight rounded-[15px]">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-transparent px-[4px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max cursor-pointer">
                    <RiArrowLeftDownFill className=" text-tradeGreen" />
                  </div>

                  <p className="text-tradeFadeWhite text-xs font-semibold">
                    Total Deposit This Month
                  </p>
                </div>
                <div>
                  <p className="text-white text-[22px] font-semibold">
                    #23,200,000.68
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex text-xs font-semibold text-tradeGreen items-center gap-1">
                    <div className="flex items-center gap-1 bg-transparent px-[4px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max cursor-pointer">
                      <RiArrowUpFill className=" text-tradeGreen" />
                    </div>

                    <p className="">12.5%</p>
                  </div>
                  <p className="text-white text-xs font-medium">
                    Compared to last month
                  </p>
                </div>
              </div>
              <div className="flex-1 flex flex-col p-[12px] gap-[10px] bg-tradeAsh border border-tradeAshLight rounded-[15px]">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-transparent px-[4px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max cursor-pointer">
                    <RiArrowRightUpFill className=" text-red-600 " />
                  </div>

                  <p className="text-tradeFadeWhite text-xs font-semibold">
                    Total Transfer This Month
                  </p>
                </div>
                <div>
                  <p className="text-white text-[22px] font-semibold">
                    #23,200,000.68
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex text-xs font-semibold text-tradeGreen items-center gap-1">
                    <div className="flex items-center gap-1 bg-transparent px-[4px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max cursor-pointer">
                      <RiArrowUpFill className=" text-tradeGreen" />
                    </div>

                    <p className="">12.5%</p>
                  </div>
                  <p className="text-white text-xs font-medium">
                    Compared to last month
                  </p>
                </div>
              </div>
            </div>

            <div className="sticky md:top-[65px] top-[57px] mt-[30px] bg-black py-[12px] border-b border-dashed border-tradeAshLight">
              <div className="flex justify-between items-center w-full gap-[10px]">
                <div
                  onClick={handleDateClick}
                  className="flex gap-[5px] cursor-pointer transition-all duration-300"
                >
                  <div className="flex items-center gap-1 bg-tradeAsh text-tradeFadeWhite px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                    <HiMiniCalendarDateRange />
                  </div>

                  <div
                    className={`${
                      filter.date?.monthName
                        ? "text-white"
                        : "text-tradeFadeWhite "
                    } flex gap-[5px] transition-all duration-300 hover:text-white`}
                  >
                    <div className=" flex items-center gap-1 bg-tradeAsh px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                      <p className="text-[13px] font-semibold">
                        {filter.date?.monthName
                          ? filter.date?.monthName
                          : "Month"}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 bg-tradeAsh px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                      <p className="text-[13px] font-semibold">
                        {filter.date?.year ? filter.date?.year : "Year"}
                      </p>
                    </div>
                    <div>
                      <input
                        type="month"
                        min={min}
                        max={max}
                        onChange={handleDateChange}
                        ref={inputRef}
                        className="absolute opacity-0 w-0 h-0 pointer-events-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-[10px]">
                  <div className="flex gap-[5px] cursor-pointer transition-all duration-300">
                    <div className="flex items-center gap-1 bg-tradeAsh text-tradeFadeWhite px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                      <HiAdjustmentsHorizontal />
                    </div>
                    <div
                      onClick={() =>
                        setSelect({
                          ...select,
                          state: true,
                          selectOne: true,
                          selectTwo: false,
                          element: "transaction type",
                          options: transactionTypes,
                          pick: "",
                          page: "transaction history",
                        })
                      }
                      className={` ${
                        filter?.type ? "text-white" : "text-tradeFadeWhite"
                      }  flex items-center gap-1 bg-tradeAsh px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max`}
                    >
                      <p className="text-[13px] font-semibold">
                        {filter?.type ? filter?.type : "All types"}
                      </p>
                    </div>
                    <div
                      onClick={() =>
                        setSelect({
                          ...select,
                          state: true,
                          selectOne: true,
                          selectTwo: false,
                          element: "transaction status",
                          options: transactionStatus,
                          pick: "",
                          page: "transaction history",
                        })
                      }
                      className={` ${
                        filter?.status ? "text-white" : "text-tradeFadeWhite"
                      } flex items-center gap-1 bg-tradeAsh px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max`}
                    >
                      <p className="text-[13px] font-semibold">
                        {filter?.status ? filter?.status : "All status"}
                      </p>
                    </div>
                  </div>

                  <div
                    onClick={resetFilter}
                    className="flex items-center cursor-pointer gap-1 bg-tradeAsh text-tradeFadeWhite hover:text-tradeOrange px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max"
                  >
                    <p className="md:flex  hidden text-[13px] font-semibold">
                      Clear Filter
                    </p>
                    <IoClose className="md" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[5px] md:gap-0 w-full md:overflow-hidden  md:bg-tradeAsh md:rounded-[15px] md:border border-tradeAshLight">
              {transactions?.data?.map((transaction, index) => (
                <div
                  key={transaction.id || index}
                  className={`${
                    index !== transactions?.data.length - 1
                      ? "md:border-b border-tradeAshLight"
                      : ""
                  }`}
                >
                  <TransactionCard transaction={transaction} />
                </div>
              ))}
            </div>

            <div className="flex gap-[5px] justify-between w-full items-center overflow-x-auto">
              <div className="flex gap-[5px]  transition-all duration-300">
                <div className="flex items-center gap-1 bg-tradeAsh text-tradeFadeWhite  px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                  <p className="text-[13px] font-semibold ">Data</p>
                </div>
                <div className="flex items-center gap-1 bg-tradeAsh text-tradeFadeWhite px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                  <p className="text-[13px] font-semibold">{displayedCount}</p>
                </div>

                <div className="flex items-center gap-1 bg-tradeAsh text-tradeFadeWhite px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                  <p className="text-[13px] font-semibold">of</p>
                </div>

                <div className="flex items-center gap-1 bg-tradeAsh text-tradeFadeWhite px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                  <p className="text-[13px] font-semibold">
                    {" "}
                    {pagination?.totalItems ? pagination?.totalItems : "0"}
                  </p>
                </div>
              </div>

              <div className="flex gap-[5px]">
                <div>
                  {pagination?.hasNextPage ? (
                    <div
                      onClick={handleNext}
                      className="flex gap-[5px] text-tradeFadeWhite hover:text-white cursor-pointer transition-all duration-300"
                    >
                      <div className="flex items-center gap-1 bg-tradeAsh px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                        <p className="text-[13px] font-semibold">
                          {loadingNext ? (
                            <AiOutlineLoading3Quarters className="animate-spin text-[19.5px] text-tradeFadeWhite" />
                          ) : (
                            "Load more"
                          )}
                        </p>
                      </div>
                    </div>
                  ) : (
                    (isEmpty || isEnd) && (
                      <div className="flex items-center gap-1 bg-tradeAsh text-tradeFadeWhite px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                        <p className="text-[13px] font-semibold">{message}</p>
                      </div>
                    )
                  )}
                </div>

                <div
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="flex gap-[5px] text-tradeFadeWhite hover:text-white cursor-pointer transition-all duration-300"
                >
                  <div className="flex items-center gap-1 bg-tradeAsh px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                    <p className="text-[13px] font-semibold">Scroll to Top</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TransactionHistory;
