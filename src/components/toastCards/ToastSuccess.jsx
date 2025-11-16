import React from "react";
import { useToast } from "@/context/otherContext/ToastContext";
import { IoMdCheckmarkCircle } from "react-icons/io";

const ToastSuccess = () => {
  const { toast, setToast } = useToast();

  return (
    <div
      className="fixed z-50 w-full px-[15px] md:px-[2.5%] lg:px-0 
             top-[65px] lg:top-[70px] left-1/2 transform -translate-x-1/2 
             flex justify-center pointer-events-none "
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
          className="flex items-center gap-3 bg-tradeAshLight border border-tradeAshExtraLight p-[12px] rounded-[10px] shadow-md lg:max-w-[400px] md:max-w-[50%] max-w-full min-w-[300px] toast-animate-fadeInOut cursor-pointer pointer-events-auto"
        >
          <IoMdCheckmarkCircle className="text-[16px] text-tradeGreen shrink-0" />
          <p className="text-[13px] text-white font-semibold">
            {toast.successMessage}
          </p>
        </div>
      )}
    </div>
  );
};

export default ToastSuccess;
