import React, { useEffect, useState } from "react";
import { useToast } from "@/context/ToastContext";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

const ToastSuccess = () => {
  const { toast, setToast } = useToast();

  return (
    <div className="fixed flex items-center justify-center top-[20px] left-1/2 transform -translate-x-1/2 z-50 space-y-2 lg:top-auto lg:bottom-[15px] lg:px-[2%] md:px-[2.5%] px-[15px] bg-transparent w-full">
      {toast.success && (
        <div
          onClick={() =>
            setToast((prev) => ({
              ...prev,
              success: false,
              successMessage: "",
            }))
          }
          className="flex items-center gap-3 bg-tradeAsh text-white border border-tradeGreen p-4 rounded-[10px] shadow-md md:w-[350px] w-full text-center text-[13px] font-semibold toast-animate-fadeInOut"
        >
          <div>
            <IoCheckmarkDoneCircleSharp className="text-[20px] text-tradeGreen" />
          </div>
          <p>{toast.successMessage}</p>
        </div>
      )}
    </div>
  );
};

export default ToastSuccess;
