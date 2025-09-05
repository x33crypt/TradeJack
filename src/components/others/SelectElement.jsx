import React, { useState } from "react";
import { useSelectElement } from "@/context/otherContext/SelectElementContext";
import LockByScroll from "./LockByScroll";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Button from "../buttons/Button";
import { capitalizeFirst } from "@/utils/capitalizeFirst";
import { IoClose } from "react-icons/io5";
import SmallButton from "../buttons/SmallButton";

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
            <div className="flex flex- md:w-[300px] h-max flex-col rounded-[15px] p-[15px] gap-[15px] bg-tradeAsh">
              {/* FIRST Search — for string options */}
              <div
                className={`${
                  select?.selectOne && options?.length > 15 ? "flex" : "hidden"
                } rounded-[15px] flex flex-col gap-[15px] `}
              >
                <div
                  className={`${
                    select?.options?.length > 5 ? "flex" : "flex"
                  }  flex-1 bg-tradeAshLight relative border border-tradeAshLight rounded-[10px] cursor-pointer`}
                >
                  <input
                    className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none cursor-pointer"
                    type="text"
                    placeholder={`Search ${select?.element}`}
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </div>
              </div>

              {/* SECOND Search — for string options */}
              <div
                className={`${
                  select?.selectTwo && options?.length > 10 ? "flex" : "hidden"
                }  flex flex-col gap-[15px]`}
              >
                <div
                  className={`${
                    select?.options?.length > 5 ? "flex" : "flex"
                  }  flex-1 bg-tradeAshLight relative border border-tradeAshLight rounded-[10px] cursor-pointer`}
                >
                  <input
                    className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none cursor-pointer"
                    type="text"
                    placeholder={`Search ${select?.element}`}
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </div>
              </div>

              {/* FIRST DIV — for string options */}
              <div
                className={`${
                  select?.selectOne ? "flex" : "hidden"
                } w-full flex-col  gap-[15px] rounded-[14px] md:max-h-[245px] max-h-[260px]`}
              >
                {Array.isArray(options) && options.length > 0 ? (
                  <div className="overflow-y-auto  custom-scrollbar w-full">
                    {searchInput ? (
                      <div className="flex flex-col gap-[5px] w-full">
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
                          <div className=" text-[13px] text-tradeFadeWhite">
                            No matching results found
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className=" flex flex-wrap gap-[10px] w-full">
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
                  <div className="text-[13px] text-tradeFadeWhite">
                    Options not available, please try again.
                  </div>
                )}
              </div>

              {/* SECOND DIV — for object options */}
              <div
                className={`${
                  select?.selectTwo ? "flex" : "hidden"
                } w-full flex-col  gap-[15px] rounded-[14px] md:max-h-[245px] max-h-[260px]`}
              >
                {Array.isArray(options) && options.length > 0 ? (
                  <div className="overflow-y-auto custom-scrollbar w-full">
                    {searchInput ? (
                      <div className=" flex flex-wrap gap-[10px] w-full">
                        {filterObjectOption.length ? (
                          filterObjectOption.map(({ code, name }) => (
                            <div
                              key={code}
                              onClick={() => handleUpdate({ code, name })}
                              className="flex w-full justify-between items-center"
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
                          <div className=" text-[13px] text-tradeFadeWhite ">
                            No matching results found
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col gap-[10px] w-full overflow-hidden">
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
                              className="flex w-full justify-between items-center gap-[10px]"
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
                  <div className=" text-[13px] text-tradeFadeWhite">
                    Options not available, please try again.
                  </div>
                )}
              </div>
            </div>

            <div className="flex w-full justify-center">
              <div
                onClick={close}
                className="w-max flex text-white hover:text-tradeFadeWhite gap-1 items-center justify-center bg-tradeAshLight hover:bg-tradeAsh border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
              >
                <IoClose className="text-[16px]" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectElement;
