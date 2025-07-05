import Footer from "@/components/Footer";
import InAppNav from "@/components/InAppNav";
import React, { useState, useEffect } from "react";
import Button from "@/components/buttons/Button";
import RecentTransfer from "./RecentTransfer";
import { convertToUSD } from "@/utils/currency/convertToUsd";
import { toDecimal } from "@/utils/currency/format";
import { GiRugbyConversion } from "react-icons/gi";

const Transfer = () => {
  const [transferDetails, setTransferDetails] = useState({
    username: "",
    amount: { USD: null, NGN: null },
  });

  const handleUsernameChange = (e) => {
    setTransferDetails((prevDetails) => ({
      ...prevDetails,
      username: e.target.value,
    }));
  };

  const handleAmountChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, "");

    if (!isNaN(rawValue)) {
      setTransferDetails((prev) => ({
        ...prev,
        amount: {
          ...prev.amount,
          NGN: rawValue,
        },
      }));
    }
  };

  // handle GiRugbyConversion
  useEffect(() => {
    const timeout = setTimeout(() => {
      const ngnValue = Number(transferDetails?.amount?.NGN);
      if (!isNaN(ngnValue) && ngnValue > 0) {
        convertToUSD(ngnValue, "NGN").then((res) => {
          if (res) {
            console.log("hello", res);

            setTransferDetails((prev) => ({
              ...prev,
              amount: {
                ...prev.amount,
                USD: toDecimal(res?.amount, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }),
              },
            }));
          }
        });
      } else {
        setTransferDetails((prev) => ({
          ...prev,
          amount: {
            ...prev.amount,
            USD: "",
          },
        }));
      }
    }, 500); // debounce time

    return () => clearTimeout(timeout);
  }, [transferDetails?.amount?.NGN]);

  console.log(transferDetails);

  return (
    <>
      <InAppNav />
      <div className="md:pt-[64px] pt-[60px] lg:px-[2%] md:px-[2.5%] min-h-svh flex gap-[10px] bg-black ">
        <div className="flex-1 lg:px-[12%] flex flex-col gap-[10px]">
          <div className=" w-full md:border lg:border-0 border-neutral-800">
            <div className="flex items-center justify-between p-[15px] border-b border-tradeAshLight">
              <p className="text-lg font-[700] text-white">Transfer Money</p>
            </div>

            <div className="flex flex-col p-[15px] gap-[10px]">
              <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                  <div className="px-[6px] py-0.5 bg-tradeGreen/20 borde border-tradeAshExtraLight rounded-[4px] w-max">
                    <p className="text-tradeGreen text-xs font-medium ">
                      Transfer From
                    </p>
                  </div>

                  <div className="bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                    <p className="text-white text-xs font-bold">NGN</p>
                  </div>
                </div>

                <div className="w-full flex items-start justify-between gap-2">
                  <div className="flex flex-col gap-[10px] flex-1">
                    <p className="text-white text-lg font-semibold leading-none">
                      #124,896.00
                    </p>

                    <p className="text-tradeFadeWhite text-xs font-semibold">
                      Current balance
                    </p>
                  </div>

                  <div>
                    <p className="text-tradeOrange text-[13px] font-semibold">
                      $54,896.00
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                  <div className="px-[6px] py-0.5 bg-tradeGreen/20 borde border-tradeAshExtraLight rounded-[4px] w-max">
                    <p className="text-tradeGreen text-xs font-medium ">
                      Transfer To
                    </p>
                  </div>

                  <div className="bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                    <p className="text-white text-xs font-bold">NGN</p>
                  </div>
                </div>

                <div className="w-full flex flex-col items-start justify-between gap-[10px]">
                  <div className="flex flex-col pb-[5px] gap-[10px] w-full border-b border-tradeAshLight">
                    <p className="text-tradeFadeWhite text-xs font-semibold">
                      Recipient Username
                    </p>
                    <div className="flex-1 bg-tradeAsh w-full">
                      <input
                        className="bg-transparent w-full border-none outline-none text-white placeholder:text-tradeFadeWhite text-lg font-semibold leading-none"
                        type="text"
                        placeholder="JoneDoe"
                        onChange={handleUsernameChange}
                        value={transferDetails?.username}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col w-full gap-[10px]">
                    <div className="flex flex-col pb-[5px] gap-[10px] w-full border-b border-tradeAshLight bg-tradePurpl">
                      <p className="text-tradeFadeWhite text-xs font-semibold">
                        Amount
                      </p>
                      <div className="flex-1 flex  bg-tradeAsh w-full">
                        <input
                          className="bg-transparent flex-1 border-none outline-none text-white placeholder:text-tradeFadeWhite text-lg font-semibold leading-none"
                          type="text"
                          placeholder="Enter amount (Min: NGN 1,500)"
                          onChange={handleAmountChange}
                          value={
                            transferDetails?.amount?.NGN
                              ? toDecimal(transferDetails?.amount?.NGN)
                              : ""
                          }
                        />
                      </div>
                    </div>

                    <div className="">
                      <p className="text-tradeOrange text-[13px] font-semibold">
                        Transfering $
                        {transferDetails?.amount?.USD
                          ? transferDetails?.amount?.USD
                          : "0.00"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-[15px] md:py-[15px] md:px-[0px] lg:p-[15px]">
            <Button>Transfer</Button>
          </div>

          <RecentTransfer />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Transfer;
