import Footer from "@/components/others/Footer";
import InAppNav from "@/components/others/InAppNav";
import React from "react";
import { PiSpinnerGapBold } from "react-icons/pi";
import ProgressBar from "@/components/others/ProgressBar";
import image from "../../assets/landingImg4.JPG";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa";

import { FaRegCircleCheck } from "react-icons/fa6";
import { FaHashtag } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import toDecimal from "@/utils/toDecimal";
import { usePublicOffers } from "@/context/publicContext/OffersContext";
import lastSeen from "@/utils/lastSeen";
import { RiArrowLeftRightLine } from "react-icons/ri";
import { FaCircleInfo } from "react-icons/fa6";
import Button from "@/components/buttons/Button";

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
            <div className="flex flex-col gap-[30px]">
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
                          <div className="flex w-[30px] h-[30px] rounded-full overflow-hidden cursor-pointer bg-tradeFadeWhite items-center justify-center">
                            <img src={image} alt="" className="" />
                          </div>
                        )}
                      </div>
                      <div className="flex gap-1 items-center">
                        <p className="text-white text-[13px] font-semibold">
                          {user?.username ?? ""}
                        </p>
                        <p className="text-tradeAshLight leading-none">|</p>
                        <RiVerifiedBadgeFill className="flex text-tradeGreen text-base flex-shrink-0" />
                      </div>
                    </div>

                    <div className="flex gap-1 items-center">
                      {lastSeen(user?.lastSeen)}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 items-center">
                      <div className="flex items-center gap-1">
                        <FaHashtag className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                        <p className="text-[13px] font-semibold text-white">
                          {offerId ?? ""}
                        </p>
                      </div>
                      <p className="text-tradeAshLight leading-none">|</p>
                      <div className="flex  items-center gap-1">
                        <RiArrowLeftRightLine className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                        <p className="text-[13px] font-semibold text-white">
                          {offer?.completedTrades ?? "0"}
                        </p>
                      </div>
                      <p className="text-tradeAshLight leading-none">|</p>
                      <div className="flex  items-center gap-1">
                        <FaRegStar className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                        <p className="text-[13px] font-semibold text-white">
                          99%
                        </p>
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
                <div className="flex justify-normal flex-wrap gap-[10px]">
                  <div className="flex items-center gap-1 borde border-tradeAshExtraLight  p-1 w-max h-max bg-tradeAshLight rounded-md cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
                    {false ? (
                      <PiSpinnerGapBold className="text-sm animate-spin text-white" />
                    ) : (
                      <FaRegCircleCheck className="text-sm text-tradeGreen" />
                    )}
                    <p className="text-[13px] font-semibold text-white">
                      Validations
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-white borde border-tradeAshExtraLight  p-1 w-max h-max bg-tradeAshLight rounded-md cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
                    {false ? (
                      <PiSpinnerGapBold className="text-sm animate-spin text-white" />
                    ) : (
                      <FaRegCircleCheck className="text-sm text-tradeGreen" />
                    )}
                    <p className="text-[13px] font-semibold text-white">
                      Limit Check
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-white borde border-tradeAshExtraLight  p-1 w-max h-max bg-tradeAshLight rounded-md cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
                    {false ? (
                      <PiSpinnerGapBold className="text-sm animate-spin text-white" />
                    ) : (
                      <FaRegCircleCheck className="text-sm text-tradeGreen" />
                    )}
                    <p className="text-[13px] font-semibold text-white">
                      Deposit Status
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-white borde border-tradeAshExtraLight  p-1 w-max h-max bg-tradeAshLight rounded-md cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
                    {false ? (
                      <PiSpinnerGapBold className="text-sm animate-spin text-white" />
                    ) : (
                      <FaRegCircleCheck className="text-sm text-tradeGreen" />
                    )}
                    <p className="text-[13px] font-semibold text-white">
                      Set to Trade
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col ">
                {/* Validation */}
                <div
                  className={`${
                    false ? "flex" : "hidden"
                  }  flex-col gap-[40px] `}
                >
                  <div className="flex flex-col gap-[20px]">
                    <div className="flex flex-col gap-[10px] bg-tradeAsh border border-tradeAshLight rounded-[15px] p-[12px]">
                      <p className="text-sm text-white font-semibold">Error</p>

                      <div className="flex gap-2 items-center ">
                        <div className="text-tradeOrange text-sm flex-shrink-0 h-max w-max">
                          <FaCircleInfo />
                        </div>
                        <p className="flex-1 text-xs text-tradeFadeWhite/50 font-medium">
                          Then every time setAmount(val) runs, React re-renders,
                          and the input’s value becomes exactly what’s in state
                          — meaning if your logic accidentally sanitizes too
                          aggressively, you’ll lose what you just typed.
                        </p>
                      </div>
                    </div>

                    <Button variant="Fadeout">EXPLORE OFFERS</Button>
                  </div>

                  <div className="flex flex-1 flex-col gap-[20px]">
                    <div className="flex  items-center justify-between ">
                      <p className="text-sm font-semibold text-white flex items-center gap-1">
                        RELATED OFFERS
                      </p>
                    </div>
                    <div className="flex flex-col gap-[10px] flex-1"></div>
                  </div>
                </div>
                {/* Limit Check */}
                <div
                  className={`${
                    false ? "flex" : "hidden"
                  }  flex-col gap-[40px] `}
                >
                  <div className="flex flex-col gap-[20px]">
                    <div className="flex flex-col gap-[10px] bg-tradeAsh border border-tradeAshLight rounded-[15px] p-[12px]">
                      <p className="text-sm text-white font-semibold">
                        Limit Exceeded
                      </p>

                      <div className="flex flex-col gap-[20px]">
                        <div className="flex gap-2 items-center ">
                          <div className="text-tradeOrange text-sm flex-shrink-0 h-max w-max">
                            <FaCircleInfo />
                          </div>
                          <p className="flex-1 text-xs text-tradeFadeWhite/50 font-medium">
                            The trade amount is outside the vendor's allowed
                            range. Adjust the amount within the vendor's limit
                            and try again
                          </p>
                        </div>

                        <div className="flex gap-2 items-center ">
                          <div className="text-tradeOrange text-sm flex-shrink-0 h-max w-max">
                            <FaCircleInfo />
                          </div>
                          <p className="flex-1 text-xs text-tradeFadeWhite/50 font-medium">
                            This validation helps prevent over-exposure and
                            ensures the vendor can handle the trade amount
                            responsibly. To proceed, please review the vendor's
                            minimum and maximum trade limits, adjust your trade
                            amount accordingly, and try again.
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button variant="Fadeout">REVIEW DETAILS</Button>
                  </div>

                  {/* <div className="flex flex-1 flex-col gap-[20px]">
                    <div className="flex  items-center justify-between ">
                      <p className="text-sm font-semibold text-white flex items-center gap-1">
                        RELATED OFFERS
                      </p>
                    </div>
                    <div className="flex flex-col gap-[10px] flex-1"></div>
                  </div> */}
                </div>
                {/* Double Booking  */}
                <div
                  className={`${
                    true ? "flex" : "hidden"
                  }  flex-col gap-[40px] `}
                >
                  <div className="flex flex-col gap-[20px]">
                    <div className="flex flex-col gap-[10px] bg-tradeAs borde border-tradeAshLight rounded-[15px] p-[12px">
                      <p className="text-sm text-white font-semibold">
                        Insufficient Collateral
                      </p>

                      <div className="flex flex-col gap-[20px]">
                        <div className="flex gap-2 items-center ">
                          <div className="text-tradeFadeWhite/50 text-sm flex-shrink-0 h-max w-max">
                            <FaCircleInfo />
                          </div>
                          <p className="flex-1 text-xs text-tradeFadeWhite/50 font-medium">
                            This trade cannot proceed because the vendor does
                            not have enough collateral to secure the
                            transaction. You can choose to cancle this trade now
                            or allow the vendor to make a deposit to top up
                            their collateral balance before proceeding
                          </p>
                        </div>

                        <div className="flex gap-2 items-center ">
                          <div className="text-tradeFadeWhite/50 text-sm flex-shrink-0 h-max w-max">
                            <FaCircleInfo />
                          </div>
                          <p className="flex-1 text-xs text-tradeFadeWhite/50 font-medium">
                            Collateral serves as a safety gurantee that ensures
                            the vendor can fulfill the trade without risk of
                            loss to the buyer. When the vendor's collateral
                            drops below the threshold, new trades are restricted
                            untill the balance is replenished.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col-reverse md:flex-row gap-[10px]">
                      <Button variant="Fadeout" maxWidth="w-ma">
                        CANCEL
                      </Button>{" "}
                      <Button variant="secondary">DEPOSIT</Button>
                    </div>
                  </div>

                  {/* <div className="flex flex-1 flex-col gap-[20px]">
                    <div className="flex  items-center justify-between ">
                      <p className="text-sm font-semibold text-white flex items-center gap-1">
                        RELATED OFFERS
                      </p>
                    </div>
                    <div className="flex flex-col gap-[10px] flex-1"></div>
                  </div> */}
                </div>
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
