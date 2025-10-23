import React from "react";
import { Routes, Route } from "react-router-dom";
import Marketplace from "./pages/offer/public/PublicOffers";
import CreateOffer from "./pages/offer/user/CreateOffer";
import EditAddress from "./pages/settings/EditAddress";
import CreateOfferSummary from "./pages/offer/user/CreateSummary";
import MyOffer from "./pages/offer/user/UserOffers";
import EditMyOffer from "./pages/offer/user/EditOffer";
import ToastSuccess from "./components/toastCards/ToastSuccess";
import ToastError from "./components/toastCards/ToastError";
import SummaryMyOffer from "./pages/offer/user/EditSummary";
import Wallet from "./pages/wallet/Wallet";
import Transfer from "./pages/transfer/Transfer";
import Deposit from "./pages/deposit/Deposit";
import ConfirmTransfer from "./pages/transfer/ConfirmTransfer";
import SuccessTransfer from "./pages/transfer/SuccessTransfer";
import TransactionHistory from "./pages/wallet/TransactionHistory";
import TransactionDetails from "./pages/wallet/TransactionDetails";
import ProfileNav from "./components/others/ProfileNav";
import Withdraw from "./pages/withdraw/Withdraw";
import ConfirmWithdraw from "./pages/withdraw/ConfirmWithdraw";
import KycStatus from "./pages/kyc/KycStatus";
import KycVerification from "./pages/kyc/KycVerification";
import ConfirmDeposit from "./pages/deposit/ConfirmDeposit";
import SuccessDeposit from "./pages/deposit/SuccessDeposit";
import SuccessWithdraw from "./pages/withdraw/SuccessWithdraw";

import Settings from "./pages/settings/Settings";
import AboutPublicOffer from "./pages/offer/public/AboutOffer";
import AboutUserOffer from "./pages/offer/user/AboutOffer";
import Logout from "./pages/auth/Logout";
import EditMobile from "./pages/settings/EditMobile";
import EditEmail from "./pages/settings/EditEmail";
import EditUsername from "./pages/settings/EditUsername";
import EditFullname from "./pages/settings/EditFullname";
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
import Accounts from "./pages/account/Accounts";
import NewAccount from "./pages/account/NewAccount";
import ConfirmAccount from "./pages/account/ConfirmAccount";
import SuccessAccount from "./pages/account/SuccessAccount";

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
      <ConfirmAccount />
      <SuccessAccount />
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

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* User Account */}
        <Route path="/account" element={<UserProfile />} />
        <Route path="/account/address" element={<EditAddress />} />
        <Route path="/account/kyc/status" element={<KycStatus />} />
        <Route path="/account/kyc/verification" element={<KycVerification />} />

        {/* Account Settings */}
        <Route path="/settings" element={<Settings />} />
        <Route element={<SensitiveRoute />}>
          <Route path="/settings/name" element={<EditFullname />} />
          <Route path="/settings/username" element={<EditUsername />} />
          <Route path="/settings/email" element={<EditEmail />} />
          <Route path="/settings/mobile" element={<EditMobile />} />
          <Route path="/settings/accounts" element={<Accounts />} />
          <Route path="/settings/accounts/new" element={<NewAccount />} />
        </Route>

        {/* Wallet */}
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/wallet/transfer" element={<Transfer />} />
        <Route path="/wallet/deposit" element={<Deposit />} />
        <Route path="/wallet/withdraw" element={<Withdraw />} />
        <Route path="/wallet/transactions" element={<TransactionHistory />} />

        {/* Marketplace & Offers */}
        <Route path="/offers/explore" element={<Marketplace />} />
        <Route path="/offers/explore/:id" element={<AboutPublicOffer />} />
        <Route path="/offers" element={<MyOffer />} />
        <Route path="/offer/:id" element={<AboutUserOffer />} />
        <Route path="/offer/create" element={<CreateOffer />} />
        <Route path="/offer/create/preview" element={<CreateOfferSummary />} />
        <Route path="/offer/:id/edit" element={<EditMyOffer />} />
        <Route path="/offers/:id/edit/preview" element={<SummaryMyOffer />} />

        {/* partners  */}
        <Route path="/partners" element={<Partners />} />

        {/* users  */}
        <Route path="/profile/:username" element={<PublicProfile />} />
      </Routes>
    </>
  );
};

export default App;
