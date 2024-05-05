import Application from "../models/Application.js";

export async function addApplication(applicationInfo){
    return Application.create({...applicationInfo})
}