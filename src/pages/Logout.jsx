import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import useSafeNavigate from "../components/SafeNavigation";
import { IoLogInOutline } from "react-icons/io5";
import { logout } from "@/utils/auth/logout";
import { useToast } from "@/context/otherContext/ToastContext";
import Button from "@/components/buttons/Button";

const Logout = () => {
  const { toast, setToast } = useToast();
  const [loading, setLoading] = useState(false);

  const navigateTo = useSafeNavigate();
  const location = useLocation();

  const handleLogout = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await logout();

      if (result.success) {
        console.log("Logout successful:", result);
        navigateTo("/");
        setToast({
          ...toast,
          success: true,
          successMessage: result.message,
        });
      } else {
        console.error("Signin error:", result.error);
        setToast({
          ...toast,
          error: true,
          errorMessage: result?.error,
        });
      }
    } catch (err) {
      console.error("Unexpected error:", err.message || err);
      setToast({
        ...toast,
        error: true,
        errorMessage: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const cancelButton = (e) => {
    navigateTo(location?.state?.from || -1);
  };

  return (
    <div className="z-50 fixed inset-0 bg-black min-h-svh flex px-[35px] justify-center items-center">
      <div className="flex flex-col items-center lg:p-[20px] p-[15px] md:gap-[30px] gap-[30px] bg- borde border-tradeAshExtraLight ">
        <div className="w-full flex flex-col items-center gap-[5px]">
          <div className="w-full flex items-center justify-center  text-white text-[100px]">
            <IoLogInOutline />
          </div>

          <p className="text-tradeFadeWhite text-[13px] sm:w-[250px] text-center font-[500]">
            You’re about to log out. Do you want to continue ?
          </p>
        </div>
        <div className="flex flex-col gap-[10px] w-full">
          <Button onClick={handleLogout} variant="primary" disabled={loading}>
            {loading ? "loggin you out..." : "Yes, log me out"}
          </Button>

          <Button onClick={cancelButton} variant="outline">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
