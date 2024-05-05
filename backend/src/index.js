import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { applicationRouter } from "./routes/applicationRouter.js";
import { filesUploadRouter } from "./routes/filesUploadRouter.js";

dotenv.config();

// Define variables for DB connection
const MONGODB_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 3030;

// Server 
const app = express();

// ---- MIDDLEWARES
app.use(cors());
app.use(morgan("dev"));
app.use(express.json()) // body parser

//  Health Check:

app.get("/", (req, res) => res.send("it works"));

// ---- ROUTER-MIDDLEWARES
app.use("/api/v1/applications", applicationRouter)
app.use("/api/v1/files", filesUploadRouter)
app.use("/download", express.static("data/files"))
// ---------------
// Declaration of serverListenPort-function which will be called in the DB-connection setup:

const serverListenPort = () =>
    app.listen(PORT, () =>
        console.log("Server listening & ready at PORT: ", PORT)
    );

// ===== SERVER & DB CONNECTION SETUP:
console.log("Connecting to database...");

mongoose
    .connect(MONGODB_URL, { dbName: "myAPPlications" })
    .then(() => {
        console.log("DB connection successful");
        serverListenPort();
    })
    .catch((err) => {
        console.log("Error connecting to database!");
        console.log(err);
        console.log("Server will not start. Aborting...");
        process.exit(); // beende den node prozess (clean exit)
    });


