const multer = require("multer");
const path = require("path"); // Import the 'path' module

// Configure multer
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

const uploadFile = upload.single("file");

module.exports = uploadFile;
