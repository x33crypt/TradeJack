import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import image from "../assets/landingImg4.JPG";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { PiHandDepositBold } from "react-icons/pi";
import { MdOutlineSecurity } from "react-icons/md";
import { TbAlignBoxRightTop } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import { MdLogin } from "react-icons/md";
import InAppNav from "@/components/InAppNav";
import Footer from "@/components/Footer";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { PiHorseBold } from "react-icons/pi";
import { MdThumbUpAlt } from "react-icons/md";
import { MdThumbDownAlt } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";

const Account = () => {
  const navigateTo = useNavigate();
  const location = useLocation();

  // Function to navigate
  const handleIsYourInfo = () => {
    navigateTo("/account/profile");
  };

  const handleIsDeposit = () => {
    navigateTo("/account/deposit&withdraw");
  };

  const handleIsSecurity = () => {
    navigateTo("/account/security&privacy");
  };

  const handleIsSubscription = () => {
    navigateTo("/account/subscription");
  };

  const handleIsHelp = () => {
    navigateTo("/account/help");
  };

  const handleIsLogout = () => {
    navigateTo("/account/logout");
  };

  // Listen for route changes and update the active page
  useEffect(() => {
    if (location.pathname === "/account/profile") {
      setActivePage({
        yourInfo: true,
        deposit: false,
        security: false,
        subscription: false,
        help: false,
        logout: false,
      });
    }
  }, [location.pathname]); // Runs every time the URL changes

  useEffect(() => {
    if (location.pathname === "/account/deposit&withdraw") {
      setActivePage({
        yourInfo: false,
        deposit: true,
        security: false,
        subscription: false,
        help: false,
        logout: false,
      });
    }
  }, [location.pathname]); // Runs every time the URL changes

  useEffect(() => {
    if (location.pathname === "/account/security&privacy") {
      setActivePage({
        yourInfo: false,
        deposit: false,
        security: true,
        subscription: false,
        help: false,
        logout: false,
      });
    }
  }, [location.pathname]); // Runs every time the URL changes

  useEffect(() => {
    if (location.pathname === "/account/subscription") {
      setActivePage({
        yourInfo: false,
        deposit: false,
        security: false,
        subscription: true,
        help: false,
        logout: false,
      });
    }
  }, [location.pathname]); // Runs every time the URL changes

  useEffect(() => {
    if (location.pathname === "/account/help") {
      setActivePage({
        yourInfo: false,
        deposit: false,
        security: false,
        subscription: false,
        help: true,
        logout: false,
      });
    }
  }, [location.pathname]); // Runs every time the URL changes

  useEffect(() => {
    if (location.pathname === "/account/logout") {
      setActivePage({
        yourInfo: false,
        deposit: false,
        security: false,
        subscription: false,
        help: false,
        logout: true,
      });
    }
  }, [location.pathname]); // Runs every time the URL changes

  return (
    <>
      <InAppNav />
    </>
  );
};

export default Account;
