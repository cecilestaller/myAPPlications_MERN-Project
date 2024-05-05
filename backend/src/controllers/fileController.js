export async function postFileUploadCtrl(req, res){
    try{
        const uploadedFilename = req.file.filename;
        res.status(200).json({success: true, result: {filename: uploadedFilename}})
    }
    catch(err){
        console.log(err);
        res.status(500).json({success: false, err, message: err.message})
    }
}