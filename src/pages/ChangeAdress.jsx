import React, { useState, useEffect } from "react";
import { useToast } from "@/context/ToastContext";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import InAppNav from "@/components/InAppNav";
import { editAddress } from "@/utils/auth/editAddress";

const ChangeAdress = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [addressDetails, setAddressDetails] = useState({
    country: "",
    state: "",
    city: "",
    street: "",
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const { toast, setToast } = useToast();

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

  console.log(addressDetails);

  const navigateTo = useNavigate();

  const handleEditAddress = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const result = await editAddress(addressDetails);

      if (result.success) {
        console.log("Address has been updated successfully:", result.data);
        navigateTo("/account/profile");
        setToast({
          ...toast,
          success: true,
          successMessage: result.message,
        });
      } else {
        console.error("Error while updating address:", result.error);
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

      <div className="md:pt-[63px] pt-[60px] md:pb-[100px] flex flex-col gap-[15px] lg:px-[2%] md:px-[2.5%] p-[15px] min-h-svh bg-black">
        <div className="flex w-full flex-col gap-[10px]">
          <div className="flex items-center gap-4 border-b  py-[15px] border-tradeAshLight">
            <div className="flex items-center gap-3 ">
              <IoMdArrowRoundBack
                onClick={() => navigateTo(location?.state?.from || -1)}
                className="text-tradeFadeWhite text-[20px] cursor-pointer"
              />
              <p className="  text-base text-white font-[700]">Edit Address</p>
            </div>
          </div>

          <div className=" flex-1 flex flex-col md:justify-center md:items-center">
            <div className="flex flex-col justify-between md:w-[400px] w-full h-full md:gap-[30px] gap-[30px]">
              <div className=" flex flex-col w-full gap-[30px]">
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-white font-[600]">Country</p>
                  <div className="relative w-full">
                    <select
                      className={`${
                        addressDetails?.country?.name
                          ? "border-tradeGreen"
                          : "border-tradeAshLight"
                      } appearance-none mt-[5px] text-sm text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px]  scrollbar-thin scrollbar-thumb-tradeGreen scrollbar-track-tradeAsh`}
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

                <div className="flex flex-col gap-1">
                  <p className="text-sm text-white font-[600]">
                    State/Province
                  </p>
                  <div className="relative w-full">
                    <select
                      className={`${
                        addressDetails?.state?.name
                          ? "border-tradeGreen"
                          : "border-tradeAshLight"
                      } appearance-none mt-[5px] text-sm text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px]  scrollbar-thin scrollbar-thumb-tradeGreen scrollbar-track-tradeAsh`}
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

                <div className="flex flex-col gap-1">
                  <p className="text-sm text-white font-[600]">City/Area</p>
                  <div className="relative w-full">
                    <select
                      className={`${
                        addressDetails?.city
                          ? "border-tradeGreen"
                          : "border-tradeAshLight"
                      } appearance-none mt-[5px] text-sm text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px]  scrollbar-thin scrollbar-thumb-tradeGreen scrollbar-track-tradeAsh`}
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

                <div className="flex flex-col gap-1">
                  <p className="text-sm font-[600] text-white">
                    Street Address
                  </p>
                  <input
                    className={`${
                      addressDetails.street
                        ? "border-tradeGreen"
                        : "border-tradeAshLight"
                    } mt-[5px] text-sm text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px]`}
                    type="text"
                    name="street"
                    placeholder="eg. House number, street name, etc."
                    onChange={handleStreetChange}
                  />
                </div>

                <div>
                  <p className="text-tradeOrange text-sm font-semibold">
                    Please note:
                  </p>
                  <ul className="list-disc list-inside text-white text-sm space-y-1 mt-1">
                    <li>
                      A verification code will be sent to your phone number.
                    </li>
                    <li>
                      Ensure the number is active and accessible before
                      proceeding.
                    </li>
                    <li>
                      You won’t be able to update your phone number again for
                      the next 30 days.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex md:flex-row flex-col gap-[20px]">
                <div
                  className=" w-full bg-transparent text-tradeFadeWhite hover:text-white border border-tradeAshLight hover:border-tradeAshExtraLight p-[12px] rounded-[10px] flex justify-center items-center cursor-pointer transition-all duration-300"
                  onClick={() => navigateTo(location?.state?.from || -1)}
                >
                  <p className="text-sm font-[700] ">Cancel</p>
                </div>

                <button
                  onClick={handleEditAddress}
                  className={` ${
                    isUpdating
                      ? "bg-tradeAsh text-tradeGreen"
                      : "bg-tradeGreen hover:bg-tradeAsh text-black hover:text-tradeGreen"
                  } w-full p-[12px] rounded-[10px] flex justify-center items-center cursor-pointer transition-all duration-300`}
                >
                  <p className="text-sm font-[700]">
                    {isUpdating ? "updating..." : "Update"}
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

export default ChangeAdress;
