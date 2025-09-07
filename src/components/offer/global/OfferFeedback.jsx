import React from "react";
import FeedbackCard from "../../cards/Both/FeedbackCard";
import { MdKeyboardArrowDown } from "react-icons/md";
import SmallButton from "@/components/buttons/SmallButton";
import { FaSort } from "react-icons/fa";
import Loading from "@/components/others/Loading";
import NetworkError from "@/components/others/NetworkError";

const OfferFeedback = () => {
  return (
    <div className="flex-1 flex flex-col md:border border-neutral-800">
      <div className="flex  items-center justify-between p-[15px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">Offer Feedback</p>
      </div>

      <div className="flex flex-col flex-1 ">
        <div className="sticky h-[55px] flex items-center w-full md:top-[62px] top-[56px] bg-black py-[12px] px-[15px] border-b border-dashed border-tradeAshLight">
          <div className="custom-x-scrollbar flex justify-between gap-[5px] overflow-x-hidden p-[2px]">
            <div className="flex gap-[5px]">
              <SmallButton variant="fadeout">
                <FaSort />
                <p>Recent</p>
              </SmallButton>
            </div>

            <div className="flex gap-[5px]">
              <SmallButton variant="fadeout">
                <p>Positive</p>
              </SmallButton>
              <SmallButton variant="fadeout">
                <p>Negative</p>
              </SmallButton>
            </div>
          </div>
        </div>

        <div className="flex flex-1 p-[15px] min-h-[120px]">
          <div className="flex flex-1">
            {false ? (
              <Loading />
            ) : (
              <div className="flex flex-1">
                {false ? (
                  <NetworkError />
                ) : (
                  <div className="flex flex-col gap-[10px] w-full h-max">
                    {[...Array(10)].map((_, index, array) => (
                      <div key={index}>
                        <FeedbackCard />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="h-[55px] w-full flex items-center bg-black py-[12px] px-[15px] border-t border-dashed border-tradeAshLight">
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
