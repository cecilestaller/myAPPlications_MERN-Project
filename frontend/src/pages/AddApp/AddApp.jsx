import Header from "../../components/Header/Header";
import Rating from "@mui/material/Rating";
import {
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import "./AddApp.scss";
import { useState, useContext } from "react";
import { backendURL } from "../../api/api";
import { AllAppsContext } from "../../context/Context";

const AddApp = () => {
  const { allApps, setAllApps } = useContext(AllAppsContext);

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
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function addNewApp(e) {
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
          method: "POST",
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
          }),
        });
        const { success, result } = await res.json();
        if (success) {
          setAllApps([...allApps, result]);
          setSuccessMessage("Bewerbung erfolgreich hinzugefügt");
          clearForm();
          setErrorMessage("");
        } else {
          setSuccessMessage("");
          setErrorMessage("Bewerbung konnte nicht hinzugefügt werden");
        }
      } catch (error) {
        setErrorMessage("Bewerbung konnte nicht hinzugefügt werden");
        console.log(error);
      }
    } else {
      try {
        const res = await fetch(`${backendURL}/api/v1/applications`, {
          method: "POST",
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
          }),
        });
        const { success, result } = await res.json();
        if (success) {
          setAllApps([...allApps, result]);
          setErrorMessage("");
          setSuccessMessage("Bewerbung erfolgreich hinzugefügt");
          clearForm();
        } else {
          setSuccessMessage("");
          setErrorMessage("Bewerbung konnte nicht hinzugefügt werden");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  const clearForm = () => {
    setDate("");
    setCity("");
    setJobTitle("");
    setCompany("");
    setExpectedSalary(0);
    setRating(0);
    setContactPerson("");
    setApplicationType("");
    setWorkLocation("");
    setApplicationFileName([]);
    setComment("");
    setStatus("");
  };
  return (
    <section className="content-wrapper">
      <Header />
      <section className="add-app">
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

        <h2 className="page-headline">Neue Bewerbung hinzufügen</h2>
        <p>*Pflichtfelder sind mit einem Stern markiert</p>

        <form>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            type="text"
            placeholder="*Firmenname"
            required
          />
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
            <label htmlFor="salery">Gehaltsvorstellung:</label>
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
              <Button
                sx={{
                  backgroundColor: "rgb(222, 239, 245)",
                  color: "rgb(33, 37, 41)",
                  "&:hover": {
                    backgroundColor: "rgb(200, 220, 230)",
                  },
                  fontSize: "12px",
                  padding: "4px 8px",
                  minWidth: "auto",
                }}
                variant="contained"
                component="span"
              >
                Dateien auswählen
              </Button>
            </label>
            <Box mt={1}>
              {applicationFileName.length > 0 && (
                <List>
                  {applicationFileName.map((file, index) => (
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
            <option value="Sonstige">Test</option>
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

          <button onClick={addNewApp}>Bewerbung anlegen</button>
        </form>
      </section>
    </section>
  );
};

export default AddApp;
