import React from "react";
import LockByScroll from "@/components/LockByScroll";
import { useLinkedAccount } from "@/context/wallet/LinkedAccountContext";
import { IoClose } from "react-icons/io5";
import { linkBankAccount } from "@/utils/wallet/linkBank";
import { useToast } from "@/context/ToastContext";
import Button from "@/components/buttons/Button";
import { useFetchLinkedBanks } from "@/hooks/useFetchLinkedBanks";

const ConfirmAccount = () => {
  const { refetchLinkedBanks } = useFetchLinkedBanks();
  const { linkAccount, setLinkAccount } = useLinkedAccount();
  const { verified } = linkAccount;
  const { toast, setToast } = useToast();

  const close = () => {
    setLinkAccount((prev) => ({
      ...prev,
      proceed: false,
      verified: false,
    }));
  };

  const handleLinkAccount = async () => {
    setLinkAccount((prev) => ({
      ...prev,
      loading: true,
    }));

    const { data, error } = await linkBankAccount({
      bankAccount: linkAccount?.bankAccount,
      bank: linkAccount?.bank,
      holdersName: linkAccount?.holdersName,
    });

    console.log("Link Bank result", data);

    if (error) {
      setLinkAccount((prev) => ({
        ...prev,
        loading: false,
      }));

      setToast({
        ...toast,
        error: true,
        errorMessage: error,
      });
      return;
    }

    if (data) {
      console.log("Bank holder verified:", data);

      setToast({
        ...toast,
        success: true,
        successMessage: "Bank account successfully linked",
      });

      try {
        await refetchLinkedBanks();
      } catch (err) {
        console.error("Refetch failed:", err);
      }

      setLinkAccount({
        loading: false,
        details: false,
        verified: false,
        success: true,
        bank: "",
        bankAccount: "",
        holdersName: null,
      });
    }
  };

  return (
    <div>
      {verified && (
        <div>
          <LockByScroll />
          <div className="fixed top-0 left-0 right-0 bottom-0 lg:px-[15px] md:px-[2.5%] p-[35px] bg-black bg-opacity-80 flex items-center justify-center z-40">
            <div className="flex flex-col px-[15px] bg-tradeAsh borde border-tradeAshLight rounded-[15px] shadow-lg w-[300px]">
              <div className="flex items-center justify-between py-[12.3px] border-b border-tradeAshLight">
                <p className="text-lg font-[700] text-white ">
                  Confirm Account
                </p>

                <div onClick={close}>
                  <IoClose className="text-tradeFadeWhite hover:text-white cursor-pointer text-xl" />
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between py-[12.3px] gap-[30px]">
                <div className="flex flex-col gap-[10px]">
                  <div className="flex flex-col gap-1">
                    <p className="text-[13px] font-medium text-cente text-tradeFadeWhite">
                      We found a match. Please review and confirm the verified
                      details before linking this account.
                    </p>
                  </div>
                  <div className="w-full flex flex-col gap-1 bg-tradeAshLight p-[12px] rounded-[15px]">
                    <div className="flex items-center justify-between">
                      <p className="text-[13px] text-tradeFadeWhite font-semibold">
                        Holder
                      </p>
                      <p className="text-[13px] text-tradeFadeWhite font-semibold">
                        {linkAccount?.data?.account_name}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[13px] text-tradeFadeWhite font-semibold">
                        Bank Name
                      </p>
                      <p className="text-[13px] font-semibold text-white">
                        {linkAccount?.data?.bank_name}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[13px] text-tradeFadeWhite font-semibold">
                        Account Number
                      </p>
                      <p className="text-[13px] font-semibold text-white">
                        {linkAccount?.data?.account_number}
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
    </div>
  );
};

export default ConfirmAccount;
