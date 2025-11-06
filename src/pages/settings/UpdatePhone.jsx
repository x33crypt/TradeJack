import React, { useState, useEffect } from "react";
import { useToast } from "@/context/otherContext/ToastContext";
import { useNavigate } from "react-router-dom";
import InAppNav from "@/components/others/InAppNav";
import { editMobile } from "@/utils/auth/editMobile";
import { useSelectElement } from "@/context/otherContext/SelectElementContext";
import { usePhoneCodes } from "@/hooks/others/usePhoneCodes";
import Button from "@/components/buttons/Button";
import Footer from "@/components/others/Footer";

const UpdatePhone = () => {
  const { select, setSelect } = useSelectElement();
  const { phoneCodes } = usePhoneCodes();
  const [phoneDetails, setPhoneDetails] = useState({
    code: "+1",
    phone: "",
  });
  const { toast, setToast } = useToast();
  const navigateTo = useNavigate();

  const handleNumberChange = (e) => {
    setPhoneDetails((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }));
  };

  console.log("Phone number:", phoneDetails);

  // handling code change
  useEffect(() => {
    if (select?.page !== "update phone" || !select?.element || !select?.pick)
      return;

    const pick = select.pick;

    setPhoneDetails((prev) => ({
      ...prev,
      code: pick?.code,
    }));

    setSelect({
      state: false,
      selectOne: false,
      selectTwo: false,
      page: "",
      element: "",
      options: null,
      pick: "",
    });
  }, [select]);

  const handleUpdatePhone = async (e) => {
    e.preventDefault();

    try {
      const result = await editMobile(phoneDetails);

      if (result.success) {
        console.log("Phone number has been updated successfully:", result.data);
        navigateTo("/profile");
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
              PHONE NUMBER
            </p>
          </div>

          <div className="flex flex-col gap-[30px]">
            <div className="flex flex-col gap-[25px]">
              <p className="text-xs text-tradeFadeWhite font-medium leading-relaxed">
                Update your phone number to maintain reliable communication and
                enable important security verifications.
              </p>

              <div className="flex flex-col gap-[10px]">
                <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                  <div className="flex flex-1 items-center justify-between">
                    <p className="text-[13px] text-tradeFadeWhite font-semibold">
                      Phone Number
                    </p>
                  </div>

                  <div className="flex gap-[10px]">
                    <div
                      onClick={() =>
                        setSelect({
                          ...select,
                          state: true,
                          selectOne: false,
                          selectTwo: true,
                          element: "Phone codes",
                          options: phoneCodes,
                          pick: "",
                          page: "update phone",
                        })
                      }
                      className="flex p-[12px] min-w-[50px] items-center justify-center gap-[10px] bg-tradeAshLight border border-tradeAshLight rounded-[10px]"
                    >
                      <p className="text-white text-sm font-bold cursor-pointer">
                        {phoneDetails?.code}
                      </p>
                    </div>
                    <div className="flex-1 flex gap-[10px] bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px]">
                      <input
                        className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none"
                        type="text"
                        name="phone"
                        placeholder="Enter your mobile number"
                        value={phoneDetails?.phone}
                        onChange={handleNumberChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[20px]">
              <Button
                variant="secondary"
                onClick={handleUpdatePhone}
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

export default UpdatePhone;
