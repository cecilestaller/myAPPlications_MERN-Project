import { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header.jsx";
import "./Home.scss";
import AddIcon from "@mui/icons-material/Add";
import { backendURL } from "../../api/api.js";
import { Link } from "react-router-dom";
import { AllAppsContext } from "../../context/Context.jsx";

const Home = () => {
  const { allApps, setAllApps } = useContext(AllAppsContext);
  const [openApps, setOpenApps] = useState();
  const [closedApps, setClosedApps] = useState();

  useEffect(() => {
    async function fetchClosedApps() {
      try {
        const res = await fetch(
          `${backendURL}/api/v1/applications/closedApplications`
        );
        const { success, result, error, message } = await res.json();
        return setClosedApps(result);
      } catch (error) {}
    }
    fetchClosedApps();
  }, []);

  useEffect(() => {
    async function fetchOpenApps() {
      try {
        const res = await fetch(
          `${backendURL}/api/v1/applications/openApplications`
        );
        const { success, result, error, message } = await res.json();
        return setOpenApps(result);
      } catch (error) {
        console.log(error);
      }
    }
    fetchOpenApps();
  }, []);

  console.log(allApps);

  return (
    <section className="content-wrapper">
      <Header />
      <main>
        <section className="overview">
          <Link to="/openapps">
            <div className="overview-box">
              <h2>Offene Bewerbungen</h2>
              <p>{openApps?.length}</p>
            </div>
          </Link>
          <Link to="/closedapps">
            <div className="overview-box">
              <h2>Abgeschlossene Bewerbungen</h2>
              <p>{closedApps?.length}</p>
            </div>
          </Link>
          <Link to="/allapps">
            <div className="overview-box">
              <h2>Alle Bewerbungen</h2>
              <p>{allApps?.length}</p>
            </div>
          </Link>
          <Link to="/addapp">
            <div className="overview-box">
              <h2>Bewerbung hinzufügen</h2>
              <AddIcon />
            </div>
          </Link>
        </section>
      </main>
    </section>
  );
};

export default Home;
