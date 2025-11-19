import React from "react";
import { Routes, Route } from "react-router-dom";
import Marketplace from "./pages/offer/public/PublicOffers";
import CreateOffer from "./pages/offer/user/CreateOffer";
import MyOffer from "./pages/offer/user/UserOffers";
import EditOffer from "./pages/offer/user/EditOffer";
import ToastSuccess from "./components/toastCards/ToastSuccess";
import ToastError from "./components/toastCards/ToastError";
import Wallet from "./pages/wallet/Wallet";
import Transfer from "./pages/wallet/Transfer";
import Deposit from "./pages/wallet/Deposit";
import ConfirmTransfer from "./pages/wallet/ConfirmTransfer";
import SuccessTransfer from "./pages/wallet/SuccessTransfer";
import TransactionHistory from "./pages/wallet/TransactionHistory";
import TransactionDetails from "./pages/wallet/TransactionDetails";
import ProfileNav from "./components/others/ProfileNav";
import Withdraw from "./pages/wallet/Withdraw";
import ConfirmWithdraw from "./pages/wallet/ConfirmWithdraw";
import ConfirmDeposit from "./pages/wallet/ConfirmDeposit";
import SuccessDeposit from "./pages/wallet/SuccessDeposit";
import SuccessWithdraw from "./pages/wallet/SuccessWithdraw";
import Settings from "./pages/settings/Settings";
import AboutPublicOffer from "./pages/offer/public/AboutOffer";
import AboutOffer from "./pages/offer/user/AboutOffer";
import Logout from "./pages/auth/Logout";
import SigninUser from "./pages/auth/SigninUser";
import SignupUser from "./pages/auth/SignupUser";
import SelectElement from "./components/others/SelectElement";
import Landing from "./pages/landing/Landing";
import Dashboard from "./pages/dashboard/Dashboard";
import SignupSuccess from "./pages/auth/SignupSuccess";
import Partners from "./pages/partners/Partners";
import ConfirmPassword from "./pages/auth/ConfirmPassword";
import SensitiveRoute from "./utils/sensitiveRoutes";
import PreTradeCheck from "./pages/offer/public/PreTradeCheck";
import PublicProfile from "./pages/profile/PublicProfile";
import UserProfile from "./pages/profile/UserProfile";
import Accounts from "./pages/accounts/Accounts";
import NewAccount from "./pages/accounts/NewAccount";
import KycLevels from "./pages/kyc/KycLevels";
import VerifyLevelOne from "./pages/kyc/VerifyLevelOne";
import VerifyLevelTwo from "./pages/kyc/VerifyLevelTwo";
import VerifyLevelThree from "./pages/kyc/VerifyLevelThree";
import UpdatePassword from "./pages/settings/UpdatePassword";
import TwoFactorAuth from "./pages/settings/TwoFactorAuth";
import VerifyUser from "./pages/settings/VerifyUser";
import UpdatePin from "./pages/settings/UpdatePin";
import Notification from "./pages/settings/Notification";
import Sessions from "./pages/settings/Sessions";
import FAQS from "./pages/settings/FAQS";
import RateUs from "./pages/settings/RateUs";
import UpdateUsername from "./pages/settings/UpdateUsername";
import UpdateEmail from "./pages/settings/UpdateEmail";
import UpdatePhone from "./pages/settings/UpdatePhone";
import UpdateAddress from "./pages/settings/UpdateAddress";
import PreTrade from "./pages/trade/PreTrade";
import Notifications from "./pages/Notifications";

const App = () => {
  return (
    <>
      <PreTradeCheck />
      <Logout />
      <ConfirmPassword />
      <SelectElement />
      <ToastSuccess />
      <ToastError />
      <TransactionDetails />
      <ProfileNav />
      <ConfirmTransfer />
      <SuccessTransfer />
      <ConfirmDeposit />
      <SuccessDeposit />
      <ConfirmWithdraw />
      <SuccessWithdraw />
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignupUser />} />
        <Route path="/signup/success" element={<SignupSuccess />} />
        <Route path="/signin" element={<SigninUser />} />
        <Route path="/logout" element={<Logout />} />

        {/* Profile */}
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/:username" element={<PublicProfile />} />
        <Route path="/profile/username" element={<UpdateUsername />} />
        <Route path="/profile/email" element={<UpdateEmail />} />
        <Route path="/profile/phone" element={<UpdatePhone />} />
        <Route path="/profile/address" element={<UpdateAddress />} />

        {/* Kyc */}
        <Route path="/kyc/levels" element={<KycLevels />} />
        <Route path="/kyc/tier/1" element={<VerifyLevelOne />} />
        <Route path="/kyc/tier/2" element={<VerifyLevelTwo />} />
        <Route path="/kyc/tier/3" element={<VerifyLevelThree />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/notification" element={<Notifications />} />

        {/* Settings */}
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/accounts" element={<Accounts />} />
        <Route path="/settings/accounts/new" element={<NewAccount />} />

        {/* <Route element={<VerifyUser />}> </Route> */}

        <Route path="/settings/password" element={<UpdatePassword />} />
        <Route path="/settings/2FA" element={<TwoFactorAuth />} />
        <Route path="/settings/pin" element={<UpdatePin />} />
        <Route path="/settings/notification" element={<Notification />} />
        <Route path="/settings/sessions" element={<Sessions />} />
        <Route path="/settings/faq" element={<FAQS />} />
        <Route path="/settings/feedback" element={<RateUs />} />

        {/* Wallet */}
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/wallet/transfer" element={<Transfer />} />
        <Route path="/wallet/deposit" element={<Deposit />} />
        <Route path="/wallet/withdraw" element={<Withdraw />} />
        <Route path="/wallet/transactions" element={<TransactionHistory />} />

        {/* Offers */}
        <Route path="/offers/explore" element={<Marketplace />} />
        <Route path="/offer/explore/:id" element={<AboutPublicOffer />} />
        <Route path="/offer/create" element={<CreateOffer />} />
        <Route path="/offers" element={<MyOffer />} />
        <Route path="/offer/:id" element={<AboutOffer />} />
        <Route path="/offer/:id/edit" element={<EditOffer />} />

        {/* Trade */}
        <Route path="/pre-trade/sessions" element={<PreTrade />} />
        <Route
          path="/pre-trade/session/:id/:amount/:currency"
          element={<PreTrade />}
        />
        <Route path="/trade/session/:tradeId" element={<CreateOffer />} />
      </Routes>
    </>
  );
};

export default App;
