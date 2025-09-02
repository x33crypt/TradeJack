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
            <div className="flex flex-col gap-[40px] items-cente w-[300px]">
              <div className="grid grid-cols-3 gap-[10px]">
                {/* <div className="flex flex-1 flex-col justify-between gap-[15px] p-[12px]">
                  <div className="bg-tradeAsh p-[12px rounded-[15px] shadow-lg flex flex-col gap-[5px] borde border-tradeAshLight">
                    <Button variant="outline" onClick={toAccount}>
                      Account
                    </Button>
                    <div className="lg:hidden flex flex-col gap-[5px]">
                      <Button variant="outline" onClick={toSettings}>
                        Rewards
                      </Button>
                    </div>
                    <Button variant="outline" onClick={toSettings}>
                      Settings
                    </Button>
                    <Button
                      variant="danger"
                      onClick={handleLogout}
                      disabled={loading}
                    >
                      Log Out
                    </Button>
                  </div>

                </div> */}

                <div className="flex flex-col items-center justify-center gap-1 rounded-[15px]  p-[12px] bg-tradeAsh border border-tradeAshLight">
                  <div className="w-max flex text-tradeFadeWhite hover:text-white gap-1 items-center justify-center bg- border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
                    <FaUserCheck className="text-[16px]" />
                  </div>
                  <p className="text-white text-[13px]">Profile</p>
                </div>
                <div className="flex flex-col items-center gap-1 rounded-[15px] p-[12px] bg-tradeAsh border border-tradeAshLight">
                  <div className="w-max flex text-tradeFadeWhite hover:text-white gap-1 items-center justify-center bg- border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
                    <FaUserCheck className="text-[16px]" />
                  </div>
                  <p className="text-white text-[13px]">Settings</p>
                </div>
                <div className="flex flex-col items-center gap-1 rounded-[15px]  p-[12px] bg-tradeAsh border border-tradeAshLight">
                  <div className="w-max flex text-tradeFadeWhite hover:text-white gap-1 items-center justify-center bg- border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
                    <FaUserCheck className="text-[16px]" />
                  </div>
                  <p className="text-white text-[13px]">Rewards</p>
                </div>
                <div className="flex flex-col items-center gap-1 rounded-[15px]  p-[12px] bg-tradeAsh border border-tradeAshLight">
                  <div className="w-max flex text-tradeFadeWhite hover:text-white gap-1 items-center justify-center bg- border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
                    <FaUserCheck className="text-[16px]" />
                  </div>
                  <p className="text-white text-[13px]">Limits</p>
                </div>
                <div className="flex flex-col items-center gap-1 rounded-[15px]  p-[12px] bg-tradeAsh border border-tradeAshLight">
                  <div className="w-max flex text-tradeFadeWhite hover:text-white gap-1 items-center justify-center bg- border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
                    <FaUserCheck className="text-[16px]" />
                  </div>
                  <p className="text-white text-[13px]">log out</p>
                </div>
                <div className="flex flex-col items-center gap-1 rounded-[15px] p-[12px] bg-tradeAsh border border-tradeAshLight">
                  <div className="w-max flex text-tradeFadeWhite hover:text-white gap-1 items-center justify-center bg- border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
                    <FaUserCheck className="text-[16px]" />
                  </div>
                  <p className="text-white text-[13px]">log out</p>
                </div>
              </div>

              {/* <div onClick={close} className="">
                <Button variant="Fadeout">Close</Button>
              </div> */}
              <div className="flex w-full justify-center">
                <div
                  onClick={close}
                  className="w-max flex text-white hover:text-tradeFadeWhite gap-1 items-center justify-center bg-tradeAshLight hover:bg-tradeAsh border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
                >
                  <IoClose className="text-[16px]" />
                </div>
              </div>

              {/* <div className="p-2 border border-tradeAshLight">
                <IoClose className="text-[16px] text-tradeFadeWhite" />
              </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileNav;
