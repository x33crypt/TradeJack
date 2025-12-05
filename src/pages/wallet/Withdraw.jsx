import React, { useEffect, useState } from "react";
import InAppNav from "@/components/others/InAppNav";
import Footer from "@/components/others/Footer";
import DasHboardMenu from "@/components/dashboard/DashboardMenu";
import RecentWithdraw from "@/components/wallet/RecentWithdraw";
import Button from "@/components/buttons/Button";
import { toUSD } from "@/utils/toUSD";
import { toNGN } from "@/utils/toNGN";
import { useToast } from "@/context/otherContext/ToastContext";
import { toDecimal } from "@/utils/toDecimal";
import { useWithdrawContext } from "@/context/userContext/WithdrawContext";
import { IoWalletOutline } from "react-icons/io5";
import { useBalance } from "@/context/userContext/BalanceContext";
import { useFetchLinkedBanks } from "@/hooks/userHooks/useFetchLinkedBanks";
import { useLinkedAccount } from "@/context/userContext/LinkedAccountContext";
import { RiBankLine } from "react-icons/ri";
import { useFetchWithdrawTxt } from "@/hooks/userHooks/useFetchWithdrawTxt";
import WalletBalance from "@/components/wallet/WalletBalance";
import Info from "@/components/alerts/Info";
import WalletMenu from "@/components/wallet/WalletMenu";
import { useCurrency } from "@/context/userContext/CurrencyContext";
import Conversion from "@/components/wallet/Conversion";
import { useConversion } from "@/context/otherContext/ConvertionContext";
import { CgArrowsExchangeAltV } from "react-icons/cg";

