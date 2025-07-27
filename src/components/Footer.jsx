import React from "react";

const Footer = ({ show }) => {
  const currentYear = new Date().getFullYear();

  return (
    <div className={`bg-black md:flex flex-1 pt-[5px]`}>
      <div className="flex-1 bg-black lg:p-[2%] md:p-[2.5%] p-[15px] flex lg:flex-row flex-col justify-between gap-[25px] border-t  border-tradeAshLight">
        {/* <div className="flex flex-col">
          <p className="text-white text-base font-semibold">
            Every transaction builds your trust score.
          </p>
          <p className="text-tradeFadeWhite text-base font-semibold">
            Keep trading to unlock lower fees!
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Footer;
