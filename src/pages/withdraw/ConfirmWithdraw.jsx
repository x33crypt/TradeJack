import React from "react";
import { useWithdrawContext } from "@/context/wallet/WithdrawContext";
import LockByScroll from "@/components/LockByScroll";
import Button from "@/components/buttons/Button";
import { IoClose } from "react-icons/io5";
import { toDecimal } from "@/utils/toDecimal";
import { PiHandWithdrawFill } from "react-icons/pi";
import { submitWithdraw } from "@/utils/wallet/withdraw";
import { useToast } from "@/context/ToastContext";

const ConfirmWithdraw = () => {
  const { setToast } = useToast();
  const { withdraw, setWithdraw } = useWithdrawContext();
  const { confirm, loading, amount, bank, charges } = withdraw;

  console.log(withdraw);

  const close = () => {
    setWithdraw((prev) => ({
      ...prev,
      proceed: false,
      confirm: false,
    }));
  };

  const initiateWithdraw = async () => {
    setWithdraw((prev) => ({
      ...prev,
      loading: true,
    }));

    const details = { amount: amount?.NGN, bankId: bank?.bankId };

    const result = await submitWithdraw(details);
    console.log("Withdraw Result 2:", result);

    if (result?.success) {
      setWithdraw((prev) => ({
        ...prev,
        error: "",
        proceed: false,
        confirm: false,
        success: true,
        loading: false,
        referenceId: result?.reference,
      }));
    } else {
      setToast({
        error: true,
        errorMessage: result.error,
      });

      setWithdraw((prev) => ({
        ...prev,
        loading: false,
      }));
    }
  };

  return (
    <div>
      {confirm && (
        <div>
          <LockByScroll />
          {/* Modal */}
          <div className="fixed top-0 left-0 right-0 bottom-0 lg:px-[15px] md:px-[2.5%] p-[35px] bg-black bg-opacity-80 flex items-center justify-center z-40">
            <div className="flex flex-col px-[15px] bg-tradeAsh borde border-tradeAshLight rounded-[15px] shadow-lg w-[300px]">
              <div className="flex items-center justify-between py-[12.3px] border-b border-tradeAshLight">
                <p className="text-lg font-[700] text-white ">
                  Confirm Withdraw
                </p>

                {!loading && (
                  <div onClick={close}>
                    <IoClose className="text-tradeFadeWhite hover:text-white cursor-pointer text-xl" />
                  </div>
                )}
              </div>

              <div className="flex-1 flex flex-col justify-between py-[15px] gap-[30px]">
                <div className="flex flex-col gap-[20px]">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="p-[2px] bg-tradeAshExtraLight text-[55px] text-tradeAsh rounded-full">
                      <PiHandWithdrawFill />
                    </div>

                    <div className="flex flex-col gap-1">
                      <p className="text-[13px] font-medium text-center text-tradeFadeWhite">
                        Review and confirm the withdraw details before
                        proceeding.
                      </p>
                    </div>
                  </div>

                  <div className="w-full flex flex-col gap-1 bg-tradeAshLight p-[12px] rounded-[15px]">
                    <div className="flex items-center justify-between">
                      <p className="text-[13px] text-tradeFadeWhite font-semibold">
                        Amount
                      </p>
                      <div>
                        {withdraw?.currency === "USD" ? (
                          <p className="text-white text-[13px]  font-semibold">
                            ${toDecimal(amount?.USD)}
                          </p>
                        ) : (
                          <p className="text-white text-[13px]  font-semibold">
                            #{toDecimal(amount?.NGN)}
                          </p>
                        )}
                      </div>
                    </div>
                    {/* <div className="flex items-center justify-between">
                      <p className="text-[13px] text-tradeFadeWhite font-semibold">
                        Name
                      </p>
                      <p className="text-white text-[13px]  font-semibold">
                        {bank?.account_holder_name}
                      </p>
                    </div> */}
                    <div className="flex items-center justify-between">
                      <p className="text-[13px] text-tradeFadeWhite font-semibold">
                        Bank Name
                      </p>
                      <p className="text-white text-[13px]  font-semibold">
                        {bank?.bank_name}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[13px] text-tradeFadeWhite font-semibold">
                        Bank Account
                      </p>
                      <p className="text-white text-[13px]  font-semibold">
                        {bank?.account_number}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[13px] text-tradeFadeWhite font-semibold">
                        Fee
                      </p>
                      <p className="text-white text-[13px] font-semibold">
                        #0.00
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={initiateWithdraw}
                  disabled={loading}
                >
                  Withdraw
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmWithdraw;
