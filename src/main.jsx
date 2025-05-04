import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { TradeAlertProvider } from "./context/TradeAlertContext";
import { SelectElementProvider } from "./context/SelectElementContext";
import SelectElement from "./components/SelectElement";
import TradeAlert from "./components/TradeAlert";

// Render MainApp into #root
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter>
      <SelectElementProvider>
        <TradeAlertProvider>
          <App />
        </TradeAlertProvider>
      </SelectElementProvider>
    </BrowserRouter>
  </StrictMode>
);

// // Render PromoContent into #rootTwo
// const rootTwo = ReactDOM.createRoot(document.getElementById("rootTwo"));
// rootTwo.render(
//   <React.StrictMode>
//     <TradeAlertProvider>
//       <TradeAlert />
//     </TradeAlertProvider>
//   </React.StrictMode>
// );

// // Render PromoContent into #rootThree
// const rootThree = ReactDOM.createRoot(document.getElementById("rootThree"));
// rootThree.render(
//   <React.StrictMode>
//     <SelectElementProvider>
//       <SelectElement />
//     </SelectElementProvider>
//   </React.StrictMode>
// );
