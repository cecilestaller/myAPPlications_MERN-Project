import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import "./ClosedApps.scss";
import { backendURL } from "../../api/api";
import AppCard from "../../components/AppCard/AppCard";

const ClosedApps = () => {
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
  console.log(closedApps);
  return (
    <section className="closed-apps">
      <Header />
      <h2>Meine geschlossenen Bewerbungen</h2>
      <article className="app-cards-wrap">
        {closedApps?.map((app) => (
          <AppCard key={app?._id} app={app} />
        ))}
      </article>
    </section>
  );
};

export default ClosedApps;
