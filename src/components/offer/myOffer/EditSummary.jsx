import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CiBank } from "react-icons/ci";
import { IoWalletOutline } from "react-icons/io5";
import { HiOutlineGift } from "react-icons/hi2";
import { IoCardOutline } from "react-icons/io5";
import { GiTwoCoins } from "react-icons/gi";
import { useToast } from "@/context/otherContext/ToastContext";
import Button from "@/components/buttons/Button";
// import { editOffer } from "@/utils/offer/editOffer";
import { closeOffer } from "@/utils/offer/closeOffer";
import { useUserOffer } from "@/context/userContext/OffersContext";

const EditSummary = () => {
  const { editOffer, setEditOffer } = useUserOffer();

  const [loading, setLoading] = useState(false);

  const { toast, setToast } = useToast();

  const serviceTypeIcons = {
    "Online Wallet Transfer": IoWalletOutline,
    "Bank Transfer": CiBank,
    "Gift Card Exchange": HiOutlineGift,
    "Card-Based Spending": IoCardOutline,
    "Crypto Trading": GiTwoCoins,
  };

  // Get the icon component based on the full service type
  const IconComponent = serviceTypeIcons[editOffer?.serviceType];

  const navigateTo = useNavigate();

  const handleEdit = async () => {
    setLoading(true);

    const result = await editOffer(editOffer);

    if (result.success) {
      setLoading(false);

      console.log("Offer Edit:", result.data);
      setToast({
        ...toast,
        success: true,
        errorSuccess: result.data,
      });

      navigateTo("/offers/marketplace");
      setEditOffer({
        serviceType: "Online Wallet Transfer",
        service: "",
        serviceId: "",
        currency: { code: "", name: "" },
        minimum: "",
        maximum: "",
        margin: 4,
        paymentWindow: 1,
        confirmationWindow: 1,
        terms: [],
        instruction: "",
      });
    } else {
      console.error("Edit failed:", result.error);
      setLoading(false);

      setToast({
        ...toast,
        error: true,
        errorMessage: result.error,
      });
    }
  };

  const handleClose = async () => {
    setLoading(true);

    const result = await closeOffer(editOffer?.offerId);

    if (result.success) {
      setLoading(false);

      console.log("Offer Edit:", result.data);
      setToast({
        ...toast,
        success: true,
        errorSuccess: result.data,
      });

      navigateTo("/offers/marketplace");
      setEditOffer({
        serviceType: "Online Wallet Transfer",
        service: "",
        serviceId: "",
        currency: { code: "", name: "" },
        minimum: "",
        maximum: "",
        margin: 4,
        paymentWindow: 1,
        confirmationWindow: 1,
        terms: [],
        instruction: "",
      });
    } else {
      console.error("Edit failed:", result.error);
      setLoading(false);

      setToast({
        ...toast,
        error: true,
        errorMessage: result.error,
      });
    }
  };

  const cancelButton = () => {
    navigateTo(location?.state?.from || -1);
  };

  return (
    <div className="flex lg:flex-row w-full gap-[10px] flex-col bg-black  lg:pt-0 md:pt-[64px] pt-[60px]">
      <div className="relative bg-black w-full min-h-svh flex flex-col md:border-x md:border-b md:border-t-0 border-neutral-800">
        <div className="flex flex-col justify-between p-[15px]  border-b border-tradeAshLight w-full">
          <p className="text-lg text-white font-[700]">Offer Summary</p>
        </div>

        <div className="p-[15px]">
          <p className="text-tradeFadeWhite text-[13px]">
            Verify your offer information to set clear terms and support a
            transparent, efficient trade.
          </p>
        </div>

        <div className="flex flex-col p-[15px]">
          <div className="flex gap-4 items-center bg-tradeAshLight border border-neutral-800 p-[15px]">
            <div>
              {IconComponent && (
                <IconComponent className="text-tradeFadeWhite text-[36px]" />
              )}
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-tradeOrange text-base font-bold">
                {editOffer?.service || "-- --"}
              </p>
              <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                <p className="text-white text-xs font-medium">
                  {editOffer?.serviceType || "Service Type"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 p-[15px] bg-tradeAsh border border-t-0 border-tradeAshLight">
            <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <p className="text-tradeFadeWhite text-xs font-medium">
                Accepted Currency
              </p>
            </div>

            <p className="text-tradeOrange text-sm font-[600]">
              {editOffer?.preferredCurrency?.name
                ? `${editOffer?.preferredCurrency?.name} - ${editOffer?.preferredCurrency?.code}`
                : "-- --"}
            </p>
          </div>

          <div className="flex flex-col gap-3 p-[15px] bg-tradeAsh border border-t-0 border-tradeAshLight">
            <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <p className="text-tradeFadeWhite text-xs font-medium">
                Trade Range Limit
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <div className="grid grid-cols-2 ">
                <p className="text-tradeFadeWhite text-sm">Minimum Purchase</p>
                <p className="text-tradeLightGreen text-sm font-[600]">
                  {editOffer?.marginRate?.from !== undefined &&
                  editOffer?.preferredCurrency?.code
                    ? `${Number(
                        editOffer?.marginRate?.from
                      ).toLocaleString()} ${editOffer?.preferredCurrency?.code}`
                    : "N/A"}
                </p>
              </div>

              <div className="grid grid-cols-2 ">
                <p className="text-tradeFadeWhite text-sm">Maximum Purchase</p>
                <p className="text-tradeLightGreen text-sm font-[600]">
                  {editOffer?.marginRate?.to !== undefined &&
                  editOffer?.preferredCurrency?.code
                    ? `${Number(editOffer?.marginRate?.to).toLocaleString()} ${
                        editOffer?.preferredCurrency?.code
                      }`
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 p-[15px] bg-tradeAsh border border-t-0 border-tradeAshLight">
            <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <p className="text-tradeFadeWhite text-xs font-medium">
                Profit Margin
              </p>
            </div>

            <p className="text-white text-sm">
              You’ve set a profit margin of{" "}
              <span className="text-tradeGreen text-sm font-[600]">
                {editOffer?.marginRate?.percent !== undefined
                  ? `${editOffer?.marginRate?.percent} percent`
                  : "--"}
              </span>
              , which represents your expected earnings per successful
              transaction.
            </p>
          </div>

          <div className="flex flex-col gap-3 p-[15px] bg-tradeAsh border border-t-0 border-tradeAshLight">
            <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <p className="text-tradeFadeWhite text-xs font-medium">
                Payment Window
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-white text-sm">
                You’ve set a payment window of{" "}
                <span className="font-[600] text-sm text-tradeGreen">
                  {editOffer?.paymentWindow !== undefined
                    ? `${editOffer.paymentWindow} hour(s)`
                    : "--"}
                </span>{" "}
                for sellers to complete their payment.
              </p>

              <p className="text-tradeFadeWhite text-sm">
                <span className="text-tradeOrange font-bold">Note: </span> If
                the payment is not made within this timeframe, the trade will be
                automatically canceled. If funds were sent but not confirmed,
                sellers may initiate a dispute.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 p-[15px] bg-tradeAsh border border-t-0 border-tradeAshLight">
            <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <p className="text-tradeFadeWhite text-xs font-medium">
                Confirmation Window
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-white text-sm">
                You’ve agreed to confirm receipt of payment and release funds
                within{" "}
                <span className="font-[600] text-sm text-tradeGreen">
                  {editOffer?.confirmationWindow !== undefined
                    ? `${editOffer.confirmationWindow} hour(s)`
                    : "--"}
                </span>{" "}
                after seller's marks the trade as paid.
              </p>

              <p className="text-tradeFadeWhite text-sm">
                <span className="text-tradeOrange font-bold">Note: </span>
                Failure to respond within this window may result in the buyer
                escalating the trade through a dispute.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 p-[15px] bg-tradeAsh border border-t-0 border-tradeAshLight">
            <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <p className="text-tradeFadeWhite text-xs font-medium">
                Offer Terms
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {editOffer?.terms?.length ? (
                editOffer.terms.map((tag, index) => (
                  <div className="flex w-max items-center gap-[8px] px-[10px] py-[4px] rounded-[8px] bg-tradeAshLight border border-tradeAshLight">
                    <p
                      key={index}
                      className="text-sm font-medium text-tradeOrange"
                    >
                      {tag}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-tradeFadeWhite text-sm font-[500]">
                  No terms specified
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3 p-[15px] bg-tradeAsh border border-t-0 border-tradeAshLight">
            <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <p className="text-tradeFadeWhite text-xs font-medium">
                Offer Instructions
              </p>
            </div>
            <div className="">
              {editOffer?.instruction ? (
                <p className="text-white text-sm">{editOffer?.instruction}</p>
              ) : (
                <p className="text-tradeFadeWhite text-sm font-[500]">
                  No Instructions set yet
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3 p-[15px] bg-tradeAsh border border-t-0 border-tradeAshLight">
            <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <p className="text-tradeFadeWhite text-xs font-medium">
                Service Charge
              </p>
            </div>
            <div>
              <p className="text-white text-sm">
                <span className="font-semibold text-tradeOrange">
                  Applied at time of trade
                </span>{" "}
                (typically ranges between 0.5% – 2%)
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col p-[15px] gap-[15px] justify-center items-center">
          <Button onClick={handleEdit} variant="primary" disabled={loading}>
            {loading ? "Publishing..." : "Publish Offer"}
          </Button>

          <div className="hidden md:flex">
            <Button onClick={handleClose} variant="danger" disabled={loading}>
              {loading ? "Closing Offer..." : "Close this Offer"}
            </Button>
          </div>

          <Button onClick={cancelButton} variant="outline" disabled={loading}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditSummary;
