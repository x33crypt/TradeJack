import React, { useState, useEffect, useRef } from "react";
import Button from "@/components/buttons/Button";
import { useNavigate } from "react-router-dom";
import { useKyc } from "@/context/KycContext";
import { useSelectElement } from "@/context/SelectElementContext";
import { useToast } from "@/context/ToastContext";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useLocationData } from "@/hooks/useLocation";
import { RiFileUploadFill } from "react-icons/ri";
import { MdOutlineAccessTime } from "react-icons/md";
import { useFetchKycStatus } from "@/hooks/useFetchKycStatus";
import Loading from "@/components/Loading";
import Info from "@/components/alerts/Info";
import { MdOutlineBadge } from "react-icons/md";
import NetworkError from "../NetworkError";
import { dateTime } from "@/utils/dateTime";
import Stepper from "../Steppers";

const KycVerify = () => {
  const { loading, error, refetchKycStatus } = useFetchKycStatus();
  const { select, setSelect } = useSelectElement();
  const {
    kycDetails,
    setKycDetails,
    verification,
    setVerification,
    status,
    setStatus,
  } = useKyc();
  const {
    countries,
    states,
    cities,
    fetchCountries,
    fetchStates,
    fetchCities,
  } = useLocationData();
  const navigateTo = useNavigate();
  const { toast, setToast } = useToast();

  const handleFirstnameChange = (e) => {
    setKycDetails((prevDetails) => ({
      ...prevDetails,
      firstName: e.target.value,
    }));
  };

  const handleLastnameChange = (e) => {
    setKycDetails((prevDetails) => ({
      ...prevDetails,
      lastName: e.target.value,
    }));
  };

  const handleEmailChange = (e) => {
    setKycDetails((prevDetails) => ({
      ...prevDetails,
      email: e.target.value,
    }));
  };

  // Gender mapping for display vs. backend
  const genderMap = {
    male: "Male",
    female: "Female",
  };

  const genderOptions = Object.values(genderMap); // ["Male", "Female"]

  // Reverse mapping for setting backend value
  const reverseGenderMap = {
    Male: "male",
    Female: "female",
  };

  // Handle gender change
  useEffect(() => {
    if (
      select?.page !== "kyc verification" ||
      select?.element !== "gender" ||
      !select?.pick
    )
      return;

    setKycDetails((prevDetails) => ({
      ...prevDetails,
      gender: reverseGenderMap[select.pick] || select.pick,
    }));
  }, [select]);

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    const { country } = kycDetails?.address;
    if (country) {
      fetchStates(kycDetails?.address?.country);
    }
  }, [kycDetails?.address?.country]);

  useEffect(() => {
    const { country, state } = kycDetails.address;
    if (country && state) {
      fetchCities(country, state);
    }
  }, [kycDetails?.address?.state]);

  const handleStreetChange = (e) => {
    setKycDetails((prevDetails) => ({
      ...prevDetails,
      address: {
        ...prevDetails.address,
        street: e.target.value,
      },
    }));
  };

  // Update useEffect for country, state, city
  useEffect(() => {
    if (select?.page !== "kyc verification" || !select?.pick) return;

    if (select.element === "country") {
      setKycDetails((prevDetails) => ({
        ...prevDetails,
        address: {
          ...prevDetails.address,
          country: select.pick,
        },
      }));
    }

    if (select.element === "state or province") {
      setKycDetails((prevDetails) => ({
        ...prevDetails,
        address: {
          ...prevDetails.address,
          state: select.pick,
        },
      }));
    }

    if (select.element === "city or area") {
      setKycDetails((prevDetails) => ({
        ...prevDetails,
        address: {
          ...prevDetails.address,
          city: select.pick,
        },
      }));
    }
  }, [select]);

  // Document type mapping for display vs. backend
  const documentTypeMap = {
    national_id: "National ID",
    driver_license: "Driver's License",
    passport: "Passport",
  };

  const documentTypes = Object.values(documentTypeMap); // ["National ID", "Driver's License", "Passport"]

  // Reverse mapping for setting backend value
  const reverseDocumentTypeMap = {
    "National ID": "national_id",
    "Driver's License": "driver_license",
    Passport: "passport",
  };

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
          errorMessage: ` ${name} must be an image (JPEG, PNG, etc.)`,
        });
        return;
      }

      setKycDetails((prevDetails) => ({
        ...prevDetails,
        frontIdImage: file,
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
        backIdImage: file,
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
        day: day.toString().padStart(2, "0"),
      },
    }));
  };

  // Update useEffect for documentType
  useEffect(() => {
    if (
      select?.page !== "kyc verification" ||
      select?.element !== "document type" ||
      !select?.pick
    )
      return;

    setKycDetails((prevDetails) => ({
      ...prevDetails,
      documentType: reverseDocumentTypeMap[select.pick] || select.pick,
    }));
  }, [select]);

  const toStepOne = () => {
    setVerification({ stepOne: true, stepTwo: false, stepThree: false });
  };

  const toStepTwo = () => {
    const { firstName, lastName, email, gender } = kycDetails;

    if (!firstName) {
      setToast({
        ...toast,
        error: true,
        errorMessage: "Missing required field: First Name",
      });
      return;
    }

    if (!lastName) {
      setToast({
        ...toast,
        error: true,
        errorMessage: "Missing required field: Last Name",
      });
      return;
    }

    if (!email) {
      setToast({
        ...toast,
        error: true,
        errorMessage: "Missing required field: Email Address",
      });
      return;
    }

    if (!gender) {
      setToast({
        ...toast,
        error: true,
        errorMessage: "Missing required field: Gender",
      });
      return;
    }

    setVerification({ stepOne: false, stepTwo: true, stepThree: false });
  };

  const toStepThree = () => {
    const { country, state, city, street } = kycDetails.address;

    if (!country) {
      setToast({
        ...toast,
        error: true,
        errorMessage: "Missing required field: Country",
      });
      return;
    }

    if (!state) {
      setToast({
        ...toast,
        error: true,
        errorMessage: "Missing required field: State",
      });
      return;
    }

    if (!city) {
      setToast({
        ...toast,
        error: true,
        errorMessage: "Missing required field: City",
      });
      return;
    }

    if (!street) {
      setToast({
        ...toast,
        error: true,
        errorMessage: "Missing required field: Street Address",
      });
      return;
    }

    setVerification({ stepOne: false, stepTwo: false, stepThree: true });
  };

  const handleVerification = async () => {
    // Client-side validation
    if (!kycDetails.documentType) {
      setVerification({
        ...verification,
        error: true,
        errorMessage: "Missing required field: Document Type",
      });
      return;
    }

    if (
      !kycDetails.dateOfBirth.year ||
      !kycDetails.dateOfBirth.month ||
      !kycDetails.dateOfBirth.day
    ) {
      setToast({
        ...toast,
        error: true,
        errorMessage: "Missing required field: Date of Birth",
      });
      return;
    }

    if (!kycDetails.frontIdImage) {
      setToast({
        ...toast,
        error: true,
        errorMessage: "Missing required field: Front ID Image",
      });
      return;
    }

    if (!kycDetails.backIdImage) {
      setToast({
        ...toast,
        error: true,
        errorMessage: "Missing required field: Back ID Image",
      });
      return;
    }

    setVerification({
      ...verification,
      loading: true,
    });

    try {
      const result = await kycVerify(kycDetails);

      if (result.success) {
        console.log("Upload successful:", result);
        // navigateTo("/dashboard");

        setToast({
          ...toast,
          success: true,
          successMessage:
            " Your verification details have been submitted successfully. We’re reviewing your information, and you’ll be updated once the process is complete.",
        });

        setLinkAccount({
          stepOne: false,
          stepTwo: false,
          stepThree: false,
          loading: false,
          success: true,
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
      setVerification({
        ...verification,
        loading: false,
      });
    }
  };

  useEffect(() => {
    if (verification?.success === true) {
      setLinkAccount({
        stepOne: true,
        stepTwo: false,
        stepThree: false,
        loading: false,
        success: false,
      });

      refetchKycStatus();
    }
  }, [verification?.success]);

  console.log("KYC STATUS", status);
  console.log("KYC Details", kycDetails);
  console.log("KYC Verification", verification);

  return (
    <div className="flex flex-col md:border border-neutral-800 w-full min-h-svh">
      <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">KYC Verification</p>
      </div>

      <div className="flex h-full w-full  p-[15px]">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex h-full w-full">
            {status?.state === null ? (
              <NetworkError />
            ) : (
              <div className="flex h-full w-full">
                {status?.state === "not_submitted" ? (
                  <div className=" h-full w-full">
                    <div
                      className={`${
                        verification?.stepOne ? "flex" : "hidden"
                      } flex-col justify-between gap-[15px] h-full w-full`}
                    >
                      <div className="">
                        <p className="text-xs text-tradeFadeWhite font-medium">
                          Enter your personal details exactly as shown on your
                          official ID to avoid delays in verification.
                        </p>
                      </div>

                      <div className="flex flex-col h-full justify-between gap-[20px]">
                        <div className="flex flex-col gap-[10px]">
                          <div className="p-[12px] bg-tradeAsh border border-tradeAshLight rounded-[15px] flex flex-col gap-[15px]">
                            <div className="flex flex-col gap-[10px] w-full">
                              <p className="text-tradeFadeWhite text-xs font-medium">
                                First Name
                              </p>

                              <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px] overflow-hidden">
                                <input
                                  className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none"
                                  type="text"
                                  name="firstName"
                                  placeholder="eg. John"
                                  value={kycDetails.firstName}
                                  onChange={handleFirstnameChange}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="p-[12px] bg-tradeAsh border border-tradeAshLight rounded-[15px] flex flex-col gap-[15px]">
                            <div className="flex flex-col gap-[10px] w-full">
                              <p className="text-tradeFadeWhite text-xs font-medium">
                                Last Name
                              </p>

                              <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px] overflow-hidden">
                                <input
                                  className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none"
                                  type="text"
                                  name="lastName"
                                  placeholder="eg. Doe"
                                  value={kycDetails.lastName}
                                  onChange={handleLastnameChange}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="p-[12px] bg-tradeAsh border border-tradeAshLight rounded-[15px] flex flex-col gap-[15px]">
                            <div className="flex flex-col gap-[10px] w-full">
                              <p className="text-tradeFadeWhite text-xs font-medium">
                                Email Address
                              </p>

                              <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px] overflow-hidden">
                                <input
                                  className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none"
                                  type="text"
                                  name="email"
                                  placeholder="e.g. john.doe@example.com"
                                  value={kycDetails.email}
                                  onChange={handleEmailChange}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="p-[12px] bg-tradeAsh border border-tradeAshLight rounded-[15px] flex flex-col gap-[15px]">
                            <div className="flex flex-col gap-[10px] w-full">
                              <p className="text-tradeFadeWhite text-xs font-medium">
                                Select your Gender
                              </p>
                              <div className="flex-1 flex bg-tradeAshLight relative border border-tradeAshLight rounded-[10px] cursor-pointer">
                                <input
                                  className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none cursor-pointer"
                                  type="text"
                                  readOnly
                                  placeholder="Select gender"
                                  value={
                                    kycDetails?.gender
                                      ? genderMap[kycDetails.gender]
                                      : ""
                                  }
                                  onClick={() =>
                                    setSelect({
                                      ...select,
                                      state: true,
                                      selectOne: true,
                                      selectTwo: false,
                                      element: "gender",
                                      options: genderOptions,
                                      pick: "",
                                      page: "kyc verification",
                                    })
                                  }
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                                  <MdKeyboardArrowDown />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-center gap-[10px]">
                          <Button variant="primary" onClick={toStepTwo}>
                            Continue
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`${
                        verification?.stepTwo ? "flex" : "hidden"
                      } flex-col justify-between gap-[15px] h-full w-full`}
                    >
                      <div className="">
                        <p className="text-xs text-tradeFadeWhite font-medium">
                          Enter your current residential address exactly as it
                          appears on your official documents.
                        </p>
                      </div>

                      <div className="flex flex-col h-full justify-between gap-[20px]">
                        <div className="flex flex-col gap-[10px]">
                          <div className="p-[12px] bg-tradeAsh border border-tradeAshLight rounded-[15px] flex flex-col gap-[15px]">
                            <div className="flex flex-col gap-[10px] w-full">
                              <p className="text-tradeFadeWhite text-xs font-medium">
                                Country
                              </p>
                              <div className="flex-1 flex bg-tradeAshLight relative border border-tradeAshLight rounded-[10px] cursor-pointer">
                                <input
                                  className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none cursor-pointer"
                                  type="text"
                                  readOnly
                                  placeholder="Select country"
                                  name="country"
                                  value={kycDetails?.address?.country}
                                  onClick={() =>
                                    setSelect({
                                      ...select,
                                      state: true,
                                      selectOne: true,
                                      selectTwo: false,
                                      element: "country",
                                      options: countries,
                                      pick: "",
                                      page: "kyc verification",
                                    })
                                  }
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                                  <MdKeyboardArrowDown />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="p-[12px] bg-tradeAsh border border-tradeAshLight rounded-[15px] flex flex-col gap-[15px]">
                            <div className="flex flex-col gap-[10px] w-full">
                              <p className="text-tradeFadeWhite text-xs font-medium">
                                State/Province
                              </p>
                              <div className="flex-1 flex bg-tradeAshLight relative border border-tradeAshLight rounded-[10px] cursor-pointer">
                                <input
                                  className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none cursor-pointer"
                                  type="text"
                                  readOnly
                                  placeholder="Select state or province"
                                  name="state"
                                  value={kycDetails?.address?.state}
                                  onClick={() =>
                                    setSelect({
                                      ...select,
                                      state: true,
                                      selectOne: true,
                                      selectTwo: false,
                                      element: "state or province",
                                      options: states,
                                      pick: "",
                                      page: "kyc verification",
                                    })
                                  }
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                                  <MdKeyboardArrowDown />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="p-[12px] bg-tradeAsh border border-tradeAshLight rounded-[15px] flex flex-col gap-[15px]">
                            <div className="flex flex-col gap-[10px] w-full">
                              <p className="text-tradeFadeWhite text-xs font-medium">
                                City/Area
                              </p>
                              <div className="flex-1 flex bg-tradeAshLight relative border border-tradeAshLight rounded-[10px] cursor-pointer">
                                <input
                                  className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none cursor-pointer"
                                  type="text"
                                  readOnly
                                  placeholder="Select city or area"
                                  name="city"
                                  value={kycDetails?.address?.city}
                                  onClick={() =>
                                    setSelect({
                                      ...select,
                                      state: true,
                                      selectOne: true,
                                      selectTwo: false,
                                      element: "city or area",
                                      options: cities,
                                      pick: "",
                                      page: "kyc verification",
                                    })
                                  }
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                                  <MdKeyboardArrowDown />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="p-[12px] bg-tradeAsh border border-tradeAshLight rounded-[15px] flex flex-col gap-[15px]">
                            <div className="flex flex-col gap-[10px] w-full">
                              <p className="text-tradeFadeWhite text-xs font-medium">
                                City/Area
                              </p>
                              <div className="flex-1 flex bg-tradeAshLight relative border border-tradeAshLight rounded-[10px] cursor-pointer">
                                <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px] overflow-hidden">
                                  <input
                                    className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none"
                                    type="text"
                                    name="street"
                                    value={kycDetails?.address?.street}
                                    placeholder="eg. House number, street name, etc."
                                    onChange={handleStreetChange}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-center gap-[10px]">
                          <Button variant="primary" onClick={toStepThree}>
                            Continue
                          </Button>
                          <Button variant="outline" onClick={toStepOne}>
                            Previous
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`${
                        verification?.stepThree ? "flex" : "hidden"
                      } flex-col justify-between  gap-[15px] h-full w-full`}
                    >
                      <div className="">
                        <p className="text-xs text-tradeFadeWhite font-medium">
                          Select a valid government-issued document to verify
                          your identity. Make sure your document matches the
                          details provided and includes your date of birth.
                        </p>
                      </div>

                      <div className="flex flex-col gap-[20px] h-full justify-between">
                        <div className="flex flex-col gap-[10px]">
                          <div className="p-[12px] bg-tradeAsh border border-tradeAshLight rounded-[15px] flex flex-col gap-[15px]">
                            <div className="flex flex-col gap-[10px] w-full">
                              <p className="text-tradeFadeWhite text-xs font-medium">
                                Document Type
                              </p>
                              <div className="flex-1 flex bg-tradeAshLight relative border border-tradeAshLight rounded-[10px] cursor-pointer">
                                <input
                                  className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none cursor-pointer"
                                  type="text"
                                  readOnly
                                  placeholder="Select a document type"
                                  name="documentType"
                                  value={
                                    kycDetails?.documentType
                                      ? documentTypeMap[kycDetails.documentType]
                                      : ""
                                  }
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
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                                  <MdKeyboardArrowDown />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="p-[12px] bg-tradeAsh border border-tradeAshLight rounded-[15px] flex flex-col gap-[15px]">
                            <div className="flex flex-col gap-[10px] w-full">
                              <p className="text-tradeFadeWhite text-xs font-medium">
                                Date of Birth
                              </p>

                              <div className="flex-1 flex bg-tradeAshLight relative border border-tradeAshLight rounded-[10px] cursor-pointer">
                                <input
                                  type="date"
                                  name="dateOfBirth"
                                  placeholder="Select your birth date"
                                  value={
                                    kycDetails.dateOfBirth.year &&
                                    kycDetails.dateOfBirth.month &&
                                    kycDetails.dateOfBirth.day
                                      ? `${kycDetails.dateOfBirth.year}-${kycDetails.dateOfBirth.month}-${kycDetails.dateOfBirth.day}`
                                      : ""
                                  }
                                  onChange={handleDateChange}
                                  className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none cursor-pointer"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="p-[12px] bg-tradeAsh border border-tradeAshLight rounded-[15px] flex flex-col gap-[15px]">
                            <div className="flex flex-col gap-[10px] w-full">
                              <p className="text-tradeFadeWhite text-xs font-medium">
                                Front ID Image
                              </p>
                              <div
                                onClick={handleFrontClick}
                                className={`flex items-center justify-between mt-[5px] text-[13px] text-tradeFadeWhite placeholder:text-tradeFadeWhite font-medium bg-tradeAsh border ${
                                  kycDetails?.frontIdImage?.name
                                    ? "border-tradeAshExtraLight"
                                    : "border-tradeAshLight"
                                } border-dashed outline-none w-full p-[12px] rounded-[10px] cursor-pointer`}
                              >
                                <p
                                  className={`${
                                    kycDetails?.frontIdImage?.name
                                      ? "text-white"
                                      : "text-tradeFadeWhite"
                                  }`}
                                >
                                  {kycDetails?.frontIdImage
                                    ? `Uploaded: ${kycDetails?.frontIdImage?.name}`
                                    : "JPG, PNG • 5MB max"}
                                </p>
                                <RiFileUploadFill className="text-xl" />
                              </div>
                              <input
                                type="file"
                                ref={frontRef}
                                name="frontIdImage"
                                className="hidden"
                                onChange={handleFrontFileChange}
                                accept="image/*"
                              />
                            </div>
                          </div>
                          <div className="p-[12px] bg-tradeAsh border border-tradeAshLight rounded-[15px] flex flex-col gap-[15px]">
                            <div className="flex flex-col gap-[10px] w-full">
                              <p className="text-tradeFadeWhite text-xs font-medium">
                                Back ID Image
                              </p>
                              <div
                                onClick={handleBackClick}
                                className={`flex items-center justify-between mt-[5px] text-[13px] text-tradeFadeWhite placeholder:text-tradeFadeWhite font-medium bg-tradeAsh border ${
                                  kycDetails?.backIdImage?.name
                                    ? "border-tradeAshExtraLight"
                                    : "border-tradeAshLight"
                                } border-dashed outline-none w-full p-[12px] rounded-[10px] cursor-pointer`}
                              >
                                <p
                                  className={`${
                                    kycDetails?.backIdImage?.name
                                      ? "text-white"
                                      : "text-tradeFadeWhite"
                                  }`}
                                >
                                  {kycDetails?.backIdImage
                                    ? `Uploaded: ${kycDetails?.backIdImage?.name}`
                                    : "JPG, PNG • 5MB max"}
                                </p>
                                <RiFileUploadFill className="text-xl" />
                              </div>
                              <input
                                type="file"
                                ref={backRef}
                                name="backIdImage"
                                className="hidden"
                                onChange={handleBackFileChange}
                                accept="image/*"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-center gap-[10px]">
                          <Button
                            variant="primary"
                            onClick={handleVerification}
                            disabled={verification?.loading}
                          >
                            Submit
                          </Button>
                          <Button variant="outline" onClick={toStepTwo}>
                            Previous
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : status?.state === "pending" ? (
                  <div className=" h-full w-full">
                    <div
                      className={`flex flex-col justify-between gap-[15px] h-full w-full`}
                    >
                      <div className="flex flex-col h-full justify-between">
                        <div className="flex flex-col gap-[15px] items-center justify-center">
                          <div className="flex items-center">
                            <div className="text-[60px] text-tradeGreen leading-none">
                              <MdOutlineBadge />
                            </div>
                          </div>

                          <p className="text-white text-lg font-semibold ">
                            We're verifying your identity
                          </p>

                          <p className="text-xs text-tradeFadeWhite font-medium text-center">
                            Your verification details have been submitted
                            successfully. We’re reviewing your information, and
                            you’ll be updated once the process is complete.
                          </p>
                        </div>
                        <div className="flex flex-col bg-tradeAsh border border-tradeAshLight rounded-[15px] w-full">
                          <div className="flex items-center justify-between gap-[10px] p-3 border-b border-tradeAshLight">
                            <p className="text-[13px] font-semibold text-white">
                              Date submitted
                            </p>
                            <p className="text-tradeFadeWhite text-[13px] font-semibold">
                              {dateTime(status?.data?.submissionDate)}
                            </p>
                          </div>

                          <div className="flex items-center justify-between gap-[10px] p-3 border-b border-tradeAshLight">
                            <p className="text-[13px] font-semibold text-white">
                              Estimated approval
                            </p>
                            <p className="text-tradeFadeWhite text-[13px] font-semibold">
                              17 April 2025
                            </p>
                          </div>

                          <div className="flex items-center justify-between gap-[10px] p-3 border-b border-tradeAshLight">
                            <p className="text-[13px] font-semibold text-white">
                              Verification status
                            </p>
                            <div>
                              {(() => {
                                if (status?.state === "not_submitted") {
                                  return <NotSubmittedComponent />;
                                } else if (status?.state === "pending") {
                                  return (
                                    <p className="text-[13px] font-semibold text-tradeOrange">
                                      Pending
                                    </p>
                                  );
                                } else if (status?.state === "verified") {
                                  return <VerifiedComponent />;
                                } else {
                                  return <UnknownStateComponent />;
                                }
                              })()}
                            </div>
                          </div>

                          <div className="flex items-center justify-between gap-[10px] p-3">
                            <p className="text-[13px] font-semibold text-white">
                              Verification fee
                            </p>
                            <p className="text-tradeFadeWhite text-[13px] font-semibold">
                              NGN 0.00
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-center gap-[10px]">
                          <Button
                            variant="primary"
                            onClick={() => navigateTo("/dashboard")}
                          >
                            Return to Dashboard
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default KycVerify;
