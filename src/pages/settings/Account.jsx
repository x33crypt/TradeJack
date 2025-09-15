import Footer from "@/components/others/Footer";
import MarketTopNav from "@/components/others/InAppNav";
import React from "react";
import PersonalInfo from "@/components/account/Profile";
import HeroEdit from "@/components/account/HeroEdit";
import { useProfile } from "@/context/userContext/ProfileContext";
import { useFetchProfile } from "@/hooks/userHooks/useFetchProfile";
import Stats from "@/components/account/Stats";
import Feedbacks from "@/components/account/Feedbacks";
import { useFetchFeedbacks } from "@/hooks/userHooks/useFetchFeedbacks";
import { useUserFeedback } from "@/context/userContext/FeedbackContext";

const Account = () => {
  const { loading } = useFetchProfile();
  const {
    loadingInitial,
    loadingMore,
    pagination,
    displayedCount,
    nextPage,
  } = useFetchFeedbacks();
  const { profile } = useProfile();
  const { feedback } = useUserFeedback();

  console.log("User Profile", profile);
  console.log("User Feedbacks", feedback);

  const account = profile?.account;
  const personalInfo = profile?.profileInformation;
  const activityStats = profile?.activityStats;
  const myFeedbacks = null;

  console.log(account);

  return (
    <>
      <MarketTopNav />
      <div className=" md:pt-[64px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex gap-[5px] bg-black ">
        <div className="flex-1 flex flex-col gap-[5px]">
          <HeroEdit account={account} loading={loading} />
          <div className="md:hidden flex">
            <PersonalInfo personalInfo={personalInfo} loading={loading} />
          </div>
          <Stats activityStats={activityStats} loading={loading} />
          <Feedbacks
            feedback={myFeedbacks}
            loading={loadingInitial}
            loadingMore={loadingMore}
            pagination={pagination}
            displayedCount={displayedCount}
            nextPage={nextPage}
          />
        </div>
        <div className="md:flex hidden md:w-[320px]">
          <PersonalInfo personalInfo={personalInfo} loading={loading} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Account;
