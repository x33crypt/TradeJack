import Footer from "@/components/Footer";
import InAppNav from "@/components/InAppNav";
import DasHboardMenu from "@/components/menuBars/DashboardMenu";
import React, { useRef, useEffect, useState } from "react";
import TransactionCard from "@/components/cards/Both/TransactionCard";
import { useTransaction } from "@/context/wallet/TransactionContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { HiMiniCalendarDateRange } from "react-icons/hi2";
import { useSelectElement } from "@/context/SelectElementContext";
import { date } from "@/utils/date";
import Loading from "@/components/Loading";
import Info from "@/components/alerts/Info";
import { LuFileX2 } from "react-icons/lu";
import { useFetchAllTransactions } from "@/hooks/Transaction/useFetchAllTransactions";
import SmallButton from "@/components/buttons/SmallButton";
import { FaSort } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { RiLoader4Fill } from "react-icons/ri";
import NetworkError from "@/components/NetworkError";

const TransactionHistory = () => {
  const topRef = useRef(null);
  const {
    loading,
    refetchAllTransactions,
    pagination,
    page,
    displayedCount,
    next,
  } = useFetchAllTransactions();
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

  useEffect(() => {
    setFilter({
      date: { monthNo: null, monthName: null, year: null },
      type: null,
      status: null,
    });

    refetchAllTransactions();
  }, []);

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

  const isEmpty = transactions?.data?.length === 0 || transactions === null;
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
          <div className="px-[15px] py-[12px] border-b border-dashed border-tradeAshLight">
            <p className="text-xs text-tradeFadeWhite font-medium leading-relaxed">
              View, manage, and monitor every offer you’ve created, complete
              with real-time status updates and key trade details to keep you in
              control.
            </p>
          </div>
          <div className="flex flex-col flex-1 ">
            <div className="sticky h-[55px] flex items-center w-full md:top-[62px] top-[56px] bg-black py-[12px] px-[15px] border-b border-dashed border-tradeAshLight">
              <div className="custom-x-scrollbar flex justify-between gap-[5px] overflow-x-hidden p-[2px]">
                <div className="flex gap-[5px]">
                  <SmallButton
                    variant="fadeout"
                    disabled={filter?.status !== null}
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
                  >
                    <FaSort />
                    <p>{filter?.status ? filter?.status : "All Status"}</p>
                  </SmallButton>
                  <SmallButton
                    variant="fadeout"
                    disabled={filter?.type !== null}
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
                  >
                    <FaSort />
                    <p>{filter?.type ? filter?.type : "All Types"}</p>
                  </SmallButton>
                </div>

                <div className="flex gap-[5px]">
                  <SmallButton variant="fadeout">
                    <FaMagnifyingGlass />
                  </SmallButton>
                  <SmallButton
                    variant="fadeout"
                    disabled={filter.date?.monthName || filter.date?.year}
                    onClick={handleDateClick}
                  >
                    <FaRegCalendarAlt />
                    <p>
                      {filter.date?.monthName
                        ? filter.date?.monthName
                        : "Month"}
                      , {filter.date?.year ? filter.date?.year : "Year"}
                    </p>
                  </SmallButton>
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

            <div className="flex flex-1 p-[15px] ">
              {loading ? (
                <Loading />
              ) : (
                <div className="flex flex-1">
                  {transactions === null ? (
                    <NetworkError />
                  ) : (
                    <div className="flex flex-1">
                      {Array.isArray(transactions?.data) &&
                      transactions?.data.length > 0 ? (
                        <div className="flex flex-col gap-[5px] w-full">
                          {transactions?.data?.map((transaction, index) => (
                            <div key={transaction.id || index}>
                              <TransactionCard transaction={transaction} />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex-1 min-h-[150px] flex flex-col gap-[15px] items-center justify-center">
                          <div className=" flex justify-center items-center text-[55px] text-tradeAshLight">
                            <LuFileX2 />
                          </div>

                          <p className="text-lg font-semibold text-white leading-none">
                            No Transaction Record Found
                          </p>

                          <p className="text-xs text-center w-[300px] font-medium text-tradeFadeWhite">
                            You haven’t made any transactions yet. When you do,
                            your recent deposits activity will be shown here for
                            easy tracking.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="md:sticky bottom-0 left-0 right-0 h-[55px] w-full flex items-center bg-black py-[12px] px-[15px] border-t border-dashed border-tradeAshLight">
              <div className="custom-x-scrollbar flex justify-between gap-[5px]  overflow-x-auto p-[2px]">
                <div className="flex gap-[5px] transition-all duration-300 py-[1px]">
                  <SmallButton variant="outline">
                    <p>{displayedCount}</p>
                  </SmallButton>
                  <SmallButton variant="outline">
                    <p>of</p>
                  </SmallButton>
                  <SmallButton variant="outline">
                    <p>
                      {pagination?.totalItems ? pagination?.totalItems : "0"}
                    </p>
                  </SmallButton>
                </div>

                <div className="flex gap-[5px] py-[1px]">
                  <SmallButton variant="outline">
                    {pagination?.hasNextPage ? (
                      <div onClick={handleNext}>
                        {loadingNext ? (
                          <RiLoader4Fill className="animate-spin text-[19.5px] text-tradeFadeWhite" />
                        ) : (
                          <p>Load more</p>
                        )}
                      </div>
                    ) : (
                      <div>{(isEmpty || isEnd) && <p>{message}</p>}</div>
                    )}
                  </SmallButton>

                  <SmallButton
                    variant="outline"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    <p>Scroll to Top</p>
                  </SmallButton>
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
