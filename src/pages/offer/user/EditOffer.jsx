import InAppNav from "@/components/others/InAppNav";
import Footer from "@/components/others/Footer";
import React from "react";
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

const EditOffer = () => {
  // const { id } = useParams();
  const { loading } = useFetchAboutOffers();
  const { editOffer, setEditOffer } = useUserOffer();

  console.log(editOffer);

  const navigateTo = useNavigate();

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
      <div className="md:pt-[70px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex bg-black">
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
                  {editOffer?.offerDetails?.data === null ? (
                    <NetworkError />
                  ) : (
                    <div className="flex flex-1 flex-col min-h-[120px] gap-[30px]">
                      <div className="flex flex-col gap-[30px] pb-[12px]">
                        <div className="flex items-center gap-2">
                          <div>
                            <TbCubeSpark className="text-white text-5xl" />
                          </div>

                          <div className="flex flex-col gap-[5px] ">
                            <p className="text-tradeOrange text-xl font-semibold md:w-max w-[200px leading-normal">
                              {editOffer?.offerDetails?.serviceName || "N/A"}
                            </p>
                            <p className="text-tradeFadeWhite text-[13px] font-semibold leading-none">
                              {editOffer?.offerDetails?.serviceType || "N/A"}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col gap-[10px]">
                          <div className="flex  items-center gap-1">
                            <GrStatusGoodSmall className="flex text-tradeGreen text-xs flex-shrink-0" />
                            <p className="text-xs font-semibold text-white">
                              Active 
                            </p>
                          </div>
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
                          <div className="flex gap-1 items-center">
                            <GoBookmarkFill className="flex text-tradeFadeWhite text-sm flex-shrink-0" />
                            <p className="text-xs font-semibold text-white">
                              123 Bookmarks
                            </p>
                          </div>

                          <div className="flex  items-center gap-1">
                            <LuUsers className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                            <p className="text-xs font-semibold text-white">
                              {editOffer?.offerDetails?.completedTrades ?? "0"}{" "}
                              Completed Trade(s)
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

                      <div className="flex flex-col gap-[10px]">
                        {/* Limit */}
                        <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] borde border-tradeAshLight">
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
                                  editOffer?.offerDetails?.purchaseLimit
                                    ?.minimum
                                    ? Number(
                                        editOffer?.offerDetails?.purchaseLimit
                                          ?.minimum
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
                                  editOffer?.offerDetails?.purchaseLimit
                                    ?.maximum
                                    ? Number(
                                        editOffer?.offerDetails?.purchaseLimit
                                          ?.maximum
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
                        <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] borde border-tradeAshLight">
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
                                    {editOffer?.offerDetails?.marginRate
                                      ?.ratePercent > 0
                                      ? "+"
                                      : ""}
                                    {
                                      editOffer?.offerDetails?.marginRate
                                        ?.ratePercent
                                    }
                                    %
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

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <HiGlobeAlt className="text-tradeFadeWhite text-base flex-shrink-0" />
                              <p className="text-white text-xs font-medium">
                                1 USD = 2,300
                              </p>
                            </div>

                            <div className="flex items-center gap-1">
                              <FaRegUserCircle className="text-tradeFadeWhite text-sm flex-shrink-0" />
                              <p className="text-white text-xs font-medium">
                                1 USD = 2,300
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Transfer Window */}
                        <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] borde border-tradeAshLight">
                          <div className="flex flex-1 items-center justify-between">
                            <p className="text-[13px] text-tradeFadeWhite font-semibold">
                              Transfer Window
                            </p>

                            <FaCircleInfo className="text-tradeOrange text-sm flex-shrink-0" />
                          </div>

                          <div>
                            <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px] overflow-hidden">
                              <div
                                // onClick={handleMinusTraderPaymentWindowHour}
                                className="w-[60px] flex gap-1 justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite border-r border-tradeAsh hover:bg-tradeAshExtraLight transition-all duration-300 cursor-pointer"
                              >
                                - <p>Hr</p>
                              </div>

                              <div
                                // onClick={handleAddMargin}
                                className="flex-1 flex justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite"
                              >
                                <p>
                                  <span className="font-bold text-white">
                                    {
                                      editOffer?.offerDetails?.paymentWindow
                                        ?.transfer?.hours
                                    }
                                  </span>{" "}
                                  hour&#40;s&#41;
                                </p>
                              </div>

                              <div
                                // onClick={handleAddTraderPaymentWindowHour}
                                className="w-[60px] flex gap-1 justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite border-l border-tradeAsh hover:bg-tradeAshExtraLight transition-all duration-300 cursor-pointer"
                              >
                                + <p>Hr</p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px] overflow-hidden">
                              <div
                                // onClick={handleMinusTraderPaymentWindowMinutes}
                                className="w-[60px] flex gap-1 justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite border-r border-tradeAsh hover:bg-tradeAshExtraLight transition-all duration-300 cursor-pointer"
                              >
                                <p>- Min</p>
                              </div>

                              <div
                                // onClick={handleAddMargin}
                                className="flex-1 flex justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite"
                              >
                                <p>
                                  <span className="font-bold text-white">
                                    {
                                      editOffer?.offerDetails?.paymentWindow
                                        ?.transfer?.minutes
                                    }
                                  </span>{" "}
                                  minutes
                                </p>
                              </div>
                              <div
                                // onClick={handleAddTraderPaymentWindowMinutes}
                                className="w-[60px] flex gap-1 justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite border-l border-tradeAsh hover:bg-tradeAshExtraLight transition-all duration-300 cursor-pointer"
                              >
                                + <p>Min</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Release Window */}
                        <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] borde border-tradeAshLight">
                          <div className="flex flex-1 items-center justify-between">
                            <p className="text-[13px] text-tradeFadeWhite font-semibold">
                              Release Window
                            </p>

                            <FaCircleInfo className="text-tradeOrange text-sm flex-shrink-0" />
                          </div>
                          <div>
                            <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px] overflow-hidden">
                              <div
                                // onClick={handleMinusVendorPaymentWindowHour}
                                className="w-[60px] flex gap-1 justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite border-r border-tradeAsh hover:bg-tradeAshExtraLight transition-all duration-300 cursor-pointer"
                              >
                                <p>- Hr</p>
                              </div>

                              <div className="flex-1 flex justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite">
                                <p>
                                  <span className="font-bold text-white">
                                    {
                                      editOffer?.offerDetails?.paymentWindow
                                        ?.release?.hours
                                    }
                                  </span>{" "}
                                  hour&#40;s&#41;
                                </p>
                              </div>

                              <div
                                // onClick={handleAddVendorPaymentWindowHour}
                                className="w-[60px] flex gap-1 justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite border-l border-tradeAsh hover:bg-tradeAshExtraLight transition-all duration-300 cursor-pointer"
                              >
                                <p>+ Hr</p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px] overflow-hidden">
                              <div
                                // onClick={handleMinusVendorPaymentWindowMinutes}
                                className="w-[60px] flex gap-1 justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite border-r border-tradeAsh hover:bg-tradeAshExtraLight transition-all duration-300 cursor-pointer"
                              >
                                <p>- Min</p>
                              </div>

                              <div className="flex-1 flex justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite">
                                <p>
                                  <span className="font-bold text-white">
                                    {
                                      editOffer?.offerDetails?.paymentWindow
                                        ?.release?.minutes
                                    }
                                  </span>{" "}
                                  minutes
                                </p>
                              </div>
                              <div
                                // onClick={handleAddVendorPaymentWindowMinutes}
                                className="w-[60px] flex gap-1 justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite border-l border-tradeAsh hover:bg-tradeAshExtraLight transition-all duration-300 cursor-pointer"
                              >
                                <p>+ Min</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] borde border-tradeAshLight">
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
                            {editOffer?.offerDetails?.tags?.length > 0 ? (
                              <div className={`flex gap-[5px] flex-wrap`}>
                                {editOffer?.offerDetails?.tags.map(
                                  (tag, index) => (
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
                                        //   seteditOffer?.offerDetails(
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
                                  )
                                )}
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
                        <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] borde border-tradeAshLight">
                          <div className="flex flex-1 items-center justify-between">
                            <p className="text-[13px] text-tradeFadeWhite font-semibold">
                              Instructions
                            </p>

                            <FaCircleInfo className="text-tradeOrange text-sm flex-shrink-0" />
                          </div>
                          <div className="flex-1 flex bg-tradeAshLight relative border border-tradeAshLight rounded-[10px] cursor-pointer">
                            <textarea
                              // onChange={handleInstruction}
                              value={editOffer?.offerDetails?.instructions}
                              className=" min-h-[45px] w-full bg-transparent border-none p-[12px] text-white text-sm font-medium placeholder-tradeFadeWhite focus:outline-none resize-non"
                              placeholder="Write your trade Instructions here."
                            ></textarea>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <p className="text-xs font-semibold text-white">
                          Note:
                        </p>
                        <p className="text-xs font-medium text-tradeFadeWhite">
                          Once you make changes, your offer will be paused for a
                          quick review. Don’t worry, it’ll go live again
                          automatically after approval.
                        </p>
                      </div>

                      <div className="flex flex-col gap-[10px]">
                        <Button variant="secondary">UPDATE</Button>
                        <Button variant="outline">CANCEL</Button>
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
