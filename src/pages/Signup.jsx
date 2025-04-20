import React, { useState } from "react";
import signupImg from "../assets/signupImg.webp";
import Signupwithmail from "@/components/Signup/Signupwithmail";

const Signup = () => {
  return (
    <div className="flex gap-[15px] bg-black ">
      <div className="flex-1 lg:flex hidden bg-tradeGreen overflow-hidden">
        <img className="object-cover" src={signupImg} alt="" />
      </div>
      <Signupwithmail />
    </div>
  );
};

export default Signup;
