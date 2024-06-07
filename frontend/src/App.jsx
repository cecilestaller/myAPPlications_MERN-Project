import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import OpenApps from "./pages/OpenApps/OpenApps";
import ClosedApps from "./pages/ClosedApps/ClosedApps";
import AllApps from "./pages/AllApps/AllApps";
import Detail from "./pages/Detail/Detail";
import { backendURL } from "./api/api";
import { AllAppsContext } from "./context/Context";
import AddApp from "./pages/AddApp/AddApp";

function App() {
  const [allApps, setAllApps] = useState([]);

  useEffect(() => {
    async function fetchAllApps() {
      try {
        const res = await fetch(`${backendURL}/api/v1/applications`);
        const { success, result, error, message } = await res.json();
        return setAllApps(result);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllApps();
  }, []);

  console.log(allApps);
  return (
    <AllAppsContext.Provider value={{ allApps, setAllApps }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allapps" element={<AllApps />} />
          <Route path="/openapps" element={<OpenApps />} />
          <Route path="/closedapps" element={<ClosedApps />} />
          <Route path="/addapp" element={<AddApp />} />
          <Route path="/details/:appId" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </AllAppsContext.Provider>
  );
}

export default App;
