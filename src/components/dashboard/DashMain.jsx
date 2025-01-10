import React from "react";
import { MdReportGmailerrorred } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";

const DashMain = () => {
  return (
    <div className="flex-1 flex flex-col gap-[25px]">
      <div className="p-[10px] bg-tradeAsh flex items-center rounded-[8px]">
        <div className="flex items-center gap-[10px]">
          <div>
            <MdReportGmailerrorred className="text-[25px] text-tradeOrange" />
          </div>
          <p className="text-[14px] text-white font-[400]">
            You have an active trade with{" "}
            <small className="text-[14px] font-[800]">Hayjay Exchange</small>.
            The transaction is ongoing and requires your attention to proceed
            smoothly.{" "}
            <small className="text-[14px] font-[500] underline cursor-pointer">
              {" "}
              Return to Chat
            </small>
          </p>
        </div>
      </div>
      <div className="p-[20px] h-[150px] rounded-[8px] bg-tradeGreen">
        <p>Unlock Higher Transaction Limits!</p>
      </div>
      <div className="flex gap-[20px]">
        <div className="flex-1 bg-tradeAsh rounded-[8px] pt-[30px] pb-[20px] flex items-center justify-center ">
          <div className="flex flex-col justify-center items-center">
            <p className="text-[45px] text-white font-[700]">2,335</p>
            <p className="text-[13px] text-neutral-500 font-[600]">
              Total Trades
            </p>
          </div>
        </div>
        <div className="flex-1 bg-tradeAsh rounded-[8px] pt-[30px] pb-[20px] flex items-center justify-center">
          <div className="flex flex-col justify-center items-center">
            <p className="text-[45px] text-white font-[700]">2</p>
            <p className="text-[13px] text-neutral-500 font-[600]">
              Pending Trades
            </p>
          </div>
        </div>
        <div className="flex-1 bg-tradeAsh rounded-[8px] pt-[30px] pb-[20px] flex items-center justify-center">
          <div className="flex flex-col justify-center items-center">
            <p className="text-[45px] text-white font-[700]">10</p>
            <p className="text-[13px] text-neutral-500 font-[600]">
              Active Offers
            </p>
          </div>
        </div>
      </div>
      <div className="border border-neutral-600 p-[20px] rounded-[8px]">
        <div className="flex justify-between">
          <p className="text-[17px] text-white font-[600]">Transaction Stats</p>
          <div className="px-[10px] py-[2px] rounded-[5px] bg-white">
            <select className="text-[14px] outline-none" name="" id="">
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>
        </div>
      </div>
      <div className="bg-tradeAsh  border-neutral-600 p-[20px] rounded-[8px]">
        <div className="flex justify-between items-center">
          <p className="text-[17px] text-white font-[600]">Recent History</p>
          <div className=" p-[10px] border border-neutral-600 rounded-full">
            <FaArrowRight className="text-white text-[15px]" />
          </div>
        </div>
        <div className=" mt-[15px] flex border-t border-b border-neutral-600 py-[8px] text-white text-[14px]">
          <p className=" flex-1">Service</p>
          <p className=" flex-1">ID</p>
          <p className=" flex-1">Status</p>
          <p className=" flex-1">Amount</p>

          <p className=" flex-1">Date</p>
        </div>
        <div className="mt-[5px] flex flex-col ">
          <div className=" flex py-[8px] gap-[5px] text-white text-[14px]  hover:bg-tradeBlack cursor-pointer">
            <p className=" flex-1 font-[600]">Cashapp</p>
            <p className=" flex-1 font-[600]">#3545671</p>
            <p className=" flex-1 font-[600] text-tradeGreen">Completed</p>
            <p className=" flex-1 font-[600]">$650.00</p>

            <p className=" flex-1 font-[600]">8 Jan 2025</p>
          </div>
          <div className=" flex py-[8px] gap-[5px] text-white text-[14px] hover:bg-tradeBlack cursor-pointer">
            <p className=" flex-1 font-[600]">Zelle</p>
            <p className=" flex-1 font-[600]">#3545671</p>
            <p className=" flex-1 font-[600] text-tradeOrange">Pending</p>
            <p className=" flex-1 font-[600]">$650.00</p>

            <p className=" flex-1 font-[600]">8 Jan 2025</p>
          </div>
          <div className=" flex py-[8px] gap-[5px] text-white text-[14px] hover:bg-tradeBlack cursor-pointer">
            <p className=" flex-1 font-[600]">E-transfer</p>
            <p className=" flex-1 font-[600]">#3545671</p>
            <p className=" flex-1 font-[600] text-tradePurple">Disputed</p>
            <p className=" flex-1 font-[600]">$650.00</p>

            <p className=" flex-1 font-[600]">8 Jan 2025</p>
          </div>
          <div className=" flex py-[8px] gap-[5px] text-white text-[14px] hover:bg-tradeBlack cursor-pointer">
            <p className=" flex-1 font-[600]">Apple Pay</p>
            <p className=" flex-1 font-[600]">#3545671</p>
            <p className=" flex-1 font-[600] text-red-700">Cancelled</p>
            <p className=" flex-1 font-[600]">$650.00</p>

            <p className=" flex-1 font-[600]">8 Jan 2025</p>
          </div>
          <div className=" flex py-[8px] gap-[5px] text-white text-[14px] hover:bg-tradeBlack cursor-pointer">
            <p className=" flex-1 font-[600]">Chime Trf</p>
            <p className=" flex-1 font-[600]">#3545671</p>
            <p className=" flex-1 font-[600] text-tradeGreen">Completed</p>
            <p className=" flex-1 font-[600]">$650.00</p>

            <p className=" flex-1 font-[600]">8 Jan 2025</p>
          </div>
          <div className=" flex py-[8px] gap-[5px] text-white text-[14px] hover:bg-tradeBlack cursor-pointer">
            <p className=" flex-1 font-[600]">Zelle</p>
            <p className=" flex-1 font-[600]">#3545671</p>
            <p className=" flex-1 font-[600] text-tradeGreen">Completed</p>
            <p className=" flex-1 font-[600]">$650.00</p>

            <p className=" flex-1 font-[600]">8 Jan 2025</p>
          </div>
          <div className=" flex py-[8px] gap-[5px] text-white text-[14px] hover:bg-tradeBlack cursor-pointer">
            <p className=" flex-1 font-[600]">CC Spending</p>
            <p className=" flex-1 font-[600]">#3545671</p>
            <p className=" flex-1 font-[600] text-tradeOrange">Pending</p>
            <p className=" flex-1 font-[600]">$650.00</p>

            <p className=" flex-1 font-[600]">8 Jan 2025</p>
          </div>
          <div className=" flex py-[8px] gap-[5px] text-white text-[14px] hover:bg-tradeBlack cursor-pointer">
            <p className=" flex-1 font-[600]">Apple Pay</p>
            <p className=" flex-1 font-[600]">#3545671</p>
            <p className=" flex-1 font-[600] text-red-700">Cancelled</p>
            <p className=" flex-1 font-[600]">$650.00</p>
            <p className=" flex-1 font-[600]">8 Jan 2025</p>
          </div>
          <div className=" flex py-[8px] gap-[5px] text-white text-[14px] hover:bg-tradeBlack cursor-pointer">
            <p className=" flex-1 font-[600]">Zelle</p>
            <p className=" flex-1 font-[600]">#3545671</p>
            <p className=" flex-1 font-[600] text-tradeGreen">Completed</p>
            <p className=" flex-1 font-[600]">$650.00</p>

            <p className=" flex-1 font-[600]">8 Jan 2025</p>
          </div>
          <div className=" flex py-[8px] gap-[5px] text-white text-[14px] hover:bg-tradeBlack cursor-pointer">
            <p className=" flex-1 font-[600]">Zelle</p>
            <p className=" flex-1 font-[600]">#3545671</p>
            <p className=" flex-1 font-[600] text-tradeGreen">Completed</p>
            <p className=" flex-1 font-[600]">$650.00</p>

            <p className=" flex-1 font-[600]">8 Jan 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashMain;
