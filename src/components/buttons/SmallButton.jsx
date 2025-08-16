import React from "react";

const SmallButton = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
}) => {
  const baseStyles =
    "flex items-center gap-1 w-max px-[8px] py-[4px] text-[13px] font-semibold rounded-[6.5px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]";

  const variants = {
    primary: ` ${"flex items-center gap-1 w-max px-[8px] py-[4px] text-[13px] text-black font-semibold bg-tradeGreen hover:bg-tradeGreen/80 active:bg-tradeGreen rounded-[6.5px] borde border-tradeAshExtraLight cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"}`,

    fadeoutPlus: ` ${
      disabled
        ? "text-white active:text-tradeFadeWhite bg-tradeAshLight border border-tradeGreen"
        : "text-tradeFadeWhite hover:text-white active:text-tradeFadeWhite bg-tradeAshLight  border border-tradeAshExtraLight "
    }`,

    fadeout: ` ${
      disabled
        ? "text-tradeGreen active:text-tradeFadeWhite bg-tradeAshLight border  border-tradeAshLight"
        : "text-tradeFadeWhite hover:text-white active:text-tradeFadeWhite bg- border border-tradeAshLight "
    }`,

    outline: `${"flex items-center gap-1 w-max px-[8px] py-[4px] text-[13px] text-tradeFadeWhite font-semibold  hover:text-white active:text-tradeFadeWhite rounded-[6.5px] border border-tradeAshExtraLight cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"}`,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {children}
    </button>
  );
};

export default SmallButton;
