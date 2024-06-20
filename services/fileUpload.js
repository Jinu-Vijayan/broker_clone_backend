const multer = require("multer");
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
require("dotenv").config();

const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const streamUpload = (file) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );

      streamifier.createReadStream(file.buffer).pipe(stream);
    });
};

const uploadFiles = async (req) => {
    const files = req.files;
    const results = [];

    for (const file of files) {
        const data = await streamUpload(file)
        results.push(data);
    }
    return results;
};

module.exports = {
    upload,
    uploadFiles
}