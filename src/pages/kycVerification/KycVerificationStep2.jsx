import React, { useState, useEffect } from "react";
import { useToast } from "@/context/ToastContext";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import InAppNav from "@/components/InAppNav";
import { useSelectElement } from "@/context/SelectElementContext";
import Stepper from "@/components/Steppers";
import { useKyc } from "@/context/KycContext";
import { useLocationData } from "@/hooks/useLocation";

const KycVerificationStep2 = () => {
  const { select, setSelect } = useSelectElement();
  const { kycDetails, setKycDetails } = useKyc();
  const { toast, setToast } = useToast();
  const {
    countries,
    states,
    cities,
    fetchCountries,
    fetchStates,
    fetchCities,
  } = useLocationData();

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    const { country } = kycDetails.addressDetails;

    if (country) {
      fetchStates(kycDetails.addressDetails.country);
    }
  }, [kycDetails?.addressDetails?.country]);

  useEffect(() => {
    const { country, state } = kycDetails.addressDetails;
    if (country && state) {
      fetchCities(country, state);
    }
  }, [kycDetails.addressDetails.state]);

  const handleStreetChange = (e) => {
    const { name, value } = e.target;

    setKycDetails((prevDetails) => ({
      ...prevDetails,
      addressDetails: {
        ...prevDetails.addressDetails,
        [name]: value,
      },
    }));
  };

  // handling country, state and city changs
  useEffect(() => {
    if (select?.page !== "kyc verification" || !select?.pick) return;

    if (select.element === "country") {
      setKycDetails((prevDetails) => ({
        ...prevDetails,
        addressDetails: {
          ...prevDetails.addressDetails,
          country: select.pick,
        },
      }));
    }

    if (select.element === "state or province") {
      setKycDetails((prevDetails) => ({
        ...prevDetails,
        addressDetails: {
          ...prevDetails.addressDetails,
          state: select.pick,
        },
      }));
    }

    if (select.element === "city or area") {
      setKycDetails((prevDetails) => ({
        ...prevDetails,
        addressDetails: {
          ...prevDetails.addressDetails,
          city: select.pick,
        },
      }));
    }
  }, [select]);

  console.log(kycDetails);

  const navigateTo = useNavigate();

  const handleToStep3 = () => {
    const { country, state, city, street } = kycDetails.addressDetails;

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

    return navigateTo("/account/settings/kycVerification/step3");
  };

  return (
    <>
      <InAppNav />
      <div className="md:pt-[63px] pt-[60px] flex flex-col gap-[15px] lg:px-[2%] md:px-[2.5%] p-[2.5%] min-h-svh bg-black">
        <div className="z-20 fixed lg:right-[2.5%] md:right[2%] right-[2.5%]  lg:left-[2.5%] md:left[2%] left-[2.5%] bg-black flex items-center gap-4 border-b  py-[15px] border-tradeAshLight">
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
          <div className="flex-1 md:flex-none flex flex-col justify-between md:justify-normal md:w-[400px] w-full h-full gap-[30px]">
            <div className=" flex flex-col w-full gap-[30px]">
              <div className="flex flex-col gap-5">
                <p className="text-2xl text-white font-[700] ">Step 2.</p>
                <Stepper totalSteps={3} currentStep={2} />
              </div>

              <div className="flex flex-col gap-1 w-full">
                <p className="  text-xl text-white font-[700]">
                  Address Information
                </p>
                <p className="text-xs text-white leading-relaxed">
                  Enter your current residential address exactly as it appears
                  on your official documents.
                </p>
              </div>

              <div className="flex flex-col gap-[30px]">
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-white font-[600]">Country</p>
                  <div className="relative w-full cursor-pointer ">
                    <input
                      className={`${
                        kycDetails.addressDetails.country
                          ? "border-tradeAshExtraLight"
                          : "border-tradeAshLight"
                      } mt-[5px] text-sm text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px] cursor-pointer`}
                      type="text"
                      readOnly
                      placeholder="Select country"
                      name="country"
                      value={kycDetails.addressDetails.country}
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
                    State/Province
                  </p>
                  <div className="relative w-full cursor-pointer ">
                    <input
                      className={`${
                        kycDetails.addressDetails.state
                          ? "border-tradeAshExtraLight"
                          : "border-tradeAshLight"
                      } mt-[5px] text-sm text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px] cursor-pointer`}
                      type="text"
                      readOnly
                      placeholder="Select state or province"
                      name="state"
                      value={kycDetails.addressDetails.state}
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

                <div className="flex flex-col gap-1">
                  <p className="text-sm text-white font-[600]">City/Area</p>
                  <div className="relative w-full cursor-pointer ">
                    <input
                      className={`${
                        kycDetails.addressDetails.city
                          ? "border-tradeAshExtraLight"
                          : "border-tradeAshLight"
                      } mt-[5px] text-sm text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px] cursor-pointer`}
                      type="text"
                      readOnly
                      placeholder="Select city or area"
                      name="city"
                      value={kycDetails.addressDetails.city}
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

                <div className="flex flex-col gap-1">
                  <p className="text-sm font-[600] text-white">
                    Street Address
                  </p>
                  <input
                    className={`${
                      kycDetails.addressDetails.street
                        ? "border-tradeAshExtraLight"
                        : "border-tradeAshLight"
                    } mt-[5px] text-sm text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px]`}
                    type="text"
                    name="street"
                    value={kycDetails.addressDetails.street}
                    placeholder="eg. House number, street name, etc."
                    onChange={handleStreetChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex md:flex-row flex-col gap-[20px]">
              <div
                className=" w-full bg-transparent text-tradeFadeWhite hover:text-white border border-tradeAshLight hover:border-tradeAshExtraLight p-[12px] rounded-[10px] flex justify-center items-center cursor-pointer transition-all duration-300"
                onClick={() =>
                  navigateTo("/account/settings/kycVerification/step1")
                }
              >
                <p className="text-sm font-[700] ">Back</p>
              </div>

              <button
                onClick={() => handleToStep3()}
                className="bg-tradeGreen hover:bg-tradeAsh text-black hover:text-tradeGreen w-full p-[12px] rounded-[10px] flex justify-center items-center cursor-pointer transition-all duration-300"
              >
                <p className="text-sm font-[700]">Continue</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KycVerificationStep2;
