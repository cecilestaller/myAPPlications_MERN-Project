import Application from "../models/Application.js";

export const deleteApplication = async (applicationId) => {
  const foundApplication = await Application.findById(applicationId);
  if (!foundApplication)
    throw new Error("Application with this ID doesnt exist:", applicationId);
  const deletedApplication = await Application.findByIdAndDelete(applicationId);

  const remainingApplications = await Application.find();
  return remainingApplications;
};
