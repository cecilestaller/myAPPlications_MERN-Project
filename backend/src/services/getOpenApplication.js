import Application from "../models/Application.js"

export const getOpenApplication = async () => {
const findOpenApplication = await Application.find({active: true});
if(!findOpenApplication) throw new Error("No open application found")
return findOpenApplication;
}