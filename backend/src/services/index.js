import { addApplication } from "./addApplication.js";
import { deleteApplication } from "./deleteApplication.js";
import { getAllApplications } from "./getAllApplications.js";
import { getApplicationDetail } from "./getApplicationDetail.js";
import { getClosedApplication } from "./getCloesedApplication.js";
import { getOpenApplication } from "./getOpenApplication.js";
import { updateApplication } from "./updateApplication.js";

export const ApplicationService = {
    getAllApplications,
    addApplication,
    updateApplication,
    deleteApplication,
    getApplicationDetail,
    getOpenApplication,
    getClosedApplication
}