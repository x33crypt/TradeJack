import React, { useState, useEffect } from "react";
import { useToast } from "@/context/otherContext/ToastContext";
import { useNavigate } from "react-router-dom";
import InAppNav from "@/components/others/InAppNav";
import { editEmail } from "@/utils/auth/editEmail";
import Button from "@/components/buttons/Button";
import Footer from "@/components/others/Footer";
import { FaCircleInfo } from "react-icons/fa6";

const UpdateEmail = () => {
  const [email, setEmail] = useState("");
  const { toast, setToast } = useToast();

  const navigateTo = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  console.log("Email addresss:", email);

  const handleEditEmail = async (e) => {
    e.preventDefault();

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
    }
  };

  return (
    <>
      <InAppNav />
      <div className="md:pt-[70px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex bg-black">
        <div className="flex flex-1 flex-col gap-[20px] lg:mx-[22.8%] p-[15px]">
          <div className="flex items-center justify-between ">
            <p className="text-lg font-semibold text-white flex items-center gap-1">
              EMAIL ADDRESS
            </p>
          </div>

          <div className="flex flex-col gap-[30px]">
            <div className="flex flex-col gap-[25px]">
              <p className="text-xs text-tradeFadeWhite font-medium leading-relaxed">
                Review and update your email address to keep your account
                accessible and communication uninterrupted.
              </p>

              <div className="flex flex-col gap-[10px]">
                <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                  <div className="flex flex-1 items-center justify-between">
                    <p className="text-[13px] text-tradeFadeWhite font-semibold">
                      Email Address
                    </p>

                    <FaCircleInfo className="text-tradeOrange text-sm flex-shrink-0" />
                  </div>

                  <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px]">
                    <input
                      className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none"
                      type="text"
                      name="email"
                      placeholder="eg. Johndoe@gmail.com"
                      onChange={handleEmailChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[20px]">
              <Button variant="secondary" onClick={handleEditEmail}>
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

export default UpdateEmail;
