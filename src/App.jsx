import React, { useEffect, useState, useContext, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import AboutOffer from "./pages/AboutOffer";
import ScrollToTop from "./components/ScrollToTop";
import CreateOffer from "./pages/CreateOffer";
import Messages from "./pages/Messages";
import UserProfile from "./pages/UserProfile";
import DepositAndWithdraw from "./pages/DepositAndWithdraw";
import Signup from "./pages/Signup";
import SignupSuccess from "./pages/SignupSuccess";
import Login from "./pages/Login";
import RouteProtector from "./components/RouteProtector";
import Logout from "./pages/Logout";
import ConfirmPassword from "./components/ConfirmPassword";
import ChangeName from "./pages/ChangeName";
import { AuthProvider } from "./context/AuthContext";
import ChangeUsername from "./pages/ChangeUsername";
import ChangeEmail from "./pages/ChangeEmail";
import ChangePhone from "./pages/ChangePhone";
import ChangeAdress from "./pages/ChangeAdress";
export const userContext = createContext();
import SelectElement from "./components/SelectElement";
import TradeAlert from "./components/TradeAlert";
import CreateOfferSummary from "./pages/CreateOfferSummary";
import MyOffer from "./pages/MyOffer";
import EditOffer from "./pages/EditOffer";
import EditOfferSummary from "./pages/EditOfferSummary";
import ToastSuccess from "./components/toastCards/toastSuccess";

const App = () => {
  const [user, setUser] = useState("");

  return (
    <>
      <ScrollToTop />
      <AuthProvider>
        <userContext.Provider value={{ user, setUser }}>
          <SelectElement />
          <ToastSuccess />
          <TradeAlert />
          <Routes>
            {/* Public */}
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signup/success" element={<SignupSuccess />} />
            <Route path="/login" element={<Login />} />
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
            <Route path="/account/settings/name" element={<ChangeName />} />
            <Route
              path="/account/settings/username"
              element={<ChangeUsername />}
            />
            <Route path="/account/settings/email" element={<ChangeEmail />} />
            <Route path="/account/settings/phone" element={<ChangePhone />} />
            <Route
              path="/account/settings/address"
              element={<ChangeAdress />}
            />

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
        </userContext.Provider>
      </AuthProvider>
    </>
  );
};

export default App;
