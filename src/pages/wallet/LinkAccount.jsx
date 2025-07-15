import React, { useEffect } from "react";
import { useLinkedAccount } from "@/context/wallet/LinkedAccountContext";
import LockByScroll from "@/components/LockByScroll";
import { IoClose } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import Button from "@/components/buttons/Button";
import { useSelectElement } from "@/context/SelectElementContext";
import { useFetchBanks } from "@/hooks/useFetchBanks";
import { toDecimal } from "@/utils/auth/toDecimal";
import { useFetchBankHolder } from "@/hooks/useFetchBankHolder";

const LinkAccount = () => {
  const { linkAccount, setLinkAccount } = useLinkedAccount();
  const { state } = linkAccount;
  const { select, setSelect } = useSelectElement();
  const { banks } = useFetchBanks();
  const { fetchHolder, holder, loading, error } = useFetchBankHolder();

  const close = () => {
    setLinkAccount({
      state: false,
      bank: null,
      bankAccount: null,
      holdersName: null,
    });
  };

  // handling bank change
  useEffect(() => {
    if (select?.page !== "Link Bank Account" || !select?.pick) return;

    if (select.element === "bank") {
      console.log("bank selected:", select.pick);
      const selectedBank = select.pick;

      setLinkAccount((prev) => ({
        ...prev,
        bank: selectedBank,
      }));
    }
  }, [select]);

  const handleBankAccountChange = (e) => {
    const rawValue = e.target.value.replace(/[^\d]/g, ""); // Remove all non-digit characters

    setLinkAccount((prev) => ({
      ...prev,
      bankAccount: rawValue,
    }));
  };

  const handleVerifyBank = async () => {
    await fetchHolder({
      bankAccount: linkAccount?.bankAccount,
      bank: linkAccount?.bank,
    });

    // Wait a tick and then log the updated holder (optional)
    setTimeout(() => {
      console.log("Holder:", holder);
      console.log("error:", error);
    }, 100);
  };

  

  return (
    <div>
      {state && (
        <div>
          <LockByScroll />
          <div className="fixed inset-0 lg:px-[15px] md:px-[2.5%] p-[35px]  bg-black bg-opacity-90 flex items-center justify-center z-40">
            <div className="flex flex-col gap-[10px] bg-tradeAsh borde border-tradeAshLight p-[15px] rounded-[15px] shadow-lg lg:max-w-sm w-full min-h-[350px]">
              <div className="flex justify-between items-start gap-[15px] pb-[15px] md:pt-0 md:p-[15px] lg:pb-[12px] lg:p-0 border-b border-tradeAshLight">
                <div className="flex flex-col gap-3">
                  <p className="text-lg font-[700] text-white leading-none">
                    Link Bank Account
                  </p>
                </div>

                <div onClick={close}>
                  <IoClose className="text-tradeFadeWhite hover:text-white cursor-pointer text-xl" />
                </div>
              </div>

              <div className="">
                <p className="text-xs text-tradeFadeWhite font-medium">
                  To ensure the security of your funds, only bank accounts
                  bearing the same credentials as your verified KYC information
                  can be linked.
                </p>
              </div>

              <div className="flex flex-col gap-[30px] justify-between flex-1">
                <div className="flex flex-col gap-[15px]">
                  <div className="flex flex-col gap-[10px] w-full">
                    <p className="text-tradeFadeWhite text-xs font-medium">
                      Bank
                    </p>
                    <div className="flex-1 flex bg-tradeAshLight relative border border-tradeAshLight rounded-[10px] cursor-pointer">
                      <input
                        className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none cursor-pointer"
                        type="text"
                        placeholder={`Select Bank`}
                        readOnly
                        value={linkAccount?.bank}
                        onClick={() =>
                          setSelect({
                            ...select,
                            state: true,
                            selectOne: true,
                            selectTwo: false,
                            element: "bank",
                            options: banks,
                            pick: "",
                            page: "Link Bank Account",
                          })
                        }
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                        <MdKeyboardArrowDown />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-[10px] w-full">
                    <p className="text-tradeFadeWhite text-xs font-medium">
                      Bank Account
                    </p>
                    <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px]">
                      <input
                        className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none"
                        type="text"
                        placeholder={`Enter 10-digit account number`}
                        onChange={handleBankAccountChange}
                        value={linkAccount?.bankAccount || ""}
                      />
                    </div>
                  </div>
                </div>

                <Button
                  variant="secondary"
                  disabled={loading}
                  onClick={handleVerifyBank}
                >
                  Verify Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkAccount;
