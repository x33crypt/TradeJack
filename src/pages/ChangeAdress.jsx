import React, { useState, useEffect } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import { IoWarning } from "react-icons/io5";
import useSafeNavigate from "@/components/SafeNavigation";
import { useAuth } from "../context/AuthContext";
import { MdKeyboardArrowDown } from "react-icons/md";

const ChangeAdress = () => {
  const { isVerified, setIsVerified } = useAuth();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [addressDetails, setAddressDetails] = useState({
    country: { iso2: "", name: "" },
    state: { iso2: "", name: "" },
    city: "",
    streetAddress: "",
    landmark: "",
  });

  const [fieldError, setFieldError] = useState({
    country: { error: false, message: "" },
    stateOrProvince: { error: false, message: "" },
    cityOrArea: { error: false, message: "" },
    streetAddress: { error: false, message: "" },
    landmark: { error: false, message: "" },
  });

  const [updating, setUpdating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigateTo = useSafeNavigate();

  useEffect(() => {
    if (!isVerified) {
      navigateTo("/account/auth/verify", {
        state: { from: "/account/update/phone" },
        replace: false, // 👈 this line is key!
      });
    }
  }, [isVerified, navigateTo]);

  const handleCountryChange = (e) => {
    const [name, iso2] = e.target.value.split("|");

    setAddressDetails((prevDetails) => ({
      ...prevDetails,
      country: {
        name: name,
        iso2: iso2,
      },
    }));
  };

  const handleStateChange = (e) => {
    const [name, iso2] = e.target.value.split("|");

    setAddressDetails((prevDetails) => ({
      ...prevDetails,
      state: {
        name: name,
        iso2: iso2,
      },
    }));
  };

  const handleCityChange = (e) => {
    setAddressDetails((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }));
  };

  const handleStreetChange = (e) => {
    setAddressDetails((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }));
  };

  const sanitizeInput = (input) => {
    const cleaned = DOMPurify.sanitize(input);
    return cleaned.replace(/\s+/g, "").trim();
  };

  const showFieldError = (field, message) => {
    setFieldError((prev) => ({
      ...prev,
      [field]: { error: true, message },
    }));
  };

  const closeFieldError = (field) => {
    setFieldError((prev) => ({
      ...prev,
      [field]: { error: false, message: "" },
    }));
  };

  const baseUrl = import.meta.env.VITE_API_URL;
  const countryStateApiKey =
    "Zm5Gc0N5dUIzTFRoTDMwSG1LZ2t3aWJNQXptU1B1VUxBR1lhSFlJag==";
  const countryStateApiUrl = "https://api.countrystatecity.in/v1";

  const getCountries = async () => {
    try {
      const response = await axios.get(`${countryStateApiUrl}/countries`, {
        headers: {
          "X-CSCAPI-KEY": countryStateApiKey, // 👈 header must be exactly like this
        },
      });

      const countries = response?.data?.map((item) => ({
        name: item.name,
        iso2: item.iso2,
      }));

      countries.sort((a, b) => a.name.localeCompare(b.name));
      setCountries(countries);
    } catch (error) {
      console.error("Error fetching countries:", error);
      throw error;
    }
  };

  const getStates = async () => {
    try {
      const response = await axios.get(
        `${countryStateApiUrl}/countries/${addressDetails?.country?.iso2}/states`,
        {
          headers: {
            "X-CSCAPI-KEY": countryStateApiKey,
          },
        }
      );

      const states = response?.data?.map((item) => ({
        name: item.name,
        iso2: item.iso2,
      }));

      states.sort((a, b) => a.name.localeCompare(b.name));
      setStates(states);
    } catch (error) {
      console.error("Error fetching states:", error);
      throw error;
    }
  };

  const getCities = async () => {
    try {
      const response = await axios.get(
        `${countryStateApiUrl}/countries/${addressDetails?.country?.iso2}/states/${addressDetails?.state?.iso2}/cities`,
        {
          headers: {
            "X-CSCAPI-KEY": countryStateApiKey,
          },
        }
      );

      const cities = response?.data?.map((item) => ({
        name: item.name,
      }));

      cities.sort((a, b) => a.name.localeCompare(b.name));
      setCities(cities);
    } catch (error) {
      console.error("Error fetching states:", error);
      throw error;
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    getStates();
  }, [addressDetails?.country?.name]);

  useEffect(() => {
    getCities();
  }, [addressDetails?.state?.name]);

  console.log(countries);
  console.log(states);
  console.log(cities);
  console.log(addressDetails);

  const handleSubmitChange = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setErrorMessage("");

    // // Sanitizing all input fields
    // const sanitizedDetails = {
    //   code: sanitizeInput(phoneDetails?.code),
    //   country: sanitizeInput(phoneDetails?.country),
    //   phoneNumber: sanitizeInput(phoneDetails?.phoneNumber),
    // };

    // setTimeout(async () => {
    //   if (!sanitizedDetails.country) {
    //     showFieldError("countryCode", "Select field is required");
    //     setUpdating(false);
    //     return;
    //   } else {
    //     closeFieldError("countryCode");
    //   }

    //   if (!sanitizedDetails.phoneNumber) {
    //     showFieldError("phoneNumber", "Input field is required.");
    //     setUpdating(false);
    //     return;
    //   } else {
    //     closeFieldError("phoneNumber");
    //   }

    //   const payload = {
    //     code: `${sanitizedDetails.code}`,
    //     country: `${sanitizedDetails.country}`,
    //     phoneNumber: `${sanitizedDetails.phoneNumber}`,
    //   };

    //   try {
    //     const response = await axios.post(
    //       `${baseUrl}/auth/update/password`,
    //       payload
    //     );
    //     console.log("Update successful:", response.data);
    //     setUpdating(false);
    //     navigateTo("/update/completed");
    //   } catch (err) {
    //     setUpdating(false);

    //     console.error("update error:", err);

    //     const errMessage =
    //       err?.response?.data?.error?.message ||
    //       "We couldn't process your request at the moment. Please try again shortly.";

    //     setErrorMessage(errMessage);
    //   }
    // }, 1000);
  };

  return (
    <>
      <div className="flex gap-[15px] min-h-svh bg-black">
        <div className="flex w-full flex-col gap-[10px]">
          <div className="z-50 fixed right-0 left-0 top-0 bg-black flex border-b lg:px-[2%] md:px-[2.5%] p-[15px] border-tradeAshLight">
            <p className="  text-[17px] text-white font-[700]">
              Change Address
            </p>
          </div>
          <form className="h-full mt-[50px]" onSubmit={handleSubmitChange}>
            <div className="w-full h-full flex flex-col lg:py-[50px] md:py-[50px] p-[15px] md:justify-center md:items-center">
              <div className="flex flex-col justify-between md:w-[400px] w-full h-full md:gap-[30px] gap-[30px]">
                <div className=" flex flex-col w-full gap-[30px]">
                  <div
                    className={` ${
                      errorMessage ? "flex" : "hidden"
                    } w-full p-[12px] text-red-500 gap-[4px] items-center border  border-red-500 rounded-[10px]`}
                  >
                    <IoWarning className="text-[14px]" />
                    <p className="text-[13px]">{errorMessage}</p>
                  </div>

                  <div className="w-full flex flex-col gap-[2px]">
                    <div className="w-full">
                      <p className="text-[14px] text-white font-[600]">
                        Country
                      </p>
                      <div className="relative w-full">
                        <select
                          className={`${
                            addressDetails?.country?.name
                              ? "border-tradeGreen"
                              : "border-tradeAshLight"
                          } appearance-none mt-[5px] text-[14px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px]  scrollbar-thin scrollbar-thumb-tradeGreen scrollbar-track-tradeAsh`}
                          name="country"
                          onChange={handleCountryChange}
                        >
                          <option value="">Select Country</option>
                          {countries.map((c) => (
                            <option key={c.iso2} value={`${c.name}|${c.iso2}`}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                          <MdKeyboardArrowDown />
                        </div>
                      </div>
                    </div>

                    <div
                      className={`${
                        fieldError.country.error ? "flex" : "hidden"
                      } gap-[4px] items-center text-red-500 mt-[4px]`}
                    >
                      <IoWarning className="text-[14px]" />
                      <p className="text-[12px]">
                        {fieldError.country.message}
                      </p>
                    </div>
                  </div>

                  <div className="w-full flex flex-col gap-[2px]">
                    <div className="w-full">
                      <p className="text-[14px] text-white font-[600]">
                        State/Province
                      </p>
                      <div className="relative w-full">
                        <select
                          className={`${
                            addressDetails?.state?.name
                              ? "border-tradeGreen"
                              : "border-tradeAshLight"
                          } appearance-none mt-[5px] text-[14px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px]  scrollbar-thin scrollbar-thumb-tradeGreen scrollbar-track-tradeAsh`}
                          name="state"
                          onChange={handleStateChange}
                        >
                          <option value="">Select State or Province</option>
                          {states.map((s) => (
                            <option key={s.iso2} value={`${s.name}|${s.iso2}`}>
                              {s.name}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                          <MdKeyboardArrowDown />
                        </div>
                      </div>
                    </div>

                    <div
                      className={`${
                        fieldError.country.error ? "flex" : "hidden"
                      } gap-[4px] items-center text-red-500 mt-[4px]`}
                    >
                      <IoWarning className="text-[14px]" />
                      <p className="text-[12px]">
                        {fieldError.country.message}
                      </p>
                    </div>
                  </div>

                  <div className="w-full flex flex-col gap-[2px]">
                    <div className="w-full">
                      <p className="text-[14px] text-white font-[600]">
                        City/Area
                      </p>
                      <div className="relative w-full">
                        <select
                          className={`${
                            addressDetails?.city
                              ? "border-tradeGreen"
                              : "border-tradeAshLight"
                          } appearance-none mt-[5px] text-[14px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px]  scrollbar-thin scrollbar-thumb-tradeGreen scrollbar-track-tradeAsh`}
                          name="city"
                          onChange={handleCityChange}
                        >
                          <option value="">Select City or Area</option>
                          {cities.map((c, index) => (
                            <option key={index} value={`${c.name}`}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                          <MdKeyboardArrowDown />
                        </div>
                      </div>
                    </div>

                    <div
                      className={`${
                        fieldError.country.error ? "flex" : "hidden"
                      } gap-[4px] items-center text-red-500 mt-[4px]`}
                    >
                      <IoWarning className="text-[14px]" />
                      <p className="text-[12px]">
                        {fieldError.country.message}
                      </p>
                    </div>
                  </div>

                  <div className="w-full flex flex-col gap-[2px]">
                    <div className="w-full ">
                      <p className="text-[14px] font-[600] text-white">
                        Street Address
                      </p>
                      <input
                        className={`${
                          addressDetails.streetAddress
                            ? "border-tradeGreen"
                            : "border-tradeAshLight"
                        } mt-[5px] text-[14px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px]`}
                        type="text"
                        name="phoneNumber"
                        placeholder="eg. House number, street name, etc."
                        onChange={handleStreetChange}
                      />
                    </div>

                    <div
                      className={`${
                        fieldError.streetAddress.error ? "flex" : "hidden"
                      } gap-[4px] items-center text-red-500 mt-[4px]`}
                    >
                      <IoWarning className="text-[14px]" />
                      <p className="text-[12px]">
                        {fieldError.streetAddress.message}
                      </p>
                    </div>
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
                    className={` ${
                      updating
                        ? "bg-tradeAsh text-tradeGreen"
                        : "bg-tradeGreen hover:bg-tradeAsh text-black hover:text-tradeGreen"
                    } w-full p-[12px] rounded-[10px] flex justify-center items-center cursor-pointer transition-all duration-300`}
                  >
                    <p className="text-[14px] font-[700]">
                      {updating ? "Updating..." : "Update"}
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangeAdress;
