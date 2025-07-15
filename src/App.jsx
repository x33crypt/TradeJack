import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import AboutOffer from "./pages/offer/user/AboutOffer";
import CreateOffer from "./pages/offer/user/CreateOffer";
import Messages from "./pages/Messages";
import UserProfile from "./pages/UserProfile";
import SignupUser from "./pages/SignupUser";
import SignupSuccess from "./pages/SignupSuccess";
import SigninUser from "./pages/SigninUser";
import Logout from "./pages/Logout";
import ConfirmPassword from "./components/ConfirmPassword";
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
import Kyc from "./pages/kyc/Kyc";
import KycVerifyStep1 from "./pages/kyc/KycVerifyStep1";
import KycVerifyStep2 from "./pages/kyc/KycVerifyStep2";
import KycVerifyStep3 from "./pages/kyc/KycVerifyStep3";
import AboutMyOffer from "./pages/offer/mine/AboutMyOffer";
import SummaryMyOffer from "./pages/offer/mine/SummaryMyOffer";
import Wallet from "./pages/wallet/Wallet";
import Settings from "./pages/Settings";
import Account from "./components/settings/Account";
import Transfer from "./pages/wallet/Transfer";
import Deposit from "./pages/wallet/Deposit";
import ConfirmTransfer from "./components/modals/wallet/ConfirmTransfer";
import SuccessTransfer from "./components/modals/wallet/SuccessTransfer";
import PendingDeposit from "./components/modals/wallet/PendingDeposit";
import { useDepositContext } from "./context/wallet/DepositContext";
import TransactionHistory from "./pages/wallet/TransactionHistory";
import TransactionDetails from "./pages/wallet/TransactionDetails";
import LinkAccount from "./pages/wallet/LinkAccount";
import LinkedAccounts from "./pages/LinkedAccounts";

const App = () => {
  const { deposit, setDeposit } = useDepositContext();

  return (
    <>
      <SelectElement />
      <ToastSuccess />
      <ToastError />
      <TradeAlert />
      <ConfirmTransfer />
      <SuccessTransfer />
      <PendingDeposit />
      <TransactionDetails />
      <LinkAccount />
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
        <Route path="/account/profile" element={<UserProfile />} />
        <Route path="/account/kycStatus" element={<Kyc />} />
        <Route path="/account/address" element={<EditAddress />} />
        <Route path="/account/linkedAccounts" element={<LinkedAccounts />} />

        {/* Account Settings */}
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/account" element={<Account />} />
        <Route path="/settings/account/name" element={<EditFullname />} />
        <Route path="/settings/account/username" element={<EditUsername />} />
        <Route path="/settings/account/email" element={<EditEmail />} />
        <Route path="/settings/account/mobile" element={<EditMobile />} />
        <Route
          path="/settings/account/kycVerify/1"
          element={<KycVerifyStep1 />}
        />
        <Route
          path="/settings/account/kycVerify/2"
          element={<KycVerifyStep2 />}
        />
        <Route
          path="/settings/account/kycVerify/3"
          element={<KycVerifyStep3 />}
        />
        {/* Wallet */}
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/wallet/transfer" element={<Transfer />} />
        <Route path="/wallet/deposit" element={<Deposit />} />
        <Route path="/wallet/transactions" element={<TransactionHistory />} />

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
