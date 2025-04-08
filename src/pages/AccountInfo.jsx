import React, { useState, useEffect, useRef } from "react";

import InAppNav from "@/components/InAppNav";

const AccountInfo = () => {
  const [isProfileEdit, setIsProfileEdit] = useState(false);

  const profileRef = useRef(null);

  useEffect(() => {
    if (isProfileEdit) {
      profileRef.current?.focus(); // Focuses on the first input field
    }
  }, [isProfileEdit]);

  return (
    <>
      <InAppNav />
      <div className="pt-[90px] bg-black min-h-screen flex flex-col p-[15px] gap-[30px]">
        <div className="flex items-center justify-between">
          <p className="text-[16px] font-[700] text-white">Profile details</p>

          <div className="lg:flex hidden justify-end">
            <p
              onClick={() => setIsProfileEdit((prev) => !prev)}
              className={`${
                isProfileEdit
                  ? "text-black bg-tradeGreen border-tradeAshExtraLight"
                  : "text-neutral-500 bg-transparent border-neutral-800"
              } text-[14px] font-[600] flex  justify-between items-center gap-[5px] px-[12px] py-[4px] rounded-[6.5px]  border hover:border-tradeAshExtraLight cursor-pointer duration-300 transition-all`}
            >
              {isProfileEdit ? "Save Changes" : "Edit Profile"}
            </p>
          </div>
        </div>

        <div className="flex flex-col  gap-[20px]  borde border-tradeAshLight rounded-[5px]">
          <div className="flex-1 flex flex-col gap-[5px]">
            <p className="text-[12.5px] font-[500] text-tradeFadeWhite">
              Full name
            </p>
            <input
              ref={profileRef}
              className={`h-[40px] px-[10px] py-[4px] text-white font-[600] text-[15px] rounded-[8px] border border-neutral-700 outline-none transition-all duration-300 ${
                isProfileEdit
                  ? "cursor-text border-tradeAshExtraLight bg-black"
                  : "cursor-default bg-tradeAsh "
              }`}
              type="text"
              readOnly={!isProfileEdit}
            />
          </div>

          <div className="flex-1 flex flex-col gap-[5px]">
            <p className="text-[12.5px] font-[500] text-tradeFadeWhite">
              Username
            </p>
            <input
              className={`h-[40px] px-[10px] py-[4px] text-white font-[600] text-[15px]  rounded-[8px] border border-neutral-700 outline-none transition-all duration-300 ${
                isProfileEdit
                  ? "cursor-text border-tradeAshExtraLight bg-black"
                  : "cursor-default bg-tradeAsh "
              }`}
              type="text"
              readOnly={!isProfileEdit}
            />
          </div>

          <div className="flex-1 flex flex-col gap-[5px]">
            <p className="text-[12.5px] font-[500] text-tradeFadeWhite">
              Email address
            </p>
            <input
              className={`h-[40px] px-[10px] py-[4px] text-white font-[600] text-[15px]  rounded-[8px] border border-neutral-700 outline-none transition-all duration-300 ${
                isProfileEdit
                  ? "cursor-text border-tradeAshExtraLight bg-black"
                  : "cursor-default bg-tradeAsh "
              }`}
              type="text"
              readOnly={!isProfileEdit}
            />
          </div>

          <div className="flex-1 flex flex-col gap-[5px]">
            <p className="text-[12.5px] font-[500] text-tradeFadeWhite">
              Phone number
            </p>
            <input
              className={`h-[40px] px-[10px] py-[4px] text-white font-[600] text-[15px]  rounded-[8px] border border-neutral-700 outline-none transition-all duration-300 ${
                isProfileEdit
                  ? "cursor-text border-tradeAshExtraLight bg-black"
                  : "cursor-default bg-tradeAsh "
              }`}
              type="text"
              readOnly={!isProfileEdit}
            />
          </div>
        </div>

        <div className="flex lg:hidden justify-end">
          <p
            onClick={() => setIsProfileEdit((prev) => !prev)}
            className={`${
              isProfileEdit
                ? "text-black bg-tradeGreen border-tradeAshExtraLight"
                : "text-neutral-500 bg-transparent border-neutral-800"
            } text-[14px] font-[600] flex  justify-between items-center gap-[5px] px-[12px] py-[4px] rounded-[6.5px]  border hover:border-tradeAshExtraLight cursor-pointer duration-300 transition-all`}
          >
            {isProfileEdit ? "Save Changes" : "Edit Profile"}
          </p>
        </div>
      </div>
    </>
  );
};

export default AccountInfo;
