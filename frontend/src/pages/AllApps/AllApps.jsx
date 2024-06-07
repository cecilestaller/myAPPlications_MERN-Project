import { useEffect, useState, useContext } from "react";
import { backendURL } from "../../api/api";
import "./AllApps.scss";
import Header from "../../components/Header/Header";
import AppCard from "../../components/AppCard/AppCard";
import { AllAppsContext } from "../../context/Context";

const AllApps = () => {
  const { allApps, setAllApps } = useContext(AllAppsContext);

  return (
    <section className="content-wrapper">
      <Header />
      <h2 className="page-headline">Alle Bewerbungen</h2>
      <div className="card-wrapper">
        <article className="app-cards-wrap">
          {allApps?.map((app) => (
            <AppCard key={app?._id} app={app} />
          ))}
        </article>
      </div>
    </section>
  );
};

export default AllApps;
