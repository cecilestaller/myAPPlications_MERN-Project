export async function postFileUploadCtrl(req, res) {
  try {
    const uploadedFiles = req.files.map((file) => ({
      filename: file.filename,
      path: file.path,
      originalname: file.originalname,
    }));

    res.status(200).json({
      message: "Files uploaded successfully.",
      files: uploadedFiles,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, err, message: err.message });
  }
}
