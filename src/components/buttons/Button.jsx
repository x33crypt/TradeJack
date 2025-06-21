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
    primary:
      "bg-tradeGreen text-black hover:bg-tradeGreen/80 active:bg-tradeAsh active:text-tradeGreen transition-colors duration-200",
    outline:
      "bg-transparent text-tradeFadeWhite hover:text-white active:text-tradeFadeWhite border border-tradeAshLight hover:border-tradeAshExtraLight transition-colors duration-200",
    danger:
      "bg-red-500 text-white hover:bg-red-600 active:bg-red-700 border border-transparent transition-colors duration-200",
    ghost:
      "bg-transparent text-tradeOrange hover:text-tradeOrange underline-offset-4 hover:underline active:text-tradeFadeWhite transition-all duration-150",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${maxWidth} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;