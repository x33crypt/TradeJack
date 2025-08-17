import React from "react";
import { Routes, Route } from "react-router-dom";
import Marketplace from "./pages/offer/public/Offers";
import CreateOffer from "./pages/offer/user/CreateOffer";
import Account from "./pages/settings/Account";
import EditAddress from "./pages/settings/EditAddress";
import CreateOfferSummary from "./pages/offer/user/CreateSummary";
import MyOffer from "./pages/offer/user/Offers";
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
import MyAccounts from "./pages/manageAccounts/MyAccounts";
import AddNewAccount from "./pages/manageAccounts/AddNewAccount";
import ProfileNav from "./components/others/ProfileNav";
import Withdraw from "./pages/withdraw/Withdraw";
import ConfirmWithdraw from "./pages/withdraw/ConfirmWithdraw";
import KycStatus from "./pages/kyc/KycStatus";
import KycVerification from "./pages/kyc/KycVerification";
import ConfirmDeposit from "./pages/deposit/ConfirmDeposit";
import SuccessDeposit from "./pages/deposit/SuccessDeposit";
import SuccessWithdraw from "./pages/withdraw/SuccessWithdraw";
import ConfirmAccount from "./pages/manageAccounts/ConfirmAccount";
import SuccessAccount from "./pages/manageAccounts/SuccessAccount";
import Settings from "./pages/settings/Settings";
import AboutPublicOffer from "./pages/offer/public/AboutPublicOffer";
import AboutUserOffer from "./pages/offer/user/AboutUserOffer";
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
import PartnersProfile from "./pages/partners/PartnersProfile";

const App = () => {
  return (
    <>
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
        <Route path="/account" element={<Account />} />
        <Route path="/account/address" element={<EditAddress />} />
        <Route path="/account/kyc/status" element={<KycStatus />} />
        <Route path="/account/kyc/verification" element={<KycVerification />} />

        {/* Account Settings */}
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/account/name" element={<EditFullname />} />
        <Route path="/settings/account/username" element={<EditUsername />} />
        <Route path="/settings/account/email" element={<EditEmail />} />
        <Route path="/settings/account/mobile" element={<EditMobile />} />
        {/* <Route path="/settings/password" element={< />} /> */}

        {/* Wallet */}
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/wallet/transfer" element={<Transfer />} />
        <Route path="/wallet/deposit" element={<Deposit />} />
        <Route path="/wallet/withdraw" element={<Withdraw />} />
        <Route path="/wallet/transactions" element={<TransactionHistory />} />
        <Route path="/wallet/accounts" element={<MyAccounts />} />
        <Route path="/wallet/accounts/new" element={<AddNewAccount />} />

        {/* Marketplace & Offers */}
        <Route path="/offers/explore" element={<Marketplace />} />
        <Route path="/offers/explore/:id" element={<AboutPublicOffer />} />
        <Route path="/offers/user" element={<MyOffer />} />
        <Route path="/offers/user/:id" element={<AboutUserOffer />} />
        <Route path="/offers/user/create" element={<CreateOffer />} />
        <Route path="/offers/user/summary" element={<CreateOfferSummary />} />
        <Route path="/offers/user/:id/edit" element={<EditMyOffer />} />
        <Route path="/offers/user/:id/summary" element={<SummaryMyOffer />} />

        {/* Trade  */}
        <Route path="/partners" element={<Partners />} />
        <Route path="/partners/:username" element={<PartnersProfile />} />
      </Routes>
    </>
  );
};

export default App;
