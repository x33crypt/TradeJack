import React, { useState, useEffect } from "react";
import { useToast } from "@/context/ToastContext";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import InAppNav from "@/components/InAppNav";
import { editFullname } from "@/utils/auth/editFullname";
import Button from "@/components/buttons/Button";

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
            <p className="  text-base text-white font-[700]">Edit Full Name</p>
          </div>
        </div>

        <div className="flex-1 mt-[70px] flex flex-col md:justify-center md:items-center">
          <div className="flex-1 md:flex-none flex flex-col justify-between md:justify-normal md:w-[400px] w-full h-full gap-[30px]">
            <div className=" flex flex-col w-full gap-[30px] ">
              <div className="flex flex-col gap-[30px]">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-[600] text-white">First Name</p>
                  <input
                    className={`${
                      nameDetails.firstname
                        ? "border-tradeAshExtraLight"
                        : "border-tradeAshLight"
                    } mt-[5px] text-sm text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px]`}
                    type="text"
                    name="firstname"
                    placeholder="eg. John"
                    onChange={handleFirstnameChange}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-white font-[600]">Last Name</p>
                  <input
                    className={`${
                      nameDetails.lastname
                        ? "border-tradeAshExtraLight"
                        : "border-tradeAshLight"
                    } mt-[5px] text-sm text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px]`}
                    type="text"
                    name="lastname"
                    placeholder="eg. Doe"
                    onChange={handleLastnameChange}
                  />
                </div>
              </div>

              <div>
                <p className="text-tradeOrange text-sm font-semibold">
                  Please note:
                </p>
                <ul className="list-disc list-inside text-white text-[13px] space-y-1 mt-1">
                  <li>You can only change your name once.</li>
                  <li>Ensure the new name matches your legal identity.</li>
                  <li>Once changed, this action cannot be undone.</li>
                  <li>A password confirmation will be required to proceed.</li>
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
                onClick={handleEditFullname}
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

export default EditFullname;
