import React, { useState } from "react";
import { useSelectElement } from "@/context/SelectElementContext";
import LockByScroll from "./LockByScroll";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Button from "./buttons/Button";

const SelectElement = () => {
  const { select, setSelect } = useSelectElement();
  const [searchInput, setSearchInput] = useState("");

  const handleUpdate = (option) => {
    setSelect({
      ...select,
      state: false,
      selectOne: false,
      selectTwo: false,
      options: [],
      pick: option,
    });
    setSearchInput("");
  };

  console.log(select.options);

  if (!select?.state) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col gap-[15px] items-center justify-center z-50 px-[40px]">
      <LockByScroll />

      {/* FIRST DIV — for string options */}
      <div
        className={`${
          select?.selectOne ? "flex" : "hidden"
        } bg-tradeAsh md:w-[400px] w-full flex-col items-center p-[12px] gap-[15px] rounded-[14px]`}
      >
        <div className="flex  w-full rounded-[10px] px-[12px] py-[5px] gap-[10px] items-center  border border-tradeAshLight">
          <FaMagnifyingGlass className="text-[18px] text-tradeFadeWhite" />
          <input
            className="outline-none lg:h-[30px] h-[35px] text-white text-[13px] placeholder:text-tradeFadeWhite w-full bg-transparent"
            type="text"
            placeholder={`Search ${select?.element}`}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className="overflow-y-auto custom-scrollbar w-full">
          {searchInput ? (
            <div className=" max-h-[300px] flex flex-col gap-[5px] w-full">
              {(select?.options || [])
                .filter((option) => typeof option === "string")
                .filter((option) =>
                  option.toLowerCase().includes(searchInput.toLowerCase())
                )
                .map((option, index) => (
                  <div
                    key={index}
                    onClick={() => handleUpdate(option)}
                    className="p-[10px]  hover:bg-tradeLightGreen text-white hover:text-black border border-tradeAshLight hover:border-tradeGreen rounded-[8px] cursor-pointer transition-all duration-300"
                  >
                    <p className="text-[13px]">{option}</p>
                  </div>
                ))}
            </div>
          ) : (
            <div className=" max-h-[300px] flex flex-col gap-[5px] w-full">
              {(select?.options || [])
                .filter((option) => typeof option === "string")
                .sort((a, b) => a.localeCompare(b))
                .map((option, index) => (
                  <div
                    key={index}
                    onClick={() => handleUpdate(option)}
                    className="px-[10px] py-[10px]  hover:bg-tradeLightGreen text-white hover:text-black border border-tradeAshLight hover:border-tradeGreen rounded-[8px] cursor-pointer transition-all duration-300"
                  >
                    <p className="text-[13px]">{option}</p>
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
        } bg-tradeAsh md:w-[400px] w-full flex-col items-center p-[12px] gap-[15px] rounded-[14px]`}
      >
        <div className="flex h-[43px] w-full rounded-[8px] px-[10px] py-[5px] gap-[10px] items-center border border-tradeAshLight">
          <FaMagnifyingGlass className="text-[18px] text-tradeFadeWhite" />
          <input
            className="outline-none lg:h-[30px] h-[35px] text-white text-[13px] placeholder:text-tradeFadeWhite w-full bg-transparent"
            type="text"
            placeholder={`Search ${select?.element}`}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className="overflow-y-auto custom-scrollbar w-full">
          {searchInput ? (
            <div className="max-h-[300px] flex flex-col gap-[10px] mr-[10px]">
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
                    className=" relative px-[10px] py-[10px] hover:bg-tradeLightGreen text-white hover:text-black border border-tradeAshLight hover:border-tradeGreen rounded-[8px] cursor-pointer transition-all duration-300"
                  >
                    <p className="text-[13px]">{name}</p>

                    <p className=" absolute right-1.5 top-1/2 -translate-y-1/2 text-[13px]  border  border-tradeAshLight flex justify-between items-center px-[10px] lg:h-[30px] h-[35px] rounded-[6px]">
                      {code}
                    </p>
                  </div>
                ))}
            </div>
          ) : (
            <div className="max-h-[300px] flex flex-col gap-[5px] w-full">
              {(select?.options || [])
                .filter(
                  (option) => typeof option === "object" && option !== null
                )
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(({ code, name }, index) => (
                  <div
                    key={index}
                    onClick={() => handleUpdate({ code, name })}
                    className="relative px-[10px] py-[10px] hover:bg-tradeLightGreen text-white hover:text-black border border-tradeAshLight hover:border-tradeGreen rounded-[8px] cursor-pointer transition-all duration-300"
                  >
                    <p className="text-[13px]">{name}</p>

                    <p className=" absolute right-1.5 top-1/2 -translate-y-1/2 text-[13px]  border  border-tradeAshLight flex justify-between items-center px-[10px] lg:h-[30px] h-[35px] rounded-[6px]">
                      {code}
                    </p>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      <Button
        onClick={() => setSelect({ ...select, state: false })}
        variant="secondary"
        maxWidth="md:w-[400px]"
      >
        Cancel
      </Button>
    </div>
  );
};

export default SelectElement;
