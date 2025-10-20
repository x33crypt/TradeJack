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
    <div className="flex flex-1 flex-col gap-[20px]">
      <div className="flex  items-center justify-between ">
        <p className="text-sm font-semibold text-white flex items-center gap-1">
          FEEDBACKS
        </p>
      </div>

      <div className="flex flex-col flex-1 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-xs font-bold text-tradeFadeWhite hover:text-white leading-none p-1 hover:bg-tradeOrange/30 bg-tradeAshLight/50 w-max rounded-sm transition-all duration-300 cursor-pointer">
              RECENT
            </p>

            <p className="text-xs font-bold text-tradeFadeWhite hover:text-white leading-none p-1 hover:bg-tradeOrange/30 bg-tradeAshLight/50 w-max rounded-sm transition-all duration-300 cursor-pointer">
              OLDER
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
