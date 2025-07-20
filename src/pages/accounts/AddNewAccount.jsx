import Footer from "@/components/Footer";
import InAppNav from "@/components/InAppNav";
import AddNew from "@/components/myAccounts/AddNew";
import React from "react";

const AddNewAccount = () => {
  return (
    <>
      <InAppNav />
      <div className="md:pt-[64px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex gap-[5px] bg-black ">
        <AddNew />
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default AddNewAccount;
