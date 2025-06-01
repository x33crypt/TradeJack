import React from "react";
import { useNavigate } from "react-router-dom";
import { CiBank } from "react-icons/ci";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { BiSolidCapsule } from "react-icons/bi";
import { FcApprove } from "react-icons/fc";
import { MdOutlineDeviceThermostat } from "react-icons/md";
import { TbArrowBigUpLines } from "react-icons/tb";

const MyOfferCard = (props) => {
  const navigateTo = useNavigate();

  const handleOfferClick = (offerId) => {
    navigateTo(`/offer/${offerId}`);
  };

  return (
    <>
      <div
        // onClick={() => handleOfferClick(props.offerId)}
        className="md:flex items-center hidden border-t bg-tradeAsh border-tradeAshLight hover:bg-black cursor-pointer transition-all duration-300 hover:shadow-lg rounded- overflow-hidden"
      >
        {/* Bank Info Section */}
        <div className="flex flex-1 px-4 py-6 gap-5 items-center border-r border-tradeAshLight">
          <CiBank className="text-tradeAshLight text-[28px]" />
          <div className="flex flex-col gap-1">
            <p className="text-tradeOrange text-sm font-bold">Wells Fargo</p>
            <p className="text-white text-xs font-medium">
              Direct Bank Transfer
            </p>
          </div>
        </div>

        {/* Purchase Limits Section */}
        <div className="flex flex-col justify-center flex-1 px-4 py-6 gap-1 border-r border-tradeAshLight">
          <div className="flex justify-between items-center">
            <p className=" flex md:hidden lg:flex  text-xs font-semibold  text-white">
              Min Purchase
            </p>
            <p className="  hidden md:flex lg:hidden   text-xs font-semibold  text-white">
              Minimum
            </p>

            <p className="text-sm font-bold text-white">
              200 {props.currency?.code}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className=" flex md:hidden lg:flex  text-xs font-semibold  text-white">
              Max Purchase
            </p>
            <p className="  hidden md:flex lg:hidden  text-xs font-semibold  text-white">
              Maximum
            </p>
            <p className=" text-sm font-bold text-white">
              1000 {props.currency?.code}
            </p>
          </div>
        </div>

        {/* Rate Info Section */}
        <div className="flex flex-col justify-center items-start flex-1 px-4 py-6 gap-2 border-l border-tradeAshLight">
          <div className="flex flex-col gap-1">
            {/* <div className="flex items-center gap-2">
              <p className="text-sm font-bold text-white">
                1 {props.currency?.code}
              </p>
              <FaArrowRightArrowLeft className="text-tradeOrange text-xs" />
              <p className="text-sm font-bold text-white">NGN 750.00</p>
            </div> */}

            <div className="flex items-center gap-2">
              <TbArrowBigUpLines className="text-tradeGreen text-xs " />
              <p className="text-xs font-semibold text-tradeGreen">
                +{props.margin}.00% Margin
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyOfferCard;
