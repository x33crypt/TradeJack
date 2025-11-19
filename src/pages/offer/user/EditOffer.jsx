import InAppNav from "@/components/others/InAppNav";
import Footer from "@/components/others/Footer";
import React, { useEffect } from "react";
import Loading from "@/components/others/Loading";
import NetworkError from "@/components/others/NetworkError";
import image from "../../../assets/landingImg4.JPG";
import { LuCalendarClock } from "react-icons/lu";
import { LuUsers } from "react-icons/lu";
import { useFetchAboutOffers } from "@/hooks/userHooks/useFetchAboutOffer";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUserOffer } from "@/context/userContext/OffersContext";
import Info from "@/components/alerts/Info";
import { FaCircleInfo } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { HiGlobeAlt } from "react-icons/hi";
import { FaRegUserCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import Button from "@/components/buttons/Button";
import { FaRegStar } from "react-icons/fa";
import { TbCubeSpark } from "react-icons/tb";
import { GrStatusGoodSmall } from "react-icons/gr";
import { GoBookmarkFill } from "react-icons/go";
import { MdBookmarkAdd } from "react-icons/md";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { MdMoreVert } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";
import { HiHashtag } from "react-icons/hi";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { FaSave } from "react-icons/fa";
import { TbSparkles } from "react-icons/tb";

const EditOffer = () => {
  const { id = "" } = useParams();
  const { loading } = useFetchAboutOffers(id);
  const { setAboutOffer, editOffer, setEditOffer } = useUserOffer();

  useEffect(() => {
    if (id) {
      setAboutOffer((prev) => ({
        ...prev,
        id: id,
      }));
    }
  }, [id]);

  const navigateTo = useNavigate();

  const offer = editOffer?.offerDetails;
  const user = editOffer?.traderInfo;

  console.log(offer);
  console.log(user);

  const handleMinLimitChange = (e) => {
    const rawValue = e.target.value.replace(/[^\d]/g, ""); // Remove all non-digit characters

    setCreateOffer((prev) => ({
      ...prev,
      minimum: rawValue,
    }));
  };

  const handleMaxLimitChange = (e) => {
    const rawValue = e.target.value.replace(/[^\d]/g, ""); // Remove all non-digit characters

    setCreateOffer((prev) => ({
      ...prev,
      maximum: rawValue,
    }));
  };

  const handleAddMargin = () => {
    setCreateOffer((prev) => {
      const current = Number(prev.margin || 0);
      const next = current + 1;
      return {
        ...prev,
        margin: next > 80 ? 80 : next,
      };
    });
  };

  const handleMinusMargin = () => {
    setCreateOffer((prev) => {
      const current = Number(prev.margin || 0);
      const next = current - 1;

      if (next < 4) {
        setToast({
          error: true,
          errorMessage: "Profit margin cannot go below 4%",
        });
        return prev; // Return previous state — no update
      }

      return {
        ...prev,
        margin: next,
      };
    });
  };

  // Payment Window Vendor
  const handleAddVendorPaymentWindowHour = () => {
    const current = Number(createOffer?.vendorPaymentWindow?.hours || 0);

    if (current >= 48) {
      setToast({
        error: true,
        success: false,
        errorMessage: "Payment window cannot exceed 48 hours.",
      });
      return;
    }

    setCreateOffer((prev) => ({
      ...prev,
      vendorPaymentWindow: {
        ...prev.vendorPaymentWindow,
        hours: current + 1,
      },
    }));
  };

  const handleMinusVendorPaymentWindowHour = () => {
    const current = Number(createOffer?.vendorPaymentWindow?.hours || 0);

    if (current <= 0) {
      setToast({
        error: true,
        success: false,
        errorMessage: "Payment window cannot be less than 0 hour.",
      });
      return;
    }

    setCreateOffer((prev) => ({
      ...prev,
      vendorPaymentWindow: {
        ...prev.vendorPaymentWindow,
        hours: current - 1,
      },
    }));
  };

  const handleAddVendorPaymentWindowMinutes = () => {
    const currentMinutes = Number(
      createOffer?.vendorPaymentWindow?.minutes || 0
    );
    const currentHours = Number(createOffer?.vendorPaymentWindow?.hours || 0);

    let newMinutes = currentMinutes + 10;
    let newHours = currentHours;

    if (newMinutes >= 60) {
      newMinutes = 0;
      newHours += 1;
    }

    if (newHours > 48) {
      setToast({
        error: true,
        success: false,
        errorMessage: "Payment window cannot exceed 48 hours.",
      });
      return;
    }

    setCreateOffer((prev) => ({
      ...prev,
      vendorPaymentWindow: {
        ...prev.vendorPaymentWindow,
        hours: newHours,
        minutes: newMinutes,
      },
    }));
  };

  const handleMinusVendorPaymentWindowMinutes = () => {
    const currentMinutes = Number(
      createOffer?.vendorPaymentWindow?.minutes || 0
    );
    const currentHours = Number(createOffer?.vendorPaymentWindow?.hours || 0);

    let newMinutes = currentMinutes - 10;
    let newHours = currentHours;

    if (newMinutes < 0) {
      if (newHours === 0) {
        setToast({
          error: true,
          success: false,
          errorMessage:
            "Payment window cannot be less than 0 hours and 0 minutes.",
        });
        return;
      }
      newHours -= 1;
      newMinutes = 50;
    }

    setCreateOffer((prev) => ({
      ...prev,
      vendorPaymentWindow: {
        ...prev.vendorPaymentWindow,
        hours: newHours,
        minutes: newMinutes,
      },
    }));
  };

  // Payment Window Trader
  const handleAddTraderPaymentWindowHour = (e) => {
    const current = Number(createOffer?.tradersPaymentWindow?.hours || 0);

    if (current >= 48) {
      setToast({
        error: true,
        success: false,
        errorMessage: "Payment window cannot exceed 48 hours.",
      });
      return;
    }

    setCreateOffer((prev) => ({
      ...prev,
      tradersPaymentWindow: {
        ...prev.tradersPaymentWindow,
        hours: current + 1,
      },
    }));
  };

  const handleMinusTraderPaymentWindowHour = (e) => {
    const current = Number(createOffer?.tradersPaymentWindow?.hours || 0);

    if (current <= 0) {
      setToast({
        error: true,
        success: false,
        errorMessage: "Payment window cannot be less than 0 hour.",
      });
      return;
    }

    setCreateOffer((prev) => ({
      ...prev,
      tradersPaymentWindow: {
        ...prev.tradersPaymentWindow,
        hours: current - 1,
      },
    }));
  };

  const handleAddTraderPaymentWindowMinutes = (e) => {
    const currentMinutes = Number(
      createOffer?.tradersPaymentWindow?.minutes || 0
    );
    const currentHours = Number(createOffer?.tradersPaymentWindow?.hours || 0);

    let newMinutes = currentMinutes + 10;
    let newHours = currentHours;

    if (newMinutes >= 60) {
      newMinutes = 0;
      newHours += 1;
    }

    if (newHours > 48) {
      setToast({
        error: true,
        success: false,
        errorMessage: "Payment window cannot exceed 48 hours.",
      });
      return;
    }

    setCreateOffer((prev) => ({
      ...prev,
      tradersPaymentWindow: {
        ...prev.tradersPaymentWindow,
        hours: newHours,
        minutes: newMinutes,
      },
    }));
  };

  const handleMinusTraderPaymentWindowMinutes = () => {
    const currentMinutes = Number(
      createOffer?.tradersPaymentWindow?.minutes || 0
    );
    const currentHours = Number(createOffer?.tradersPaymentWindow?.hours || 0);

    let newMinutes = currentMinutes - 10;
    let newHours = currentHours;

    if (newMinutes < 0) {
      if (newHours === 0) {
        setToast({
          error: true,
          success: false,
          errorMessage:
            "Payment window cannot be less than 0 hours and 0 minutes.",
        });
        return;
      }
      newHours -= 1;
      newMinutes = 50;
    }

    setCreateOffer((prev) => ({
      ...prev,
      tradersPaymentWindow: {
        ...prev.tradersPaymentWindow,
        hours: newHours,
        minutes: newMinutes,
      },
    }));
  };

  const handleInstruction = (e) => {
    setCreateOffer((prev) => ({
      ...prev,
      instruction: e.target.value,
    }));
  };

  return (
    <>
      <InAppNav />
      <div className="md:pt-[70px] pt-[57px] lg:px-[2%] md:px-[10px] min-h-svh flex bg-black">
        <div className="flex flex-1 flex-col gap-[20px] lg:mx-[22.8%] p-[15px]">
          <div className="flex flex-1 flex-col gap-[20px]">
            <div className="flex  items-center justify-between ">
              <p className="text-lg font-semibold text-white flex items-center gap-1">
                EDIT OFFER
              </p>
            </div>

            <div className="flex flex-col flex-1 ">
              {loading ? (
                <Loading />
              ) : (
                <div className="flex flex-1">
                  {offer?.data === null ? (
                    <NetworkError />
                  ) : (
                    <div className="flex flex-1 flex-col min-h-[120px] gap-[30px]">
                      {/* Vendor Info */}
                      <div className="flex items-center justify-between gap-[10px] bg-tradeAsh border border-tradeAshLight rounded-[15px] p-[12px]">
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
                          <div className="flex items-center gap-1">
                            <div className="p-0.2 border border-tradeAshExtraLight rounded-full">
                              <GrStatusGoodSmall className="flex text-tradeGreen text-[10px] flex-shrink-0" />
                            </div>
                            <p className="text-tradeFadeWhite text-[13px] font-semibold leading-none">
                              Live
                            </p>
                          </div>
                          <p className="text-tradeAshLight leading-none">|</p>
                          <div className="flex items-center gap-1">
                            <p className="text-white text-[13px] font-semibold leading-none">
                              1.3k{" "}
                              <span className="text-tradeFadeWhite">Saved</span>
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Offer Info */}
                      <div className="flex items-start justify-between">
                        <div className="flex flex-col gap-[10px] ">
                          <p className="text-tradeOrange text-xl font-semibold md:w-max w-[200px leading-none">
                            {offer?.serviceName || "N/A"}
                          </p>

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
                            <div className="flex gap-1 items-center">
                              <LuCalendarClock className="flex text-tradeFadeWhite text-sm flex-shrink-0" />
                              <p className="text-xs font-semibold text-white">
                                31 Aug, 2045
                              </p>
                            </div>
                            <p className="text-tradeAshLight leading-none">|</p>
                            {user?.isVerifiedOffer ? (
                              <div className="flex gap-1 items-center">
                                <AiOutlineSafetyCertificate className="flex text-tradeFadeWhite text-sm flex-shrink-0" />
                                <p className="text-xs font-semibold text-white">
                                  Verified
                                </p>
                              </div>
                            ) : (
                              <div className="flex gap-1 items-center">
                                <TbSparkles className="flex text-tradeFadeWhite text-sm flex-shrink-0" />
                                <p className="text-xs font-semibold text-white">
                                  New
                                </p>
                              </div>
                            )}
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
                          <FaSave />
                        </div>
                      </div>

                      {/* Edit Fields */}
                      <div className="flex flex-col gap-[10px]">
                        {/* Limit */}
                        <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                          <div className="flex flex-1 items-center justify-between">
                            <p className="text-[13px] text-tradeFadeWhite font-semibold">
                              Purchase Limit
                            </p>

                            <div className="flex items-center gap-2">
                              <p className="text-tradeFadeWhite text-xs font-medium">
                                20.00 - 5,000,00.00
                              </p>
                              <FaCircleInfo className="text-tradeOrange text-sm flex-shrink-0" />
                            </div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px] overflow-hidden">
                              <input
                                className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none"
                                placeholder="0.00"
                                value={
                                  offer?.purchaseLimit?.minimum
                                    ? Number(
                                        offer?.purchaseLimit?.minimum
                                      ).toLocaleString()
                                    : ""
                                }
                                // onChange={(e) => handleMinLimitChange(e)}
                              />
                              <div className="w-[60px] flex justify-center p-[12px] text-sm font-semibold text-tradeFadeWhite border-l border-tradeAsh">
                                <p>Min</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px] overflow-hidden">
                              <input
                                className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none"
                                type="text"
                                placeholder="0.00"
                                value={
                                  offer?.purchaseLimit?.maximum
                                    ? Number(
                                        offer?.purchaseLimit?.maximum
                                      ).toLocaleString()
                                    : ""
                                }
                                // onChange={(e) => handleMaxLimitChange(e)}
                              />
                              <div className="w-[60px] flex justify-center p-[12px] text-sm font-semibold text-tradeFadeWhite border-l border-tradeAsh">
                                <p>Max</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Profit Margin */}
                        <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                          <div className="flex flex-1 items-center justify-between">
                            <p className="text-[13px] text-tradeFadeWhite font-semibold">
                              Profit Margin
                            </p>

                            <FaCircleInfo className="text-tradeOrange text-sm flex-shrink-0" />
                          </div>

                          <div>
                            <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px] overflow-hidden">
                              <div
                                // onClick={handleMinusMargin}
                                className="w-[60px] flex justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite border-r border-tradeAsh hover:bg-tradeAshExtraLight transition-all duration-300 cursor-pointer"
                              >
                                <FaMinus />
                              </div>

                              <div
                                // onClick={handleAddMargin}
                                className="flex-1 flex justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite"
                              >
                                <p>
                                  <span className="font-bold text-white">
                                    {offer?.marginRate?.ratePercent > 0
                                      ? "+"
                                      : ""}
                                    {offer?.marginRate?.ratePercent}%
                                  </span>{" "}
                                  profit margin
                                </p>
                              </div>

                              <div
                                // onClick={handleAddMargin}
                                className="w-[60px] flex justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite border-l border-tradeAsh hover:bg-tradeAshExtraLight transition-all duration-300 cursor-pointer"
                              >
                                <FaPlus />
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1">
                            {/* <p className="text-tradeFadeWhite text-xs font-medium">
                              Rate :
                            </p> */}
                            <p className="text-tradeOrange text-xs font-medium">
                              1 USD = NGN 1030.00
                            </p>
                          </div>
                        </div>

                        {/* Transfer Window */}
                        <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                          <div className="flex flex-1 items-center justify-between">
                            <p className="text-[13px] text-tradeFadeWhite font-semibold">
                              Transfer Window
                            </p>

                            <FaCircleInfo className="text-tradeOrange text-sm flex-shrink-0" />
                          </div>

                          <div>
                            <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px] overflow-hidden">
                              <div className="w-[60px] flex justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite border-r border-tradeAsh hover:bg-tradeAshExtraLight transition-all duration-300 cursor-pointer">
                                <FaMinus />
                              </div>

                              <div
                                // onClick={handleAddMargin}
                                className="flex-1 flex justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite"
                              >
                                <p>
                                  <span className="font-bold text-white">
                                    {offer?.paymentWindow?.transfer?.hours}
                                  </span>{" "}
                                  hour&#40;s&#41;
                                </p>
                              </div>

                              <div className="w-[60px] flex justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite border-l border-tradeAsh hover:bg-tradeAshExtraLight transition-all duration-300 cursor-pointer">
                                <FaPlus />
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px] overflow-hidden">
                              <div className="w-[60px] flex justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite border-r border-tradeAsh hover:bg-tradeAshExtraLight transition-all duration-300 cursor-pointer">
                                <FaMinus />
                              </div>

                              <div
                                // onClick={handleAddMargin}
                                className="flex-1 flex justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite"
                              >
                                <p>
                                  <span className="font-bold text-white">
                                    {offer?.paymentWindow?.transfer?.minutes}
                                  </span>{" "}
                                  minutes
                                </p>
                              </div>
                              <div className="w-[60px] flex justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite border-l border-tradeAsh hover:bg-tradeAshExtraLight transition-all duration-300 cursor-pointer">
                                <FaPlus />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Release Window */}
                        <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                          <div className="flex flex-1 items-center justify-between">
                            <p className="text-[13px] text-tradeFadeWhite font-semibold">
                              Release Window
                            </p>

                            <FaCircleInfo className="text-tradeOrange text-sm flex-shrink-0" />
                          </div>
                          <div>
                            <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px] overflow-hidden">
                              <div className="w-[60px] flex justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite border-r border-tradeAsh hover:bg-tradeAshExtraLight transition-all duration-300 cursor-pointer">
                                <FaMinus />
                              </div>

                              <div className="flex-1 flex justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite">
                                <p>
                                  <span className="font-bold text-white">
                                    {offer?.paymentWindow?.release?.hours}
                                  </span>{" "}
                                  hour&#40;s&#41;
                                </p>
                              </div>

                              <div className="w-[60px] flex justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite border-l border-tradeAsh hover:bg-tradeAshExtraLight transition-all duration-300 cursor-pointer">
                                <FaPlus />
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px] overflow-hidden">
                              <div className="w-[60px] flex justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite border-r border-tradeAsh hover:bg-tradeAshExtraLight transition-all duration-300 cursor-pointer">
                                <FaMinus />
                              </div>

                              <div className="flex-1 flex justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite">
                                <p>
                                  <span className="font-bold text-white">
                                    {offer?.paymentWindow?.release?.minutes}
                                  </span>{" "}
                                  minutes
                                </p>
                              </div>
                              <div className="w-[60px] flex justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite border-l border-tradeAsh hover:bg-tradeAshExtraLight transition-all duration-300 cursor-pointer">
                                <FaPlus />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                          <div className="flex flex-1 items-center justify-between">
                            <p className="text-[13px] text-tradeFadeWhite font-semibold">
                              Tags
                            </p>

                            <FaCircleInfo className="text-tradeOrange text-sm flex-shrink-0" />
                          </div>

                          <div className="flex-1 flex bg-tradeAshLight relative border border-tradeAshLight rounded-[10px] cursor-pointer">
                            <input
                              className={`bg-transparent flex-1 p-[12px] border-none outline-none placeholder:text-tradeFadeWhite text-sm font-medium leading-none cursor-pointer`}
                              type="text"
                              readOnly
                              placeholder="Select tags"
                              // onClick={() =>
                              //   setSelect({
                              //     ...select,
                              //     state: true,
                              //     selectOne: true,
                              //     selectTwo: false,
                              //     element: "terms",
                              //     pick: "",
                              //     page: "create offer",
                              //     options: offerTermTags,
                              //   })
                              // }
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                              <MdKeyboardArrowDown />
                            </div>
                          </div>

                          <div className="flex  rounded-[10px] ">
                            {offer?.tags?.length > 0 ? (
                              <div className={`flex gap-[5px] flex-wrap`}>
                                {offer?.tags.map((tag, index) => (
                                  <div className="flex w-max items-center gap-[8px] px-[8px] py-[4px] rounded-[8px] bg-tradeAshLight">
                                    <p
                                      key={index}
                                      className="text-[13px] font-semibold text-tradeFadeWhite"
                                    >
                                      {tag}
                                    </p>
                                    <IoClose
                                      className="text-tradeFadeWhite hover:text-red-600 text-[16px] cursor-pointer transition-all duration-300"
                                      // onClick={() => {
                                      //   setoffer(
                                      //     (prev) => ({
                                      //       ...prev,
                                      //       termTags: prev.termTags.filter(
                                      //         (_, i) => i !== index
                                      //       ),
                                      //     })
                                      //   );
                                      // }}
                                    />
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div>
                                <p className="text-tradeFadeWhite text-xs font-medium">
                                  No terms selected
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Instruction */}
                        <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                          <div className="flex flex-1 items-center justify-between">
                            <p className="text-[13px] text-tradeFadeWhite font-semibold">
                              Instructions
                            </p>

                            <FaCircleInfo className="text-tradeOrange text-sm flex-shrink-0" />
                          </div>
                          <div className="flex-1 flex bg-tradeAshLight relative border border-tradeAshLight rounded-[10px] cursor-pointer">
                            <textarea
                              // onChange={handleInstruction}
                              value={offer?.instructions}
                              className=" min-h-[45px] w-full bg-transparent border-none p-[12px] text-white text-sm font-medium placeholder-tradeFadeWhite focus:outline-none resize-non"
                              placeholder="Write your trade Instructions here."
                            ></textarea>
                          </div>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex gap-2 items-center ">
                        <div className="text-tradeFadeWhite/50 text-sm flex-shrink-0 h-max w-max">
                          <FaCircleInfo />
                        </div>

                        <div className="flex flex-col gap-[5px]">
                          <p className="flex-1 text-xs text-tradeFadeWhite/50 font-medium">
                            Any changes made to your offer will temporarily
                            pause its visibility while our system reviews the
                            updates for accuracy and compliance. This brief
                            review helps ensure fair trading conditions and
                            protects both parties from potential discrepancies.
                            Once the review is complete, your offer will be
                            automatically reactivated and made visible to other
                            users.
                          </p>
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex flex-col gap-[10px]">
                        <Button variant="secondary">UPDATE</Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default EditOffer;
