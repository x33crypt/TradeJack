import React, { useState } from "react";
import image from "../../../assets/landingImg4.JPG";
import Loading from "@/components/others/Loading";
import NetworkError from "@/components/others/NetworkError";
import { useNavigate } from "react-router-dom";
import toDecimal from "@/utils/toDecimal";
import lastSeen from "@/utils/lastSeen";
import { windowFormatHour } from "@/utils/windowFormatHour";
import { IoMdArrowDropright } from "react-icons/io";
import Button from "@/components/buttons/Button";
import withComma from "@/utils/withComma";
import { useCalculator } from "@/context/publicContext/CalculatorContext";
import { LuCalendarClock } from "react-icons/lu";
import { FaShareAlt } from "react-icons/fa";
import { GoBookmarkFill } from "react-icons/go";
import { MdReport } from "react-icons/md";
import { GrStatusGoodSmall } from "react-icons/gr";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa";
import { TbCubeSpark } from "react-icons/tb";
import { useToast } from "@/context/otherContext/ToastContext";
import { RiArrowLeftRightLine } from "react-icons/ri";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { HiHashtag } from "react-icons/hi";
import { MdBookmarkAdd } from "react-icons/md";
import { TbSparkles } from "react-icons/tb";
import api from "@/utils/http/api";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { BiNotepad } from "react-icons/bi";
import { AiOutlineFieldTime } from "react-icons/ai";
import { RiShieldStarLine } from "react-icons/ri";
import { GrStarHalf } from "react-icons/gr";

