import React from "react";
import FeedbackCard from "../cards/Both/FeedbackCard";
import Loading from "@/components/others/Loading";
import NetworkError from "@/components/others/NetworkError";
import { RiLoader4Fill } from "react-icons/ri";
import { FaSort } from "react-icons/fa";
import SmallButton from "../buttons/SmallButton";

const Feedbacks = ({
  loading,
  feedback,
  heading,
  loadingMore,
  pagination,
  displayedCount,
  nextPage,
}) => {
  const getSectionStatus = (section) => {
    const isEmpty = !section?.data || section.data.length === 0;
    const isEnd =
      !isEmpty &&
      section?.pagination &&
      (!section.pagination.hasNextPage ||
        section.data.length >= (section.pagination.totalItems || 0));

    let message = null;
    if (isEmpty) {
      message = "No activity yet";
    } else if (isEnd) {
      message = "End of list";
    }

    return {
      isEmpty, // true if no data
      isEnd, // true if reached end of pagination
      message, // null if neither, avoids React "object as child" error
    };
  };

  const feedbackStatus = getSectionStatus(feedback?.data);

  return (
    <div className="flex-1 flex flex-col md:border border-neutral-800">
      <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">
          {heading ?? "Feedback"}
        </p>
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
            {loading ? (
              <Loading />
            ) : (
              <div className="flex flex-1">
                {feedback?.data === null ? (
                  <NetworkError />
                ) : (
                  <div className="flex flex-1">
                    {Array.isArray(feedback?.data) &&
                    feedback?.data?.length > 0 ? (
                      <div className="flex flex-col gap-[10px] w-full h-max">
                        {feedback?.data?.map((feed, index) => (
                          <div key={feed.id || index}>
                            <FeedbackCard offer={feed} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex-1 min-h-[150px] flex flex-col gap-[10px] items-center justify-center">
                        <p className="text-[13px] font-semibold text-white leading-none">
                          No Feedbacks Found
                        </p>

                        <p className="text-xs text-center w-[300px] font-medium text-tradeFadeWhite">
                          Start trading to collect feedback from other users.
                        </p>
                      </div>
                    )}
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
                <p>{displayedCount}</p>
              </SmallButton>
              <SmallButton variant="outline">
                <p>of</p>
              </SmallButton>
              <SmallButton variant="outline">
                <p>{pagination?.totalItems ? pagination?.totalItems : "0"}</p>
              </SmallButton>
            </div>

            <div className="flex gap-[5px] py-[1px]">
              <SmallButton variant="outline">
                {pagination?.hasNextPage ? (
                  <div onClick={nextPage}>
                    {loadingMore ? (
                      <RiLoader4Fill className="animate-spin text-[19.5px] text-tradeFadeWhite" />
                    ) : (
                      <p>Load more</p>
                    )}
                  </div>
                ) : (
                  <div>
                    <p>{feedbackStatus?.message}</p>
                  </div>
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
