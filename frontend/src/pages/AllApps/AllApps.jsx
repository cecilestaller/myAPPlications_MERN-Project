import { useEffect, useState } from "react";
import { backendURL } from "../../api/api";
import "./AllApps.scss";
import Header from "../../components/Header/Header";
import AppCard from "../../components/AppCard/AppCard";

const AllApps = () => {
  const [allApps, setAllApps] = useState();

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
  return (
    <section className="all-apps">
      <Header />
      <article className="app-cards-wrap">
        {allApps?.map((app) => (
          <AppCard key={app?._id} app={app} />
        ))}
      </article>
    </section>
  );
};

export default AllApps;
