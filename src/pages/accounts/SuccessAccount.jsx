import React from "react";
import LockByScroll from "@/components/others/LockByScroll";
import { useLinkedAccount } from "@/context/userContext/LinkedAccountContext";
import { IoClose } from "react-icons/io5";
import Button from "@/components/buttons/Button";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useFetchLinkedBanks } from "@/hooks/userHooks/useFetchLinkedBanks";

const SuccessAccount = () => {
  const { linkAccount, setLinkAccount } = useLinkedAccount();
  const { success } = linkAccount;
  const { refetchLinkedBanks } = useFetchLinkedBanks();

  const defaultLinkAccountState = {
    proceed: false,
    loading: false,
    verified: false,
    success: false,
    bank: "",
    bankAccount: "",
    holdersName: null,
  };

  const close = async () => {
    setLinkAccount({ ...defaultLinkAccountState });
    refetchLinkedBanks();
  };

  return (
    <div>
      {success && (
        <div>
          <LockByScroll />
          {/* Modal */}
          <div className="fixed top-0 left-0 right-0 bottom-0 lg:px-[15px] md:px-[2.5%] p-[35px] bg-black backdrop-blur-sm bg-opacity-80 flex items-center justify-center z-40">
            <div className="flex flex-col px-[15px] bg-tradeAsh borde border-tradeAshLight rounded-[15px] shadow-lg w-[300px]">
              <div className="flex items-center justify-between py-[12.3px] border-b border-tradeAshLight">
                <p className="text-lg font-[700] text-white ">Feedback</p>

                <div onClick={close}>
                  <IoClose className="text-tradeFadeWhite hover:text-white cursor-pointer text-xl" />
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-between py-[12.3px] gap-[20px]">
                <div className="flex flex-col gap-[10px]">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="p-[2px] bg-tradeAshExtraLight text-[55px] text-tradeGreen rounded-full">
                      <IoIosCheckmarkCircle />
                    </div>

                    <p className="text-[13px] font-semibold text-white">
                      Connection Successful
                    </p>
                  </div>

                  <p className="text-xs font-medium text-tradeFadeWhite leading-relaxed text-center">
                    Your account is now securely linked and ready to use for
                    seamless withdrawals and transactions
                  </p>
                </div>

                <div className="flex flex-col gap-[10px]">
                  <Button variant="Fadeout" onClick={close}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessAccount;
