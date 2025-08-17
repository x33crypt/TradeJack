import React, { useState } from "react";
import LockByScroll from "./LockByScroll";
import { useProfileNav } from "../../context/otherContext/ProfileNavContext";
import { IoClose } from "react-icons/io5";
import landingImg4 from "../../assets/landingImg4.JPG";
import Button from "../buttons/Button";
import { useNavigate } from "react-router-dom";
import { RiShieldUserFill } from "react-icons/ri";
import { FaUserCheck } from "react-icons/fa";
import { logout } from "@/utils/auth/logout";
import { useToast } from "@/context/otherContext/ToastContext";

const ProfileNav = () => {
  const { show, setShow } = useProfileNav();
  const [loading, setLoading] = useState(false);
  const { toast, setToast } = useToast();

  const toAccount = () => {
    setShow(false);
    navigateTo("/account");
  };

  const toSettings = () => {
    setShow(false);
    navigateTo("/settings");
  };

  const close = () => {
    setShow(false);
  };

  const handleLogout = async () => {
    setLoading(true);

    try {
      const result = await logout();

      if (result.success) {
        console.log("Logout successful:", result);
        setShow(false);
        navigateTo("/");
        setToast({
          ...toast,
          success: true,
          successMessage: "You've been logged out successfully.",
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

  const navigateTo = useNavigate();

  return (
    <>
      {show && (
        <div>
          <LockByScroll />
          <div className="fixed top-0 left-0 right-0 bottom-0 lg:px-[15px] md:px-[2.5%] p-[35px] bg-black bg-opacity-80 flex items-center justify-center z-40">
            <div className="flex flex-col gap-[10px] w-[300px]">
              <div className="flex p-[12px] bg-tradeAsh  border border-tradeAshLight items-center justify-between rounded-[15px]">
                <div className="flex items-center  gap-3 ">
                  <div className=" w-[40px] rounded-[10px] overflow-hidden border border-tradeAshExtraLight cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
                    <img src={landingImg4} alt="" className="rounded-[10px]" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-base leading-none text-white font-semibold">
                      0xsanityy
                    </p>
                    <p className="text-xs font-medium text-tradeFadeWhite leading-none">
                      adeleke@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center text-tradeGreen border border-tradeAshExtraLight text-[20px] p-2 w-max h-max bg-tradeAshLight rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
                  <FaUserCheck />
                </div>
              </div>

              <div className="flex flex-col  bg-tradeAsh border border-tradeAshLight rounded-[15px] shadow-lg">
                <div className="flex flex-1 flex-col justify-between gap-[15px] p-[12px]">
                  <div className="bg-tradeAsh p-[12px rounded-[15px] shadow-lg flex flex-col gap-[5px] borde border-tradeAshLight">
                    <Button variant="outline" onClick={toAccount}>
                      Account
                    </Button>
                    <div className="lg:hidden flex flex-col gap-[5px]">
                      <Button variant="outline" onClick={toSettings}>
                        Rewards
                      </Button>
                      <Button variant="outline" onClick={toSettings}>
                        Settings
                      </Button>
                    </div>
                    <Button
                      variant="danger"
                      onClick={handleLogout}
                      disabled={loading}
                    >
                      Log Out
                    </Button>
                  </div>

                  <div className="flex items-center justify-center">
                    <p className="text-xs font-medium text-tradeFadeWhite">
                      GoGetSwap Version 1.0
                    </p>
                  </div>
                </div>
              </div>

              <div onClick={close} className="">
                <Button variant="Fadeout">Close</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileNav;
