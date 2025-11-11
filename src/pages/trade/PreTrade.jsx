import Footer from "@/components/others/Footer";
import InAppNav from "@/components/others/InAppNav";
import React, { useState } from "react";
import { PiSpinnerGapBold } from "react-icons/pi";
import ProgressBar from "@/components/others/ProgressBar";
import image from "../../assets/landingImg4.JPG";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa";
import { FaHashtag } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import toDecimal from "@/utils/toDecimal";
import { usePublicOffers } from "@/context/publicContext/OffersContext";
import { useFetchAboutOffers } from "@/hooks/publicHooks/useFetchAboutOffer";
import lastSeen from "@/utils/lastSeen";
import { RiArrowLeftRightLine } from "react-icons/ri";
import { FaCircleInfo } from "react-icons/fa6";
import Button from "@/components/buttons/Button";
import LockByScroll from "@/components/others/LockByScroll";
import SmallButton from "@/components/buttons/SmallButton";
import { IoClose } from "react-icons/io5";
import { MdOutlineTimer } from "react-icons/md";
import { MdTimer } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import usePreTradeAuth from "@/hooks/publicHooks/usePreTradeAuth";

const PreTrade = () => {
  const { id = "", amount = "", currency = "" } = useParams();
  const { aboutOffer, setAboutOffer } = usePublicOffers();
  const { loading } = useFetchAboutOffers();
  const { preTradeLoading, authorizePreTrade } = usePreTradeAuth();
  const [waitTime, setWaitTime] = useState({
    state: false,
    time: null,
  });

  console.log("Offer Id:", id);
  console.log("Amount:", amount);
  console.log("Currency:", currency);

  //Handle Offer Validation
  useEffect(() => {
    if (id) {
      console.log("Offer ID:", id);

      setAboutOffer((prev) => ({
        ...prev,
        id: id,
      }));
    }
  }, [id]);

  // Handle Pre Trade
  useEffect(() => {
    const initiatePreTrade = async () => {
      if (id && amount) {
        console.log("Offer ID:", id);

        const result = await authorizePreTrade(id, amount);
        if (result) {
          console.log("Trade initialized:", result);
        }
      }
    };

    initiatePreTrade();
  }, [id, amount, authorizePreTrade]);

  const offer = aboutOffer?.data?.offerDetails;
  const user = aboutOffer?.data?.traderInfo;

  console.log(offer);
  console.log(user);

  const handleDeposit = () => {};

  const handleSetWaitTime = (selected) => {
    // Extract only the number part (e.g., "15 mins" → 15)
    const timeValue = parseInt(selected, 10);

    if (!isNaN(timeValue)) {
      setWaitTime({
        state: false,
        time: timeValue,
      });
    }
  };

  const closeWaitTime = () => {
    setWaitTime((prev) => ({
      ...prev,
      state: false,
    }));
  };

  console.log("wait time :", waitTime?.time);

  return (
    <>
      <InAppNav />
      <div className="md:pt-[70px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex bg-black">
        <div className="flex flex-1 flex-col gap-[20px] lg:mx-[22.8%] p-[15px]">
          {/* Pre-trade Loader/Heading */}
          <div className="flex gap-2 w-full h-max flex-col">
            <div className="flex-1 flex justify-between items-center gap-[10px]">
              <p className="text-sm font-semibold text-white">
                PRE-TRADE CHECKS
              </p>

              <div className="flex items-center gap-[5px]">
                {false ? (
                  <PiSpinnerGapBold className="text-lg animate-spin text-white" />
                ) : null}

                <p className="text-sm font-semibold text-white">100%</p>
              </div>
            </div>
            <div>
              <ProgressBar value={100} />
            </div>
          </div>
          <div className="flex flex-col gap-[30px]">
            {/* Trade Info */}
            <div className="flex flex-col gap-[10px]">
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
                      <RiVerifiedBadgeFill className="flex text-tradeGreen text-base flex-shrink-0" />
                    </div>
                  </div>

                  <div className="flex gap-1 items-center">
                    {lastSeen(user?.lastSeen)}
                  </div>
                </div>
              </div>

              {/* Trade & Offer Info */}
              <div className="flex flex-col gap-[10px] bg-tradeAsh border border-tradeAshLight rounded-[15px] p-[12px]">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2 items-center">
                    <p className="text-tradeOrange text-[13px] font-semibold">
                      {offer?.serviceName ?? ""}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <FaHashtag className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                    <p className="text-[13px] font-semibold text-white">
                      {id ?? ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 items-center">
                    <div className="flex  items-center gap-1">
                      <FaUserFriends className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
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
            </div>

            {/* Checks Result */}
            <div className="flex flex-col">
              {/* Validation */}
              <div
                className={`${false ? "flex" : "hidden"}  flex-col gap-[40px] `}
              >
                <div className="flex flex-col gap-[20px]">
                  <div className="flex flex-col gap-[10px] ">
                    <p className="text-sm text-white font-bold">
                      Inalid Trade Entities
                    </p>

                    <div className="flex flex-col gap-[20px]">
                      <div className="flex gap-2 items-center ">
                        <div className="text-tradeFadeWhite/50 text-sm flex-shrink-0 h-max w-max">
                          <FaCircleInfo />
                        </div>
                        <p className="flex-1 text-xs text-tradeFadeWhite/50 font-medium">
                          This trade could not be verified because some of the
                          infotmation provided is invalid or incomplete.
                        </p>
                      </div>

                      <div className="flex gap-2 items-center ">
                        <div className="text-tradeFadeWhite/50 text-sm flex-shrink-0 h-max w-max">
                          <FaCircleInfo />
                        </div>
                        <p className="flex-1 text-xs text-tradeFadeWhite/50 font-medium">
                          This error often occures when the offer details are
                          unverified. It may happen if the vendor cannot be
                          found, is not a verfied service provider, or if the
                          selected offer is missing, inactive, or no longer
                          associated with the vendor. please review offer
                          details and try again.
                        </p>
                      </div>

                      <p className="flex-1 text-xs text-tradeFadeWhite/50 font-medium">
                        In the event of any dispute, the{" "}
                        <span className="text-tradeOrange cursor-pointer">
                          P2P Trading Rules
                        </span>{" "}
                        and{" "}
                        <span className="text-tradeOrange cursor-pointer">
                          P2P Protection Policy
                        </span>{" "}
                        will apply. Users who violate these rules will not be
                        eligible for protection.
                      </p>
                    </div>
                  </div>

                  <Button variant="Fadeout">OFFER DETAILS</Button>
                </div>
              </div>
              {/* Double Booking  */}
              <div
                className={`${false ? "flex" : "hidden"}  flex-col gap-[40px] `}
              >
                <div className="flex flex-col gap-[20px]">
                  <div className="flex flex-col gap-[10px] ">
                    <p className="text-sm text-white font-bold">
                      Vendor Unavailable
                    </p>

                    <div className="flex flex-col gap-[20px]">
                      <div className="flex gap-2 items-center ">
                        <div className="text-tradeFadeWhite/50 text-sm flex-shrink-0 h-max w-max">
                          <FaCircleInfo />
                        </div>

                        <div className="flex flex-col gap-[5px]">
                          <p className="flex-1 text-xs text-tradeFadeWhite/50 font-medium">
                            This vendor is currently engaged in another
                            pre-trade session. You can wait a few minutes and
                            try again, or cancel this trade now to explore other
                            available offers.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2 items-center ">
                        <div className="text-tradeFadeWhite/50 text-sm flex-shrink-0 h-max w-max">
                          <FaCircleInfo />
                        </div>
                        <p className="flex-1 text-xs text-tradeFadeWhite/50 font-medium">
                          The availability checks esures that the vendor is not
                          already participating in another active pre-trade
                          verification. This helps prevent collatateral
                          conflicts and double session errors, maintaining
                          transaction accuracy and system stability
                        </p>
                      </div>

                      <p className="flex-1 text-xs text-tradeFadeWhite/50 font-medium">
                        In the event of any dispute, the{" "}
                        <span className="text-tradeOrange cursor-pointer">
                          P2P Trading Rules
                        </span>{" "}
                        and{" "}
                        <span className="text-tradeOrange cursor-pointer">
                          P2P Protection Policy
                        </span>{" "}
                        will apply. Users who violate these rules will not be
                        eligible for protection.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col-reverse md:flex-row gap-[10px]">
                    <Button variant="Fadeout">CANCEL</Button>
                    <Button onClick={handleDeposit} variant="secondary">
                      RETRY
                    </Button>
                  </div>
                </div>
              </div>
              {/* Limit Check */}
              <div
                className={`${false ? "flex" : "hidden"}  flex-col gap-[40px] `}
              >
                <div className="flex flex-col gap-[20px]">
                  <div className="flex flex-col gap-[10px] ">
                    <p className="text-sm text-white font-bold">
                      Limit Exceeded
                    </p>

                    <div className="flex flex-col gap-[20px]">
                      <div className="flex gap-2 items-center ">
                        <div className="text-tradeFadeWhite/50 text-sm flex-shrink-0 h-max w-max">
                          <FaCircleInfo />
                        </div>
                        <p className="flex-1 text-xs text-tradeFadeWhite/50 font-medium">
                          The trade amount is outside the vendor's allowed
                          range. Adjust the amount within the vendor's limit and
                          try again
                        </p>
                      </div>

                      <div className="flex gap-2 items-center ">
                        <div className="text-tradeFadeWhite/50 text-sm flex-shrink-0 h-max w-max">
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

                      <p className="flex-1 text-xs text-tradeFadeWhite/50 font-medium">
                        In the event of any dispute, the{" "}
                        <span className="text-tradeOrange cursor-pointer">
                          P2P Trading Rules
                        </span>{" "}
                        and{" "}
                        <span className="text-tradeOrange cursor-pointer">
                          P2P Protection Policy
                        </span>{" "}
                        will apply. Users who violate these rules will not be
                        eligible for protection.
                      </p>
                    </div>
                  </div>

                  <Button variant="Fadeout">REVIEW LIMITS</Button>
                </div>
              </div>
              {/* Collateral*/}
              <div
                className={`${false ? "flex" : "hidden"}  flex-col gap-[40px] `}
              >
                <div className="flex flex-col gap-[20px]">
                  <div className="flex flex-col gap-[10px] ">
                    <p className="text-sm text-white font-bold">
                      Insufficient Collateral
                    </p>

                    <div className="flex flex-col gap-[20px]">
                      <div className="flex gap-2 items-center ">
                        <div className="text-tradeFadeWhite/50 text-sm flex-shrink-0 h-max w-max">
                          <FaCircleInfo />
                        </div>

                        <div className="flex flex-col gap-[5px]">
                          <p className="flex-1 text-xs text-tradeFadeWhite/50 font-medium">
                            This trade cannot proceed because the vendor does
                            not have enough collateral to secure the
                            transaction. You can choose to cancle this trade now
                            or allow the vendor to make a deposit to top up
                            their collateral balance before proceeding.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2 items-center ">
                        <div className="text-tradeFadeWhite/50 text-sm flex-shrink-0 h-max w-max">
                          <FaCircleInfo />
                        </div>

                        <p className="flex-1 text-xs text-tradeFadeWhite/50 font-medium">
                          {/* Deposits typically take only a few minutes to
                              confirm, and the system with automatically cancel
                              the trade if the vendor fails to deposit with the
                              waiting period you set{" "} */}
                          Once you allow the deposit, a{" "}
                          <span className="text-tradeOrange cursor-pointer">
                            5-minute waiting window
                          </span>{" "}
                          will begin automatically. If the vendor fails to
                          complete the deposit within this time frame, the
                          system will automatically cancel the trade for
                          security and fairness.
                        </p>
                      </div>

                      <div className="flex gap-2 items-center ">
                        <div className="text-tradeFadeWhite/50 text-sm flex-shrink-0 h-max w-max">
                          <FaCircleInfo />
                        </div>
                        <p className="flex-1 text-xs text-tradeFadeWhite/50 font-medium">
                          Collateral serves as a safety gurantee that ensures
                          the vendor can fulfill the trade without risk of loss
                          to the seller. When the vendor's collateral drops
                          below the threshold, new trades are restricted untill
                          the balance is replenished.
                        </p>
                      </div>

                      <p className="flex-1 text-xs text-tradeFadeWhite/50 font-medium">
                        In the event of any dispute, the{" "}
                        <span className="text-tradeOrange cursor-pointer">
                          P2P Trading Rules
                        </span>{" "}
                        and{" "}
                        <span className="text-tradeOrange cursor-pointer">
                          P2P Protection Policy
                        </span>{" "}
                        will apply. Users who violate these rules will not be
                        eligible for protection.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col-reverse md:flex-row gap-[10px]">
                    <Button variant="Fadeout">CANCEL</Button>
                    <Button onClick={handleDeposit} variant="secondary">
                      DEPOSIT
                    </Button>
                  </div>
                </div>
              </div>
              {/*Awaiting Collateral*/}
              <div
                className={`${true ? "flex" : "hidden"}  flex-col gap-[40px] `}
              >
                <div className="flex flex-col gap-[20px]">
                  <div className="flex flex-col gap-[10px] ">
                    <p className="text-sm text-white font-bold">
                      Waiting for Vendor Deposit
                    </p>

                    <div className="flex flex-col gap-[20px]">
                      <div className="flex gap-2 items-center ">
                        <div className="text-tradeFadeWhite/50 text-base flex-shrink-0 h-max w-max">
                          <MdTimer />
                        </div>
                        <p className="text-xl font-bold text-white">5:00</p>
                      </div>

                      <div className="flex gap-2 items-center ">
                        <div className="text-tradeFadeWhite/50 text-sm flex-shrink-0 h-max w-max">
                          <FaCircleInfo />
                        </div>

                        <p className="flex-1 text-xs text-tradeFadeWhite/50 font-medium">
                          You've given the vendor a{" "}
                          <span className="text-tradeOrange cursor-pointer">
                            5-minute waiting window
                          </span>{" "}
                          to top up the required collateral. Please be patient
                          while they complete the deposit. If the vdendor
                          doesn't fund their collateral within this period, you
                          can cancel the trade and explore other available
                          offers.
                        </p>
                      </div>

                      <div className="flex gap-2 items-center ">
                        <div className="text-tradeFadeWhite/50 text-sm flex-shrink-0 h-max w-max">
                          <FaCircleInfo />
                        </div>
                        <p className="flex-1 text-xs text-tradeFadeWhite/50 font-medium">
                          Collateral serves as a safety gurantee that ensures
                          the vendor can fulfill the trade without risk of loss
                          to the seller. When the vendor's collateral drops
                          below the threshold, new trades are restricted untill
                          the balance is replenished.
                        </p>
                      </div>

                      <p className="flex-1 text-xs text-tradeFadeWhite/50 font-medium">
                        In the event of any dispute, the{" "}
                        <span className="text-tradeOrange cursor-pointer">
                          P2P Trading Rules
                        </span>{" "}
                        and{" "}
                        <span className="text-tradeOrange cursor-pointer">
                          P2P Protection Policy
                        </span>{" "}
                        will apply. Users who violate these rules will not be
                        eligible for protection.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col-reverse md:flex-row gap-[10px]">
                    <Button variant="Fadeout" disabled={true}>
                      CANCEL
                    </Button>
                  </div>
                </div>

                {/* <div></div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {waitTime?.state && (
        <div>
          <LockByScroll />
          <div className="fixed top-0 left-0 right-0 bottom-0 lg:px-[15px] md:px-[2.5%] p-[35px] bg-black backdrop-blur-sm bg-opacity-80 flex flex-col gap-[40px] items-center justify-center z-50">
            <div className="flex w-[250px] h-max flex-col gap-[10px] ">
              <div className="flex flex-col p-[15px] bg-tradeAshLight gap-[20px] rounded-[15px] border border-tradeAsh ">
                <div className="flex items-center justify-between border-b border-tradeAshExtraLight pb-[15px]">
                  <div className="flex items-center gap-1">
                    {/* <IoMdArrowDropright className="text-lg text-tradeFadeWhite" /> */}
                    <p className="text-tradeFadeWhite hover:text-white text-[15px] font-bold transition-all duration-300 cursor-pointer">
                      SET WAIT TIME
                    </p>
                  </div>

                  <div
                    onClick={closeWaitTime}
                    className="w-max flex text-white hover:text-tradeFadeWhite gap-1 items-center justify-center bg-transparent border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
                  >
                    <IoClose className="text-[16px]" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-[10px]">
                  {["5 mins", "10 mins", "15 mins"].map((t, index) => (
                    <SmallButton
                      variant="fadeoutPlus"
                      onClick={() => handleSetWaitTime(t)}
                      key={index}
                    >
                      {t}
                    </SmallButton>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PreTrade;
