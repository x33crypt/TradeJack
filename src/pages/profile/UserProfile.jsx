import React from "react";
import { useNavigate } from "react-router-dom";
import InAppNav from "@/components/others/InAppNav";
import Footer from "@/components/others/Footer";
import NetworkError from "@/components/others/NetworkError";
import Loading from "@/components/others/Loading";
import ProfileMenu from "@/components/profile/user/ProfileMenu";
import Hero from "@/components/profile/user/Hero";
import Stats from "@/components/profile/Stats";
import Feedbacks from "@/components/profile/Feedbacks";
import Info from "@/components/profile/user/Info";

const UserProfile = ({ Heading, profile, loading }) => {
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

                    <Info profile={profile} loading={loading} />
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

export default UserProfile;
