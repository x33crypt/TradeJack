import React from "react";

const OfferTag = ({ aboutOffer }) => {
  return (
    <div className="flex-1 flex flex-col md:border border-neutral-800">
      <div className="flex  items-center justify-between p-[15px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">Offer Tags</p>
      </div>

      <div className="flex-1 flex  flex-col bg-tradeAs p-[15px] gap-[10px]">
        <div className="flex flex-wrap gap-[10px]">
          {aboutOffer?.terms.map((term, index) => (
            <p
              className="text-sm bg-tradeOrange px-[10px] py-[3px] font-semibold rounded-[5px]"
              key={index}
            >
              {term}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfferTag;
