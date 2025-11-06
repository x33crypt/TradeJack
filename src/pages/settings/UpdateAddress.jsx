import React, { useState, useEffect } from "react";
import { useToast } from "@/context/otherContext/ToastContext";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import InAppNav from "@/components/others/InAppNav";
import { editAddress } from "@/utils/auth/editAddress";
import Button from "@/components/buttons/Button";
import Footer from "@/components/others/Footer";
import { useSelectElement } from "@/context/otherContext/SelectElementContext";
import { useCountries } from "@/hooks/others/useCountries";
import { useCountryStates } from "@/hooks/others/useCountryStates";
import { useStateCities } from "@/hooks/others/useStateCities";

const UpdateAddress = () => {
  const { select, setSelect } = useSelectElement();
  const { toast, setToast } = useToast();
  const [addressDetails, setAddressDetails] = useState({
    country: "",
    state: "",
    city: "",
    street: "",
  });
  const { countries } = useCountries();
  const { states } = useCountryStates(addressDetails?.country || "");
  const { cities } = useStateCities(
    addressDetails?.country || "",
    addressDetails?.state || ""
  );

  const navigateTo = useNavigate();
  console.log("countries:", countries);
  console.log("states:", states);
  console.log("cities:", cities);

  // handling country change
  useEffect(() => {
    if (select?.page !== "update address" || !select?.pick) return;

    if (select.element === "countries") {
      const pick = select.pick;

      setAddressDetails((prev) => ({
        ...prev,
        country: pick,
        state: "",
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
    }
  }, [select]);

  // handling state change
  useEffect(() => {
    if (select?.page !== "update address" || !select?.pick) return;

    if (select.element === "states") {
      const pick = select.pick;

      setAddressDetails((prev) => ({
        ...prev,
        state: pick,
        city: "",
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
    }
  }, [select]);

  // handling cities change
  useEffect(() => {
    if (select?.page !== "update address" || !select?.pick) return;

    if (select.element === "cities") {
      const pick = select.pick;

      setAddressDetails((prev) => ({
        ...prev,
        city: pick,
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
    }
  }, [select]);

  const handleStreetChange = (e) => {
    setAddressDetails((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }));
  };

  console.log("Address:", addressDetails);

  const handleEditAddress = async (e) => {
    e.preventDefault();

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
    }
  };

  return (
    <>
      <InAppNav />
      <div className="md:pt-[70px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex bg-black">
        <div className="flex flex-1 flex-col gap-[20px] lg:mx-[22.8%] p-[15px]">
          <div className="flex items-center justify-between ">
            <p className="text-lg font-semibold text-white flex items-center gap-1">
              UPDATE ADDRESS
            </p>
          </div>

          <div className="flex flex-col gap-[30px]">
            <div className="flex flex-col gap-[25px]">
              <p className="text-xs text-tradeFadeWhite font-medium leading-relaxed">
                Keep your address information accurate to help confirm your
                identity, enhance account security, and build trust across the
                platform.
              </p>
              <div className="flex flex-col gap-[10px]">
                <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                  <div className="flex flex-1 items-center justify-between">
                    <p className="text-[13px] text-tradeFadeWhite font-semibold">
                      Country
                    </p>
                  </div>

                  <div className="flex-1 flex bg-tradeAshLight relative border border-tradeAshLight rounded-[10px] cursor-pointer">
                    <input
                      className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none cursor-pointer"
                      type="text"
                      readOnly
                      placeholder="Select country"
                      value={addressDetails?.country}
                      onClick={() =>
                        setSelect({
                          ...select,
                          state: true,
                          selectOne: true,
                          selectTwo: false,
                          element: "countries",
                          options: countries,
                          pick: "",
                          page: "update address",
                        })
                      }
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                      <MdKeyboardArrowDown />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                  <div className="flex flex-1 items-center justify-between">
                    <p className="text-[13px] text-tradeFadeWhite font-semibold">
                      State/Province
                    </p>
                  </div>

                  <div className="flex-1 flex bg-tradeAshLight relative border border-tradeAshLight rounded-[10px] cursor-pointer">
                    <input
                      className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none cursor-pointer"
                      type="text"
                      readOnly
                      placeholder="Select state or province"
                      value={addressDetails?.state}
                      onClick={() =>
                        setSelect({
                          ...select,
                          state: true,
                          selectOne: true,
                          selectTwo: false,
                          element: "states",
                          options: states,
                          pick: "",
                          page: "update address",
                        })
                      }
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                      <MdKeyboardArrowDown />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                  <div className="flex flex-1 items-center justify-between">
                    <p className="text-[13px] text-tradeFadeWhite font-semibold">
                      City/Area
                    </p>
                  </div>

                  <div className="flex-1 flex bg-tradeAshLight relative border border-tradeAshLight rounded-[10px] cursor-pointer">
                    <input
                      className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none cursor-pointer"
                      type="text"
                      readOnly
                      placeholder="Select city or area"
                      value={addressDetails?.city}
                      onClick={() =>
                        setSelect({
                          ...select,
                          state: true,
                          selectOne: true,
                          selectTwo: false,
                          element: "cities",
                          options: cities,
                          pick: "",
                          page: "update address",
                        })
                      }
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                      <MdKeyboardArrowDown />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] borde border-tradeAshLight">
                  <div className="flex flex-1 items-center justify-between">
                    <p className="text-[13px] text-tradeFadeWhite font-semibold">
                      Street Address
                    </p>
                  </div>

                  <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px]">
                    <input
                      className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none"
                      type="text"
                      name="street"
                      placeholder="eg. House number, street name, etc."
                      onChange={handleStreetChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[20px]">
              <Button variant="secondary" onClick={handleEditAddress}>
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

export default UpdateAddress;
