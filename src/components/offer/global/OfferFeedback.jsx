import React from "react";
import FeedbackCard from "../../cards/FeedbackCard";
import { MdKeyboardArrowDown } from "react-icons/md";

const OfferFeedback = () => {
  return (
    <div className="flex-1 flex flex-col md:border border-neutral-800">
      <div className="flex  items-center justify-between p-[15px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">Feedback on this offer</p>
      </div>

      <div className=" flex flex-row justify-between p-[15px] gap-[10px] border-b border-dashed border-tradeAshLight">
        <div className="flex items-center gap-2 bg-transparent bg-tradeGreen">
          <div className="text-neutral-500  border-neutral-800  hover:text-white flex items-center justify-center gap-[4px] px-[12px] py-[4px] text-sm font-semibold rounded-[7px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
            <p>All</p>
            <span className="text-[11px] font-semibold text-tradeGreen">
              67
            </span>
          </div>
          <div className="text-neutral-500  border-neutral-800  hover:text-white flex items-center justify-center gap-[4px] px-[12px] py-[4px] text-sm font-semibold rounded-[7px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
            <p>Positive</p>
            <span className="text-[11px] font-semibold text-tradeGreen">
              65
            </span>
          </div>
          <div className="text-neutral-500  border-neutral-800  hover:text-white flex items-center justify-center gap-[4px] px-[12px] py-[4px] text-sm font-semibold rounded-[7px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
            <p>Negative</p>
            <span className="text-[11px] font-semibold text-tradeGreen">2</span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-transparent bg-tradeGreen">
          <div className="text-tradeOrange  border-neutral-800  hover:text-tradeOrange/80 cursor-pointer flex items-center justify-center gap-[4px] px-[12px] py-[4px] text-sm font-semibold rounded-[7px] border transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
            <p>See all</p>
          </div>
        </div>
      </div>

      <div className="p-[15px]">
        <div className="w-full px-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
          {[...Array(5)].map((_, index, array) => (
            <div
              key={index}
              className={`${
                index !== array.length - 1
                  ? "border-b border-tradeAshLight"
                  : ""
              }`}
            >
              <FeedbackCard />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfferFeedback;
