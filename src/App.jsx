import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import AboutOffer from "./pages/AboutOffer";
import CreateOffer from "./pages/CreateOffer";
import Messages from "./pages/Messages";
import UserProfile from "./pages/UserProfile";
import DepositAndWithdraw from "./pages/DepositAndWithdraw";
import SignupUser from "./pages/SignupUser";
import SignupSuccess from "./pages/SignupSuccess";
import SigninUser from "./pages/SigninUser";
import Logout from "./pages/Logout";
import ConfirmPassword from "./components/ConfirmPassword";
import EditFullname from "./pages/EditFullname";
import { AuthProvider } from "./context/AuthContext";
import EditUsername from "./pages/EditUsername";
import EditEmail from "./pages/EditEmail";
import EditMobile from "./pages/EditMobile";
import ChangeAdress from "./pages/ChangeAdress";
import SelectElement from "./components/SelectElement";
import TradeAlert from "./components/TradeAlert";
import CreateOfferSummary from "./pages/CreateOfferSummary";
import MyOffer from "./pages/MyOffer";
import EditOffer from "./pages/EditOffer";
import EditOfferSummary from "./pages/EditOfferSummary";
import ToastSuccess from "./components/toastCards/ToastSuccess";
import ToastError from "./components/toastCards/ToastError";
import { useScrollRestoration } from "./utils/scroll/restoration";

const App = () => {
  useScrollRestoration();

  return (
    <>
      <AuthProvider>
        <SelectElement />
        <ToastSuccess />
        <ToastError />
        <TradeAlert />
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
          <Route path="/account/funds" element={<DepositAndWithdraw />} />
          <Route
            path="/account/security/verify"
            element={<ConfirmPassword />}
          />

          {/* Account Settings */}
          <Route path="/account/settings/name" element={<EditFullname />} />
          <Route path="/account/settings/username" element={<EditUsername />} />
          <Route path="/account/settings/email" element={<EditEmail />} />
          <Route path="/account/settings/mobile" element={<EditMobile />} />
          <Route path="/account/settings/address" element={<ChangeAdress />} />

          {/* Marketplace & Offers */}
          <Route path="/offers/marketplace" element={<Marketplace />} />
          <Route path="/offers/create" element={<CreateOffer />} />
          <Route
            path="/offers/create/summary"
            element={<CreateOfferSummary />}
          />
          <Route path="/offers/mine" element={<MyOffer />} />
          <Route path="/offers/:id" element={<AboutOffer />} />
          <Route path="/offers/:id/edit" element={<EditOffer />} />
          <Route
            path="/offers/:id/edit/summary"
            element={<EditOfferSummary />}
          />

          {/* Messaging */}
          <Route path="/messages" element={<Messages />} />
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
