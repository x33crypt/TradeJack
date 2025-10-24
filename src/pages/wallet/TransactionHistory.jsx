import Footer from "@/components/others/Footer";
import InAppNav from "@/components/others/InAppNav";
import React, { useRef, useEffect, useState } from "react";
import TransactionCard from "@/components/cards/TransactionCard";
import { useTransaction } from "@/context/userContext/TransactionContext";
import { useSelectElement } from "@/context/otherContext/SelectElementContext";
import { date } from "@/utils/date";
import Loading from "@/components/others/Loading";
import { useFetchAllTransactions } from "@/hooks/userHooks/useFetchAllTransactions";
import SmallButton from "@/components/buttons/SmallButton";
import { RiLoader4Fill } from "react-icons/ri";
import NetworkError from "@/components/others/NetworkError";
import { BiFileBlank } from "react-icons/bi";
import TransactionMenu from "@/components/wallet/TransactionMenu";
import { TbArrowsSort } from "react-icons/tb";
import { LuCalendarClock } from "react-icons/lu";

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

    if (select.element === " status") {
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
        className="md:pt-[70px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex bg-black"
      >
        <div className="flex flex-1 lg:flex-row flex-col gap-[25px] ">
          <TransactionMenu />
          <div className="flex flex-1 flex-col gap-[20px] lg:mr-[12%] p-[15px]">
            <div className="flex items-center justify-between ">
              <p className="text-lg font-semibold text-white flex items-center gap-1">
                TRANSACTION HISTORY
              </p>
            </div>

            <div className="flex lg:hidden items-center gap-2 justify-between">
              <div className="flex items-center gap-2">
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
                  className="flex items-center gap-2 hover:bg-tradeOrange/30 bg-tradeAshLight/50 p-1 text-tradeFadeWhite hover:text-white w-max rounded-sm transition-all duration-300 cursor-pointer"
                >
                  <TbArrowsSort />
                  <p className="text-xs font-bold leading-none  w-max rounded-sm transition-all duration-300 cursor-pointer">
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
                  className="flex items-center gap-2 hover:bg-tradeOrange/30 bg-tradeAshLight/50 p-1 text-tradeFadeWhite hover:text-white w-max rounded-sm transition-all duration-300 cursor-pointer"
                >
                  <TbArrowsSort />
                  <p className="text-xs font-bold leading-none  w-max rounded-sm transition-all duration-300 cursor-pointer">
                    <p>{filter?.status ? filter?.status : " STATUS"}</p>
                  </p>
                </div>
              </div>

              <div className="relative flex items-center gap-2">
                <div
                  onClick={handleDateClick}
                  className="flex items-center gap-2 hover:bg-tradeOrange/30 bg-tradeAshLight/50 p-1 text-tradeFadeWhite hover:text-white w-max rounded-sm transition-all duration-300 cursor-pointer"
                >
                  <LuCalendarClock />
                  <p className="text-xs font-bold leading-none  w-max rounded-sm transition-all duration-300 cursor-pointer">
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

                {/* <div
                  onClick={handleClearFilter}
                  className="flex items-center gap-2 hover:bg-tradeOrange/30 bg-tradeAshLight/50 p-1 text-tradeFadeWhite hover:text-white w-max rounded-sm transition-all duration-300 cursor-pointer"
                >
                  <IoNuclearSharp />
                  <p className="text-xs font-bold leading-none  w-max rounded-sm transition-all duration-300 cursor-pointer">
                    RESET
                  </p>
                </div> */}
              </div>
            </div>

            <div className="flex flex-col flex-1 justify-between gap-[20px]">
              <div className="flex-1 flex flex-col gap-[15px]">
                {loading ? (
                  <Loading />
                ) : (
                  <div className="flex flex-1">
                    {transactions === null ? (
                      <NetworkError />
                    ) : (
                      <div className="flex flex-1">
                        {Array.isArray(transactions?.data) &&
                        transactions?.data?.length > 0 ? (
                          <div className="flex flex-col gap-[5px] w-full h-max">
                            {transactions?.data?.map((transaction, index) => (
                              <div key={index}>
                                <TransactionCard transaction={transaction} />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex-1 flex flex-col items-center justify-center gap-[10px] bg-transparent">
                            <p className="text-[13px] font-semibold text-white leading-none">
                              NO TRANSACTION FOUND
                            </p>
                            <p className="text-xs font-medium text-tradeFadeWhite text-center">
                              {filter?.type ||
                              filter?.status ||
                              filter?.date?.monthName ||
                              (filter?.search && filter.search.trim() !== "")
                                ? "NO TRANSACTION MATCH THE GIVEN CRITERIA"
                                : "NO TRANSACTION FOUND"}
                            </p>

                            <BiFileBlank className="md:text-[22px] text-tradeFadeWhite" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className=" w-full flex items-center pt-[10px]">
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
      </div>
      <Footer />
    </>
  );
};

export default TransactionHistory;
