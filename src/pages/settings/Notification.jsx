import React from "react";
import InAppNav from "@/components/others/InAppNav";
import Footer from "@/components/others/Footer";
import Button from "@/components/buttons/Button";
import { BsToggleOff } from "react-icons/bs";
import { BsToggleOn } from "react-icons/bs";

const Notification = () => {
  return (
    <>
      <InAppNav />
      <div className="md:pt-[70px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex bg-black">
        <div className="flex flex-1 flex-col gap-[20px] lg:mx-[22.8%] p-[15px]">
          <div className="flex items-center justify-between ">
            <p className="text-lg font-semibold text-white flex items-center gap-1">
              NOTIFICATION
            </p>
          </div>
          <div className="flex flex-col gap-[30px]">
            <div className="flex flex-col gap-[25px]">
              <p className="text-xs text-tradeFadeWhite font-medium leading-relaxed">
                Manage how and when you receive alerts and updates to keep your
                account secure. You’ll get notified about trades, chats,
                payments, and any changes made to your account.
              </p>
              <div className="flex flex-col gap-[30px]">
                <div className="flex flex-col gap-[10px]">
                  <div className="flex items-center justify-between gap-[30px] bg-tradeAsh rounded-[15px] p-[12px]">
                    <div className="flex flex-col gap-[5px]">
                      <p className="text-white text-sm font-semibold">
                        SMS Notifications
                      </p>
                    </div>

                    <div>
                      <BsToggleOff className="text-tradeFadeWhite hover:text-tradeOrange text-4xl cursor-pointer transition-all duration-300 " />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-[30px] bg-tradeAsh rounded-[15px] p-[12px]">
                    <div className="flex flex-col gap-[5px]">
                      <p className="text-white text-sm font-semibold">
                        Email Notifications
                      </p>
                    </div>

                    <div>
                      <BsToggleOff className="text-tradeFadeWhite hover:text-tradeOrange text-4xl cursor-pointer transition-all duration-300" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-[10px]">
                  <div className="flex items-center justify-between gap-[30px] bg-tradeAsh rounded-[15px] p-[12px]">
                    <div className="flex flex-col gap-[5px]">
                      <p className="text-white text-sm font-semibold">
                        Account & Security
                      </p>
                      <p className="text-tradeFadeWhite text-xs font-semibold">
                        Stay informed about login attempts, password changes,
                        and other activities that help protect your account.
                      </p>
                    </div>

                    <div>
                      <BsToggleOff className="text-tradeFadeWhite hover:text-tradeOrange text-4xl cursor-pointer transition-all duration-300 " />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-[30px] bg-tradeAsh rounded-[15px] p-[12px]">
                    <div className="flex flex-col gap-[5px]">
                      <p className="text-white text-sm font-semibold">
                        Trades & Transactions
                      </p>
                      <p className="text-tradeFadeWhite text-xs font-semibold">
                        Get updates on your purchases, trades, payments, and
                        delivery status in real time.
                      </p>
                    </div>

                    <div>
                      <BsToggleOff className="text-tradeFadeWhite hover:text-tradeOrange text-4xl cursor-pointer transition-all duration-300" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-[30px] bg-tradeAsh rounded-[15px] p-[12px]">
                    <div className="flex flex-col gap-[5px]">
                      <p className="text-white text-sm font-semibold">
                        Messages & Chats
                      </p>
                      <p className="text-tradeFadeWhite text-xs font-semibold">
                        Receive alerts for new messages, replies, and important
                        conversations with traders.
                      </p>
                    </div>

                    <div>
                      <BsToggleOff className="text-tradeFadeWhite hover:text-tradeOrange text-4xl cursor-pointer transition-all duration-300" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-[30px] bg-tradeAsh rounded-[15px] p-[12px]">
                    <div className="flex flex-col gap-[5px]">
                      <p className="text-white text-sm font-semibold">
                        Offers & Listing
                      </p>
                      <p className="text-tradeFadeWhite text-xs font-semibold">
                        Stay updated when someone makes an offer, favorites your
                        item, or when your listings change status.
                      </p>
                    </div>

                    <div>
                      <BsToggleOff className="text-tradeFadeWhite hover:text-tradeOrange text-4xl cursor-pointer transition-all duration-300" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-[30px] bg-tradeAsh rounded-[15px] p-[12px]">
                    <div className="flex flex-col gap-[5px]">
                      <p className="text-white text-sm font-semibold">
                        Promotions & Updates
                      </p>
                      <p className="text-tradeFadeWhite text-xs font-semibold">
                        Be the first to know about discounts, special offers,
                        and the latest marketplace news.
                      </p>
                    </div>

                    <div>
                      <BsToggleOff className="text-tradeFadeWhite hover:text-tradeOrange text-4xl cursor-pointer transition-all duration-300" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-[30px] bg-tradeAsh rounded-[15px] p-[12px]">
                    <div className="flex flex-col gap-[5px]">
                      <p className="text-white text-sm font-semibold">
                        Reviews & Ratings
                      </p>
                      <p className="text-tradeFadeWhite text-xs font-semibold">
                        Get notified when someone leaves a review, rates your
                        service, or when it’s time to share your feedback.
                      </p>
                    </div>

                    <div>
                      <BsToggleOff className="text-tradeFadeWhite hover:text-tradeOrange text-4xl cursor-pointer transition-all duration-300" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-[30px] bg-tradeAsh rounded-[15px] p-[12px]">
                    <div className="flex flex-col gap-[5px]">
                      <p className="text-white text-sm font-semibold">
                        System & Policy Updates
                      </p>
                      <p className="text-tradeFadeWhite text-xs font-semibold">
                        Receive important notices about policy changes,
                        maintenance, and new platform features.
                      </p>
                    </div>

                    <div>
                      <BsToggleOff className="text-tradeFadeWhite hover:text-tradeOrange text-4xl cursor-pointer transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Notification;
