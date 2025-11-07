import React, { useState, useEffect } from "react";
import { useToast } from "@/context/otherContext/ToastContext";
import InAppNav from "@/components/others/InAppNav";
import { useNavigate } from "react-router-dom";
import { editUsername } from "@/utils/auth/editUsername";
import Button from "@/components/buttons/Button";
import Footer from "@/components/others/Footer";
import { FaCircleInfo } from "react-icons/fa6";

const UpdateUsername = () => {
  const [username, setUsername] = useState("");
  const { toast, setToast } = useToast();

  const navigateTo = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  console.log("Username:", username);

  const handleEditUsername = async (e) => {
    e.preventDefault();

    try {
      const result = await editUsername(username);

      if (result.success) {
        console.log("Username has been isUpdatingd successfully:", result.data);
        navigateTo("/account/profile");
        setToast({
          ...toast,
          success: true,
          successMessage: result.message,
        });
      } else {
        console.error("Error while updating username:", result.error);
        setToast({
          ...toast,
          error: true,
          errorMessage: result.error,
        });
      }
    } catch (err) {
      console.error("Unexpected error:", err.message || err);
      setToast({
        ...toast,
        error: true,
        errorMessage: "An unexpected error occurred. Please try again.",
      });
    }
  };

  return (
    <>
      <InAppNav />
      <div className="md:pt-[70px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex bg-black">
        <div className="flex flex-1 flex-col gap-[20px] lg:mx-[22.8%] p-[15px]">
          <div className="flex items-center justify-between ">
            <p className="text-lg font-semibold text-white flex items-center gap-1">
              CHANGE USERNAME
            </p>
          </div>

          <div className="flex flex-col gap-[30px]">
            <div className="flex flex-col gap-[25px]">
              <p className="text-xs text-tradeFadeWhite font-medium leading-relaxed">
                Keep your account information current with an updated username
                that helps others recognize you easily.
              </p>

              <div className="flex flex-col gap-[10px]">
                <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                  <div className="flex flex-1 items-center justify-between">
                    <p className="text-[13px] text-tradeFadeWhite font-semibold">
                      Username
                    </p>

                    <FaCircleInfo className="text-tradeOrange text-sm flex-shrink-0" />
                  </div>

                  <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px]">
                    <input
                      className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none"
                      type="text"
                      name="username"
                      placeholder="Choose username"
                      onChange={handleUsernameChange}
                    />
                  </div>

                  {/* <p className="text-tradeFadeWhite text-xs font-medium">
                    Username can only have letters, numbers, or one hyphen ( -
                    ). It cannot begin or end with a hyphen.
                  </p> */}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[20px]">
              <Button
                variant="secondary"
                onClick={handleEditUsername}
                // disabled={transfer?.proceed}
              >
                UPDATE
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UpdateUsername;
