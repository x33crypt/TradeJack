import React from "react";
import image from "../../../assets/landingImg4.JPG";
import Loading from "@/components/others/Loading";
import NetworkError from "@/components/others/NetworkError";
import { useNavigate } from "react-router-dom";
import { useTraderProfile } from "@/context/publicContext/ProfileContext";
import toDecimal from "@/utils/toDecimal";
import lastSeen from "@/utils/lastSeen";
import { LuUsers } from "react-icons/lu";
import { windowFormatHour } from "@/utils/windowFormatHour";
import { IoMdArrowDropright } from "react-icons/io";
import Button from "@/components/buttons/Button";
import withComma from "@/utils/withComma";
import { useCalculator } from "@/context/publicContext/CalculatorContext";
import { LuCalendarClock } from "react-icons/lu";
import { useTrade } from "@/context/publicContext/TradeContext";
import { FaShareAlt } from "react-icons/fa";
import { GoBookmarkFill } from "react-icons/go";
import { MdReport } from "react-icons/md";
import { GrStatusGoodSmall } from "react-icons/gr";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa";
import { TbCubeSpark } from "react-icons/tb";

const OfferDetails = ({ loading, aboutOffer }) => {
  const { setProfile } = useTraderProfile();
  const { calculator, setCalculator } = useCalculator();
  const { setPreTradeCheck } = useTrade();

  console.log("offer details :", aboutOffer);
  console.log("calculator :", calculator);

  const navigateTo = useNavigate();

  const offer = aboutOffer?.data?.offerDetails;
  const user = aboutOffer?.data?.traderInfo;
  const seen = lastSeen(user?.lastSeen);

  console.log("last seen :", seen);

  const viewProfile = (username) => {
    setProfile((prev) => ({
      ...prev,
      username: username,
    }));
    navigateTo(`/profile/${username}`);
  };

  const amountChange = (e) => {
    const val = e.target.value.replace(/[^\d.-]/g, "");
    setCalculator((prev) => ({
      ...prev,
      amount: val,
    }));
  };

  const amountClick = (a) => {
    const amount = Number(a); // convert input to number

    setCalculator((prev) => {
      const prevAmount = Number(prev?.amount ?? 0); // also convert previous amount
      return {
        ...prev,
        amount: prevAmount + amount, // now both are numbers
      };
    });
  };

  const preTradeCheck = () => {
    setCalculator((prev) => ({ ...prev, state: false }));
    setPreTradeCheck((prev) => ({ ...prev, checking: true }));

    // Simulate async check (optional delay)
    setTimeout(() => {
      const keys = [
        "limitEligible",
        "activeNow",
        "collacteralSecured",
        "kycCompliant",
      ];

      let result = {};

      // 30% chance everything passes ✅
      const allPass = Math.random() < 0.3;

      if (allPass) {
        keys.forEach((key) => (result[key] = true));
      } else {
        const failKey = keys[Math.floor(Math.random() * keys.length)];
        result = keys.reduce((acc, key) => {
          acc[key] = key === failKey ? false : true;
          return acc;
        }, {});
      }

      if (allPass) {
        setPreTradeCheck((prev) => ({
          ...prev,
          time: 300,
          isCounting: true,
          checking: false,
          success: true,
          result,
        }));
      } else {
        setPreTradeCheck((prev) => ({
          ...prev,
          checking: false,
          failed: true,
          details: false,
          result,
        }));
      }
    }, 1500);
  };

  const amountList = ["50", "100", "200", "500", "1000"];

  return (
    <div className="flex flex-1 flex-col gap-[20px]">
      <div className="flex  items-center justify-between ">
        <p className="text-lg font-semibold text-white flex items-center gap-1">
          OFFER DETAILS
        </p>
      </div>

      <div className="flex flex-col ">
        {/* loading */}
        {false ? (
          <Loading />
        ) : (
          <div className="flex flex-1">
            {/* aboutOffer?.data === null */}
            {false ? (
              <NetworkError />
            ) : (
              <div className="flex flex-1 flex-col min-h-[120px] gap-[30px]">
                <div className="flex flex-col gap-[30px] pb-[12px]">
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-[20px]">
                      <div className="flex items-center gap-3">
                        <div
                          onClick={viewProfile}
                          className="flex cursor-pointer"
                        >
                          {false ? (
                            <div className="flex w-[30px] h-[30px] rounded-full overflow-hidden cursor-pointer bg-tradeFadeWhite items-center justify-center">
                              <img src={image} alt="" className="" />
                            </div>
                          ) : (
                            <div className="flex w-[40px] h-[40px] rounded-full overflow-hidden cursor-pointer bg-tradeFadeWhite items-center justify-center">
                              <img src={image} alt="" className="" />
                            </div>
                          )}
                        </div>
                        <div className="flex gap-1 flex-col gap-">
                          <p className="text-sm text-white font-semibold leading-none">
                            SANECORP
                          </p>
                          <div className="flex items-center gap-1">
                            <div className="flex gap-1 items-center">
                              <p className="text-tradeFadeWhite text-xs font-semibold leading-none">
                                Online
                              </p>
                              <GrStatusGoodSmall className="flex text-tradeGreen text-[10px] flex-shrink-0" />
                            </div>
                            <p className="text-tradeAshLight leading-none">|</p>
                            <RiVerifiedBadgeFill className="text-tradeFadeWhite text-sm" />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div>
                          <TbCubeSpark className="text-white text-5xl" />
                        </div>

                        <div className="flex flex-col gap-[10px] ">
                          <p className="text-tradeOrange text-xl font-semibold md:w-max w-[200px leading-none">
                            {offer?.serviceName || "N/A"}
                          </p>
                          <p className="text-tradeFadeWhite text-xs font-semibold leading-none">
                            {offer?.serviceType || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col lg:hidden gap-2">
                      <div className="flex items-center gap-2 hover:bg-tradeOrange/30 bg-tradeAshLight p-1 text-tradeFadeWhite hover:text-white w-max rounded-sm transition-all duration-300 cursor-pointer">
                        <GoBookmarkFill />
                        {/* <p className="text-xs font-bold leading-none  w-max rounded-sm transition-all duration-300 cursor-pointer">
                        BOOKMARK
                      </p> */}
                      </div>
                      <div className="flex items-center gap-2 hover:bg-tradeOrange/30 bg-tradeAshLight p-1 text-tradeFadeWhite hover:text-white w-max rounded-sm transition-all duration-300 cursor-pointer">
                        <FaShareAlt />
                        {/* <p className="text-xs font-bold leading-none  w-max rounded-sm transition-all duration-300 cursor-pointer">
                        SHARE
                      </p> */}
                      </div>
                      <div className="flex items-center gap-2 hover:bg-tradeOrange/30 bg-tradeAshLight p-1 text-tradeFadeWhite hover:text-white w-max rounded-sm transition-all duration-300 cursor-pointer">
                        <MdReport />
                        {/* <p className="text-xs font-bold leading-none  w-max rounded-sm transition-all duration-300 cursor-pointer">
                        REPORT
                      </p> */}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-[10px]">
                    <div className="flex gap-1 items-center">
                      <LuCalendarClock className="flex text-tradeFadeWhite text-sm flex-shrink-0" />
                      <p className="text-xs font-semibold text-white">
                        Created 31 Aug, 2025
                      </p>
                    </div>
                    <div className="flex gap-1 items-center">
                      <LuCalendarClock className="flex text-tradeFadeWhite text-sm flex-shrink-0" />
                      <p className="text-xs font-semibold text-white">
                        Updated 31 Aug, 2025
                      </p>
                    </div>
                    <div className="flex  items-center gap-1">
                      <LuUsers className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                      <p className="text-xs font-semibold text-white">
                        {offer?.completedTrades ?? "0"} Completed Trade(s)
                      </p>
                    </div>

                    <div className="flex  items-center gap-1">
                      <FaRegStar className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                      <p className="text-xs font-semibold text-white">
                        99% Completion Rating
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-[30px] flex-col">
                  <div className="flex flex-1 flex-col p-[15px] bg-tradeAsh gap-[15px] rounded-[15px] border border-tradeAshLight">
                    <div className="flex gap-2 justify-between  border-b border-tradeAshLight pb-[10px]">
                      <div className="flex items-center gap-1">
                        <IoMdArrowDropright className="text-lg text-white" />
                        <p className="text-white hover:text-white text-[13px] font-bold transition-all duration-300 cursor-pointer">
                          ENTER AMOUNT
                        </p>
                      </div>

                      <p className="text-tradeFadeWhite text-xs font-medium">
                        {toDecimal(offer?.purchaseLimit?.minimum) || "-- --"} -{" "}
                        {toDecimal(offer?.purchaseLimit?.maximum) || "-- --"}{" "}
                        {offer?.preferredCurrency?.code || "N/A"}
                      </p>
                    </div>

                    <div className="flex gap-[10px]">
                      <div className="flex-1 flex p-[12px] gap-2 items-center justify-between bg-tradeAshLight  border border-tradeAshExtraLight rounded-[10px] ">
                        <input
                          type="text"
                          placeholder="00.00"
                          value={withComma(calculator?.amount)}
                          onChange={amountChange}
                          className="bg-transparent w-full text-sm font-semibold outline-none text-white placeholder:text-tradeFadeWhite"
                        />
                      </div>

                      <div className="flex border border-tradeAshExtraLight p-[12px] gap-2 items-center justify-between bg-tradeAshLight rounded-[10px] ">
                        <div className="text-sm font-semibold text-white">
                          <p>{offer?.preferredCurrency?.code ?? "USD"}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-tradeFadeWhite text-xs font-medium">
                        You will receive - -
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={preTradeCheck}
                    disabled={calculator?.amount === ""}
                    variant="secondary"
                  >
                    SWAP
                  </Button>
                </div>

                <div className="flex flex-1 flex-col gap-[10px]">
                  <div className="flex flex-col justify-between min-w-[200px] flex-1 gap-[20px] p-[12px] rounded-[15px] border border-tradeAshLight bg-tradeAsh">
                    <div className="flex items-center justify-between w-full mt-[1px]">
                      <div className="flex justify-between border-b border-tradeAshLight flex-1 pb-[10px]">
                        <p className="text-[13px] text-white font-semibold">
                          Rate
                        </p>
                      </div>

                      <p className="text-white text-sm font-semibold leading-none">
                        1 {offer?.preferredCurrency?.code || "N/A"} = #
                        {toDecimal(offer?.marginRate?.ratePrice)}
                      </p>
                    </div>

                    <div className="w-full flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <p className="text-tradeFadeWhite text-[13px]  font-semibold">
                          Margin
                        </p>

                        <p className="text-xs font-bold text-tradeFadeWhite hover:text-white leading-none p-1 hover:bg-tradeOrange/30 bg-tradeAshLight/50 w-max rounded-sm transition-all duration-300 cursor-pointer">
                          {offer?.marginRate?.ratePercent || "N/A"}% MARGIN
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-tradeFadeWhite text-[13px]  font-semibold">
                          Currency
                        </p>
                        <p className="text-[13px] text-white font-semibold">
                          {offer?.preferredCurrency?.name}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex min-w-[200px] flex-1 flex-col  justify-between gap-[10px] p-[12px] rounded-[15px] border border-tradeAshLight bg-tradeAsh">
                    <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                      <p className="text-[13px] text-white font-semibold">
                        Payment Window
                      </p>
                    </div>

                    <div className="w-full flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <p className="text-[13px] text-tradeFadeWhite font-semibold">
                          Transfer
                        </p>

                        <p className="text-white text-[13px]  font-semibold">
                          {windowFormatHour(
                            offer?.paymentWindow?.transfer?.hours,
                            offer?.paymentWindow?.transfer?.minutes
                          )}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-[13px] text-tradeFadeWhite font-semibold">
                          Release
                        </p>

                        <p className="text-white text-[13px] font-semibold">
                          {windowFormatHour(
                            offer?.paymentWindow?.release?.hours,
                            offer?.paymentWindow?.release?.minutes
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex min-w-[200px] flex-1 flex-col gap-[10px] p-[12px] rounded-[15px] border border-tradeAshLight bg-tradeAsh">
                    <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                      <p className="text-[13px] text-white font-semibold">
                        Tags
                      </p>
                    </div>
                    <div className="w-full flex gap-2 flex-grow flex-wrap">
                      {offer?.tags?.length > 0 ? (
                        offer?.tags?.map((term, index) => (
                          <p className="flex w-max items-center gap-[8px] px-[8px] py-[4px] rounded-[8px] bg-tradeAshLight text-[13px] font-semibold text-white">
                            {term}
                          </p>
                        ))
                      ) : (
                        <p className="text-[13px] font-semibold text-white">
                          N/A
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex min-w-[200px] flex-1 flex-col gap-[10px] p-[12px] rounded-[15px] border border-tradeAshLight bg-tradeAsh">
                    <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                      <p className="text-[13px] text-white font-semibold">
                        Instructions
                      </p>
                    </div>

                    <p className="text-[13px] text-tradeFadeWhite font-semibold">
                      {offer?.instructions ? offer?.instructions : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferDetails;
