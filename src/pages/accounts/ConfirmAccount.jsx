import React from "react";
import LockByScroll from "@/components/others/LockByScroll";
import { useLinkedAccount } from "@/context/userContext/LinkedAccountContext";
import { IoClose } from "react-icons/io5";
import { linkBankAccount } from "@/utils/wallet/linkBank";
import { useToast } from "@/context/otherContext/ToastContext";
import Button from "@/components/buttons/Button";
import { useFetchLinkedBanks } from "@/hooks/userHooks/useFetchLinkedBanks";
import { useNavigate } from "react-router-dom";

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

  const navigateTo = useNavigate();

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

      navigateTo("/wallet/accounts");

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
          <div className="fixed top-0 left-0 right-0 bottom-0 lg:px-[15px] md:px-[2.5%] p-[35px] bg-black backdrop-blur-sm bg-opacity-80 flex items-center justify-center z-40">
            <div className="flex flex-col px-[15px] bg-tradeAsh borde border-tradeAshLight rounded-[15px] shadow-lg w-[300px]">
              <div className="flex items-center justify-between py-[12.3px] border-b border-tradeAshLight">
                <p className="text-lg font-[700] text-white ">
                  Confirm Account
                </p>

                <div onClick={close}>
                  <IoClose className="text-tradeFadeWhite hover:text-white cursor-pointer text-xl" />
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between py-[12.3px] gap-[20px]">
                <div className="flex flex-col gap-[10px]">
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-medium text-cente text-tradeFadeWhite">
                      We found a match. Review and confirm details before
                      linking this account.
                    </p>
                  </div>
                  <div className="w-full flex flex-col gap-2 bg-tradeAshLight p-[12px] rounded-[10px]">
                    <div className="flex items-center gap-1">
                      <p className="text-xs text-tradeFadeWhite font-semibold leading-normal">
                        HOLDER :{" "}
                        <span className="text-xs text-white font-semibold">
                          {linkAccount?.data?.account_name}
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <p className="text-xs text-tradeFadeWhite font-semibold leading-normal">
                        ACCOUNT :{" "}
                        <span className="text-xs text-white font-semibold">
                          {linkAccount?.data?.bank_name}
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <p className="text-xs text-tradeFadeWhite font-semibold leading-normal">
                        ACCOUNT NO :{" "}
                        <span className="text-xs text-white font-semibold">
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
    </div>
  );
};

export default ConfirmAccount;
