import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import AboutOffer from "./pages/offer/user/AboutOffer";
import CreateOffer from "./pages/offer/user/CreateOffer";
import Messages from "./pages/Messages";
import Account from "./pages/settings/Account";
import SignupUser from "./pages/SignupUser";
import SignupSuccess from "./pages/SignupSuccess";
import SigninUser from "./pages/SigninUser";
import Logout from "./pages/Logout";
import EditFullname from "./pages/EditFullname";
import EditUsername from "./pages/EditUsername";
import EditEmail from "./pages/EditEmail";
import EditMobile from "./pages/EditMobile";
import EditAddress from "./pages/EditAddress";
import SelectElement from "./components/SelectElement";
import TradeAlert from "./components/TradeAlert";
import CreateOfferSummary from "./pages/offer/user/CreateOfferSummary";
import MyOffer from "./pages/offer/mine/MyOffer";
import EditMyOffer from "./pages/offer/mine/EditMyOffer";
import ToastSuccess from "./components/toastCards/ToastSuccess";
import ToastError from "./components/toastCards/ToastError";
import AboutMyOffer from "./pages/offer/mine/AboutMyOffer";
import SummaryMyOffer from "./pages/offer/mine/SummaryMyOffer";
import Wallet from "./pages/wallet/Wallet";
import Settings from "./pages/Settings";
import Transfer from "./pages/transfer/Transfer";
import Deposit from "./pages/deposit/Deposit";
import ConfirmTransfer from "./pages/transfer/ConfirmTransfer";
import SuccessTransfer from "./pages/transfer/SuccessTransfer";
import TransactionHistory from "./pages/wallet/TransactionHistory";
import TransactionDetails from "./pages/wallet/TransactionDetails";
import MyAccounts from "./pages/manageAccounts/MyAccounts";
import AddNewAccount from "./pages/manageAccounts/AddNewAccount";
import ProfileNav from "./components/ProfileNav";
import Withdraw from "./pages/withdraw/Withdraw";
import ConfirmWithdraw from "./pages/withdraw/ConfirmWithdraw";
import KycStatus from "./pages/kyc/KycStatus";
import KycVerification from "./pages/kyc/KycVerification";
import ConfirmDeposit from "./pages/deposit/ConfirmDeposit";
import SuccessDeposit from "./pages/deposit/SuccessDeposit";
import SuccessWithdraw from "./pages/withdraw/SuccessWithdraw";
import ConfirmAccount from "./pages/manageAccounts/ConfirmAccount";
import SuccessAccount from "./pages/manageAccounts/SuccessAccount";

const App = () => {
  return (
    <>
      <SelectElement />
      <ToastSuccess />
      <ToastError />
      <TradeAlert />
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
        <Route path="/settings/account/name" element={<EditFullname />} />
        <Route path="/settings/account/username" element={<EditUsername />} />
        <Route path="/settings/account/email" element={<EditEmail />} />
        <Route path="/settings/account/mobile" element={<EditMobile />} />

        {/* Wallet */}
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/wallet/transfer" element={<Transfer />} />
        <Route path="/wallet/deposit" element={<Deposit />} />
        <Route path="/wallet/withdraw" element={<Withdraw />} />
        <Route path="/wallet/transactions" element={<TransactionHistory />} />
        <Route path="/wallet/accounts" element={<MyAccounts />} />
        <Route path="/wallet/accounts/new" element={<AddNewAccount />} />

        {/* Marketplace & Offers */}
        <Route path="/offers/marketplace" element={<Marketplace />} />
        <Route path="/offers/create" element={<CreateOffer />} />
        <Route path="/offers/create/summary" element={<CreateOfferSummary />} />
        <Route path="/offers/myoffers" element={<MyOffer />} />
        <Route path="/offers/myoffers/:id" element={<AboutMyOffer />} />
        <Route path="/offers/myoffers/:id/edit" element={<EditMyOffer />} />
        <Route
          path="/offers/myoffers/:id/edit/summary"
          element={<SummaryMyOffer />}
        />

        <Route path="/offers/:id" element={<AboutOffer />} />

        {/* Messaging */}
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </>
  );
};

export default App;
