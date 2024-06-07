import { useState, useEffect } from "react";
import { backendURL } from "../../api/api";
import "./OpenApps.scss";
import AppCard from "../../components/AppCard/AppCard";
import Header from "../../components/Header/Header";
const OpenApps = () => {
  const [openApps, setOpenApps] = useState();
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
  console.log(openApps);
  return (
    <section className="content-wrapper">
      <Header />
      <h2 className="page-headline">Meine offenen Bewerbungen</h2>
      <div className="card-wrapper">
        <article className="app-cards-wrap">
          {openApps?.map((app) => (
            <AppCard key={app._id} app={app} />
          ))}
        </article>
      </div>
    </section>
  );
};

export default OpenApps;
