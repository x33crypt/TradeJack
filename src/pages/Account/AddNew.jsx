import Footer from "@/components/others/Footer";
import InAppNav from "@/components/others/InAppNav";
import React, { useEffect } from "react";
import AccountMenu from "@/components/settings/SettingMenu";
import { useLinkedAccount } from "@/context/userContext/LinkedAccountContext";
import { useSelectElement } from "@/context/otherContext/SelectElementContext";
import { useFetchBanks } from "@/hooks/others/useFetchBanks";
import { useToast } from "@/context/otherContext/ToastContext";
import { MdKeyboardArrowDown } from "react-icons/md";
import { verifyBankHolder } from "@/utils/wallet/verifyBankHolder";
import Button from "@/components/buttons/Button";

const AddNewAccount = () => {
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
    <>
      <InAppNav />
      <div className="md:pt-[70px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex bg-black">
        <div className="flex flex-1 lg:flex-row flex-col gap-[25px] ">
          <AccountMenu />
          <div className="flex flex-1 flex-col gap-[20px] lg:mr-[12%] p-[15px]">
            <div className="flex items-center justify-between ">
              <p className="text-lg font-semibold text-white flex items-center gap-1">
                ADD ACCOUNT
              </p>
            </div>

            <p className="text-xs text-tradeFadeWhite font-medium">
              To ensure the security of your funds, only bank accounts bearing
              the same credentials as your verified KYC information can be
              linked.
            </p>

            <div className="flex-1 flex flex-col gap-[20px]">
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
              </div>

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
      <Footer />
    </>
  );
};

export default AddNewAccount;
