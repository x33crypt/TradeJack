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

const KycVerificationStep3 = () => {
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

  const handleFontFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setKycDetails((prevDetails) => ({
        ...prevDetails,
        [e.target.name]: file,
      }));
    }
  };

  const handleBackFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setKycDetails((prevDetails) => ({
        ...prevDetails,
        [e.target.name]: file,
      }));
    }
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
          successMessage: result.message,
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
    navigateTo("/account/settings/kycVerification/step2");
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
              KYC Verification
            </p>
          </div>
        </div>
        <div className="flex-1 mt-[70px] flex flex-col md:justify-center md:items-center">
          <div className="flex-1 md:flex-none flex flex-col justify-between md:justify-normal md:w-[600px] w-full h-full gap-[30px]">
            <div className=" flex flex-col w-full gap-[30px]">
              <div className="flex flex-col gap-5">
                <Stepper totalSteps={3} currentStep={3} />
              </div>

              <div className="flex flex-col gap-1 w-full">
                <p className="  text-xl text-white font-[700]">
                  Identity Verification
                </p>
                <p className="text-xs text-white leading-relaxed">
                  Upload a clear image of a valid government-issued ID that
                  matches your personal details.
                </p>
              </div>

              <div className="flex md:grid grid-cols-2 flex-col gap-[30px]">
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-white font-[600]">Document Type</p>
                  <div className="relative w-full cursor-pointer ">
                    <input
                      className={`${
                        kycDetails?.documentType
                          ? "border-tradeAshExtraLight"
                          : "border-tradeAshLight"
                      } mt-[5px] text-sm text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px] cursor-pointer`}
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
                  <p className="text-sm text-white font-[600]">
                    Expiration Date
                  </p>
                  <div className="relative w-full cursor-pointer ">
                    <input
                      className={`${
                        kycDetails?.documentType
                          ? "border-tradeAshExtraLight"
                          : "border-tradeAshLight"
                      } mt-[5px] text-sm text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px] cursor-pointer`}
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

                <div className="flex flex-col gap-[20px]">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-white font-[600]">
                      Front ID Image
                    </p>
                    <div
                      onClick={handleFrontClick}
                      className={`flex items-center justify-between mt-[5px] text-sm text-tradeFadeWhite placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border ${
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
                      name="frontImage"
                      className="hidden"
                      onChange={handleFontFileChange}
                      accept="image/*,application/pdf" // optional: restrict file types
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-[20px]">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-white font-[600]">
                      Back ID Image
                    </p>
                    <div
                      onClick={handleBackClick}
                      className={`flex items-center justify-between mt-[5px] text-sm text-tradeFadeWhite placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border ${
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
                      name="backImage"
                      className="hidden"
                      onChange={handleBackFileChange}
                      accept="image/*,application/pdf" // optional: restrict file types
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex md:flex-row flex-col-reverse gap-[15px] justify-center items-center">
              <Button
                onClick={cancelButton}
                variant="outline"
                disabled={isUploading}
              >
                Go Back
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
    </>
  );
};

export default KycVerificationStep3;
