import React, { useEffect, useState, createContext } from "react";
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

export const userContext = createContext();

const App = () => {
  const [user, setUser] = useState("");

  return (
    <>
      <ScrollToTop />
      <userContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/completed" element={<SignupSuccess />} />
          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/account/profile" element={<UserProfile />} />
          <Route
            path="/account/deposit&withdraw"
            element={<DepositAndWithdraw />}
          />
          <Route
            path="/account/profile/update-name"
            element={<ChangeName />}
          />

          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/create-offer" element={<CreateOffer />} />
          <Route path="/offer/:id" element={<AboutOffer />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/account/verify-password" element={<ConfirmPassword />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </userContext.Provider>
    </>
  );
};

export default App;
