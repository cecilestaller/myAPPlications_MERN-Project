import Rating from "@mui/material/Rating";
import "./AppCard.scss";
import { Link } from "react-router-dom";
const AppCard = ({ app }) => {
  return (
    <section className="app-card">
      <Link to={`/details/${app?._id}`}>
        <h3>{app?.company}</h3>
        <p>Position: {app?.jobTitle}</p>
        <p>Beworben am: {new Date(app?.date).toLocaleDateString()}</p>
        <Rating name="read-only" value={app?.rating} readOnly />
      </Link>
    </section>
  );
};

export default AppCard;
