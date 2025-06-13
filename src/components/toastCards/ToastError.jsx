import React from "react";
import { useToast } from "@/context/ToastContext";
import { MdError } from "react-icons/md";

const ToastError = () => {
  const { toast, setToast } = useToast();

  return (
    <div
      className="fixed z-50 w-full px-[15px] md:px-[2.5%] lg:px-0 
             top-[15px] lg:top-[80px] left-1/2 transform -translate-x-1/2 
             flex justify-center pointer-events-none 
             lg:justify-end lg:translate-x-0 lg:left-auto lg:right-[40px]"
    >
      {toast.error && (
        <div
          onClick={() =>
            setToast((prev) => ({
              ...prev,
              error: false,
              errorMessage: "",
            }))
          }
          className="flex items-center gap-3 bg-black border border-red-500 p-4 rounded-[10px] shadow-md lg:max-w-[400px] md:max-w-[50%] max-w-full min-w-[300px] toast-animate-fadeInOut cursor-pointer pointer-events-auto"
        >
          <MdError className="text-[16px] text-red-500 shrink-0" />
          <p className="text-[13px] text-white font-semibold">
            {toast.errorMessage}
          </p>
        </div>
      )}
    </div>
  );
};

export default ToastError;
