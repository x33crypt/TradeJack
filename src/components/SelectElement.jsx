import React, { useState } from "react";
import { useSelectElement } from "@/context/SelectElementContext";
import LockByScroll from "./LockByScroll";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdOutlineCancel } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const SelectElement = () => {
  const { select, setSelect } = useSelectElement();
  const [searchInput, setSearchInput] = useState("");

  const handleUpdate = (option) => {
    setSelect({
      ...select,
      state: false,
      selectOne: false,
      selectTwo: false,
      pick: option,
    });
    setSearchInput("");
  };

  console.log(select.options);

  if (!select?.state) return null;

  return (
    <div className="fixed inset-0  bg-black bg-opacity-80 flex flex-col gap-[15px] items-center justify-center z-50 px-[50px]">
      <LockByScroll />

      {/* FIRST DIV — for string options */}
      <div
        className={`${
          select?.selectOne ? "flex" : "hidden"
        } bg-tradeAsh md:w-[500px] w-full flex-col items-center p-[15px] gap-[15px] rounded-[14px]`}
      >
        <div className="flex h-[43px] w-full rounded-[8px] px-[10px] py-[5px] gap-[10px] items-center  border border-tradeAshLight">
          <FaMagnifyingGlass className="text-[18px] text-tradeFadeWhite" />
          <input
            className="outline-none lg:h-[30px] h-[35px] text-white text-[14px] placeholder:text-tradeFadeWhite w-full bg-transparent"
            type="text"
            placeholder="Search account"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className="overflow-y-auto custom-scrollbar w-full">
          {searchInput ? (
            <div className="max-h-[250px] flex flex-col gap-[5px]">
              {(select?.options || [])
                .filter((option) => typeof option === "string")
                .filter((option) =>
                  option.toLowerCase().includes(searchInput.toLowerCase())
                )
                .map((option, index) => (
                  <div
                    key={index}
                    onClick={() => handleUpdate(option)}
                    className="px-[10px] py-[10px] mr-[10px] hover:bg-tradeGreen text-white hover:text-black border border-tradeAshLight hover:border-tradeGreen rounded-[8px] cursor-pointer transition-all duration-300"
                  >
                    <p className="text-[14px]">{option}</p>
                  </div>
                ))}
            </div>
          ) : (
            <div className="h-[250px] flex flex-col gap-[5px]">
              {(select?.options || [])
                .filter((option) => typeof option === "string")
                .sort((a, b) => a.localeCompare(b))
                .map((option, index) => (
                  <div
                    key={index}
                    onClick={() => handleUpdate(option)}
                    className="px-[10px] py-[10px] mr-[10px] hover:bg-tradeGreen text-white hover:text-black border border-tradeAshLight hover:border-tradeGreen rounded-[8px] cursor-pointer transition-all duration-300"
                  >
                    <p className="text-[14px]">{option}</p>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* SECOND DIV — for object options */}
      <div
        className={`${
          select?.selectTwo ? "flex" : "hidden"
        } bg-tradeAsh md:w-[500px] w-full flex-col items-center p-[15px] gap-[15px] rounded-[14px]`}
      >
        <div className="flex h-[43px] w-full rounded-[8px] px-[10px] py-[5px] gap-[10px] items-center border border-tradeAshLight">
          <FaMagnifyingGlass className="text-[18px] text-tradeFadeWhite" />
          <input
            className="outline-none lg:h-[30px] h-[35px] text-white text-[14px] placeholder:text-tradeFadeWhite w-full bg-transparent"
            type="text"
            placeholder="Search account"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className="overflow-y-auto custom-scrollbar w-full">
          {searchInput ? (
            <div className="h-[250px] flex flex-col gap-[10px] mr-[10px]">
              {(select?.options || [])
                .filter(
                  (option) => typeof option === "object" && option !== null
                )
                .filter(({ name }) =>
                  name.toLowerCase().includes(searchInput.toLowerCase())
                )
                .map(({ code, name }, index) => (
                  <div
                    key={index}
                    onClick={() => handleUpdate({ code, name })}
                    className="px-[10px] py-[10px] mr-[10px] hover:bg-tradeGreen text-white hover:text-black border border-tradeAshLight hover:border-tradeGreen rounded-[8px] cursor-pointer transition-all duration-300"
                  >
                    <p className="text-[14px]">
                      {code} — {name}
                    </p>
                  </div>
                ))}
            </div>
          ) : (
            <div className="h-[250px] flex flex-col gap-[5px] overflow-auto">
              {(select?.options || [])
                .filter(
                  (option) => typeof option === "object" && option !== null
                )
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(({ code, name }, index) => (
                  <div
                    key={index}
                    onClick={() => handleUpdate({ code, name })}
                    className="px-[10px] py-[10px] mr-[10px] hover:bg-tradeGreen text-white hover:text-black border border-tradeAshLight hover:border-tradeGreen rounded-[8px] cursor-pointer transition-all duration-300"
                  >
                    <p className="text-[14px]">
                      {code} — {name}
                    </p>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      <div
        className="md:w-[500px] w-full bg-black text-tradeFadeWhite hover:text-white border border-tradeAshLight hover:border-tradeAshExtraLight p-[12px] rounded-[10px] flex justify-center items-center cursor-pointer transition-all duration-300"
        onClick={() => setSelect({ ...select, state: false })}
      >
        <p className="text-[14px] font-[700] ">Cancel</p>
      </div>
    </div>
  );
};

export default SelectElement;
