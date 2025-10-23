import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigateTo = useNavigate();

  return (
    <div className="flex-1 bg-black lg:p-[2%] md:p-[2.5%] p-[15px] flex flex-col gap-[40px]">
      <div className="flex justify-between items-center w-full py-[15px]">
        <p className="text-tradeAshExtraLight text-xs font-semibold">
          GOGETSWAP INC, @{currentYear}
        </p>

        <div className="flex gap-2">
          <div className=" text-tradeAshExtraLight hover:text-tradeFadeWhite text-base p-1.5 w-max h-max bg-transparent border border-tradeAshExtraLight rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
            <FaXTwitter />
          </div>
          <div className=" text-tradeAshExtraLight hover:text-tradeFadeWhite text-base p-1.5 w-max h-max bg-transparent border border-tradeAshExtraLight rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
            <FaTelegramPlane />
          </div>
          <div className=" text-tradeAshExtraLight hover:text-tradeFadeWhite text-base p-1.5 w-max h-max bg-transparent border border-tradeAshExtraLight rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
            <FaInstagram />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
