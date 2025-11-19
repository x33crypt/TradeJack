import React from "react";
import InAppNav from "@/components/others/InAppNav";
import Footer from "@/components/others/Footer";
import MiniButton from "@/components/buttons/MiniButton";

const Notifications = () => {
  return (
    <>
      <InAppNav />
      <div className="md:pt-[70px] pt-[57px] lg:px-[2%] md:px-[10px] min-h-svh flex bg-black">
        <div className="flex flex-1 lg:flex-row flex-col gap-[25px] ">
          {/* <div className="lg:flex hidden">
            <Filter />
          </div> */}{" "}
          <div className="flex flex-col gap-[30px] lg:mx-[22.8%] p-[15px] min-w-0 ">
            <div className="flex items-center justify-between ">
              <p className="text-lg font-semibold text-white flex items-center gap-1">
                NOTIFICATION
              </p>
            </div>

            <div
              className="flex overflow-x-auto scroll-hide w-full min-w-0"
              style={{
                scrollbarWidth: "none", // Firefox
                msOverflowStyle: "none", // IE/Edge
              }}
            >
              <div className="flex gap-2 whitespace-nowrap">
                <MiniButton style={{ flexShrink: 0 }}>
                  <p>ALL</p>
                  <small>14</small>
                </MiniButton>
                <MiniButton style={{ flexShrink: 0 }}>
                  <p>SYSTEM</p>
                  <small>2</small>
                </MiniButton>
                <MiniButton style={{ flexShrink: 0 }}>
                  <p>NEWS</p>
                  <small>5</small>
                </MiniButton>
                <MiniButton style={{ flexShrink: 0 }}>
                  <p>ACCOUNT</p>
                </MiniButton>
                <MiniButton style={{ flexShrink: 0 }}>
                  <p>TRADE</p>
                  <small>3</small>
                </MiniButton>
                <MiniButton style={{ flexShrink: 0 }}>
                  <p>TRANSACTION</p>
                  <small>1</small>
                </MiniButton>
                <MiniButton style={{ flexShrink: 0 }}>
                  <p>ORDER</p>
                </MiniButton>
                <MiniButton style={{ flexShrink: 0 }}>
                  <p>REWARDS</p>
                  <small>3</small>
                </MiniButton>
                <MiniButton style={{ flexShrink: 0 }}>
                  <p>SETTING</p>
                </MiniButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Notifications;
