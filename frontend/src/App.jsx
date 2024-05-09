import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import OpenApps from "./pages/OpenApps/OpenApps";
import ClosedApps from "./pages/ClosedApps/ClosedApps";
import AllApps from "./pages/AllApps/AllApps";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allapps" element={<AllApps />} />
          <Route path="/openapps" element={<OpenApps />} />
          <Route path="/closedapps" element={<ClosedApps />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
