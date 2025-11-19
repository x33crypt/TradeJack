import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const MiniButton = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  active = false,
}) => {
  const baseStyles =
    "relative flex text-xs font-bold leading-none  items-center gap-2 px-[10px] py-[5px] w-max rounded-sm transition-all duration-300 cursor-pointer";

  const variants = {
    primary: `${
      active
        ? "text-black bg-tradeOrange hover:bg-tradeOrange/80 active:bg-tradeOrange/60"
        : "text-tradeFadeWhite bg-tradeAshLight/50 hover:text-black  hover:bg-tradeOrange active:bg-tradeOrange/60"
    }`,
  };

  return (
    <div
      type={type}
      active={active}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {children}
    </div>
  );
};

export default MiniButton;
