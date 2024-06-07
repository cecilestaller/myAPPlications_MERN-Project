import { useParams } from "react-router-dom";
import "./Detail.scss";
import EditIcon from "@mui/icons-material/Edit";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState, useContext } from "react";
import { backendURL } from "../../api/api";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import {
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import Header from "../../components/Header/Header";
import { AllAppsContext } from "../../context/Context";
import Rating from "@mui/material/Rating";
const Detail = () => {
  const { appId } = useParams();
  const [appDetail, setAppDetail] = useState();
  const { allApps, setAllApps } = useContext(AllAppsContext);
  const [deleteMessage, setDeleteMessage] = useState("");

  const [date, setDate] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [expectedSalary, setExpectedSalary] = useState(0);
  const [rating, setRating] = useState(0);
  const [contactPerson, setContactPerson] = useState("");
  const [applicationType, setApplicationType] = useState("");
  const [city, setCity] = useState("");
  const [workLocation, setWorkLocation] = useState("");
  const [applicationFileName, setApplicationFileName] = useState([]);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("");
  const [active, setActive] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [showEditForm, setShowEditForm] = useState(false);
  console.log(active);
  useEffect(() => {
    async function fetchAppDetail() {
      try {
        const res = await fetch(`${backendURL}/api/v1/applications/${appId}`);
        const { success, result, error, message } = await res.json();
        return setAppDetail(result);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAppDetail();
  }, [appId, successMessage]);

  const deleteApp = async () => {
    try {
      const res = await fetch(`${backendURL}/api/v1/applications/${appId}`, {
        method: "DELETE",
      });
      const { success, result, error, message } = await res.json();
      if (success) {
        setDeleteMessage("Bewerbung erfolgreich gelöscht");
        setAllApps(result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const sendEditApp = async (e) => {
    e.preventDefault();
    if (applicationFileName && applicationFileName.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < applicationFileName.length; i++) {
        formData.append("files", applicationFileName[i]);
      }
      try {
        const fileResponse = await fetch(`${backendURL}/api/v1/files/upload`, {
          method: "POST",
          body: formData,
        });
        const fileResult = await fileResponse.json();
        const uploadedFilenames = fileResult.files.map((file) => file.filename);
        const res = await fetch(`${backendURL}/api/v1/applications`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            applicationFileName: uploadedFilenames,
            date,
            jobTitle,
            company,
            expectedSalary,
            rating,
            contactPerson,
            city,
            workLocation,
            comment,
            applicationType,
            status,
            active,
          }),
        });
        const { success, result } = await res.json();
        if (success) {
          setSuccessMessage("Bewerbung erfolgreich bearbeitet");
          setErrorMessage("");
          setShowEditForm(false);
        } else {
          setSuccessMessage("");
          setErrorMessage("Bewerbung konnte nicht bearbeitet werden");
        }
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const res = await fetch(`${backendURL}/api/v1/applications/${appId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date,
          jobTitle,
          company,
          expectedSalary,
          rating,
          contactPerson,
          city,
          workLocation,
          comment,
          applicationType,
          status,
          active,
        }),
      });
      const { success, result, error, message } = await res.json();
      if (success) {
        setSuccessMessage("Bewerbung erfolgreich bearbeitet");
        setShowEditForm(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeToEditMode = () => {
    setShowEditForm(!showEditForm);

    setDate(new Date(appDetail?.date).toISOString().split("T")[0]);
    setCity(appDetail?.city);
    setJobTitle(appDetail?.jobTitle);
    setCompany(appDetail?.company);
    setExpectedSalary(appDetail?.expectedSalary);
    setRating(appDetail?.rating);
    setContactPerson(appDetail?.contactPerson);
    setApplicationType(appDetail?.applicationType);
    setWorkLocation(appDetail?.workLocation);
    setApplicationFileName(appDetail?.applicationFileName);
    setComment(appDetail?.comment);
    setStatus(appDetail?.status);
    setActive(appDetail?.active);
  };

  console.log(appDetail);
  return (
    <>
      <Header />
      {deleteMessage ? (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          {deleteMessage}
        </Alert>
      ) : null}
      <section className={deleteMessage ? "no-detail" : "detail"}>
        <h1>
          <span>Meine Bewerbung bei:</span> {appDetail?.company}
        </h1>
        <h3 className={appDetail?.active ? "open-app" : "closed-app"}>
          {appDetail?.active
            ? "offener Bewerbungsprozess"
            : "abgeschlossener Bewerbungsprozess"}
        </h3>
        <Rating name="read-only" value={appDetail?.rating || 0} readOnly />
        <h3>Position: {appDetail?.jobTitle}</h3>
        <h3>Gehaltsvorstellung: {appDetail?.expectedSalary}€</h3>
        <h3>Kontaktperson: {appDetail?.contactPerson}</h3>
        <h4>Beworben am: {new Date(appDetail?.date).toLocaleDateString()}</h4>
        <h4>aktuelle Bewerbungsstauts: {appDetail?.status}</h4>
        <h4>
          Job Interview:
          {appDetail?.invited
            ? " Bewerbunstermin vereinbart"
            : " noch nicht eingeladen"}
        </h4>
        <p>Standort: {appDetail?.city}</p>
        <p>Arbeitsmodell: {appDetail?.workLocation}</p>
        <p>Art der Bewerbung: {appDetail?.applicationType}</p>

        <p>
          Zuletzt bearbeitet am:{" "}
          {new Date(appDetail?.updatedAt).toLocaleDateString()}
        </p>
        <p>
          Kommentar zur Bewerbung: <br />
          {appDetail?.comment}
        </p>

        <Button
          onClick={changeToEditMode}
          variant="outlined"
          startIcon={<EditIcon />}
        >
          Bewerbung bearbeiten
        </Button>
        <Button
          onClick={deleteApp}
          color="error"
          variant="outlined"
          startIcon={<DeleteIcon />}
        >
          Bewerbung löschen
        </Button>
        {successMessage ? (
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            {successMessage}
          </Alert>
        ) : null}
        {errorMessage ? (
          <Alert icon={<ErrorIcon fontSize="inherit" />} severity="error">
            {errorMessage}
          </Alert>
        ) : null}
        <section className={showEditForm ? "add-app" : "hide-edit-app"}>
          <h2>Bewerbung bearbeiten</h2>

          <form>
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              type="text"
              placeholder="*Firmenname"
              required
            />
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Bewerbung aktiv?
              </FormLabel>
              <RadioGroup
                row
                defaultValue={true}
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Aktiv"
                  name="aktiv"
                  onChange={(e) => setActive(e.target.value)}
                />
                <FormControlLabel
                  value={false}
                  onChange={(e) => setActive(e.target.value)}
                  control={<Radio />}
                  label="Inaktiv"
                />
              </RadioGroup>
            </FormControl>
            <input
              type="text"
              placeholder="*Stadt"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              type="text"
              placeholder="*Position"
              required
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Kontaktperson"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
            />
            <div className="form-flex">
              <label htmlFor="datum">*Beworben am: </label>
              <input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type="date"
                name="datum"
                required
              />
            </div>
            <div className="form-flex">
              <label htmlFor="salery">Gehaltsvorstellung: </label>
              <input
                value={expectedSalary}
                onChange={(e) => setExpectedSalary(e.target.value)}
                type="number"
                name="salery"
                placeholder="Gehaltsvorstellung"
              />
            </div>

            <Box>
              <Typography variant="p">Upload Bewerbungsunterlagen: </Typography>
              <input
                accept="*"
                style={{ display: "none" }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={(e) =>
                  setApplicationFileName(Array.from(e.target.files))
                }
              />
              <label htmlFor="raised-button-file">
                <Button size="small" variant="contained" component="span">
                  Dateien auswählen
                </Button>
              </label>
              <Box mt={1}>
                {applicationFileName?.length > 0 && (
                  <List>
                    {applicationFileName?.map((file, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={file.name} />
                      </ListItem>
                    ))}
                  </List>
                )}
              </Box>
            </Box>
            <select
              value={workLocation}
              onChange={(e) => setWorkLocation(e.target.value)}
            >
              <option disabled value="">
                *Arbeitsmodell
              </option>
              <option value="Hybrid">Hybrid</option>
              <option value="Remote">Remote</option>
              <option value="Vor Ort">Vor Ort</option>
            </select>
            <select
              value={applicationType}
              onChange={(e) => setApplicationType(e.target.value)}
            >
              <option disabled value="">
                *Art der Bewerbung
              </option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Firmenportal">Firmenportal</option>
              <option value="indeed">indeed</option>
              <option value="stepstone">stepstone</option>
              <option value="Xing">Xing</option>
              <option value="E-Mail">E-Mail</option>
              <option value="Sonstige">Sonstige</option>
            </select>

            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option disabled value="">
                *Bewerbungsstatus
              </option>
              <option value="beworben - Rückmeldung offen">
                beworben - Rückmeldung offen
              </option>
              <option value="eingeladen zum Interview">
                eingeladen zum Interview
              </option>
              <option value="Firmenfeedback offen">Firmenfeedback offen</option>
              <option value="Mein Feedback offen">Mein Feedback offen</option>
              <option value="Absage erhalten">Absage erhalten</option>
              <option value="Absage erteilt">Absage erteilt</option>
            </select>
            <div className="form-flex">
              <label htmlFor="simple-controlled">
                *Rating Bewerbung und Arbeitgeber:
              </label>
              <Rating
                value={Number(rating)}
                onChange={(e) => setRating(e.target.value)}
                name="simple-controlled"
              />
            </div>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              name="comment"
              cols="30"
              rows="10"
              placeholder="Kommentar zur Bewerbung"
            ></textarea>

            <button onClick={sendEditApp}>Änderungen speichern</button>
          </form>
        </section>
      </section>
    </>
  );
};

export default Detail;
