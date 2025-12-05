import Footer from "@/components/others/Footer";
import InAppNav from "@/components/others/InAppNav";
import React, { useEffect } from "react";
import { useLinkedAccount } from "@/context/userContext/LinkedAccountContext";
import { useSelectElement } from "@/context/otherContext/SelectElementContext";
import { useFetchBanks } from "@/hooks/others/useFetchBanks";
import { useToast } from "@/context/otherContext/ToastContext";
import { MdKeyboardArrowDown } from "react-icons/md";
import { verifyBankHolder } from "@/utils/wallet/verifyBankHolder";
import Button from "@/components/buttons/Button";
import { useFetchLinkedBanks } from "@/hooks/userHooks/useFetchLinkedBanks";
import LockByScroll from "@/components/others/LockByScroll";
import { IoClose } from "react-icons/io5";
import { linkBankAccount } from "@/utils/wallet/linkBank";

const NewAccount = () => {
  const { linkAccount, setLinkAccount } = useLinkedAccount();
  const { verified } = linkAccount;
  const { refetchLinkedBanks } = useFetchLinkedBanks();
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
        data: data,
        holdersName: cleanedHolderName,
      }));
    }
  };

  const handleLinkAccount = async () => {
    // prevent duplicate requests
    if (linkAccount?.loading) return;

    // mark loading
    setLinkAccount((prev) => ({ ...prev, loading: true }));

    try {
      const { data, error } = await linkBankAccount({
        bankAccount: linkAccount?.bankAccount,
        bank: linkAccount?.bank,
        holdersName: linkAccount?.holdersName,
      });

      console.log("Link Bank result", data, error);

      if (error) {
        // show toast and bail
        setToast((prev) => ({
          ...prev,
          error: true,
          errorMessage: error,
        }));
        return;
      }

      if (data) {
        // success toast
        setToast((prev) => ({
          ...prev,
          success: true,
          successMessage: "Bank account successfully linked",
        }));

        // reset form state (preserve shape by setting fields explicitly)
        setLinkAccount({
          loading: false,
          details: false,
          verified: false,
          bank: "",
          bankAccount: "",
          holdersName: null,
        });

        // try to refresh linked banks; don't block navigation on failure
        try {
          await refetchLinkedBanks();
        } catch (err) {
          console.error("Refetch failed:", err);
        }

        // navigate after we updated things
        navigateTo("/settings/accounts");
      }
    } catch (err) {
      console.error("Link account request failed:", err);
      setToast((prev) => ({
        ...prev,
        error: true,
        errorMessage: err?.message || "Something went wrong",
      }));
    } finally {
      // ensure loading toggled off in all cases
      setLinkAccount((prev) => ({ ...prev, loading: false }));
    }
  };

  const close = () => {
    setLinkAccount((prev) => ({
      ...prev,
      proceed: false,
      verified: false,
    }));
  };

  return (
    <>
      <InAppNav />
      <div className="md:pt-[70px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex bg-black">
        <div className="flex flex-1 lg:flex-row flex-col gap-[25px] ">
          {/* <AccountMenu /> */}
          <div className="flex flex-1 flex-col gap-[20px] lg:mx-[22.8%] p-[15px]">
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
                variant="secondary"
                disabled={linkAccount?.proceed}
                onClick={handleVerifyBank}
              >
                VERIFY
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {verified && (
        <div>
          <LockByScroll />
          <div className="fixed top-0 left-0 right-0 bottom-0 lg:px-[15px] md:px-[2.5%] p-[35px] bg-black backdrop-blur-sm bg-opacity-80 flex items-center justify-center z-40">
            <div className="flex flex-col px-[15px] bg-tradeAsh borde border-tradeAshLight rounded-[15px] shadow-lg w-[250px]">
              <div className="flex items-center justify-between py-[12.3px] border-b border-tradeAshLight">
                <p className="text-lg font-[700] text-white ">
                  Confirm Account
                </p>

                <div
                  className="w-max flex text-tradeFadeWhite hover:text-white gap-1 items-center justify-center bg-transparent hover:bg-tradeAshLight border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
                  onClick={close}
                >
                  <IoClose className="text-[16px]" />
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between py-[12.3px] gap-[20px]">
                <div className="flex flex-col gap-[10px]">
                  {/* <div className="flex flex-col gap-1">
                    <p className="text-xs font-medium text-cente text-tradeFadeWhite">
                      We found a match. Review and confirm details before
                      linking this account.
                    </p>
                  </div> */}
                  <div className="w-full flex flex-col gap-1 bg-tradeAshLight p-[12px] rounded-[10px]">
                    <div className="flex items-center gap-1">
                      <p className="text-xs text-tradeFadeWhite font-semibold leading-normal">
                        {/* HOLDER :{" "} */}
                        <span className="text-[13px] text-white font-semibold">
                          {linkAccount?.data?.account_name}
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <p className="text-xs text-tradeFadeWhite font-semibold leading-normal">
                        {/* ACCOUNT :{" "} */}
                        <span className="text-[13px] text-white font-semibold">
                          {linkAccount?.data?.bank_name}
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <p className="text-xs text-tradeFadeWhite font-semibold leading-normal">
                        {/* ACCOUNT NO :{" "} */}
                        <span className="text-[13px] text-white font-semibold">
                          {linkAccount?.data?.account_number}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  disabled={linkAccount?.loading}
                  onClick={handleLinkAccount}
                >
                  Link Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewAccount;
