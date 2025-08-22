// pages/ConfirmPassword.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useConfirmPassword } from "@/context/otherContext/PasswordContext";
import LockByScroll from "@/components/others/LockByScroll";
import { IoClose } from "react-icons/io5";
import Button from "@/components/buttons/Button";
import { confirmPassword } from "@/utils/auth/confirmPassword";
import { useToast } from "@/context/otherContext/ToastContext";
import InAppNav from "@/components/others/InAppNav";

const ConfirmPassword = () => {
  const { password, setPassword } = useConfirmPassword();
  const { state, loading } = password;
  const { toast, setToast } = useToast();
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const rawValue = e.target.value;
    setPassword((prev) => ({
      ...prev,
      password: rawValue,
    }));
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    setPassword((prev) => ({
      ...prev,
      loading: true,
    }));

    try {
      // 1️⃣ Call API to confirm password
      const response = await confirmPassword(password);

      if (response.data?.success) {
        // 2️⃣ Save timestamp of successful confirmation
        localStorage.setItem("lastPasswordConfirm", Date.now().toString());

        // 3️⃣ Redirect to saved sensitive route or default
        const redirectTo =
          localStorage.getItem("sensitiveRedirect") || "/dashboard";
        localStorage.removeItem("sensitiveRedirect"); // clear after use

        setPassword((prev) => ({
          ...prev,
          state: false,
          loading: false,
          Password: "",
        }));

        setToast({
          ...toast,
          success: true,
          errorSuccess: "Password Confirmed",
        });

        navigate(redirectTo, { replace: true });
      } else {
        setToast({
          ...toast,
          error: true,
          errorMessage:
            response.data?.message || "Password confirmation failed.",
        });
      }
    } catch (err) {
      console.error(err);
      setToast({
        ...toast,
        error: true,
        errorMessage: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setPassword((prev) => ({
        ...prev,
        loading: false,
      }));
    }
  };

  const close = () => {
    setPassword((prev) => ({
      ...prev,
      state: false,
      loading: false,
      password: "",
    }));
  };

  return (
    <div>
      {/* <InAppNav /> */}
      {state && (
        <div>
          <LockByScroll />
          {/* Modal */}
          <div className="fixed top-0 left-0 right-0 bottom-0 lg:px-[15px] md:px-[2.5%] p-[35px] bg-black bg-opacity-80 flex items-center justify-center z-40">
            <div className="flex flex-col px-[15px] bg-tradeAsh borde border-tradeAshLight rounded-[15px] shadow-lg w-[300px]">
              <div className="flex items-center justify-between py-[12.3px] border-b border-tradeAshLight">
                <p className="text-lg font-[700] text-white ">
                  Confirm Password
                </p>

                <div onClick={close}>
                  <IoClose className="text-tradeFadeWhite hover:text-white cursor-pointer text-xl" />
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between py-[12.3px] gap-[30px]">
                <div className="flex flex-col gap-[10px]">
                  <div className="flex flex-col gap-1">
                    <p className="text-[13px] font-medium text-tradeFadeWhite">
                      Please confirm your password to access this section.
                    </p>
                  </div>

                  <div className="bg-tradeAsh rounded-[10px] flex flex-col gap-[15px]">
                    <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px]">
                      <input
                        className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none"
                        type="text"
                        placeholder="Password"
                        onChange={handlePasswordChange}
                        value={password?.password || ""}
                      />
                    </div>
                  </div>
                </div>
                <Button
                  variant="Fadeout"
                  disabled={loading}
                  onClick={handleConfirm}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmPassword;
