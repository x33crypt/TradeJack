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

const TransactionHistory = () => {
  const topRef = useRef(null); // this will help us scroll here
  const { loading, error, pagination, page, displayedCount, next } =
    useFetchTransactions(); // defaults: page 1, limit 10
  const { transactions } = useTransaction();
  const [triggerScroll, setTriggerScroll] = useState(false);
  const [loadingNext, setLoadingNext] = useState(false);

  console.log("line 13", transactions);

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

  return (
    <>
      <InAppNav />
      <div
        ref={topRef}
        className="md:pt-[64px] pt-[60px] lg:px-[2%] md:px-[2.5%]  min-h-svh flex gap-[10px] bg-black "
      >
        <DasHboardMenu />
        <div className="flex-1 flex flex-col h-[100%] md:border border-neutral-800">
          <div className="flex  items-center justify-between p-[15px] border-b border-tradeAshLight">
            <p className="text-lg font-[700] text-white ">
              Transaction History
            </p>
          </div>
          <div className="flex flex-col p-[15px] gap-[10px]">
            <div className="flex lg:flex-row flex-col w-full gap-[10px]">
              <div className="flex-1 flex flex-col p-[12px] gap-[10px] bg-tradeAsh border border-tradeAshLight rounded-[15px]">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-transparent px-[4px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max cursor-pointer">
                    <CiWallet className=" text-tradeOrange" />
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

            <div className="sticky md:top-[65px] top-[60px] mt-[30px] bg-black flex justify-between items-center w-full py-[12px] border-b border-dashed border-tradeAshLight">
              <div className="flex gap-[5px] text-tradeFadeWhite hover:text-white cursor-pointer transition-all duration-300">
                <div className="flex items-center gap-1 bg-tradeAsh px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                  <TiArrowSortedDown />
                </div>
                <div className="flex items-center gap-1 bg-tradeAsh px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                  <p className="text-[13px] font-semibold">July</p>
                </div>

                <div className="flex items-center gap-1 bg-tradeAsh px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                  <p className="text-[13px] font-semibold">2025</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="md:hidden flex gap-[5px] text-tradeFadeWhite hover:text-white cursor-pointer transition-all duration-300">
                  <div className="flex items-center gap-1 bg-tradeAsh px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                    <IoFilter />
                  </div>
                  <div className="flex items-center gap-1 bg-tradeAsh px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                    <p className="text-[13px] font-semibold">Filter</p>
                  </div>
                </div>

                <div className="md:flex hidden gap-[5px] text-tradeFadeWhite hover:text-white cursor-pointer transition-all duration-300">
                  <div className="flex items-center gap-1 bg-tradeAsh px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                    <TiArrowSortedDown />
                  </div>
                  <div className="flex items-center gap-1 bg-tradeAsh px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                    <p className="text-[13px] font-semibold">All types</p>
                  </div>
                </div>

                <div className="md:flex hidden gap-[5px] text-tradeFadeWhite hover:text-white cursor-pointer transition-all duration-300">
                  <div className="flex items-center gap-1 bg-tradeAsh px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                    <TiArrowSortedDown />
                  </div>
                  <div className="flex items-center gap-1 bg-tradeAsh px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                    <p className="text-[13px] font-semibold">All status</p>
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

            <div className="flex gap-4 justify-between items-center w-full py-[12px]">
              <div className="flex gap-[5px]">
                <p className="text-[13px] text-tradeFadeWhite">Show data</p>
                <p className="text-[13px] text-white font-semibold">
                  {displayedCount} {""}
                  <span className="text-tradeFadeWhite">of</span>{" "}
                  {pagination?.totalItems ? pagination?.totalItems : "0"}
                </p>
              </div>

              <div className="flex gap-2">
                <div>
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
