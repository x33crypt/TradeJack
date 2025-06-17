import React, { useState, useEffect } from "react";
import { useToast } from "@/context/ToastContext";
import InAppNav from "@/components/InAppNav";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { editUsername } from "@/utils/auth/editUsername";

const EditUsername = () => {
  const [username, setUsername] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast, setToast } = useToast();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  console.log(username);

  const navigateTo = useNavigate();

  const handleEditUsername = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

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
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <InAppNav />
      <div className="md:pt-[63px] pt-[60px] flex flex-col gap-[15px] lg:px-[2%] md:px-[2.5%] p-[15px] min-h-svh bg-black">
        <div className="z-20 fixed lg:right-[2%] md:right[2%] right-[2.5%]  lg:left-[2%] md:left[2%] left-[15px] bg-black flex items-center gap-4 border-b  py-[15px] border-tradeAshLight">
          <div className="flex items-center gap-3 ">
            <IoMdArrowRoundBack
              onClick={() => navigateTo(location?.state?.from || -1)}
              className="text-tradeFadeWhite text-[20px] cursor-pointer"
            />
            <p className="  text-base text-white font-[700]">Edit Username</p>
          </div>
        </div>

        <div className="flex-1 mt-[70px] flex flex-col md:justify-center md:items-center">
          <div className="flex-1 md:flex-none flex flex-col justify-between md:justify-normal md:w-[400px] w-full h-full gap-[30px]">
            <div className=" flex flex-col w-full gap-[30px]">
              <div className="w-full flex flex-col gap-1 ">
                <p className="text-sm font-[600] text-white">Username</p>

                <input
                  className={`${
                    username
                      ? "border-tradeAshExtraLight"
                      : "border-tradeAshLight"
                  } mt-[5px] text-sm text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px]`}
                  type="text"
                  name="username"
                  placeholder="Choose username"
                  onChange={handleUsernameChange}
                />

                <p className="text-xs text-tradeFadeWhite mt-[5px]">
                  Username can only have letters, numbers, or one hyphen ( - ).
                  It cannot begin or end with a hyphen.
                </p>
              </div>

              <div>
                <p className="text-tradeOrange text-sm font-semibold">
                  Please note:
                </p>
                <ul className="list-disc list-inside text-white text-[13px] space-y-1 mt-1">
                  <li>You can only isUpdating your username twice in total.</li>
                  <li>Choose a unique and recognizable username.</li>
                </ul>
              </div>
            </div>

            <div className="flex w-full md:flex-row flex-col gap-[20px]">
              <div
                className=" w-full bg-transparent text-tradeFadeWhite hover:text-white border border-tradeAshLight hover:border-tradeAshExtraLight p-[12px] rounded-[10px] flex justify-center items-center cursor-pointer transition-all duration-300"
                onClick={() => navigateTo(location?.state?.from || -1)}
              >
                <p className="text-sm font-[700] ">Cancel</p>
              </div>
              <button
                onClick={handleEditUsername}
                className={` ${
                  isUpdating
                    ? "bg-tradeAsh text-tradeGreen"
                    : "bg-tradeGreen hover:bg-tradeAsh text-black hover:text-tradeGreen"
                } w-full p-[12px] rounded-[10px] flex justify-center items-center cursor-pointer transition-all duration-300`}
              >
                <p className="text-sm font-[700]">
                  {isUpdating ? "Updating..." : "Update"}
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUsername;
