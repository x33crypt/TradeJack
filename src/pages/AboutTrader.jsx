import About from "@/components/aboutTrader/About";
import Footer from "@/components/others/Footer";
import InAppNav from "@/components/others/InAppNav";
import React from "react";

const AboutTrader = () => {
  return (
    <>
      <InAppNav />
      <div className="md:pt-[64px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex gap-[5px] bg-black">
        <About />
      </div>
      <Footer />
    </>
  );
};

export default AboutTrader;
