import MarketTopNav from "@/components/MarketTopNav";
import React, { useState, useEffect } from "react";
import { PiStarBold } from "react-icons/pi";
import { FaRegQuestionCircle } from "react-icons/fa";
import landingImg4 from "./../assets/landingImg4.JPG";
import { IoMdThumbsUp } from "react-icons/io";
import { AiOutlineSafety } from "react-icons/ai";
import { IoMdCheckmark } from "react-icons/io";
import Footer from "@/components/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import OfferCalculator from "@/components/aboutOffer/OfferCalculator";

const ViewOfferSell = () => {
  const [offerDetails, setOfferDetails] = useState("");
  const [vendorDetails, setVendorDetails] = useState("");
  const { id } = useParams();

  const getOffer = async () => {
    if (!id) {
      console.error("ID parameter is missing.");
      return;
    }

    try {
      const response = await axios.get("/fakeData.json"); // Fetch data from the file

      // Find the offer that matches the ID from the URL params
      const offer = response.data.offers.find((offer) => offer.id === id);

      if (offer) {
        setOfferDetails(offer); // Set the offer details if found
        console.log("Offer details set successfully:", offer);
      } else {
        console.warn(`Offer with ID ${id} not found.`);
      }
    } catch (error) {
      console.error("Error fetching the offers:", error.message || error);
    }
  };

  const getVendor = async () => {
    if (!offerDetails || !offerDetails.username) {
      console.error("offerDetails or username is missing.");
      return;
    }

    try {
      const response = await axios.get("/fakeData.json"); // Fetch data from the file
      // Find the vendor profile where username matches offerDetails.username
      const vendor = response.data.profiles.find(
        (profile) => profile.username === offerDetails.username
      );

      if (vendor) {
        setVendorDetails(vendor); // Set the vendor details if found
        console.log("Vendor details set successfully:", vendor);
      } else {
        console.warn("Vendor not found for username:", offerDetails.username);
      }
    } catch (error) {
      console.error(
        "Error fetching the vendor details:",
        error.message || error
      );
    }
  };

  useEffect(() => {
    getOffer();
  }, [id]);

  useEffect(() => {
    getVendor();
  }, [offerDetails]);

  // console.log(offerDetails);
  console.log(vendorDetails);

  return (
    <>
      <MarketTopNav />
      <div className="px-[10%] py-[90px] bg-white flex flex-col">
        <div className="mt-[70px] flex text-black text-[40px] font-[700] justify-center">
          <p>
            Sell your asset with{" "}
            <small className="text-[40px] text-tradeOrange">
              {offerDetails.service}
            </small>{" "}
            ({offerDetails.currency})
          </p>
        </div>
        <OfferCalculator
          offerRate={offerDetails?.offerRate}
          currency={offerDetails.currency}
        />
        <div className="mt-[80px] gap-[50px] flex">
          <div className="flex-1 h-max flex flex-col gap-[10px]">
            <p className="text-[18px] font-[800]">About this offer</p>
            <div className="p-[20px] flex flex-col gap-[30px] rounded-[8px] border border-neutral-300">
              <div className="flex flex-col gap-[8px]">
                <div className="flex items-center gap-[6px] text-neutral-400">
                  <p className="text-[14px] font-[400]">Buyers rate</p>
                  <div>
                    <PiStarBold />
                  </div>
                </div>
                <div className="flex flex-col gap-[5px]">
                  {offerDetails?.offerRate?.map((details, index) => (
                    <div id={index}>
                      <p className="text-[16px] font-[800] ">
                        {details.range}{" "}
                        <small className="text-[16px] font-[800] text-neutral-500">
                          {offerDetails.currency}
                        </small>{" "}
                        -{" "}
                        <small className="text-[16px] text-black font-[800]">
                          {details.rate}{" "}
                          <small className="text-[16px] font-[800] text-neutral-500">
                            NGN / {offerDetails.currency}
                          </small>
                        </small>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-[8px]">
                <div className="flex items-center gap-[4px] text-neutral-400">
                  <p className="font-[400] text-[14px] text-neutral-400">
                    Buy Limits
                  </p>
                </div>
                <div className="flex flex-col gap-[4px]">
                  <p className="font-[800] text-[16px] ">
                    <small className="text-[16px]  text-neutral-500 ">
                      Min
                    </small>{" "}
                    20 {offerDetails.currency} -{" "}
                    <small className="text-[16px] text-neutral-500">Max</small>{" "}
                    {offerDetails?.purchaseLimit} {offerDetails.currency}
                  </p>
                </div>
              </div>
              <div className="flex gap-[70px]">
                <div className="flex flex-col gap-[8px]">
                  <div className="flex items-center gap-[6px]">
                    <p className="text-[14px] font-[400] text-neutral-400">
                      Trade time limit
                    </p>
                    <FaRegQuestionCircle className="text-tradeOrange" />
                  </div>
                  <div>
                    <p className="text-[16px] font-[800] ">30 min</p>
                  </div>
                </div>
                <div className="flex flex-col gap-[8px]">
                  <div className="flex items-center gap-[6px]">
                    <p className="text-[14px] font-[400] text-neutral-400">
                      Platform Fee
                    </p>
                  </div>
                  <div>
                    <p className="text-[16px] font-[800] ">1&#37;</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 h-max flex flex-col gap-[10px]">
            <p className="text-[18px] font-[800]">About this buyer</p>
            <div className="p-[20px] flex flex-col gap-[30px] rounded-[8px] border border-neutral-300">
              <div className="flex items-center gap-[20px]">
                <div>
                  <img
                    className="w-[60px] rounded-full"
                    src={landingImg4}
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-[5px] leading-[20px]">
                  <p className="font-[600] text-[17px]">
                    {vendorDetails.username}
                  </p>
                  <p className="text-[14px] font-[500]">
                    Location : {vendorDetails.location}
                  </p>
                </div>
              </div>
              <div className="flex gap-[50px]">
                <div>
                  <p className="text-[14px] text-neutral-400 font-[400] ">
                    Positive feedback
                  </p>
                  <div className="flex items-center gap-[8px]">
                    <IoMdThumbsUp className="text-[25px] text-tradeGreen" />
                    <p className="font-[800] text-[16px]">
                      {vendorDetails.feedback}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-[14px] text-neutral-400 font-[400] ">
                    Trust score
                  </p>
                  <div className="flex items-center gap-[8px]">
                    <AiOutlineSafety className="text-[25px] text-tradePurple" />
                    <p className="font-[800] text-[16px]">
                      {vendorDetails.trustScore}
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-[10px]">
                <div className="flex gap-[5px] items-center">
                  {vendorDetails.idVerified ? (
                    <>
                      <IoMdCheckmark className="text-[20px] text-tradeGreen" />
                    </>
                  ) : (
                    <>
                      <RxCross2 className="text-[20px] text-red-600" />
                    </>
                  )}
                  <p className="text-[14px] font-[400] ">
                    {" "}
                    {vendorDetails.idVerified
                      ? "ID verified"
                      : "ID not verified"}
                  </p>
                </div>
                <div className="flex gap-[5px] items-center">
                  {vendorDetails.addressVerified ? (
                    <>
                      <IoMdCheckmark className="text-[20px] text-tradeGreen" />
                    </>
                  ) : (
                    <>
                      <RxCross2 className="text-[20px] text-red-600" />
                    </>
                  )}
                  <p className="text-[14px] font-[400] ">
                    {" "}
                    {vendorDetails.addressVerified
                      ? "Address verified"
                      : "Address not verified"}
                  </p>
                </div>
                <div className="flex gap-[5px] items-center">
                  {vendorDetails.emailVerified ? (
                    <>
                      <IoMdCheckmark className="text-[20px] text-tradeGreen" />
                    </>
                  ) : (
                    <>
                      <RxCross2 className="text-[20px] text-red-600" />
                    </>
                  )}
                  <p className="text-[14px] font-[400] ">
                    {vendorDetails.emailVerified
                      ? "Email verified"
                      : "Email not verified"}
                  </p>
                </div>
                <div className="flex gap-[5px] items-center">
                  {vendorDetails.phoneVerified ? (
                    <>
                      <IoMdCheckmark className="text-[20px] text-tradeGreen" />
                    </>
                  ) : (
                    <>
                      <RxCross2 className="text-[20px] text-red-600" />
                    </>
                  )}

                  <p className="text-[14px] font-[400] ">
                    {vendorDetails.phoneVerified
                      ? "Email verified"
                      : "Email not verified"}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-[8px]">
                <div className="flex items-center gap-[6px]">
                  <p className="text-[14px] font-[400] text-neutral-400">
                    Average trade speed
                  </p>
                  <FaRegQuestionCircle className="text-tradeOrange" />
                </div>
                <div>
                  <p className="text-[16px] font-[800] ">30 min</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[60px] flex flex-col gap-[10px]">
          <p className="text-[18px] font-[800]">Offer terms</p>
          <div className="p-[20px] flex flex-col rounded-[8px] border border-neutral-300">
            {offerDetails.offerTerms?.map((terms, index) => (
              <div key={index}>
                <p className="text-[15px]">{terms}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-[60px] p-[30px] flex flex-col gap-[30px] rounded-[8px] border border-neutral-300">
          <div className="flex">
            <p className="text-[18px] font-[800]">Feedback on this offer</p>
          </div>
        </div>
        <div className="mt-[70px] flex  justify-center">
          <p className="px-[40px] py-[7px] rounded-[5px] bg-tradePurple text-white hover:text-tradePurple border border-tradePurple hover:bg-white font-[600] cursor-pointer">
            Start Transaction
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ViewOfferSell;
