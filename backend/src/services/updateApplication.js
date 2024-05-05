import Application from "../models/Application.js";

export const updateApplication = async (applicationId, updateInfo) => {
    const filter = {_id: applicationId};
    const update = updateInfo;
    const applicationUpdate = Application.findOneAndUpdate(filter, update, {new: true})
    return applicationUpdate
}