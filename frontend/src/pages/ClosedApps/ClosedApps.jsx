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
      } catch (error) {
        console.log(error);
      }
    }
    fetchClosedApps();
  }, []);
  console.log(closedApps);
  return (
    <section className="content-wrapper">
      <Header />
      <h2 className="page-headline">Meine geschlossenen Bewerbungen</h2>
      <div className="card-wrapper">
        <article className="app-cards-wrap">
          {closedApps?.map((app) => (
            <AppCard key={app?._id} app={app} />
          ))}
        </article>
      </div>
    </section>
  );
};

export default ClosedApps;
