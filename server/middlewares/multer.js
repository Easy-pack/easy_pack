const multer = require('multer');
const path = require('path');

const Datauri = require('datauri');

const dUri = new Datauri();
const storage = multer.memoryStorage();

const multerUploads = multer({ storage }).single('avatar');

const dataUri = req => dUri.format(path.extname(req.file.originalname), req.file.buffer);

module.exports = { multerUploads, dataUri };