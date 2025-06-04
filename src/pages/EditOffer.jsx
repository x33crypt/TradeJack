import Footer from "@/components/Footer";
import InAppNav from "@/components/InAppNav";
import React from "react";

const EditOffer = () => {
  return (
    <>
      <InAppNav />

      <div className="flex flex-col bg-black gap-[15px] lg:px-[15%] md:px-[5%] pt-[60px] md:pt-[80px] pb-[40px]">
        {/* Header Section */}
        <div className="flex lg:flex-row flex-col w-full gap-[15px] lg:gap-0">
          <div className="flex-1 flex flex-col md:border border-tradeAshLight">
            <div className="flex items-center gap-[10px] p-[15px] border-b border-tradeAshLight">
              <p className="text-[17px] text-white font-[700] cursor-pointer">
                Edit Offer /{" "}
                <span className="text-tradeFadeWhite font-semibold">#516w17gasv17</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditOffer;
