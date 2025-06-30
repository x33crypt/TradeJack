import React, { useState, useEffect, useRef } from "react";
import { useToast } from "@/context/ToastContext";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import InAppNav from "@/components/InAppNav";
import { useSelectElement } from "@/context/SelectElementContext";
import Stepper from "@/components/Steppers";
import { useKyc } from "@/context/KycContext";
import Warning from "@/components/alerts/Warning";
import { RiFileUploadFill } from "react-icons/ri";
import { kycVerify } from "@/utils/kyc/kycVerify";
import Button from "@/components/buttons/Button";
import SideNav from "@/components/account/nav/SideNav";
import Footer from "@/components/Footer";

const KycVerifyStep3 = () => {
  const { select, setSelect } = useSelectElement();
  const { kycDetails, setKycDetails } = useKyc();
  const { toast, setToast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const documentTypes = [
    "National ID Card",
    "Drivers License",
    "International Passport",
  ];

  const frontRef = useRef();
  const backRef = useRef();

  const handleFrontClick = () => frontRef.current?.click();
  const handleBackClick = () => backRef.current?.click();

  const handleFrontFileChange = (e) => {
    const { name, files } = e.target;

    const file = files?.[0];

    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setToast({
          ...toast,
          error: true,
          errorMessage: `${name} must be less than 5MB`,
        });
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setToast({
          ...toast,
          error: true,
          errorMessage: `${name} must be an image (JPEG, PNG, etc.)`,
        });
        return;
      }

      setKycDetails((prevDetails) => ({
        ...prevDetails,
        frontImage: file,
      }));
    }
  };

  const handleBackFileChange = (e) => {
    const { name, files } = e.target;
    const file = files?.[0];

    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setToast({
          ...toast,
          error: true,
          errorMessage: `${name} must be less than 5MB`,
        });
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setToast({
          ...toast,
          error: true,
          errorMessage: `${name} must be an image (JPEG, PNG, etc.)`,
        });
        return;
      }

      setKycDetails((prevDetails) => ({
        ...prevDetails,
        backImage: file,
      }));
    }
  };

  const handleDateChange = (e) => {
    const [year, month, day] = e.target.value.split("-").map(Number);

    const enteredDate = new Date(year, month - 1, day); // month is 0-based
    const today = new Date();
    const minBirthDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );

    const isValidDate =
      enteredDate instanceof Date &&
      !isNaN(enteredDate) &&
      enteredDate.getFullYear() === year &&
      enteredDate.getMonth() === month - 1 &&
      enteredDate.getDate() === day;

    if (!isValidDate || enteredDate > minBirthDate || year < 1900) {
      setToast({
        ...toast,
        error: true,
        errorMessage: "Enter a valid birthdate (18+ required)",
      });
      return;
    }

    setKycDetails((prev) => ({
      ...prev,
      dateOfBirth: {
        year: year.toString(),
        month: month.toString().padStart(2, "0"),
        date: day.toString().padStart(2, "0"),
      },
    }));
  };

  console.log(kycDetails);

  // handleGenderChange
  useEffect(() => {
    if (
      select?.page !== "kyc verification" ||
      select?.element !== "document type" ||
      !select?.pick
    )
      return;

    setKycDetails((prevDetails) => ({
      ...prevDetails,
      documentType: select.pick,
    }));
  }, [select]);

  const navigateTo = useNavigate();

  const handleKycVerification = async () => {
    setIsUploading(true);

    try {
      const result = await kycVerify(kycDetails);

      if (result.success) {
        console.log("Upload successful:", result);
        navigateTo("/dashboard");
        setToast({
          ...toast,
          success: true,
          succesMessage: result.message,
        });
      } else {
        console.error("Verification error:", result.error);
        setToast({
          ...toast,
          error: true,
          errorMessage: result?.error,
        });
      }
    } catch (err) {
      console.log("Unexpected error:", err?.message || err);
      setToast({
        ...toast,
        error: true,
        errorMessage: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const cancelButton = () => {
    navigateTo("/settings/account/kycVerify/2");
  };

  return (
    <>
      <InAppNav />
      <div className="md:pt-[64px] pt-[60px] lg:px-[2%] md:px-[2.5%] min-h-svh flex gap-[10px] bg-black ">
        <SideNav />

        <div className="flex flex-col flex-1  md:border-x md:border-b md:border-t border-neutral-800">
          <div className="flex  items-center justify-between p-[15px] border-b border-tradeAshLight">
            <p className="text-lg text-white font-[700]">KYC Verification</p>
          </div>

          <div className="flex flex-col h-full gap-[10px] p-[15px] items-center justify-between bg-tradePurpl">
            <div className="flex flex-col gap-[30px] w-full lg:w-max">
              <div className="flex flex-col gap-5">
                <Stepper totalSteps={3} currentStep={3} />
              </div>

              <div className="flex flex-col lg:w-[550px] w-full gap-[30px] bg-tradeAsh border border-tradeAshLight rounded-[15px] p-[12px]">
                <div className="flex flex-col gap-1 w-full">
                  <p className="  text-xl text-white font-[700]">
                    Identity Verification
                  </p>
                  <p className="text-xs text-tradeFadeWhite leading-relaxed">
                    Upload a clear image of a valid government-issued ID that
                    matches your personal details.
                  </p>
                </div>

                <div className="flex md:grid grid-cols-2 flex-col gap-[15px]">
                  <div className="flex flex-col gap-1">
                    <p className="text-[13px]  text-tradeFadeWhite font-medium">
                      Document Type
                    </p>
                    <div className="relative w-full cursor-pointer ">
                      <input
                        className={`${
                          kycDetails?.documentType
                            ? "border-tradeAshExtraLight"
                            : "border-tradeAshLight"
                        } mt-[5px] text-[13px]  text-white placeholder:text-tradeFadeWhite font-medium bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px] cursor-pointer`}
                        type="text"
                        readOnly
                        placeholder="Select a document type"
                        name="documentType"
                        value={kycDetails?.documentType}
                        onClick={() =>
                          setSelect({
                            ...select,
                            state: true,
                            selectOne: true,
                            selectTwo: false,
                            element: "document type",
                            options: documentTypes,
                            pick: "",
                            page: "kyc verification",
                          })
                        }
                        onChange={(e) =>
                          setOfferDetails.serviceType(e.target.value)
                        }
                      />

                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                        <MdKeyboardArrowDown />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[13px]  text-tradeFadeWhite font-medium">
                      Date of Birth
                    </p>
                    <input
                      type="date"
                      name="dateOfBirth"
                      placeholder="Select your birth date"
                      value={
                        kycDetails.dateOfBirth.year &&
                        kycDetails.dateOfBirth.month &&
                        kycDetails.dateOfBirth.date
                          ? `${kycDetails.dateOfBirth.year}-${kycDetails.dateOfBirth.month}-${kycDetails.dateOfBirth.date}`
                          : ""
                      }
                      onChange={handleDateChange}
                      className={`${
                        kycDetails.dateOfBirth.year
                          ? "border-tradeAshExtraLight"
                          : "border-tradeAshLight"
                      }  appearance-none mt-[5px] text-[13px]  text-white placeholder:text-tradeFadeWhite font-medium bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px]`}
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-col gap-1">
                      <p className="text-[13px]  text-tradeFadeWhite font-medium">
                        Front ID Image
                      </p>
                      <div
                        onClick={handleFrontClick}
                        className={`flex items-center justify-between mt-[5px] text-[13px]  text-tradeFadeWhite placeholder:text-tradeFadeWhite font-medium bg-tradeAsh border ${
                          kycDetails?.frontImage?.name
                            ? "border-tradeAshExtraLight"
                            : "border-tradeAshLight"
                        } border-dashed outline-none w-full p-[12px] rounded-[10px] cursor-pointer`}
                      >
                        <p
                          className={`${
                            kycDetails?.frontImage?.name
                              ? "text-white"
                              : "text-tradeFadeWhite"
                          }`}
                        >
                          {kycDetails?.frontImage
                            ? `Uploaded: ${kycDetails?.frontImage?.name}`
                            : "JPG, PNG, PDF, SVG • 5MB max"}
                        </p>

                        <RiFileUploadFill className="text-xl" />
                      </div>

                      <input
                        type="file"
                        ref={frontRef}
                        name="Front ID Image"
                        className="hidden"
                        onChange={handleFrontFileChange}
                        accept="image/*,application/pdf"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-col gap-1">
                      <p className="text-[13px]  text-tradeFadeWhite font-medium">
                        Back ID Image
                      </p>
                      <div
                        onClick={handleBackClick}
                        className={`flex items-center justify-between mt-[5px] text-[13px]  text-tradeFadeWhite placeholder:text-tradeFadeWhite font-medium bg-tradeAsh border ${
                          kycDetails?.backImage?.name
                            ? "border-tradeAshExtraLight"
                            : "border-tradeAshLight"
                        } border-dashed outline-none w-full p-[12px] rounded-[10px] cursor-pointer`}
                      >
                        <p
                          className={`${
                            kycDetails?.backImage?.name
                              ? "text-white"
                              : "text-tradeFadeWhite"
                          }`}
                        >
                          {kycDetails?.backImage
                            ? `Uploaded: ${kycDetails?.backImage?.name}`
                            : "JPG, PNG, PDF, SVG • 5MB max"}
                        </p>

                        <RiFileUploadFill className="text-xl" />
                      </div>

                      <input
                        type="file"
                        ref={backRef}
                        name="Back ID Image"
                        className="hidden"
                        onChange={handleBackFileChange}
                        accept="image/*,application/pdf" // optional: restrict file types
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" lg:w-[550px] w-full flex md:flex-row flex-col-reverse gap-[10px] justify-center items-center bg-tradeAs p-[12px rounded-[15px]">
              <Button
                onClick={cancelButton}
                variant="Fadeout"
                disabled={isUploading}
              >
                Back
              </Button>

              <Button
                onClick={handleKycVerification}
                variant="primary"
                disabled={isUploading}
              >
                {isUploading ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default KycVerifyStep3;
