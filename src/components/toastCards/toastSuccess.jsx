import React, { useEffect, useState } from "react";
import { useToast } from "@/context/ToastContext";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

const ToastSuccess = () => {
  const { toast, setToast } = useToast();

  return (
    <div
      className="fixed z-50 w-full px-[15px] md:px-[2.5%] lg:px-0
             top-[15px] left-1/2 transform -translate-x-1/2 flex justify-center
             lg:top-auto lg:bottom-[15px] pointer-events-none"
    >
      {toast.success && (
        <div
          onClick={() =>
            setToast((prev) => ({
              ...prev,
              success: false,
              successMessage: "",
            }))
          }
          className="flex items-center gap-3 bg-black border border-tradeGreen p-4 rounded-[10px] shadow-md w-full md:w-[50%] lg:w-[360px] toast-animate-fadeInOut cursor-pointer pointer-events-auto"
        >
          <IoCheckmarkDoneCircleSharp className="text-[18px] text-tradeGreen shrink-0" />
          <p className="text-[13px] text-white font-semibold">
            {toast.successMessage}
          </p>
        </div>
      )}
    </div>
  );
};

export default ToastSuccess;
