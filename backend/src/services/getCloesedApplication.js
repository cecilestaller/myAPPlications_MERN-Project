import Application from "../models/Application.js"

export const getClosedApplication = async () => {
const findClosedApplication = await Application.find({active: false});
if(!findClosedApplication) throw new Error("No closed application found")
return findClosedApplication;
}