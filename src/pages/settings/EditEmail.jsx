import React, { useState, useEffect } from "react";
import { useToast } from "@/context/otherContext/ToastContext";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import InAppNav from "@/components/others/InAppNav";
import { editEmail } from "@/utils/auth/editEmail";
import Button from "@/components/buttons/Button";

const EditEmail = () => {
  const [email, setEmail] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast, setToast } = useToast();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  console.log(email);

  const navigateTo = useNavigate();

  const handleEditEmail = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const result = await editEmail(email);

      if (result.success) {
        console.log("Email has been updated successfully:", result.data);
        navigateTo("/account/profile");
        setToast({
          ...toast,
          success: true,
          successMessage: result.message,
        });
      } else {
        console.error("Error while updating email:", result.error);
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

  const cancelButton = () => {
    navigateTo(location?.state?.from || -1);
  };

  return (
    <>
      <InAppNav />
      <div className="md:pt-[63px] pt-[60px] flex flex-col gap-[15px] lg:px-[2%] md:px-[2.5%] p-[15px] min-h-svh bg-black">
        <div className="z-20 fixed  right-0  left-0 lg:px-[2%] md:px-[2.5%] px-[15px] py-[15px] top-[60px] md:top-[65px] bg-black flex items-center gap-4 border-b border-tradeAshLight">
          <div className="flex items-center gap-3 ">
            <IoMdArrowRoundBack
              onClick={() => navigateTo(location?.state?.from || -1)}
              className="text-tradeFadeWhite text-[20px] cursor-pointer"
            />
            <p className="text-base text-white font-[700]">
              Edit Email Address
            </p>
          </div>
        </div>

        <div className="flex-1 mt-[70px] flex flex-col md:justify-center md:items-center">
          <div className="flex-1 md:flex-none flex flex-col justify-between md:justify-normal md:w-[400px] w-full h-full gap-[30px]">
            <div className=" flex flex-col w-full gap-[30px]">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-[600] text-white">Email Address</p>
                <input
                  className={`${
                    email ? "border-tradeAshExtraLight" : "border-tradeAshLight"
                  } mt-[5px] text-sm text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px]`}
                  type="text"
                  name="email"
                  placeholder="eg. Johndoe@gmail.com"
                  onChange={handleEmailChange}
                />
              </div>

              <div>
                <p className="text-tradeOrange text-sm font-semibold">
                  Please note:
                </p>
                <ul className="list-disc list-inside text-white text-[13px] space-y-1 mt-1">
                  <li>
                    A verification link will be sent to your email address.
                  </li>
                  <li>
                    Make sure the email is valid and accessible before
                    proceeding.
                  </li>
                  <li>
                    You won’t be able to update your email again for the next 30
                    days.
                  </li>
                </ul>
              </div>
            </div>

            <div className=" flex md:flex-row flex-col-reverse gap-[15px] justify-center items-center">
              <Button
                onClick={cancelButton}
                variant="outline"
                disabled={isUpdating}
              >
                Cancel
              </Button>

              <Button
                onClick={handleEditEmail}
                variant="primary"
                disabled={isUpdating}
              >
                {isUpdating ? "updating..." : "Update"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditEmail;
