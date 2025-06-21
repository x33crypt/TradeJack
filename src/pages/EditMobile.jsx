import React, { useState, useEffect } from "react";
import { useToast } from "@/context/ToastContext";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import InAppNav from "@/components/InAppNav";
import { editMobile } from "@/utils/auth/editMobile";
import { useSelectElement } from "@/context/SelectElementContext";
import { useCountryCodes } from "@/hooks/useCountryCodes";
import Button from "@/components/buttons/Button";

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
            <p className="  text-base text-white font-[700]">
              Edit Mobile Number
            </p>
          </div>
        </div>

        <div className="flex-1 mt-[70px] flex flex-col md:justify-center md:items-center">
          <div className="flex-1 md:flex-none flex flex-col justify-between md:justify-normal md:w-[400px] w-full h-full gap-[30px]">
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
                <ul className="list-disc list-inside text-white text-[13px] space-y-1 mt-1">
                  <li>
                    A verification code will be sent to your phone number.
                  </li>
                  <li>
                    Ensure the number is active and accessible before
                    proceeding.
                  </li>
                  <li>
                    You won’t be able to update your phone number again for the
                    next 30 days.
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
                onClick={handleEditMobile}
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

export default EditMobile;