const Withdraw = () => {
  const { refetchWithdrawTxt } = useFetchWithdrawTxt();
  const { balance } = useBalance();
  const { withdraw, setWithdraw } = useWithdrawContext();
  const { loading, error, refetchLinkedBanks } = useFetchLinkedBanks();
  const { linkedAccounts } = useLinkedAccount();
  const { setToast } = useToast();
  const { currency, setCurrency } = useCurrency();
  const { data } = useConversion();
  const [editingAmount, setEditingAmount] = useState(false);

  console.log("Conversion Data in Deposit:", data);

  useEffect(() => {
    refetchLinkedBanks();
  }, []);

  const selectDefaultAccount = () => {
    setWithdraw((prev) => ({
      ...prev,
      account: "Default",
    }));
  };

  useEffect(() => {
    if (withdraw?.account === "Default") {
      setWithdraw((prev) => ({
        ...prev,
        bank: linkedAccounts?.find((account) => account?.isDefault === true),
      }));
    } else if (withdraw?.account === "Alternative") {
      setWithdraw((prev) => ({
        ...prev,
        bank: linkedAccounts?.find((account) => account?.isDefault === false),
      }));
    }
  }, [withdraw?.account, linkedAccounts]);

  const selectAlternativeAccount = () => {
    setWithdraw((prev) => ({
      ...prev,
      account: "Alternative",
    }));
  };

  const handleUSDAmountChange = (e) => {
    let rawValue = e.target.value.replace(/[^\d.]/g, ""); // Allow only numbers & dot

    // Prevent multiple dots
    const parts = rawValue.split(".");
    if (parts.length > 2) {
      rawValue = parts[0] + "." + parts.slice(1).join("");
    }

    setWithdraw((prev) => ({
      ...prev,
      amount: {
        ...prev.amount,
        USD: rawValue,
      },
    }));
  };

  const handleNGNAmountChange = (e) => {
    let rawValue = e.target.value.replace(/[^\d.]/g, ""); // Allow only numbers & dot

    // Prevent multiple dots
    const parts = rawValue.split(".");
    if (parts.length > 2) {
      rawValue = parts[0] + "." + parts.slice(1).join("");
    }

    setWithdraw((prev) => ({
      ...prev,
      amount: {
        ...prev.amount,
        NGN: rawValue,
      },
    }));
  };

  useEffect(() => {
    if (!data?.conversion_result) return;
    if (data?.base_code !== "USD") return;

    if (currency?.current === "default_currency") {
      setWithdraw((prev) => ({
        ...prev,
        amount: {
          ...prev.amount,
          NGN: Number(data.conversion_result) || 0,
        },
      }));
    }
  }, [currency?.current, data?.conversion_result, data?.base_code]);

  console.log("Withdraw Amounts:", withdraw?.amount);

  const formatWithCommas = (value) => {
    if (!value) return "";
    const num = parseFloat(value);
    if (isNaN(num)) return value;
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  };

  const amount =
    currency?.current === "default_currency"
      ? withdraw?.amount?.USD
      : withdraw?.amount?.NGN;

  const from =
    currency?.current === "default_currency"
      ? currency?.default_currency?.code
      : currency?.user_currency?.code;

  const to =
    currency?.current === "default_currency"
      ? currency?.user_currency?.code
      : currency?.default_currency?.code;

  const proceed = () => {
    const { currency, amount, bank } = withdraw;

    // Validate amount in NGN
    if (currency === "NGN") {
      const value = Number(amount?.NGN);

      if (!value || isNaN(value)) {
        setToast({
          error: true,
          success: false,
          errorMessage: "Missing required field: Amount",
        });
        return;
      }

      // Validate minimum amount
      if (value < 15000) {
        setToast({
          error: true,
          success: false,
          errorMessage: `The minimum transfer amount is NGN ${toDecimal(
            15000
          )}.`,
        });
        return;
      }

      // Validate balance
      if (
        Number(toDecimal(amount?.NGN) || 0) >
        Number(toDecimal(balance?.available_balance?.NGN) || 0)
      ) {
        setToast({
          error: true,
          success: false,
          errorMessage: "Insufficient balance for this transfer.",
        });
        return;
      }
    }

    // Validate amount in USD
    if (currency === "USD") {
      const UsdAmount = Number(amount?.USD);
      const NgnAmount = Number(amount?.NGN);

      if (!UsdAmount || isNaN(UsdAmount)) {
        setToast({
          error: true,
          success: false,
          errorMessage: "Missing required field: Amount",
        });
        return;
      }

      if (!NgnAmount || isNaN(NgnAmount)) {
        setToast({
          error: true,
          success: false,
          errorMessage: "Missing required field: Amount",
        });
        return;
      }

      if (UsdAmount < 10) {
        setToast({
          error: true,
          success: false,
          errorMessage: `The minimum transfer amount is USD ${toDecimal(10)}.`,
        });
        return;
      }
    }

    if (!bank?.bankId) {
      setToast({
        error: true,
        errorMessage: "Missing required field: Recipient Wallet",
      });
      return;
    }

    // Proceed
    setWithdraw((prev) => ({
      ...prev,
      proceed: true,
      confirm: true,
    }));
  };

  // Refetch transactions after a successfull transfer
  useEffect(() => {
    if (withdraw?.success) {
      refetchWithdrawTxt();
    }
  }, [withdraw?.success]);

  const selectAccount = () => {
    if (linkedAccounts?.length > 1 && withdraw?.account === "Default") {
      setWithdraw((prev) => ({
        ...prev,
        account: "Alternative",
      }));
    } else {
      setWithdraw((prev) => ({
        ...prev,
        account: "Default",
      }));
    }
  };

  return (
    <>
      <InAppNav />
      <div className="md:pt-[70px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex bg-black">
        <div className="flex flex-1 lg:flex-row flex-col gap-[25px]">
          {/* <WalletMenu /> */}
          <div className="flex flex-1 flex-col gap-[40px] lg:mx-[22.8%] p-[15px]">
            <div className="flex flex-1 flex-col gap-[20px]">
              <div className="flex  items-center justify-between ">
                <p className="text-lg font-semibold text-white flex items-center gap-1">
                  WITHDRAW
                </p>
              </div>

              <div className="flex flex-col  gap-[20px]">
                {/* Wallet Balance */}
                <WalletBalance />

                {/* Account */}
                <div className="flex justify-between items-center p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                  <div className="flex items-center gap-[10px] w-full ">
                    <div className="p-2.5 bg-tradeAshLight border border-tradeAshExtraLight rounded-xl">
                      {withdraw?.bank?.logo ? (
                        <img
                          className="w-[20px] h-[20px] object-contain"
                          src={
                            withdraw?.bank?.logo ||
                            "/images/default-bank-logo.png"
                          }
                          alt=""
                        />
                      ) : (
                        <RiBankLine className="text-[15px] text-tradeWhite" />
                      )}
                    </div>
                    <div className="flex flex-col gap-[3px]">
                      <p className="text-white text-[13px] font-semibold">
                        {withdraw?.bank?.bank_name || "Bank Name"}
                      </p>
                      <p className="text-tradeFadeWhite text-xs font-medium tracking-wide">
                        {withdraw?.bank?.account_number || "Account Number"}
                      </p>
                    </div>
                  </div>

                  <div
                    onClick={selectAccount}
                    className="w-max flex gap-1 items-center justify-center border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
                  >
                    {linkedAccounts?.length > 1 && (
                      <CgArrowsExchangeAltV
                        className={`${
                          loading ? "animate-spin" : null
                        } text-[16px] text-tradeFadeWhite`}
                      />
                    )}
                    {withdraw?.account === "Default" ? (
                      <p className="text-xs text-white font-semibold">
                        Default
                      </p>
                    ) : (
                      <p className="text-xs text-white font-semibold">
                        Alternative
                      </p>
                    )}
                  </div>
                </div>

                {/* Amount */}
                <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px]">
                  <div className="flex flex-1 items-center justify-between">
                    <p className="text-[13px] text-tradeFadeWhite font-semibold">
                      Enter Amount
                    </p>
                  </div>

                  <div className="flex flex-col gap-[10px]">
                    {currency?.current === "user_currency" ? (
                      <div className="flex-1 flex items-center gap-1 bg-tradeAshLigh w-full border-b-2 border-tradeAshLight ">
                        <p className="text-tradeFadeWhite text-xl font-semibold">
                          {currency?.user_currency?.symbol}
                        </p>

                        <input
                          className="bg-transparent flex-1 py-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-xl font-semibold leading-none"
                          type="text"
                          placeholder={`15,000.000 - 30,000,000.00`}
                          value={
                            editingAmount
                              ? withdraw?.amount?.NGN || ""
                              : formatWithCommas(withdraw?.amount?.NGN)
                          }
                          onChange={handleNGNAmountChange}
                          onFocus={() => setEditingAmount(true)}
                          onBlur={() => setEditingAmount(false)}
                        />
                      </div>
                    ) : (
                      <div className="flex-1 flex items-center gap-1 bg-tradeAshLigh w-full border-b-2 border-tradeAshLight ">
                        <p className="text-tradeFadeWhite text-xl font-medium">
                          {currency?.default_currency?.symbol}
                        </p>
                        <input
                          className="bg-transparent flex-1 py-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-xl font-medium leading-none"
                          type="text"
                          placeholder={`10.00 - 20,000.00`}
                          value={
                            editingAmount
                              ? withdraw?.amount?.USD || ""
                              : formatWithCommas(withdraw?.amount?.USD)
                          }
                          onChange={handleUSDAmountChange}
                          onFocus={() => setEditingAmount(true)}
                          onBlur={() => setEditingAmount(false)}
                        />
                      </div>
                    )}

                    <Conversion
                      disabled={true}
                      amount={amount}
                      from={from}
                      to={to}
                    />
                  </div>
                </div>

                <Button
                  variant="Fadeout"
                  onClick={proceed}
                  disabled={withdraw?.proceed}
                >
                  Proceed
                </Button>
              </div>
            </div>

            <RecentWithdraw />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Withdraw;
