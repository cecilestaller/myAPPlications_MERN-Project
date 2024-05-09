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
    <section className="open-apps">
      <Header />
      <h2>Meine offenen Bewerbungen</h2>
      <article className="app-cards-wrap">
        {openApps?.map((app) => (
          <AppCard key={app._id} app={app} />
        ))}
      </article>
    </section>
  );
};

export default OpenApps;
