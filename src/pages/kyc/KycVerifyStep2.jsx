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
import Button from "@/components/buttons/Button";
import SideNav from "@/components/account/nav/SideNav";

const KycVerifyStep2 = () => {
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

  const nextButton = () => {
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

    return navigateTo("/account/settings/kycVerify/step3");
  };

  const cancelButton = () => {
    navigateTo("/account/settings/kycVerify/step1");
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
                <Stepper totalSteps={3} currentStep={2} />
              </div>

              <div className="flex flex-col lg:w-[550px] w-full gap-[30px] bg-tradeAsh border border-tradeAshLight rounded-[15px] p-[12px]">
                <div className="flex flex-col gap-1 w-full">
                  <p className="  text-xl text-white font-[700]">
                    Address Information
                  </p>
                  <p className="text-xs text-tradeFadeWhite leading-relaxed">
                    Enter your current residential address exactly as it appears
                    on your official documents.
                  </p>
                </div>

                <div className="flex md:grid grid-cols-2 flex-col gap-[15px] bg-tradeAsh ">
                  <div className="flex flex-col gap-1">
                    <p className="text-[13px] text-tradeFadeWhite font-medium">
                      Country
                    </p>
                    <div className="relative w-full cursor-pointer ">
                      <input
                        className={`${
                          kycDetails.addressDetails.country
                            ? "border-tradeAshExtraLight"
                            : "border-tradeAshLight"
                        } mt-[5px] text-[13px] text-white placeholder:text-tradeFadeWhite font-medium bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px] cursor-pointer`}
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
                    <p className="text-[13px] text-tradeFadeWhite font-medium">
                      State/Province
                    </p>
                    <div className="relative w-full cursor-pointer ">
                      <input
                        className={`${
                          kycDetails.addressDetails.state
                            ? "border-tradeAshExtraLight"
                            : "border-tradeAshLight"
                        } mt-[5px] text-[13px] text-white placeholder:text-tradeFadeWhite font-medium bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px] cursor-pointer`}
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
                    <p className="text-[13px] text-tradeFadeWhite font-medium">
                      City/Area
                    </p>
                    <div className="relative w-full cursor-pointer ">
                      <input
                        className={`${
                          kycDetails.addressDetails.city
                            ? "border-tradeAshExtraLight"
                            : "border-tradeAshLight"
                        } mt-[5px] text-[13px] text-white placeholder:text-tradeFadeWhite font-medium bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px] cursor-pointer`}
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
                    <p className="text-[13px] font-medium text-tradeFadeWhite">
                      Street Address
                    </p>
                    <input
                      className={`${
                        kycDetails.addressDetails.street
                          ? "border-tradeAshExtraLight"
                          : "border-tradeAshLight"
                      } mt-[5px] text-[13px] text-white placeholder:text-tradeFadeWhite font-medium bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px]`}
                      type="text"
                      name="street"
                      value={kycDetails.addressDetails.street}
                      placeholder="eg. House number, street name, etc."
                      onChange={handleStreetChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className=" lg:w-[550px] w-full flex md:flex-row flex-col-reverse gap-[10px] justify-center items-center bg-tradeAs p-[12px rounded-[15px]">
              <Button onClick={cancelButton} variant="Fadeout">
                Back
              </Button>

              <Button onClick={nextButton} variant="primary">
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KycVerifyStep2;
