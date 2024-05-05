import { deleteApplicationCtrl, getAllApplicationsCtrl, getAllClosedApplicationsCtrl, getAllOpenApplicationsCtrl, getSingleApplicationCtrl, patchApplicationCtrl, postNewApplicationCtrl } from "./applicationController.js";
import { postFileUploadCtrl } from "./fileController.js";

export const ApplicationController = {getAllApplicationsCtrl, postNewApplicationCtrl, patchApplicationCtrl, deleteApplicationCtrl, getSingleApplicationCtrl, getAllOpenApplicationsCtrl, getAllClosedApplicationsCtrl}
export const FileController = {postFileUploadCtrl}