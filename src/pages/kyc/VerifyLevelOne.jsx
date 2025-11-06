import Footer from "@/components/others/Footer";
import InAppNav from "@/components/others/InAppNav";
import React, { useEffect } from "react";
import Button from "@/components/buttons/Button";
import { useKyc } from "@/context/userContext/KycContext";
import { useSelectElement } from "@/context/otherContext/SelectElementContext";
import { usePhoneCodes } from "@/hooks/others/usePhoneCodes";
import { useToast } from "@/context/otherContext/ToastContext";
import { useNavigate } from "react-router-dom";

const VerifyLevelOne = () => {
  const { tierOne, setTierOne } = useKyc();
  const { select, setSelect } = useSelectElement();
  const { phoneCodes } = usePhoneCodes();
  const { toast, setToast } = useToast();

  console.log(tierOne);
  const navigateTo = useNavigate();

  const handleFullnameChange = (e) => {
    setTierOne((prevDetails) => ({
      ...prevDetails,
      fullname: e.target.value,
    }));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // remove all non-digits
    setTierOne((prevDetails) => ({
      ...prevDetails,
      phone: value,
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
      select?.page !== "kyc tier one" ||
      select?.element !== "gender" ||
      !select?.pick
    )
      return;

    setTierOne((prevDetails) => ({
      ...prevDetails,
      gender: reverseGenderMap[select.pick] || select.pick,
    }));
  }, [select]);

  // handling code change
  useEffect(() => {
    if (
      select?.page !== "kyc tier one" ||
      select?.element !== "Phone codes" ||
      !select?.pick
    )
      return;

    setTierOne((prev) => ({
      ...prev,
      code: select.pick?.code,
    }));
  }, [select]);

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

    setTierOne((prev) => ({
      ...prev,
      dateOfBirth: {
        day: day.toString().padStart(2, "0"),
        month: month.toString().padStart(2, "0"),
        year: year.toString(),
      },
    }));
  };

  return (
    <>
      <InAppNav />
      <div className="md:pt-[70px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex bg-black">
        <div className="flex flex-1 flex-col gap-[20px] lg:mx-[22.8%] p-[15px]">
          <div className="flex items-center justify-between ">
            <p className="text-lg font-semibold text-white flex items-center gap-1">
              KYC TIER 1
            </p>
          </div>
          <div className="flex flex-col gap-[30px]">
            <div className="flex flex-col gap-[25px]">
              <p className="text-xs text-tradeFadeWhite font-medium leading-relaxed">
                Provide your basic information to verify your identity and
                activate your account. This quick Tier 1 process ensures your
                account stays secure and ready for transactions.
              </p>
              <div className="flex flex-col gap-[10px]">
                <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                  <div className="flex flex-1 items-center justify-between">
                    <p className="text-[13px] text-tradeFadeWhite font-semibold">
                      Full Name
                    </p>
                  </div>

                  <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px]">
                    <input
                      className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none"
                      type="text"
                      name="fullname"
                      placeholder="eg. John Doe"
                      value={tierOne.fullname}
                      onChange={handleFullnameChange}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                  <div className="flex flex-1 items-center justify-between">
                    <p className="text-[13px] text-tradeFadeWhite font-semibold">
                      Date of Birth
                    </p>
                  </div>

                  <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px]">
                    <input
                      className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none cursor-pointer"
                      type="date"
                      name="dateOfBirth"
                      placeholder="Select your birth date"
                      value={
                        tierOne.dateOfBirth.year &&
                        tierOne.dateOfBirth.month &&
                        tierOne.dateOfBirth.day
                          ? `${tierOne.dateOfBirth.year}-${tierOne.dateOfBirth.month}-${tierOne.dateOfBirth.day}`
                          : ""
                      }
                      onChange={handleDateChange}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                  <div className="flex flex-1 items-center justify-between">
                    <p className="text-[13px] text-tradeFadeWhite font-semibold">
                      Gender
                    </p>
                  </div>

                  <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px]">
                    <input
                      className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none cursor-pointer"
                      type="text"
                      readOnly
                      placeholder="Select gender"
                      value={tierOne?.gender ? genderMap[tierOne.gender] : ""}
                      onChange={handleFullnameChange}
                      onClick={() =>
                        setSelect({
                          ...select,
                          state: true,
                          selectOne: true,
                          selectTwo: false,
                          element: "gender",
                          options: genderOptions,
                          pick: "",
                          page: "kyc tier one",
                        })
                      }
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                  <div className="flex flex-1 items-center justify-between">
                    <p className="text-[13px] text-tradeFadeWhite font-semibold">
                      Phone Number
                    </p>
                  </div>

                  <div className="flex gap-[10px]">
                    <div
                      onClick={() =>
                        setSelect({
                          ...select,
                          state: true,
                          selectOne: false,
                          selectTwo: true,
                          element: "Phone codes",
                          options: phoneCodes,
                          pick: "",
                          page: "kyc tier one",
                        })
                      }
                      className="flex p-[12px] min-w-[50px] items-center justify-center gap-[10px] bg-tradeAshLight border border-tradeAshLight rounded-[10px]"
                    >
                      <p className="text-white text-sm font-medium cursor-pointer">
                        {tierOne?.code ? tierOne.code : ""}
                      </p>
                    </div>
                    <div className="flex-1 flex gap-[10px] bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px]">
                      <input
                        className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none"
                        type="text"
                        name="phone"
                        placeholder="Enter phone number"
                        value={tierOne.phone}
                        onChange={handlePhoneChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Button
              variant="secondary"
              onClick={() => navigateTo("/kyc/tier/1")}
            >
              SUBMIT
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VerifyLevelOne;
