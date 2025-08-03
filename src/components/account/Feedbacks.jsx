import React from "react";
import { HiMiniCalendarDateRange } from "react-icons/hi2";
import FeedbackCard from "../cards/Both/FeedbackCard";

const Feedbacks = () => {
  return (
    <div className="flex-1 flex flex-col md:border- border-neutral-800">
      <div className="flex flex-col flex-1 ">
        <div className="bg-black pb-[12px] px-[15px border-b border-dashed border-tradeAshLight">
          <div className="custom-x-scrollbar flex justify-between items-center gap-[10px] ">
            <div className="flex items-cente gap-[5px] bg-transparent flex-shrink-0 py-[1px] px-[2px]">
              <div
                // onClick={() =>
                //   setSelect({
                //     ...select,
                //     state: true,
                //     selectOne: true,
                //     selectTwo: false,
                //     element: "transaction type",
                //     options: transactionTypes,
                //     pick: "",
                //     page: "transaction history",
                //   })
                // }
                className={`${
                  false
                    ? "text-white bg-tradeAsh border-tradeGreen"
                    : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
                } inline-block w-max px-[12px] py-[4px] text-[13px] font-medium rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
              >
                <p>All</p>
              </div>
              <div
                // onClick={() =>
                //   setSelect({
                //     ...select,
                //     state: true,
                //     selectOne: true,
                //     selectTwo: false,
                //     element: "transaction status",
                //     options: transactionStatus,
                //     pick: "",
                //     page: "transaction history",
                //   })
                // }
                className={`${
                  false
                    ? "text-white bg-tradeAsh border-tradeGreen"
                    : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
                } inline-block w-max px-[12px] py-[4px] text-[13px] font-medium rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
              >
                <p>Positive</p>
              </div>
              <div
                // onClick={() =>
                //   setSelect({
                //     ...select,
                //     state: true,
                //     selectOne: true,
                //     selectTwo: false,
                //     element: "transaction status",
                //     options: transactionStatus,
                //     pick: "",
                //     page: "transaction history",
                //   })
                // }
                className={`${
                  false
                    ? "text-white bg-tradeAsh border-tradeGreen"
                    : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
                } inline-block w-max px-[12px] py-[4px] text-[13px] font-medium rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
              >
                <p>Negative</p>
              </div>
            </div>

            <div className="flex items-cente gap-[5px] bg-transparent flex-shrink-0 py-[1px] px-[2px]">
              <div className="md:flex hidden text-black items-center gap-1 bg-tradeOrange px-[10px] py-[4px] text-sm font-medium rounded-[6.5px] w-max">
                <HiMiniCalendarDateRange />
              </div>
              <div
                // onClick={handleDateClick}
                className="flex gap-[5px] transition-all duration-300 hover:text-white"
              >
                <div
                  className={`${
                    false
                      ? "text-white bg-tradeAsh border-tradeGreen"
                      : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
                  } inline-block w-max px-[12px] py-[4px] text-[13px] font-medium rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                >
                  <p>{"Month"}</p>
                </div>
                <div
                  className={`${
                    false
                      ? "text-white bg-tradeAsh border-tradeGreen"
                      : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
                  } inline-block w-max px-[12px] py-[4px] text-[13px] font-medium rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                >
                  <p>{"Year"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-1 py-[15px]">
          <div className="flex flex-col gap-[5px] md:gap-0 w-full md:overflow-hidden md:bg-tradeAsh md:rounded-[15px] md:border border-tradeAshLight">
            {[...Array(10)].map((_, index, array) => (
              <div
                key={index}
                className={`${
                  index !== array.length - 1
                    ? "md:border-b border-tradeAshLight"
                    : ""
                }`}
              >
                <FeedbackCard />
              </div>
            ))}
          </div>
        </div>

        <div className="custom-x-scrollbar flex pt-[12px] h-max gap-[5px] justify-between w-full items-center overflow-x-auto border-t border-dashed border-tradeAshLight">
          <div className="flex gap-[5px] transition-all duration-300 py-[1px]">
            <div className="md:flex hidden items-center gap-1 text-tradeFadeWhite  px-[12px] py-[4px] font-medium rounded-[6.5px] border border-tradeAshExtraLight w-max">
              <p className="text-[13px] font-semibold ">Data</p>
            </div>
            <div className="flex items-center gap-1 text-tradeFadeWhite  px-[12px] py-[4px] font-medium rounded-[6.5px] border border-tradeAshExtraLight w-max">
              <p className="text-[13px] font-semibold">12</p>
            </div>

            <div className="flex items-center gap-1 text-tradeFadeWhite  px-[12px] py-[4px] font-medium rounded-[6.5px] border border-tradeAshExtraLight w-max">
              <p className="text-[13px] font-semibold">of</p>
            </div>

            <div className="flex items-center gap-1 text-tradeFadeWhite  px-[12px] py-[4px] font-medium rounded-[6.5px] border border-tradeAshExtraLight w-max">
              <p className="text-[13px] font-semibold">200</p>
            </div>
          </div>

          <div className="flex gap-[5px] py-[1px]">
            {/* <div>
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
              </div> */}

            <div
              // onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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
  );
};

export default Feedbacks;
