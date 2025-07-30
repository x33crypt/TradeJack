import Footer from "@/components/Footer";
import InAppNav from "@/components/InAppNav";
import DasHboardMenu from "@/components/menuBars/DashboardMenu";
import React, { useRef, useEffect, useState } from "react";
import TransactionCard from "@/components/cards/Both/TransactionCard";
import { useTransaction } from "@/context/wallet/TransactionContext";
import { useFetchTransactions } from "@/hooks/useFetchTransactions";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { HiMiniCalendarDateRange } from "react-icons/hi2";
import { useSelectElement } from "@/context/SelectElementContext";
import { date } from "@/utils/date";
import Loading from "@/components/Loading";
import Info from "@/components/alerts/Info";
import { useLocation } from "react-router-dom";
import { LuFileX2 } from "react-icons/lu";

const TransactionHistory = () => {
  const topRef = useRef(null);
  const {
    loading,
    refetchTransactions,
    pagination,
    page,
    displayedCount,
    next,
  } = useFetchTransactions();
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

  useEffect(() => {
    setFilter({
      date: { monthNo: null, monthName: null, year: null },
      type: null,
      status: null,
    });

    refetchTransactions();
  }, []);

  console.log("recent transactions", transactions);

  const transactionStatus = [
    "All status",
    "Pending",
    "Failed",
    "Successful",
    "Processing",
  ];

  const transactionTypes = ["All types", "Transfer", "Deposit", "Withdraw"];

  // handling transaction type change
  useEffect(() => {
    if (select?.page !== "transaction history" || !select?.pick) return;

    if (select.element === "transaction type") {
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

    if (select.element === "transaction status") {
      const selectedStatus = select.pick === "All status" ? null : select.pick;

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
        className="md:pt-[64px] pt-[57px] lg:px-[2%] md:px-[2.5%]  min-h-svh flex gap-[5px] bg-black "
      >
        <DasHboardMenu />
        <div className="flex-1 flex flex-col md:border border-neutral-800">
          <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
            <p className="text-lg font-[700] text-white ">
              Transaction History
            </p>
          </div>
          <div className="flex flex-col flex-1 ">
            <div className="sticky md:top-[65px] top-[57px] bg-black py-[12px] px-[15px] border-b border-dashed border-tradeAshLight">
              <div className="custom-x-scrollbar flex justify-between items-center gap-[10px] ">
                <div className="flex items-cente gap-[5px] bg-transparent flex-shrink-0 py-[1px] px-[2px]">
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
                    className={`${
                      filter?.type
                        ? "text-white bg-tradeAsh border-tradeGreen"
                        : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
                    } inline-block w-max px-[12px] py-[4px] text-[13px] font-medium rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                  >
                    <p>{filter?.type ? filter?.type : "All types"}</p>
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
                    className={`${
                      filter?.status
                        ? "text-white bg-tradeAsh border-tradeGreen"
                        : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
                    } inline-block w-max px-[12px] py-[4px] text-[13px] font-medium rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                  >
                    <p>{filter?.status ? filter?.status : "All status"}</p>
                  </div>
                </div>

                <div className="flex items-cente gap-[5px] bg-transparent flex-shrink-0 py-[1px] px-[2px]">
                  <div className="md:flex hidden text-black items-center gap-1 bg-tradeOrange px-[10px] py-[4px] text-sm font-medium rounded-[6.5px] w-max">
                    <HiMiniCalendarDateRange />
                  </div>
                  <div
                    onClick={handleDateClick}
                    className="flex gap-[5px] transition-all duration-300 hover:text-white"
                  >
                    <div
                      className={`${
                        filter.date?.monthName
                          ? "text-white bg-tradeAsh border-tradeGreen"
                          : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
                      } inline-block w-max px-[12px] py-[4px] text-[13px] font-medium rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                    >
                      <p>
                        {filter.date?.monthName
                          ? filter.date?.monthName
                          : "Month"}
                      </p>
                    </div>
                    <div
                      className={`${
                        filter.date?.year
                          ? "text-white bg-tradeAsh border-tradeGreen"
                          : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
                      } inline-block w-max px-[12px] py-[4px] text-[13px] font-medium rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                    >
                      <p>{filter.date?.year ? filter.date?.year : "Year"}</p>
                    </div>
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
            </div>

            <div className="flex flex-1 p-[15px]">
              {loading && Array.isArray(transactions?.data).length < 0 ? (
                <Loading />
              ) : (
                <div className="flex flex-1">
                  {transactions === null ? (
                    <div className="flex-1 flex items-center justify-center ">
                      <div className="">
                        <Info text="Unable to load your transactions history. Please check your internet connection or refresh the page to try again." />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-1">
                      {Array.isArray(transactions?.data) &&
                      transactions?.data.length > 0 ? (
                        <div className="flex flex-col gap-[5px] md:gap-0 w-full h-max md:overflow-hidden md:bg-tradeAsh md:rounded-[15px] md:border border-tradeAshLight">
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
                      ) : (
                        <div className="flex-1 flex flex-col">
                          <div>
                            <p className="text-xs font-medium text-tradeFadeWhite">
                              You haven’t made any transactions yet. When you
                              do, your recent deposits activity will be shown
                              here for easy tracking.
                            </p>
                          </div>
                          <div className="flex-1 flex justify-center items-center text-[55px] text-tradeGreen">
                            <LuFileX2 />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="custom-x-scrollbar flex p-[15px] h-max gap-[5px] justify-between w-full items-center overflow-x-auto border-t border-dashed border-tradeAshLight">
              <div className="flex gap-[5px] transition-all duration-300 py-[1px]">
                <div className="md:flex hidden items-center gap-1 text-tradeFadeWhite  px-[12px] py-[4px] font-medium rounded-[6.5px] border border-tradeAshExtraLight w-max">
                  <p className="text-[13px] font-semibold ">Data</p>
                </div>
                <div className="flex items-center gap-1 text-tradeFadeWhite  px-[12px] py-[4px] font-medium rounded-[6.5px] border border-tradeAshExtraLight w-max">
                  <p className="text-[13px] font-semibold">{displayedCount}</p>
                </div>

                <div className="flex items-center gap-1 text-tradeFadeWhite  px-[12px] py-[4px] font-medium rounded-[6.5px] border border-tradeAshExtraLight w-max">
                  <p className="text-[13px] font-semibold">of</p>
                </div>

                <div className="flex items-center gap-1 text-tradeFadeWhite  px-[12px] py-[4px] font-medium rounded-[6.5px] border border-tradeAshExtraLight w-max">
                  <p className="text-[13px] font-semibold">
                    {pagination?.totalItems ? pagination?.totalItems : "0"}
                  </p>
                </div>
              </div>

              <div className="flex gap-[5px] py-[1px]">
                <div>
                  {pagination?.hasNextPage ? (
                    <div
                      onClick={handleNext}
                      className="flex gap-[5px] text-tradeFadeWhite hover:text-white cursor-pointer transition-all duration-300"
                    >
                      <div className="flex items-center gap-1 text-tradeFadeWhite  px-[12px] py-[4px] font-medium rounded-[6.5px] border border-tradeAshExtraLight w-max">
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
                      <div className="flex items-center gap-1 text-tradeFadeWhite  px-[12px] py-[4px] font-medium rounded-[6.5px] border border-tradeAshExtraLight w-max">
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
                  <div className="flex items-center gap-1 text-tradeFadeWhite  px-[12px] py-[4px] font-medium rounded-[6.5px] border border-tradeAshExtraLight w-max">
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
