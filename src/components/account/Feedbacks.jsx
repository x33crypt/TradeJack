import React from "react";
import { HiMiniCalendarDateRange } from "react-icons/hi2";
import FeedbackCard from "../cards/Both/FeedbackCard";
import { useFetchProfile } from "@/hooks/useFetchProfile";
import { useProfile } from "@/context/ProfileContext";
import { useAccount } from "@/context/AccountContext";
import Loading from "@/components/Loading";
import NetworkError from "@/components/NetworkError";
import { RiLoader4Fill } from "react-icons/ri";
import { FaSort } from "react-icons/fa";
import SmallButton from "../buttons/SmallButton";
import { FaRegCalendarAlt } from "react-icons/fa";

const Feedbacks = ({ loading, profile }) => {
  return (
    <div className="flex-1 flex flex-col md:border border-neutral-800">
      <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">Feedbacks</p>
      </div>

      <div className="flex flex-col flex-1 ">
        <div className="sticky h-[55px] flex items-center w-full md:top-[62px] top-[56px] bg-black py-[12px] px-[15px] border-b border-dashed border-tradeAshLight">
          <div className="custom-x-scrollbar flex justify-between gap-[5px] overflow-x-hidden p-[2px]">
            <div className="flex gap-[5px]">
              <SmallButton variant="fadeout">
                <FaSort />
                <p>All</p>
              </SmallButton>
            </div>

            <div className="flex gap-[5px]">
              <SmallButton variant="fadeout">
                <FaRegCalendarAlt />
                <p>Month, Year</p>
              </SmallButton>
            </div>
          </div>
        </div>

        <div className="flex flex-1 p-[15px] min-h-[120px]">
          <div className="flex flex-1">
            {loading ? (
              <Loading />
            ) : (
              <div className="flex flex-1">
                {profile === null ? (
                  <NetworkError />
                ) : (
                  <div className="flex flex-col gap-[5px] w-full h-max">
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

        <div className="md:sticky bottom-0 left-0 right-0 h-[55px] w-full flex items-center bg-black py-[12px] px-[15px] border-t border-dashed border-tradeAshLight">
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

export default Feedbacks;
