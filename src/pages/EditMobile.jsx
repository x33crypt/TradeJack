import React, { useState, useEffect } from "react";
import { useToast } from "@/context/ToastContext";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import InAppNav from "@/components/InAppNav";
import { editMobile } from "@/utils/auth/editMobile";
import { useSelectElement } from "@/context/SelectElementContext";
import { useCountryCodes } from "@/hooks/useCountryCodes";

const EditMobile = () => {
  const { select, setSelect } = useSelectElement();
  const [mobileDetails, setMobileDetails] = useState({
    code: null,
    number: null,
  });
  const { countryCodes } = useCountryCodes();
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast, setToast } = useToast();

  const handleNumberChange = (e) => {
    setMobileDetails((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }));
  };

  // handling code change
  useEffect(() => {
    if (
      select?.page !== "edit mobile number" ||
      !select?.element ||
      !select?.pick
    )
      return;

    const pick = select.pick;

    setMobileDetails((prev) => ({
      ...prev,
      code: pick?.code,
    }));
  }, [select]);

  console.log(mobileDetails);

  const navigateTo = useNavigate();

  const handleEditMobile = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const result = await editMobile(mobileDetails);

      if (result.success) {
        console.log(
          "Mobile number has been updated successfully:",
          result.data
        );
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

  return (
    <>
      <InAppNav />
      <div className="md:pt-[63px] pt-[60px] flex flex-col gap-[15px] lg:px-[2%] md:px-[2.5%] p-[15px] min-h-svh bg-black">
        <div className="flex w-full flex-col gap-[10px]">
          <div className="flex items-center gap-4 border-b  py-[15px] border-tradeAshLight">
            <div className="flex items-center gap-3 ">
              <IoMdArrowRoundBack
                onClick={() => navigateTo(location?.state?.from || -1)}
                className="text-tradeFadeWhite text-[20px] cursor-pointer"
              />
              <p className="  text-base text-white font-[700]">
                Edit Mobile Number
              </p>
            </div>
          </div>

          <div className="w-full h-full flex flex-col pt-[30px] md:justify-center md:items-center">
            <div className="flex flex-col justify-between md:w-[400px] w-full h-full md:gap-[30px] gap-[30px]">
              <div className=" flex flex-col w-full gap-[30px]">
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-white font-[600]">Country code</p>

                  <div className="relative w-full cursor-pointer ">
                    <input
                      className={`${
                        mobileDetails?.code
                          ? "border-tradeAshExtraLight"
                          : "border-tradeAshLight"
                      } mt-[5px] text-sm text-white placeholder:text-tradeFadeWhite text-font-[700] placeholder:font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px] cursor-pointer`}
                      type="text"
                      readOnly
                      placeholder="Select Country Code"
                      value={
                        mobileDetails?.code ? `+ ${mobileDetails?.code}` : ""
                      }
                      onClick={() =>
                        setSelect({
                          ...select,
                          state: true,
                          selectOne: false,
                          selectTwo: true,
                          element: "country code",
                          options: countryCodes,
                          pick: "",
                          page: "edit mobile number",
                        })
                      }
                    />

                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                      <MdKeyboardArrowDown />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-sm font-[600] text-white">Mobile number</p>
                  <input
                    className={`${
                      mobileDetails.number
                        ? "border-tradeAshExtraLight"
                        : "border-tradeAshLight"
                    } mt-[5px] text-sm text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px]`}
                    type="text"
                    name="number"
                    placeholder="Enter your mobile number"
                    onChange={handleNumberChange}
                  />
                </div>

                <div>
                  <p className="text-tradeOrange text-sm font-semibold">
                    Please note:
                  </p>
                  <ul className="list-disc list-inside text-white text-xs space-y-1 mt-1">
                    <li>
                      A verification code will be sent to your phone number.
                    </li>
                    <li>
                      Ensure the number is active and accessible before
                      proceeding.
                    </li>
                    <li>
                      You won’t be able to update your phone number again for
                      the next 30 days.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex md:flex-row flex-col gap-[20px]">
                <div
                  className=" w-full bg-transparent text-tradeFadeWhite hover:text-white border border-tradeAshLight hover:border-tradeAshExtraLight p-[12px] rounded-[10px] flex justify-center items-center cursor-pointer transition-all duration-300"
                  onClick={() => navigateTo(location?.state?.from || -1)}
                >
                  <p className="text-[14px] font-[700] ">Cancel</p>
                </div>
                <button
                  onClick={handleEditMobile}
                  className={` ${
                    isUpdating
                      ? "bg-tradeAsh text-tradeGreen"
                      : "bg-tradeGreen hover:bg-tradeAsh text-black hover:text-tradeGreen"
                  } w-full p-[12px] rounded-[10px] flex justify-center items-center cursor-pointer transition-all duration-300`}
                >
                  <p className="text-[14px] font-[700]">
                    {isUpdating ? "isUpdating..." : "Update"}
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditMobile;
