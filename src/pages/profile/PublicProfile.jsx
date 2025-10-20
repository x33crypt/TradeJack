import React from "react";
import { useNavigate } from "react-router-dom";
import PartnersMenu from "@/components/partners/PartnersMenu";
import InAppNav from "@/components/others/InAppNav";
import Footer from "@/components/others/Footer";
import image from "../../assets/landingImg4.JPG";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import NetworkError from "@/components/others/NetworkError";
import Loading from "@/components/others/Loading";
import ProfileMenu from "@/components/profile/public/ProfileMenu";
import Hero from "@/components/account/Hero";
import Stats from "@/components/account/Stats";
import Feedbacks from "@/components/account/Feedbacks";

const PublicProfile = ({ Heading, profile, loading }) => {
  return (
    <>
      <InAppNav />
      <div className="md:pt-[70px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex bg-black">
        <div className="flex flex-col flex-1">
          {false ? (
            <Loading />
          ) : (
            <div className="flex flex-1">
              {false ? (
                <NetworkError />
              ) : (
                <div className="flex flex-1 lg:flex-row flex-col gap-[25px]">
                  <ProfileMenu />
                  <div className="flex flex-1 flex-col gap-[40px] lg:mr-[12%] p-[15px]">
                    <Hero
                      profile={profile}
                      loading={loading}
                      Heading={Heading}
                    />
                    <Stats profile={profile} loading={loading} />
                    <Feedbacks />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PublicProfile;
