import React, { useState, useEffect } from "react";
import { useToast } from "@/context/ToastContext";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import InAppNav from "@/components/InAppNav";
import { editFullname } from "@/utils/auth/editFullname";

const EditFullname = () => {
  const [nameDetails, setNameDetails] = useState({
    firstname: "",
    lastname: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast, setToast } = useToast();

  const handleFirstnameChange = (e) => {
    setNameDetails((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLastnameChange = (e) => {
    setNameDetails((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }));
  };

  console.log(nameDetails);

  const navigateTo = useNavigate();

  const handleEditFullname = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const result = await editFullname(nameDetails);

      if (result.success) {
        console.log("Fullname has been isUpdatingd successfully:", result.data);
        navigateTo("/account/profile");
        setToast({
          ...toast,
          success: true,
          successMessage: result.message,
        });
      } else {
        console.error("Error while updating full name:", result.error);
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
              <p className="  text-[17px] text-white font-[700]">
                Edit Full Name
              </p>
            </div>
          </div>

          <div className="w-full h-full flex flex-col pt-[30px] md:justify-center md:items-center">
            <div className="flex flex-col justify-between md:w-[400px] w-full h-full md:gap-[30px] gap-[30px]">
              <div className=" flex flex-col w-full gap-[30px]">
                <div className="flex flex-col gap-[30px]">
                  <div className="flex flex-col gap-1">
                    <p className="text-[14px] font-[600] text-white">
                      First Name
                    </p>
                    <input
                      className={`${
                        nameDetails.firstname
                          ? "border-tradeAshExtraLight"
                          : "border-tradeAshLight"
                      } mt-[5px] text-[14px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px]`}
                      type="text"
                      name="firstname"
                      placeholder="eg. John"
                      onChange={handleFirstnameChange}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[14px] text-white font-[600]">
                      Last Name
                    </p>
                    <input
                      className={`${
                        nameDetails.lastname
                          ? "border-tradeAshExtraLight"
                          : "border-tradeAshLight"
                      } mt-[5px] text-[14px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px]`}
                      type="text"
                      name="lastname"
                      placeholder="eg. Doe"
                      onChange={handleLastnameChange}
                    />
                  </div>
                </div>

                <div>
                  <p className="text-tradeOrange text-[14px] font-semibold">
                    Please note:
                  </p>
                  <ul className="list-disc list-inside text-white text-[13px] space-y-1 mt-1">
                    <li>You can only change your name once.</li>
                    <li>Ensure the new name matches your legal identity.</li>
                    <li>Once changed, this action cannot be undone.</li>
                    <li>
                      A password confirmation will be required to proceed.
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
                  onClick={handleEditFullname}
                  className={` ${
                    isUpdating
                      ? "bg-tradeAsh text-tradeGreen"
                      : "bg-tradeGreen hover:bg-tradeAsh text-black hover:text-tradeGreen"
                  } w-full p-[12px] rounded-[10px] flex justify-center items-center cursor-pointer transition-all duration-300`}
                >
                  <p className="text-[14px] font-[700]">
                    {isUpdating ? "Updating..." : "Update"}
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

export default EditFullname;
