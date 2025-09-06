import React, { useState } from "react";
import { logout } from "@/utils/auth/logout";
import Button from "@/components/buttons/Button";
import { useLogOut } from "@/context/userContext/LogOutContext";
import LockByScroll from "@/components/others/LockByScroll";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

const Logout = () => {
  const [loading, setLoading] = useState(false);
  const { state, setState } = useLogOut();

  const navigateTo = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await logout();
      if (result.success) {
        navigateTo("/");
      }
    } catch (err) {
      console.error("Unexpected error:", err.message || err);
    } finally {
      setLoading(false);
      setState(false);
    }
  };

  const close = () => {
    setState(false);
  };

  return (
    <>
      {state && (
        <div>
          <LockByScroll />
          <div className="fixed top-0 left-0 right-0 bottom-0 lg:px-[15px] md:px-[2.5%] p-[35px] bg-black backdrop-blur-sm bg-opacity-80 flex items-center justify-center z-40">
            <div className="flex md:w-[300px] h-max flex-col rounded-[15px] px-[15px] bg-tradeAsh  ">
              <div className="flex justify-between items-center py-[12px] border-b border-neutral-800 ">
                <p className="text-lg text-white font-[700] cursor-pointer">
                  Confirm Logout
                </p>

                <div
                  onClick={close}
                  className="w-max flex text-white hover:text-tradeFadeWhite gap-1 items-center justify-center bg-tradeAshLight hover:bg-tradeAsh border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
                >
                  <IoClose className="text-[16px]" />
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between py-[12px] gap-[20px]">
                <div className="flex flex-col gap-1">
                  <p className="text-[13px] font-medium text-cente text-tradeFadeWhite">
                    Are you sure you want to log out now ? Trades are happening !
                  </p>
                </div>
                <div className="flex flex-col gap-[10px] w-full">
                  <Button
                    onClick={handleLogout}
                    variant="danger"
                    disabled={loading}
                  >
                    {loading ? "loggin you out..." : "Yes, log me out"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Logout;
