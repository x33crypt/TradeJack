import Footer from "@/components/others/Footer";
import InAppNav from "@/components/others/InAppNav";
import React, { useRef, useEffect, useState, useMemo } from "react";
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
import { groupByDate } from "@/utils/groupByDate";
import MiniButton from "@/components/buttons/MiniButton";

const TransactionHistory = () => {
  const topRef = useRef(null);
  const {
    pagination,
    page,
    displayedCount,
    loading, // loading for load more
    initialLoading, // only on mount
    next,
    refetchAllTransactions,
  } = useFetchAllTransactions();
  const { transactions, filter, setFilter } = useTransaction();
  const [triggerScroll, setTriggerScroll] = useState(false);
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

  const reset = () => {
    setFilter({
      date: { monthNo: null, monthName: null, year: null },
      type: null,
      status: null,
    });

    refetchAllTransactions();
  };

  useEffect(() => {
    reset();
  }, []);

  const transactionStatus = ["Pending", "Failed", "Successful"];

  const transactionTypes = ["Transfer", "Deposit", "Withdraw"];

  // handling transaction type change
  useEffect(() => {
    if (select?.page !== "transaction history" || !select?.pick) return;

    if (select.element === "type") {
      console.log("Transaction type selected:", select.pick);
      const selectedType = select.pick;

      setFilter((prev) => ({
        ...prev,
        type: selectedType,
      }));
    }

    setSelect({
      ...select,
      state: false,
      selectOne: false,
      selectTwo: false,
      page: "",
      element: "",
      options: null,
      pick: "",
    });
  }, [select]);

  // handling transaction status change
  useEffect(() => {
    if (select?.page !== "transaction history" || !select?.pick) return;

    if (select.element === "status") {
      const selectedStatus = select.pick;

      console.log(selectedStatus);

      setFilter((prev) => ({
        ...prev,
        status: selectedStatus,
      }));
    }

    setSelect({
      ...select,
      state: false,
      selectOne: false,
      selectTwo: false,
      page: "",
      element: "",
      options: null,
      pick: "",
    });
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
    await next();
  };

  const isEmpty = transactions?.data?.length === 0 || transactions === null;
  const isEnd = pagination && !pagination.hasNextPage && !isEmpty;
  const message = isEmpty ? "No activity yet" : isEnd ? "End of list" : "";

  const grouped = groupByDate(transactions?.data, "createdAt");

  return (
    <>
      <InAppNav />

      <div
        ref={topRef}
        className="md:pt-[70px] pt-[57px] lg:px-[2%] md:px-[10px] min-h-svh flex bg-black"
      >
        <div className="flex flex-1 lg:flex-row flex-col gap-[25px] ">
          {/* <TransactionMenu /> */}
          <div className="flex flex-1 flex-col gap-[30px] lg:mx-[22.8%] p-[15px]">
            <div className="flex items-center justify-between ">
              <p className="text-lg font-semibold text-white flex items-center gap-1">
                TRANSACTION HISTORY
              </p>
            </div>

            <div className="flex items-center gap-2 justify-between">
              <div className="flex items-center gap-2">
                <MiniButton
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
                  active={filter?.status != null}
                >
                  <p>
                    {filter?.status ? filter?.status?.toUpperCase() : " STATUS"}
                  </p>
                </MiniButton>

                <MiniButton
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
                  active={filter?.type != null}
                >
                  <p>{filter?.type ? filter.type.toUpperCase() : "TYPE"}</p>
                </MiniButton>
              </div>

              <div className="relative flex items-center gap-2">
                <MiniButton
                  onClick={handleDateClick}
                  active={filter?.date?.year != null}
                >
                  {filter.date?.monthName
                    ? filter.date?.monthName.toUpperCase()
                    : "MONTH"}
                  , {filter.date?.year ? filter.date?.year : "YEAR"}
                </MiniButton>

                <input
                  type="month"
                  min={min}
                  max={max}
                  onChange={handleDateChange}
                  ref={inputRef}
                  className="absolute opacity-0 w-0 h-0 pointer-events-none"
                />

                <MiniButton onClick={reset}>RESET</MiniButton>
              </div>
            </div>

            <div className="flex flex-col flex-1 justify-between gap-[20px]">
              <div className="flex-1 flex flex-col gap-[15px]">
                {initialLoading ? (
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
                            {grouped.map((group) => (
                              <div
                                key={group.dateKey}
                                className="bg-tradeDark rounded-lg pb-[20px]"
                              >
                                <div className="">
                                  <p className="text-xs text-tradeFadeWhite/80 font-semibold mb-2">
                                    {group.label}
                                  </p>
                                </div>

                                <div className="flex flex-col gap-[10px]">
                                  {group.items.map((transaction) => (
                                    <TransactionCard
                                      transaction={transaction}
                                    />
                                  ))}
                                </div>
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
                          {loading ? (
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
