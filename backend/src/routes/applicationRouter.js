import express, { Router } from "express"
import { ApplicationController } from "../controllers/index.js"

export const applicationRouter = express.Router()
.get("/", ApplicationController.getAllApplicationsCtrl)
.get("/openApplications", ApplicationController.getAllOpenApplicationsCtrl)
.get("/closedApplications", ApplicationController.getAllClosedApplicationsCtrl)
.get("/:applicationId", ApplicationController.getSingleApplicationCtrl)
.post("/", ApplicationController.postNewApplicationCtrl)
.patch("/:applicationId", ApplicationController.patchApplicationCtrl)
.delete("/:applicationId", ApplicationController.deleteApplicationCtrl)