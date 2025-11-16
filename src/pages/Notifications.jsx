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
          <div className="flex flex-1 flex-col gap-[30px] lg:mx-[22.8%] p-[15px]">
            <div className="flex items-center justify-between ">
              <p className="text-lg font-semibold text-white flex items-center gap-1">
                NOTIFICATION
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MiniButton>
                  <p>ALL</p>
                </MiniButton>
                <MiniButton>
                  <p>SYSTEM</p>
                </MiniButton>
                <MiniButton>
                  <p>TRADE</p>
                </MiniButton>
                <MiniButton>
                  <p>TRANSACTION</p>
                </MiniButton>
                <MiniButton>
                  <p>ORDER</p>
                </MiniButton>
                <MiniButton>
                  <p>REWARDS</p>
                </MiniButton>
                <MiniButton>
                  <p>NEWS</p>
                </MiniButton>
                <MiniButton>
                  <p>CLEAR</p>
                </MiniButton>

                <MiniButton>
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
