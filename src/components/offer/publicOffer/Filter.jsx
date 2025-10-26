import React, { useState, useEffect, useMemo } from "react";
import Button from "@/components/buttons/Button";
import { useSelectElement } from "@/context/otherContext/SelectElementContext";
import { usePublicOffers } from "@/context/publicContext/OffersContext";
import { useCurrencies } from "@/hooks/others/useCurrencies";
import withComma from "@/utils/withComma";
import { IoMdArrowDropright } from "react-icons/io";

const Filter = () => {
  const { filter, setFilter } = usePublicOffers();
  const { currencies } = useCurrencies();

  const [sorts] = useState([
    "Recently active traders",
    "Verified offers",
    "Rate: High to Low",
    "Rate: Low to High",
    "Release: Fast to Slow",
    "Release: Slow to Fast",
    "Transfer: Fast to Slow",
    "Transfer: Slow to Fast",
  ]);

  const { select, setSelect } = useSelectElement();

  const [assetsList, setAssetsList] = useState([
    "Zelle",
    "CashApp",
    "Chime",
    "eBay Gift Card",
    "More",
  ]);

  const [currenciesList, setCurrenciesList] = useState([
    "USD",
    "EUR",
    "GBP",
    "JPY",
    "AUD",
    "CAD",
    "ARS",
    "More",
  ]);

  const [sortByList, setSortByList] = useState([
    "Recently active traders",
    "Verified offers",
    "Rate: High to Low",
    "More",
  ]);

  const close = () => {
    setFilter((prev) => ({
      ...prev,
      state: false,
    }));
  };

  const clearFilter = () => {
    setFilter({
      loading: false,
      asset: "",
      currency: "",
      enterAmount: false,
      amount: "",
      amountList: ["50", "100", "200", "More"],
      sortBy: "",
    });
  };

  // handling asset changes if clicks visible assets
  const handleAssetChange = (asset) => {
    setFilter((prev) => ({
      ...prev,
      asset: asset,
    }));
  };

  // handling asset changes if clicks more
  useEffect(() => {
    if (
      select?.page === "offer filter" &&
      select?.element === "assets" &&
      select?.pick
    ) {
      setAssetsList((prevList) => {
        if (prevList.includes(select.pick)) {
          return prevList; // Already exists
        }

        const moreIndex = prevList.indexOf("More");
        if (moreIndex > 0) {
          const newList = [...prevList];
          newList[moreIndex - 1] = select.pick; // Replace before "More"
          return newList;
        }

        return prevList; // If "More" not found
      });

      setFilter((prev) => ({
        ...prev,
        asset: select.pick,
      }));
    }
  }, [select]);

  // hadling currency changes if clicks visible currencies
  const handleCurrencyChange = (code) => {
    setFilter((prev) => ({
      ...prev,
      currency: code,
    }));
  };

  // handling currency changes if clicks more
  useEffect(() => {
    if (
      select?.page === "offer filter" &&
      select?.element === "currency" &&
      select?.pick
    ) {
      const selectedCurrency = select.pick; // ✅ correct scope

      if (
        typeof selectedCurrency === "object" &&
        selectedCurrency.code &&
        selectedCurrency.name
      ) {
        setCurrenciesList((prevList) => {
          if (prevList.includes(selectedCurrency.code)) {
            return prevList; // Already exists
          }

          const moreIndex = prevList.indexOf("More");
          if (moreIndex > 0) {
            const newList = [...prevList];
            newList[moreIndex - 1] = selectedCurrency.code; // Replace before "More"
            return newList;
          }

          return prevList; // If "More" not found
        });

        setFilter((prev) => ({
          ...prev,
          currency: selectedCurrency.code,
        }));
      }
    }
  }, [select]);

  // handling amount changes if clicks visible amount
  const handleAmountChange = (amount) => {
    setFilter((prev) => ({
      ...prev,
      amount: amount,
    }));
  };

  // handling sort changes if clicks visible sort
  const handleSortChange = (sort) => {
    setFilter((prev) => ({
      ...prev,
      sortBy: sort,
    }));
  };

  // handling sort changes if clicks more
  useEffect(() => {
    if (
      select?.page === "offer filter" &&
      select?.element === "sort by" &&
      select?.pick
    ) {
      setSortByList((prevList) => {
        if (prevList.includes(select.pick)) {
          return prevList; // Already exists
        }

        const moreIndex = prevList.indexOf("More");
        if (moreIndex > 0) {
          const newList = [...prevList];
          newList[moreIndex - 1] = select.pick; // Replace before "More"
          return newList;
        }

        return prevList; // If "More" not found
      });

      setFilter((prev) => ({
        ...prev,
        sortBy: select?.pick,
      }));
    }
  }, [select]);

  return (
    <>
      <div className="flex sticky top-[70px] h-max w-[250px] gap-[10px] flex-col lg:mb-[15px]">
        <div className="flex flex-col p-[15px] bg-tradeAshLight gap-[20px] rounded-[15px] border border-tradeAsh">
          <div className="flex flex-col gap-[15px]">
            <div className="flex items-center gap-2">
              <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
              <p className="text-tradeFadeWhite hover:text-white text-[15px] font-bold transition-all duration-300 cursor-pointer">
                ASSET
              </p>
            </div>
            <div className="flex gap-[10px] flex-wrap">
              {assetsList.map((asset, index) => (
                <button
                  key={index}
                  variant="fadeoutPlus"
                  onClick={
                    asset !== "More"
                      ? () => handleAssetChange(asset)
                      : () =>
                          setSelect({
                            state: true,
                            selectOne: true,
                            selectTwo: false,
                            page: "offer filter",
                            element: "assets",
                            options: assetsList,
                          })
                  }
                  className={`${
                    asset === filter?.asset
                      ? "text-black bg-tradeOrange"
                      : "text-tradeFadeWhite hover:text-white active:text-tradeFadeWhite bg-tradeAshLight "
                  } flex border border-tradeAshExtraLight items-center gap-1 w-max px-[8px] py-[4px] text-[13px] font-semibold rounded-[6.5px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                >
                  {asset}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col p-[15px] bg-tradeAshLight gap-[20px] rounded-[15px] border border-tradeAsh">
          <div className="flex flex-col gap-[15px]">
            <div className="flex items-center gap-2">
              <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
              <p className="text-tradeFadeWhite hover:text-white text-[15px] font-bold transition-all duration-300 cursor-pointer">
                CURRENCY
              </p>
            </div>
            <div className="flex gap-[10px] flex-wrap">
              {currenciesList.map((currency, index) => (
                <button
                  key={index}
                  variant="fadeoutPlus"
                  onClick={
                    currency !== "More"
                      ? () => handleCurrencyChange(currency)
                      : () =>
                          setSelect({
                            state: true,
                            selectOne: false,
                            selectTwo: true,
                            page: "offer filter",
                            element: "currency",
                            options: currencies,
                          })
                  }
                  className={`${
                    currency === filter?.currency
                      ? "text-black bg-tradeOrange"
                      : "text-tradeFadeWhite hover:text-white active:text-tradeFadeWhite bg-tradeAshLight "
                  } flex border border-tradeAshExtraLight items-center gap-1 w-max px-[8px] py-[4px] text-[13px] font-semibold rounded-[6.5px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                >
                  {currency}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col p-[15px] bg-tradeAshLight gap-[20px] rounded-[15px] border border-tradeAsh">
          <div className="flex flex-col gap-[15px]">
            <div className="flex items-center gap-2">
              <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
              <p className="text-tradeFadeWhite hover:text-white text-[15px] font-bold transition-all duration-300 cursor-pointer">
                AMOUNT
              </p>
            </div>
            <div className="flex gap-[10px] flex-wrap">
              <div className="flex gap-[10px] flex-wrap">
                {filter?.amountList?.map((amount, index) => (
                  <button
                    key={index}
                    variant="fadeoutPlus"
                    onClick={
                      amount !== "More"
                        ? () => handleAmountChange(amount)
                        : () =>
                            setFilter((prev) => ({
                              ...prev,
                              enterAmount: true,
                            }))
                    }
                    className={`${
                      Number(amount) === Number(filter?.amount) &&
                      amount !== "More"
                        ? "text-black bg-tradeOrange"
                        : "text-tradeFadeWhite hover:text-white active:text-tradeFadeWhite bg-tradeAshLight"
                    } flex border border-tradeAshExtraLight items-center gap-1 w-max px-[8px] py-[4px] text-[13px] font-semibold rounded-[6.5px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                  >
                    {withComma(amount)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div onClick={close} className="flex lg:hidden">
          <Button variant="secondary">APPLY</Button>
        </div>
      </div>
    </>
  );
};

export default Filter;
