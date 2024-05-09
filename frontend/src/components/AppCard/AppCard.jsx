import Rating from "@mui/material/Rating";
import "./AppCard.scss";
const AppCard = ({ app }) => {
  return (
    <section className="app-card">
      <h3>{app?.company}</h3>
      <p>Position: {app?.jobTitle}</p>
      <p>Beworben am: {new Date(app?.date).toLocaleDateString()}</p>
      <Rating name="read-only" value={app?.rating} readOnly />
    </section>
  );
};

export default AppCard;
