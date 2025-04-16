import React from "react";
import google from "../../assets/GoogleLogo.png";
import { GiCardExchange } from "react-icons/gi";

const Signupwithmail = () => {
  return (
    <div className="lg:w-[600px] w-full bg-black pb-[40px] ">
      <div className="lg:p-[80px] md:p-[50px] p-[20px] flex flex-col gap-[40px]">
        <div className="lg:hidden flex items-center justify-center gap-[10px] mt-[20px] ">
          <GiCardExchange className=" flex lg:text-[19px] md:text-[19px] text-[22px] text-tradeGreen" />
          <p className=" lg:text-[19px] md:text-[22px] text-[22px] font-[700] text-tradeGreen">
            Trade
            <small className="lg:text-[19px] md:text-[19px] text-[22px] font-[700] text-white">
              Jack
            </small>
          </p>
        </div>
        <div className="flex flex-col items-center gap-[5px]">
          <p className="text-[26px] text-white font-[700]">Sign Up Account</p>
          <p className="text-[14px] font-[500] text-tradeFadeWhite">
            Enter your personal data to create your account.
          </p>
        </div>

        <div className="flex flex-col gap-[40px]">
          <div className="flex flex-col gap-[25px]">
            <div className=" flex items-center w-full gap-[10px] justify-center hover:bg-tradeAshLight text-white border-[1px] border-tradeAshLight p-[12px] rounded-[10px] cursor-pointer transition-all duration-300">
              <img className="w-[18px]" src={google} alt="" />
              <p className="text-[15px] font-semibold ">Sign up with Google</p>
            </div>
            <div className="flex w-full items-center justify-between">
              <div className="border-t border-tradeAshLight w-full"></div>
              <div className="w-[100px] flex justify-center">
                <p className="text-tradeFadeWhite text-[13px]">Or</p>
              </div>
              <div className="border-t border-tradeAshLight w-full"></div>
            </div>
          </div>
          <div className="flex flex-col gap-[25px]">
            <div className="flex lg:flex-row flex-col w-full gap-[25px] ">
              <div className="w-full">
                <p className="text-[14px] font-[600] text-white">First Name</p>
                <input
                  className="mt-[5px] text-[14px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border border-tradeAshLight outline-none w-full p-[10px] rounded-[8px]"
                  type="text"
                  name="firstname"
                  placeholder="eg. John"
                  // onChange={handleNameChange}
                />
              </div>
              <div className="w-full">
                <p className="text-[14px] text-white font-[600]">Last Name</p>
                <input
                  className="mt-[5px] text-[14px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border border-tradeAshLight outline-none w-full p-[10px] rounded-[8px]"
                  type="text"
                  name="lastname"
                  placeholder="eg. Doe"
                  // onChange={handleUsernameChange}
                />
              </div>
            </div>
            <div className="w-full">
              <p className="text-[14px] text-white font-[600]">Email</p>
              <input
                className="mt-[5px] text-[14px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border border-tradeAshLight outline-none w-full p-[10px] rounded-[8px]"
                type="text"
                name="lastname"
                placeholder="eg. johndoe@gmail.com"
                // onChange={handleUsernameChange}
              />
            </div>
            <div className="w-full">
              <p className="text-[14px] text-white font-[600]">Username</p>
              <input
                className="mt-[5px] text-[14px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border border-tradeAshLight outline-none w-full p-[10px] rounded-[8px]"
                type="text"
                name="lastname"
                placeholder="e.g. johndoe"
                // onChange={handleUsernameChange}
              />
            </div>
            <div className="w-full">
              <p className="text-[14px] text-white font-[600]">Country</p>
              <input
                className="mt-[5px] text-[14px] placeholder:text-neutral-500 font-[500] bg-tradeAsh border border-tradeAshLight outline-none w-full p-[10px] rounded-[8px]"
                type="text"
                name="lastname"
                // onChange={handleUsernameChange}
              />
            </div>
            <div className="w-full">
              <p className="text-[14px] text-white font-[600]">Password</p>
              <input
                className="mt-[5px] text-[14px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border border-tradeAshLight outline-none w-full p-[10px] rounded-[8px]"
                type="text"
                name="lastname"
                placeholder="Enter your password"
                // onChange={handleUsernameChange}
              />
            </div>
          </div>
          <div className="flex flex-col items-center gap-[25px]">
            <div className="w-full bg-white p-[12px] rounded-[8px] flex justify-center">
              <p className="text-[14px] font-[800]">Sign Up</p>
            </div>
            <p className="text-tradeFadeWhite text-[14px] font-[500]">
              Already have an account?{" "}
              <small className="text-[14px] text-white font-[700]">
                Log in
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signupwithmail;
