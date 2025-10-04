import React from "react";
import { RiExchangeFundsFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { MdDataExploration } from "react-icons/md";
import { RiExchange2Fill } from "react-icons/ri";

const FloatingTradeButton = () => {
  const navigateTo = useNavigate();

  const handleClick = () => {
    navigateTo("/offers/user/create"); // 👈 change this to your ongoing trades/messages route
  };

  return (
    <div className="fixed bottom-6 right-6 shadow-lg z-20 w-max flex gap-1 items-center justify-center bg-tradeGreen border border-tradeAshExtraLight p-2 h-max rounded-full cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
      {/* Badge */}
      {true > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-semibold px-2 py-[2px] rounded-full shadow-md">
          1
        </span>
      )}

      <button onClick={handleClick}>
        <RiExchange2Fill className="text-5xl" />
      </button>
    </div>
  );
};

export default FloatingTradeButton;