const OfferDetails = ({ loading, aboutOffer, id }) => {
  const { calculator, setCalculator } = useCalculator();
  const { setToast } = useToast();
  const [amount, setAmount] = useState("");

  console.log("offer details :", aboutOffer);
  console.log("calculator :", calculator);

  const navigateTo = useNavigate();

  const offer = aboutOffer?.data?.offerDetails;
  const user = aboutOffer?.data?.traderInfo;
  const offerId = id;

  console.log(offer);

  const amountChange = (e) => {
    const raw = e.target.value;

    // Allow only numbers and one decimal point
    const clean = raw
      .replace(/[^\d.]/g, "") // remove everything except digits and .
      .replace(/^(\d*\.\d*?)\..*/, "$1"); // only one dot allowed

    // Only update if valid
    setAmount(clean);
  };

  console.log("Amount:", amount);

  const swap = () => {
    // 1️⃣ Check for amount first
    if (!amount) {
      setToast({
        error: true,
        errorMessage: "Please enter an amount before proceeding.",
      });
      return; // stop here
    }

    // 2️⃣ Extract required values safely
    const id = offerId;
    const currency = offer?.preferredCurrency?.code;

    // 3️⃣ Validate required data
    if (!offerId || !currency) {
      setToast({
        error: true,
        errorMessage: "Invalid offer. Required details could not be found.",
      });
      return;
    }

    // 4️⃣ Navigate to next step
    const url = `/pre-trade/session/${offerId}/${amount}/${currency}`;
    navigateTo(url);
  };

  return (
    <div className="flex flex-1 flex-col gap-[20px]">
      <div className="flex  items-center justify-between ">
        <p className="text-lg font-semibold text-white flex items-center gap-1">
          OFFER DETAILS
        </p>
      </div>

      <div className="flex flex-1 flex-col ">
        {/* loading */}
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-1">
            {/* aboutOffer?.data === null */}
            {aboutOffer?.data === null ? (
              <NetworkError />
            ) : (
              <div className="flex flex-1 flex-col min-h-[120px] gap-[30px]">
                {/* Vendor Info */}
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
                        <div className="flex text-[13px] font-semibold text-tradeFadeWhite">
                          <p>T3</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-1 items-center">
                      {lastSeen(user?.lastSeen)}
                    </div>
                  </div>
                </div>

                {/* Offer Info */}
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-[10px] ">
                    <div className="flex gap-3 items-center">
                      <p className="text-tradeOrange text-xl font-semibold md:w-max w-[200px leading-none">
                        {offer?.serviceName || "N/A"}
                      </p>
                      {offer?.isVerifiedOffer ? (
                        <div className="flex gap-1 items-center">
                          <RiShieldStarLine className="flex text-tradeFadeWhite text-lg flex-shrink-0" />
                        </div>
                      ) : (
                        <div className="flex gap-1 items-center">
                          <GrStarHalf className="flex text-tradeFadeWhite text-lg flex-shrink-0" />
                        </div>
                      )}
                    </div>
                    <div className="flex gap-1 items-center">
                      <div className="flex items-center gap-1">
                        <HiHashtag className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                        <p className="text-[13px] font-semibold text-white">
                          {id ?? ""}
                        </p>
                      </div>
                      <p className="text-tradeAshLight leading-none">|</p>
                      <p className="text-tradeFadeWhite text-xs font-semibold leading-none">
                        {offer?.serviceType || "N/A"}
                      </p>
                    </div>
                    <div className="flex gap-1 items-center">
                      <div className="flex items-center gap-1">
                        <AiOutlineFieldTime className="text-[16px] text-tradeFadeWhite" />
                        <p className="text-white text-xs font-semibold">
                          Transfer in{" "}
                          <span className="text-white">
                            {windowFormatHour(
                              offer?.paymentWindow?.transfer?.hours,
                              offer?.paymentWindow?.transfer?.minutes
                            )}
                          </span>
                        </p>
                      </div>
                      <p className="text-tradeAshLight leading-none">|</p>
                      <div className="flex items-center gap-1">
                        <AiOutlineFieldTime className="text-[16px] text-tradeFadeWhite" />
                        <p className="text-white text-xs font-semibold">
                          Payment in{" "}
                          <span className="text-white">
                            {windowFormatHour(
                              offer?.paymentWindow?.release?.hours,
                              offer?.paymentWindow?.release?.minutes
                            )}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1 items-center">
                      <div className="flex gap-1 items-center">
                        <FaUserFriends className="flex text-tradeFadeWhite text-sm flex-shrink-0" />
                        <p className="text-xs font-semibold text-white">
                          {offer?.completedTrades ?? "0"} Trade(s)
                        </p>
                      </div>
                      <p className="text-tradeAshLight leading-none">|</p>
                      <div className="flex gap-1 items-center">
                        <FaRegStar className="flex text-tradeFadeWhite text-sm flex-shrink-0" />
                        <p className="text-xs font-semibold text-white">
                          99% Rating
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-white hover:text-tradeFadeWhite active:text-tradeOrange md:text-3xl text-2xl cursor-pointer duration-300 transition-all">
                    <MdBookmarkAdd />
                  </div>
                </div>

                {/* Calculator */}
                <div className="flex gap-[20px] flex-col ">
                  <div className="flex flex-col gap-[10px] pb-[12px] bg-tradeAsh p-[12px] rounded-[15px]">
                    <div className="flex flex-1 items-center justify-between">
                      <p className="text-[13px] text-tradeFadeWhite font-semibold">
                        Enter Amount
                      </p>
                    </div>

                    <div className="flex flex-col gap-[10px]">
                      <div className="flex-1 flex items-center gap-1 bg-tradeAshLigh w-full border-b-2 border-tradeAshLight ">
                        <p className="text-tradeFadeWhite text-xl font-semibold">
                          $
                        </p>
                        <input
                          type="text"
                          placeholder={` ${
                            toDecimal(offer?.purchaseLimit?.minimum) || "0.00"
                          } -  ${
                            toDecimal(offer?.purchaseLimit?.maximum) || "0.00"
                          }`}
                          value={withComma(amount)}
                          onChange={amountChange}
                          className="bg-transparent flex-1 py-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-xl font-semibold leading-none"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <p className="text-tradeOrange text-xs font-medium">
                          NGN 0.00
                        </p>
                        <p className="text-tradeFadeWhite text-xs">
                          1 {offer?.preferredCurrency?.code ?? "N/A"} = 0.000691
                          NGN
                        </p>
                      </div>
                    </div>
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

                  <Button onClick={swap} variant="Fadeout">
                    TRADE
                  </Button>
                </div>

                {/* Offer Details */}
                {/* <div className="flex flex-1 flex-col gap-[10px]">
                  <div className="flex flex-col justify-between min-w-[200px] flex-1 gap-[20px] p-[12px] rounded-[15px] border border-tradeAshLight bg-tradeAsh">
                    <div className="flex items-center justify-between border-b border-tradeAshLight w-full mt-[1px] pb-[10px]">
                      <p className="text-[13px] text-white font-semibold">
                        Rate
                      </p>

                      <p className="text-tradeGreen text-sm font-semibold leading-none">
                        1 {offer?.preferredCurrency?.code} = NGN{" "}
                        {toDecimal(offer?.marginRate?.ratePrice)}
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
                </div> */}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferDetails;
