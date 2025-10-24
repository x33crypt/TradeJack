import React from "react";
import FeedbackCard from "../../cards/FeedbackCard";
import SmallButton from "@/components/buttons/SmallButton";
import Loading from "@/components/others/Loading";
import NetworkError from "@/components/others/NetworkError";
import { TbArrowsSort } from "react-icons/tb";

const OfferFeedback = () => {
  return (
    <div className="flex flex-1 flex-col gap-[20px]">
      <div className="flex  items-center justify-between ">
        <p className="text-sm font-semibold text-white flex items-center gap-1">
          FEEDBACKS
        </p>
      </div>

      <div className="flex flex-col flex-1 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 hover:bg-tradeOrange/30 bg-tradeAshLight/50 p-1 text-tradeFadeWhite hover:text-white w-max rounded-sm transition-all duration-300 cursor-pointer">
            <TbArrowsSort />
            <p className="text-xs font-bold leading-none  w-max rounded-sm transition-all duration-300 cursor-pointer">
              RECENT
            </p>
          </div>

          <div className="flex items-center gap-2">
            <p className="text-xs font-bold text-tradeFadeWhite hover:text-white leading-none p-1 hover:bg-tradeOrange/30 bg-tradeAshLight/50 w-max rounded-sm transition-all duration-300 cursor-pointer">
              ALL
            </p>

            <p className="text-xs font-bold text-tradeFadeWhite hover:text-white leading-none p-1 hover:bg-tradeOrange/30 bg-tradeAshLight/50 w-max rounded-sm transition-all duration-300 cursor-pointer">
              POSITIVE
            </p>

            <p className="text-xs font-bold text-tradeFadeWhite hover:text-white leading-none p-1 hover:bg-tradeOrange/30 bg-tradeAshLight/50 w-max rounded-sm transition-all duration-300 cursor-pointer">
              NEGATIVE
            </p>
          </div>
        </div>

        <div className="flex flex-1 p-[15px] min-h-[120px]">
          <div className="flex flex-1">
            {false ? (
              <Loading />
            ) : (
              <div className="flex flex-1">
                {true ? (
                  <NetworkError />
                ) : (
                  <div className="flex flex-1">
                    {false && false ? (
                      <div className="flex flex-col gap-[10px] w-full h-max">
                        {[...Array(5)].map((_, index, array) => (
                          <div key={index}>
                            <FeedbackCard />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex-1 min-h-[150px] flex flex-col gap-[10px] items-center justify-center">
                        <p className="text-[13px] font-semibold text-white leading-none">
                          NO FEEDBACK FOUND
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className=" w-full flex items-center pt-[10px]">
          <div className="custom-x-scrollbar flex justify-between gap-[5px]  overflow-x-auto p-[2px]">
            <div className="flex gap-[5px] transition-all duration-300 py-[1px]">
              <SmallButton variant="outline">
                <p>0</p>
              </SmallButton>
              <SmallButton variant="outline">
                <p>of</p>
              </SmallButton>
              <SmallButton variant="outline">
                <p>0</p>
              </SmallButton>
            </div>

            <div className="flex gap-[5px] py-[1px]">
              <SmallButton variant="outline">
                {true ? (
                  <div>
                    {false ? (
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
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <p>Scroll to Top</p>
              </SmallButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferFeedback;
