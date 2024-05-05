import Application from "../models/Application.js"

export const getApplicationDetail = async (applicationId) => {
    const singleApplication = await Application.findById(applicationId)
    if(!singleApplication) throw new Error("Could not find application with ID:", applicationId)
    return singleApplication;
}