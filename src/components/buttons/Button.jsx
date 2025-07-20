import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  maxWidth = "",
}) => {
  const baseStyles =
    "p-[12px] rounded-[10px] text-sm font-semibold transition-all duration-300 w-full flex items-center justify-center gap-2";

  const variants = {
    primary: ` ${
      disabled ? "bg-tradeAsh text-tradeGreen" : "bg-tradeGreen text-black"
    } hover:bg-tradeGreen/80 active:bg-tradeAsh active:text-tradeGreen transition-colors duration-200`,

    secondary: ` ${
      disabled
        ? "bg-tradeAsh text-tradeOrange hover:bg-transparent"
        : "bg-tradeOrange text-black"
    } hover:bg-tradeOrange/80 active:bg-tradeAsh active:text-tradeOrange transition-colors duration-200`,

    Fadeout: ` ${
      disabled
        ? "bg-tradeAsh text-tradeFadeWhite hover:bg-transparent"
        : "bg-tradeAshLight text-white"
    }  hover:bg-tradeAshLight/80 active:bg-tradeAsh active:text-tradeFadeWhite transition-colors duration-200`,

    outline: `${
      disabled
        ? "bg-transparent text-tradeFadeWhite hover:bg-transparent"
        : "bg-transparent text-tradeFadeWhite"
    }  hover:text-white active:text-tradeFadeWhite border border-tradeAshLight hover:border-tradeAshExtraLight transition-colors duration-200`,

    danger: `${
      disabled
        ? "text-red-700"
        : "text-white"
    } bg-red-600 hover:text-white border border-red-600 active:text-red-700 underline-offset-4 hover:underline transition-colors duration-200`,

    ghost: `${
      disabled
        ? "text-white hover:bg-transparent"
        : "bg-transparent text-tradeOrange"
    }  bg-transparent text-tradeOrange hover:text-tradeOrange underline-offset-4 hover:underline active:text-white transition-all duration-150`,
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={disabled ? () => {} : onClick}
      className={`${baseStyles} ${variants[variant]} ${maxWidth} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {disabled ? (
        <AiOutlineLoading3Quarters className="animate-spin text-[16px]" />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
