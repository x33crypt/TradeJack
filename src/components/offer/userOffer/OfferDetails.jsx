import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import { IoMdThumbsUp } from "react-icons/io";
import { MdThumbDownAlt } from "react-icons/md";
import { dateTime } from "@/utils/dateTime";
import Loading from "@/components/others/Loading";
import NetworkError from "@/components/others/NetworkError";

const OfferDetails = ({ aboutOffer }) => {
  return (
    <div className="flex flex-1 flex-col gap-[20px]">
      <div className="flex  items-center justify-between ">
        <p className="text-lg font-semibold text-white flex items-center gap-1">
          OFFER DETAILS
        </p>
      </div>

      <div className="flex flex-col min-h-[120px]">
        {/* loading */}
        {false ? (
          <Loading />
        ) : (
          <div className="flex flex-1">
            {aboutOffer?.data === null ? (
              <NetworkError />
            ) : (
              <div className="flex flex-1 flex-col min-h-[120px] gap-[30px]"></div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferDetails;
