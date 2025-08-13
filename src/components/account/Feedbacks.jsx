import React from "react";
import { HiMiniCalendarDateRange } from "react-icons/hi2";
import FeedbackCard from "../cards/Both/FeedbackCard";
import { useFetchProfile } from "@/hooks/useFetchProfile";
import { useProfile } from "@/context/ProfileContext";
import { useAccount } from "@/context/AccountContext";
import Loading from "@/components/Loading";
import NetworkError from "@/components/NetworkError";
import { RiLoader4Fill } from "react-icons/ri";

const Feedbacks = () => {
  const { loading, error } = useFetchProfile();
  const { profile, setProfile } = useProfile();
  const { account, setAccount } = useAccount();
  const { view } = account;

  return (
    <div className="flex-1 flex flex-col md:border border-neutral-800">
      <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">Feedbacks</p>
      </div>
      <div className="flex flex-1 min-h-[120px]">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-1">
            {profile === null ? (
              <NetworkError />
            ) : (
              <div className="flex flex-col flex-1 ">
                <div className="sticky md:top-[62px] top-[56px] bg-black py-[12px] px-[15px] border-b border-dashed border-tradeAshLight">
                  <div className="custom-x-scrollbar flex justify-between items-center gap-[5px] overflow-x-hidden ">
                    <div className="flex items-cente gap-[5px] bg-transparent flex-shrink-0 py-[1px] px-[2px]">
                      <div
                        className={`${
                          false
                            ? "text-white bg-tradeAsh border-tradeGreen"
                            : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
                        } flex items-center gap-1  w-max px-[12px] py-[4px] text-[13px] font-semibold rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                      >
                        <p>Negative</p>
                      </div>
                      <div
                        className={`${
                          false
                            ? "text-white bg-tradeAsh border-tradeGreen"
                            : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
                        } flex items-center gap-1  w-max px-[12px] py-[4px] text-[13px] font-semibold rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                      >
                        <p>Positive</p>
                      </div>
                    </div>

                    <div className="flex items-cente gap-[5px] bg-transparent flex-shrink-0 py-[1px] px-[2px]">
                      <div className="flex gap-[5px] bg-transparent">
                        <div
                          className={`${
                            false
                              ? "text-white bg-tradeAsh border-tradeGreen"
                              : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
                          } flex items-center gap-1  w-max px-[12px] py-[4px] text-[13px] font-semibold rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                        >
                          <p>Month</p>
                        </div>
                        <div
                          className={`${
                            false
                              ? "text-white bg-tradeAsh border-tradeGreen"
                              : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
                          } flex items-center gap-1  w-max px-[12px] py-[4px] text-[13px] font-semibold rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                        >
                          <p>Year</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 p-[15px] min-h-[120px]">
                  <div className="flex flex-col gap-[5px] w-full h-max">
                    {[...Array(10)].map((_, index, array) => (
                      <div key={index}>
                        <FeedbackCard />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="custom-x-scrollbar flex py-[12px] px-[15px] gap-[5px] justify-between w-full items-center overflow-x-auto border-t border-dashed border-tradeAshLight">
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
                    <div>
                      {true ? (
                        <div
                          // onClick={handleNext}
                          className="flex gap-[5px] text-tradeFadeWhite hover:text-white cursor-pointer transition-all duration-300"
                        >
                          <div className="flex items-center gap-1 text-tradeFadeWhite  px-[8px] py-[4px] font-medium rounded-[6.5px] border border-tradeAshExtraLight w-max">
                            <p className="text-[13px] font-semibold">
                              {true ? (
                                <RiLoader4Fill className="animate-spin text-[19.5px] text-tradeFadeWhite" />
                              ) : (
                                "Load more"
                              )}
                            </p>
                          </div>
                        </div>
                      ) : (
                        (isEmpty || isEnd) && (
                          <div className="flex items-center gap-1 text-tradeFadeWhite  px-[8px] py-[4px] font-medium rounded-[6.5px] border border-tradeAshExtraLight w-max">
                            <p className="text-[13px] font-semibold">
                              {message}
                            </p>
                          </div>
                        )
                      )}
                    </div>

                    <div
                      // onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                      className="flex gap-[5px] text-tradeFadeWhite hover:text-white cursor-pointer transition-all duration-300"
                    >
                      <div className="flex items-center gap-1 text-tradeFadeWhite  px-[8px] py-[4px] font-medium rounded-[6.5px] border border-tradeAshExtraLight w-max">
                        <p className="text-[13px] font-semibold">
                          Scroll to Top
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedbacks;
