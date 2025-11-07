import Footer from "@/components/others/Footer";
import InAppNav from "@/components/others/InAppNav";
import React from "react";
import { PiSpinnerGapBold } from "react-icons/pi";
import ProgressBar from "@/components/others/ProgressBar";
import image from "../../assets/landingImg4.JPG";
import { GrStatusGoodSmall } from "react-icons/gr";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { FaHashtag } from "react-icons/fa6";
import { RiExchange2Fill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import toDecimal from "@/utils/toDecimal";
import { usePublicOffers } from "@/context/publicContext/OffersContext";
import lastSeen from "@/utils/lastSeen";

const PreTrade = () => {
  const { offerId = "", amount = "", currency = "" } = useParams();
  const { aboutOffer, setAboutOffer } = usePublicOffers();

  console.log("Offer Id:", offerId);
  console.log("Amount:", amount);
  console.log("Currency:", currency);

  useEffect(() => {
    if (offerId) {
      console.log("Offer ID:", offerId);

      setAboutOffer((prev) => ({
        ...prev,
        id: offerId,
      }));
    }
  }, [offerId]);

  const offer = aboutOffer?.data?.offerDetails;
  const user = aboutOffer?.data?.traderInfo;

  console.log(offer);
  console.log(user);

  return (
    <>
      <InAppNav />
      <div className="md:pt-[70px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex bg-black">
        <div className="flex flex-1 flex-col gap-[20px] lg:mx-[22.8%] p-[15px]">
          <div className="flex gap-2 w-full h-max flex-col">
            <div className="flex-1 flex justify-between items-center gap-[10px]">
              <p className="text-sm font-semibold text-white">
                PRE-TRADE CHECKS
              </p>

              <div className="flex items-center gap-[5px]">
                <PiSpinnerGapBold className="text-lg animate-spin text-white" />
                <p className="text-sm font-semibold text-white">40%</p>
              </div>
            </div>
            <div>
              <ProgressBar value={40} />
            </div>
          </div>
          <div className="flex flex-col gap-[30px]">
            <div className="flex flex-col gap-[25px]">
              <div className="flex flex-col gap-[10px]">
                {/* Offer Info */}
                <div className="flex flex-col gap-[10px] bg-tradeAsh border border-tradeAshLight rounded-[15px] p-[12px]">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2 items-center">
                      <div className="flex cursor-pointer relative">
                        {false ? (
                          <div className="flex w-[40px] h-[40px] rounded-full overflow-hidden cursor-pointer bg-tradeFadeWhite items-center justify-center">
                            <img src={image} alt="" className="" />
                          </div>
                        ) : (
                          <div className="flex w-[25px] h-[25px] rounded-full overflow-hidden cursor-pointer bg-tradeFadeWhite items-center justify-center">
                            <img src={image} alt="" className="" />
                          </div>
                        )}
                      </div>
                      <div className="flex gap-1 items-center">
                        <p className="text-white text-[13px] font-semibold">
                          {user?.username ?? ""}
                        </p>
                        <p className="text-tradeAshLight leading-none">|</p>
                        <RiVerifiedBadgeFill className="flex text-tradeFadeWhite text-s flex-shrink-0" />
                      </div>
                    </div>

                    <div className="flex gap-1 items-center">
                      {lastSeen(user?.lastSeen)}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 items-center">
                      <div className="flex  items-center gap-1">
                        <FaHashtag className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                        <p className="text-xs font-semibold text-white">
                          525121
                        </p>
                      </div>
                      <p className="text-tradeAshLight leading-none">|</p>
                      <div className="flex  items-center gap-1">
                        <RiExchange2Fill className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                        <p className="text-xs font-semibold text-white">
                          {offer?.completedTrades ?? "0"}
                        </p>
                      </div>
                      <p className="text-tradeAshLight leading-none">|</p>
                      <div className="flex  items-center gap-1">
                        <FaRegStar className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                        <p className="text-xs font-semibold text-white">99%</p>
                      </div>
                    </div>

                    <div className="flex gap-1 items-center">
                      <p className="text-white text-[13px] font-semibold">
                        {toDecimal(amount) ?? "0.00"}{" "}
                        <span className="text-tradeFadeWhite font-semibold">
                          {currency ?? "N/A"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Checks Result */}
                <div className="flex flex-wrap gap-[10px]">
                  <div className="flex items-center gap-1 text-tradeGreen borde border-tradeAshExtraLight  p-1 w-max h-max bg-tradeGreen/10 rounded-md cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
                    <FaCircleCheck className="text-sm" />
                    <p className="text-[13px] font-semibold">Verified ID</p>
                  </div>
                  <div className="flex items-center gap-1 text-tradePurple borde border-tradeAshExtraLight  p-1 w-max h-max bg-tradePurple/10 rounded-md cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
                    <FaCircleCheck className="text-sm" />
                    <p className="text-[13px] font-semibold">Limit Check</p>
                  </div>
                  <div className="flex items-center gap-1 text-tradeOrange borde border-tradeAshExtraLight  p-1 w-max h-max bg-tradeOrange/10 rounded-md cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
                    <FaCircleCheck className="text-sm" />
                    <p className="text-[13px] font-semibold">Deposit Status</p>
                  </div>
                  {/* <div className="flex items-center gap-1 text-white borde border-tradeAshExtraLight  p-1 w-max h-max bg-tradeAsh rounded-md  cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
                    <FaCircleCheck className="text-sm" />
                    <p className="text-[13px] font-semibold">Ready to Trade</p>
                  </div> */}
                </div>
              </div>
              <div className="flex flex-col ">
                {/* Validation */}
                <div className="flex flex-col gap-[40px] ">
                  <div className="flex flex-1 flex-col gap-[20px]">
                    <div className="flex  items-center justify-between ">
                      <p className="text-sm font-semibold text-white flex items-center gap-1">
                        DETAILS
                      </p>
                    </div>
                    <div className="flex flex-col gap-[10px] flex-1"></div>
                  </div>
                </div>
                {/* Limit Check */}
                {/* <div className="flex flex-col gap-[40px] ">
                  <div className="flex flex-1 flex-col gap-[20px]">
                    <div className="flex  items-center justify-between ">
                      <p className="text-sm font-semibold text-white flex items-center gap-1">
                        DETAILS
                      </p>
                    </div>
                    <div className="flex flex-col gap-[10px] flex-1"></div>
                  </div>
                </div> */}
                {/* Double Booking  */}
                {/* <div className="flex flex-col gap-[40px] ">
                  <div className="flex flex-1 flex-col gap-[20px]">
                    <div className="flex  items-center justify-between ">
                      <p className="text-sm font-semibold text-white flex items-center gap-1">
                        DETAILS
                      </p>
                    </div>
                    <div className="flex flex-col gap-[10px] flex-1"></div>
                  </div>
                </div> */}
                {/* Collateral*/}
                {/* <div className="flex flex-col gap-[40px] ">
                  <div className="flex flex-1 flex-col gap-[20px]">
                    <div className="flex  items-center justify-between ">
                      <p className="text-sm font-semibold text-white flex items-center gap-1">
                        DETAILS
                      </p>
                    </div>
                    <div className="flex flex-col gap-[10px] flex-1"></div>
                  </div>
                </div> */}
              </div>
            </div>

            {/* <div className="flex flex-col gap-[20px]">
              <Button
                variant="secondary"
                // onClick={handleUpdatePhone}
                // disabled={transfer?.proceed}
              >
                UPDATE
              </Button>
            </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PreTrade;
