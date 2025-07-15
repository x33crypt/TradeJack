import React, { useState } from "react";
import { useSelectElement } from "@/context/SelectElementContext";
import LockByScroll from "./LockByScroll";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Button from "./buttons/Button";
import { capitalizeFirst } from "@/utils/capitalizeFirst";
import { IoClose } from "react-icons/io5";

const SelectElement = () => {
  const { select, setSelect } = useSelectElement();
  const { state } = select;
  const [searchInput, setSearchInput] = useState("");

  console.log(select.options);

  const close = () => {
    setSelect({ ...select, state: false });
  };

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

  return (
    <div>
      {state && (
        <div>
          <LockByScroll />
          <div className="fixed inset-0 lg:px-[15px] md:px-[2.5%] p-[35px]  bg-black bg-opacity-80 flex items-center justify-center z-50">
            <div className="flex flex-col gap-[10px] bg-tradeAsh borde border-tradeAshLight p-[15px] rounded-[15px] shadow-lg lg:max-w-sm w-full max-h-[400px]">
              <div className="flex justify-between items-start gap-[15px] pb-[15px] md:pt-0 md:p-[15px] lg:pb-[12px] lg:p-0 border-b border-tradeAshLight">
                <div className="flex flex-col gap-3">
                  <p className="text-lg font-semibold text-white leading-none">
                    Select {capitalizeFirst(select?.element)}
                  </p>
                </div>

                <div onClick={close}>
                  <IoClose className="text-tradeFadeWhite hover:text-white cursor-pointer text-xl" />
                </div>
              </div>

              <div className="flex flex-col gap-[10px] justify-between flex-1">
                {/* FIRST DIV — for string options */}
                <div
                  className={`${
                    select?.selectOne ? "flex" : "hidden"
                  } bg-tradeAsh w-full flex-col items-center gap-[15px] rounded-[14px] h-[280px]`}
                >
                  <div className="flex bg-tradeAshLight  w-full rounded-[10px] px-[12px] py-[5px] gap-[10px] items-center  border border-tradeAshLight">
                    <FaMagnifyingGlass className="text-[18px] text-tradeFadeWhite" />
                    <input
                      className="outline-none lg:h-[30px] h-[35px] text-white text-[13px] font-medium placeholder:text-tradeFadeWhite w-full bg-transparent"
                      type="text"
                      placeholder={`Search ${select?.element}`}
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                    />
                  </div>
                  <div className="overflow-y-auto custom-scrollbar w-full">
                    {searchInput ? (
                      <div className=" flex flex-col gap-[5px] w-full">
                        {(select?.options || [])
                          .filter((option) => typeof option === "string")
                          .filter((option) =>
                            option
                              .toLowerCase()
                              .includes(searchInput.toLowerCase())
                          )
                          .map((option, index) => (
                            <div
                              key={index}
                              onClick={() => handleUpdate(option)}
                              className="p-[10px]  font-medium hover:bg-tradeLightGreen text-white hover:text-black border border-tradeAshLight hover:border-tradeGreen rounded-[8px] cursor-pointer transition-all duration-300"
                            >
                              <p className="text-[13px]">{option}</p>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className=" flex flex-col gap-[5px] w-full">
                        {(select?.options || [])
                          .filter((option) => typeof option === "string")
                          .sort((a, b) => a.localeCompare(b))
                          .map((option, index) => (
                            <div
                              key={index}
                              onClick={() => handleUpdate(option)}
                              className="px-[10px] py-[10px] font-medium  hover:bg-tradeLightGreen text-white hover:text-black border border-tradeAshLight hover:border-tradeGreen rounded-[8px] cursor-pointer transition-all duration-300"
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
                  } flex-col items-center p-[12px] gap-[10px]`}
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
                            (option) =>
                              typeof option === "object" && option !== null
                          )
                          .filter(({ name }) =>
                            name
                              .toLowerCase()
                              .includes(searchInput.toLowerCase())
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
                            (option) =>
                              typeof option === "object" && option !== null
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectElement;
