import React, { useState } from "react";
import { useSelectElement } from "@/context/otherContext/SelectElementContext";
import LockByScroll from "./LockByScroll";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Button from "../buttons/Button";
import { capitalizeFirst } from "@/utils/capitalizeFirst";
import { IoClose } from "react-icons/io5";
import SmallButton from "../buttons/SmallButton";
import { IoMdArrowDropright } from "react-icons/io";

const SelectElement = () => {
  const { select, setSelect } = useSelectElement();
  const { state, options } = select;
  const [searchInput, setSearchInput] = useState("");

  const close = () => {
    setSelect({ ...select, state: false, options: [] });
  };

  const handleUpdate = (option) => {
    setSelect({
      ...select,
      state: false,
      selectOne: false,
      selectTwo: false,
      options: null,
      pick: option,
    });
    setSearchInput("");
  };

  const filterObjectOption = (select?.options || [])
    .filter((option) => typeof option === "object" && option !== null)
    .filter(({ name }) =>
      searchInput
        ? name.toLowerCase().includes(searchInput.toLowerCase())
        : true
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  const filterStringOption = (select?.options || [])
    .filter((option) => typeof option === "string")
    .filter((option) =>
      searchInput
        ? option.toLowerCase().includes(searchInput.toLowerCase())
        : true
    )
    .sort((a, b) => a.localeCompare(b));

  return (
    <div>
      {state && (
        <div>
          <LockByScroll />
          <div className="fixed top-0 left-0 right-0 bottom-0 lg:px-[15px] md:px-[2.5%] p-[35px] bg-black backdrop-blur-sm bg-opacity-80 flex flex-col gap-[40px] items-center justify-center z-50">
            <div className="flex w-[250px] h-max flex-col rounded-[15px] gap-[10px]">
              {/* FIRST Search — for string options */}
              <div
                className={`${
                  select?.selectOne && options?.length > 10 ? "flex" : "hidden"
                } rounded-[15px] flex flex-col gap-[15px] `}
              >
                <div
                  className={`${
                    select?.options?.length > 5 ? "flex" : "flex"
                  }  flex-1 bg-tradeAshLight relative border border-tradeAsh rounded-[15px] cursor-pointer`}
                >
                  <input
                    className="bg-transparent flex-1 p-[15px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none cursor-pointer"
                    type="text"
                    placeholder="Search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </div>
              </div>

              {/* SECOND Search — for object options */}
              <div
                className={`${
                  select?.selectTwo && options?.length > 10 ? "flex" : "hidden"
                } flex-col gap-[15px]`}
              >
                <div
                  className={`${
                    select?.options?.length > 5 ? "flex" : "flex"
                  }  flex-1 bg-tradeAshLight relative border border-tradeAsh rounded-[15px] cursor-pointer`}
                >
                  <input
                    className="bg-transparent flex-1 p-[15px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none cursor-pointer"
                    type="text"
                    placeholder="Search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </div>
              </div>

              {/* FIRST DIV — for string options */}
              <div
                className={` ${
                  select?.selectOne ? "flex" : "hidden"
                }  flex-col p-[15px] bg-tradeAshLight gap-[15px] rounded-[15px] border border-tradeAsh`}
              >
                <div className="flex items-center gap-2">
                  <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
                  <p className="text-tradeFadeWhite hover:text-white text-[15px] font-bold transition-all duration-300 cursor-pointer">
                    {select?.element.toUpperCase()}
                  </p>
                </div>
                <div
                  className={`flex w-full flex-col gap-[15px] rounded-[15px] md:max-h-[245px] max-h-[300px]`}
                >
                  {Array.isArray(options) && options.length > 0 ? (
                    <div className="overflow-y-auto custom-scrollbar w-full">
                      {searchInput ? (
                        <div className="flex flex-wrap gap-[10px] p-1 w-full">
                          {filterStringOption.length ? (
                            filterStringOption.map((option, index) => (
                              <SmallButton
                                key={index}
                                variant="fadeoutPlus"
                                onClick={() => handleUpdate(option)}
                              >
                                {option}
                              </SmallButton>
                            ))
                          ) : (
                            <div className=" text-xs text-tradeFadeWhite">
                              NO MATCHING RESULT FOUND
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className=" flex flex-wrap gap-[10px] p-1 w-full">
                          {(select?.options || [])
                            .filter((option) => typeof option === "string")
                            // .sort((a, b) => a.localeCompare(b))
                            .map((option, index) => (
                              <SmallButton
                                key={index}
                                variant="fadeoutPlus"
                                onClick={() => handleUpdate(option)}
                              >
                                {option}
                              </SmallButton>
                            ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-xs font-medium text-tradeFadeWhite">
                      OPTIONS NOT FOUND
                    </div>
                  )}
                </div>
              </div>

              {/* SECOND DIV — for object options */}
              <div
                className={` ${
                  select?.selectTwo ? "flex" : "hidden"
                }  flex-col p-[15px] bg-tradeAshLight gap-[15px] rounded-[15px] border border-tradeAsh`}
              >
                <div className="flex items-center gap-2">
                  <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
                  <p className="text-tradeFadeWhite hover:text-white text-[15px] font-bold transition-all duration-300 cursor-pointer">
                    {select?.element.toUpperCase()}
                  </p>
                </div>
                <div
                  className={`flex flex-col gap-[15px] rounded-[15px] w-full md:max-h-[245px] max-h-[300px]`}
                >
                  {Array.isArray(options) && options.length > 0 ? (
                    <div className="overflow-y-auto custom-scrollbar  ">
                      {searchInput ? (
                        <div className="flex flex-col gap-[10px] p-1  ">
                          {filterObjectOption.length ? (
                            filterObjectOption.map(({ code, name }) => (
                              <div
                                key={code}
                                onClick={() => handleUpdate({ code, name })}
                                className="flex flex-wrap items-center gap-[5px] w-full"
                              >
                                <SmallButton variant="fadeoutPlus">
                                  {name}
                                </SmallButton>

                                <SmallButton variant="fadeoutPlus">
                                  {code}
                                </SmallButton>
                              </div>
                            ))
                          ) : (
                            <div className=" text-xs text-tradeFadeWhite ">
                              NO MATCHING RESULT FOUND
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex flex-col gap-[10px] p-1 ">
                          {select?.options
                            ?.filter(
                              (option) =>
                                typeof option === "object" && option !== null
                            )
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map(({ code, name }) => (
                              <div
                                key={code}
                                onClick={() => handleUpdate({ code, name })}
                                className="flex flex-wrap items-center gap-[5px] w-full"
                              >
                                <SmallButton variant="fadeoutPlus">
                                  {name}
                                </SmallButton>

                                <SmallButton variant="fadeoutPlus">
                                  {code}
                                </SmallButton>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className=" text-xs text-tradeFadeWhite">
                      OPTIONS NOT FOUND
                    </div>
                  )}
                </div>
              </div>

              <Button variant="secondary" onClick={close}>
                CLOSE
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectElement;
