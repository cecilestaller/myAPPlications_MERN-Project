import Application from "../models/Application.js"

export async function getAllApplications()  {
    const applications = await Application.find();
return applications
}
