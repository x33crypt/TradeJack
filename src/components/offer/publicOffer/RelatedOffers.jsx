import React from "react";
import OfferCard from "@/components/cards/Mobile/OfferCard";
import NetworkError from "@/components/others/NetworkError";
import Loading from "@/components/others/Loading";

const RelatedOffers = ({ loading, aboutOffer }) => {
  return (
    <div className=" md:w-[350px] flex flex-col md:border border-neutral-800">
      <div className="flex justify-between items-center px-[15px] py-[12px] border-b border-tradeAshLight">
        <p className="text-lg text-white font-semibold">Related Offers</p>
      </div>

      <div className="flex min-h-[120px] p-[15px]">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-1">
            {aboutOffer === null ? (
              <NetworkError />
            ) : (
              <div className="flex flex-1 flex-col gap-[10px]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <OfferCard />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatedOffers;
