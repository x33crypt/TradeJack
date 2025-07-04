import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  maxWidth = "",
}) => {
  const baseStyles =
    "p-[12px] rounded-[10px] text-sm font-semibold transition-all duration-300 w-full";

  const variants = {
    primary: ` ${
      disabled ? "bg-tradeAsh text-tradeGreen" : "bg-tradeGreen text-black"
    } hover:bg-tradeGreen/80 active:bg-tradeAsh active:text-tradeGreen transition-colors duration-200`,

    secondary: ` ${
      disabled ? "bg-tradeAsh text-tradeOrange" : "bg-tradeOrange text-black"
    } hover:bg-tradeOrange/80 active:bg-tradeAsh active:text-tradeOrange transition-colors duration-200`,
    Fadeout:
      " bg-tradeAshLight text-white hover:bg-tradeAshLight/80 active:bg-tradeAsh active:text-tradeFadeWhite transition-colors duration-200",
    outline:
      "bg-transparent text-tradeFadeWhite hover:text-white active:text-tradeFadeWhite border border-tradeAshLight hover:border-tradeAshExtraLight transition-colors duration-200",
    danger:
      "bg-transparent text-red-500 hover:text-red-600 active:text-red-700 underline-offset-4 hover:underline transition-colors duration-200",
    ghost:
      "bg-transparent text-tradeOrange hover:text-tradeOrange underline-offset-4 hover:underline active:text-white transition-all duration-150",
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
      {children}
    </button>
  );
};

export default Button;
