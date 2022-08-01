import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Report from "./pages/Report";
import Sidebar from "./components/Sidebar";
import { RecoilRoot } from "recoil";
import Checkup from "./pages/Checkup";
import PositiveFeedback from "./pages/PositiveFeedback";
import CheckupDetail from "./pages/CheckupDetail";
import CheckupReport from "./pages/CheckupReport";
import CheckupCollectors from "./pages/CheckupCollectors";
import { Reset } from "styled-reset";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <RecoilRoot>
      <Reset />
      <Sidebar />
      <Routes>
        <Route path="/" element={<PositiveFeedback />} />
        <Route path="/positive" element={<PositiveFeedback />} />
        <Route path="/positive/report" element={<Report />} />
        <Route path="/checkup" element={<Checkup />} />
        <Route path="/checkup/:projectId" element={<CheckupCollectors />} />
        <Route
          path="/checkup/:projectId/:collectorId"
          element={<CheckupDetail />}
        />
        <Route
          path="/checkup/:projectId/:collectorId/report"
          element={<CheckupReport />}
        />
      </Routes>
    </RecoilRoot>
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
