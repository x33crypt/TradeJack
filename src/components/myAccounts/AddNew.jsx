import React, { useEffect } from "react";
import { useLinkedAccount } from "@/context/wallet/LinkedAccountContext";
import Button from "../buttons/Button";
import { useSelectElement } from "@/context/SelectElementContext";
import { useFetchBanks } from "@/hooks/useFetchBanks";
import { useToast } from "@/context/ToastContext";
import { MdKeyboardArrowDown } from "react-icons/md";
import Info from "../alerts/Info";
import { verifyBankHolder } from "@/utils/wallet/verifyBankHolder";

const AddNew = () => {
  const { linkAccount, setLinkAccount } = useLinkedAccount();
  const { select, setSelect } = useSelectElement();
  const { banks } = useFetchBanks();
  const { toast, setToast } = useToast();

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
    setLinkAccount((prev) => ({
      ...prev,
      proceed: true,
    }));

    const { data, error } = await verifyBankHolder({
      bankAccount: linkAccount?.bankAccount,
      bank: linkAccount?.bank,
    });

    if (error) {
      setLinkAccount((prev) => ({
        ...prev,
        proceed: false,
      }));
      setToast({
        ...toast,
        error: true,
        errorMessage: error,
      });
    } else {
      const cleanedHolderName = data?.account_name?.replace(/,/g, "").trim();

      setLinkAccount((prev) => ({
        ...prev,
        loading: false,
        details: false,
        verified: true,
        success: false,
        data: data,
        holdersName: cleanedHolderName,
      }));
    }
  };

  return (
    <div className=" flex flex-col md:border border-neutral-800 w-full">
      <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">Add New Account</p>
      </div>

      <div className="flex flex-col justify-between p-[15px] gap-[15px] h-full w-full">
        <div className="">
          <p className="text-xs text-tradeFadeWhite font-medium">
            To ensure the security of your funds, only bank accounts bearing the
            same credentials as your verified KYC information can be linked.
          </p>
        </div>

        <div className="flex flex-col gap-[15px] h-full justify-between">
          <div className="flex flex-col gap-[10px]">
            <div className="p-[12px] bg-tradeAsh border border-tradeAshLight rounded-[15px] flex flex-col gap-[15px]">
              <div className="flex flex-col gap-[10px] w-full">
                <p className="text-tradeFadeWhite text-xs font-medium">
                  Select your Bank
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

                <p className="text-xs font-medium text-tradeFadeWhite">
                  We support all major banks in Nigeria.
                </p>
              </div>
            </div>
            <div className="p-[12px] bg-tradeAsh border border-tradeAshLight rounded-[15px] flex flex-col gap-[15px]">
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
                <p className="text-xs font-medium text-tradeFadeWhite">
                  Ensure the account is valid and in your name.
                </p>
              </div>
            </div>

            <Info
              text={
                "We never store your bank credentials. Your data is protected with advanced end-to-end encryption to ensure it always stays private and secure."
              }
            />
          </div>

          <div className="flex flex-col items-center gap-[10px]">
            <Button
              variant="primary"
              disabled={linkAccount?.proceed}
              onClick={handleVerifyBank}
            >
              Verify Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNew;
