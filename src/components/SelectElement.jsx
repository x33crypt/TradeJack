import React, { useState } from "react";
import { useSelectElement } from "@/context/SelectElementContext";
import LockByScroll from "./LockByScroll";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Button from "./buttons/Button";
import { capitalizeFirst } from "@/utils/capitalizeFirst";
import { IoClose } from "react-icons/io5";

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
          <div className="fixed inset-0 lg:px-[15px] md:px-[2.5%] p-[35px]  bg-black bg-opacity-80 flex flex-col gap-[10px] items-center justify-center z-50">
            <div
              className={`${
                select?.selectOne ? "flex" : "hidden"
              } p-[12px] bg-tradeAsh border border-tradeAshLight rounded-[15px] flex flex-col gap-[15px] w-[300px]`}
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

            <div
              className={`${
                select?.selectTwo ? "flex" : "hidden"
              } p-[12px] bg-tradeAsh border border-tradeAshLight rounded-[15px] flex flex-col gap-[15px] w-[300px]`}
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

            <div className="p-[12px] bg-tradeAsh border border-tradeAshLight rounded-[15px] flex flex-col gap-[15px] w-[300px]">
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
                            <div
                              key={index}
                              onClick={() => handleUpdate(option)}
                              className="p-[12px] font-medium bg-tradeAsh hover:bg-tradeAshLight text-tradeFadeWhite hover:text-white border border-tradeAshLight rounded-[10px] cursor-pointer transition-all duration-300"
                            >
                              <p className="text-[13px]">{option}</p>
                            </div>
                          ))
                        ) : (
                          <div className="p-[12px] text-[13px] text-tradeFadeWhite bg-tradeAsh border border-tradeAshLight rounded-[10px]">
                            No matching results found
                          </div>
                        )}
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
                              className="p-[12px] font-medium  bg-tradeAsh hover:bg-tradeAshLight text-tradeFadeWhite hover:text-white border border-tradeAshLight rounded-[10px] cursor-pointer transition-all duration-300"
                            >
                              <p className="text-[13px]">{option}</p>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-[12px] text-[13px] text-tradeFadeWhite bg-tradeAsh border border-tradeAshLight rounded-[10px]">
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
                      <div className="flex flex-col gap-[5px] w-full">
                        {filterObjectOption.length ? (
                          filterObjectOption.map(({ code, name }) => (
                            <div
                              key={code}
                              onClick={() => handleUpdate({ code, name })}
                              className="flex gap-[10px]"
                            >
                              <p className="flex-1 text-[13px] p-[12px] font-medium bg-tradeAsh hover:bg-tradeAshLight text-tradeFadeWhite hover:text-white border border-tradeAshLight rounded-[10px] cursor-pointer transition-all duration-300">
                                {name}
                              </p>
                              <p className="flex items-center justify-center w-[60px] text-[13px] p-[12px] font-medium bg-tradeAsh hover:bg-tradeAshLight text-tradeFadeWhite hover:text-white border border-tradeAshLight rounded-[10px] cursor-pointer transition-all duration-300">
                                {code}
                              </p>
                            </div>
                          ))
                        ) : (
                          <div className="p-[12px] text-[13px] text-tradeFadeWhite bg-tradeAsh border border-tradeAshLight rounded-[10px]">
                            No matching results found
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col gap-[5px] w-full">
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
                              className="flex gap-[10px]"
                            >
                              <p className="flex-1 text-[13px] p-[12px] font-medium bg-tradeAsh hover:bg-tradeAshLight text-tradeFadeWhite hover:text-white border border-tradeAshLight rounded-[10px] cursor-pointer transition-all duration-300">
                                {name}
                              </p>
                              <p className="flex items-center justify-center w-[60px] text-[13px] p-[12px] font-medium bg-tradeAsh hover:bg-tradeAshLight text-tradeFadeWhite hover:text-white border border-tradeAshLight rounded-[10px] cursor-pointer transition-all duration-300">
                                {code}
                              </p>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-[12px] text-[13px] text-tradeFadeWhite bg-tradeAsh border border-tradeAshLight rounded-[10px]">
                    Options not available, please try again.
                  </div>
                )}
              </div>
            </div>

            <div onClick={close} className=" w-[300px]">
              <Button variant="Fadeout">Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectElement;
