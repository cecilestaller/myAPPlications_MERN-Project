
import { ApplicationService } from "../services/index.js";


export async function getAllApplicationsCtrl(req, res){
    try{
        const result = await ApplicationService.getAllApplications()
        res.json({success: true, result})
    }
    catch(err){
        console.log(err);
        res.status(500).json({success: false, err, message: err.message || "Could not retrive applications"})
    }
} 

export async function postNewApplicationCtrl(req, res){
    try {
        const applicationInfo = req.body;
        const result = await ApplicationService.addApplication(applicationInfo)
        res.status(201).json({success: true, result})
    }
    catch(err){
        console.log(err);
        res.status(500).json({success: false, err, message: err.message || "could not add new application"})
    }
}

export async function patchApplicationCtrl(req, res){
    try {   
        const applicationId = req.params.applicationId;
        const updateInfo = req.body;
        const result = await ApplicationService.updateApplication(applicationId, updateInfo)
        res.status(200).json({success: true, result})
}
  
    catch(err){
console.log(err);
res.status(500).json({
    success: false,
    err,
    message: err.message || "Could not update application"
})
    }
}

export async function deleteApplicationCtrl(req, res){
    try {
        const applicationId = req.params.applicationId
        const result = await ApplicationService.deleteApplication(applicationId)
        res.status(200).json({success: true, result})
    }
    catch(err){
        console.log(err);
        res.status(500).json({success:false, err, message: err.message})
    }
}

export async function getSingleApplicationCtrl(req, res){
    try {
        const applicationId = req.params.applicationId
        const result = await ApplicationService.getApplicationDetail(applicationId)
        res.status(200).json({success: true, result})
    }
    catch(err){
        console.log(err);
        res.status(500).json({success:false, err, message: err.message})
    }
}

export async function getAllOpenApplicationsCtrl(req, res) {
    try {
        const result = await ApplicationService.getOpenApplication();
        res.status(200).json({success: true, result})
    }
    catch(err){
        console.log(err);
        res.status(500).json({success:false, err, message: err.message})
    }

}
export async function getAllClosedApplicationsCtrl(req, res) {
    try {
        const result = await ApplicationService.getClosedApplication();
        res.status(200).json({success: true, result})
    }
    catch(err){
        console.log(err);
        res.status(500).json({success:false, err, message: err.message})
    }

}