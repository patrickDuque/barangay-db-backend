const multer = require('multer');

const storage = multer.memoryStorage({
  destination : (req, file, cb) => {
    cb(null, '');
  },
  filename    : (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.jpeg');
  }
});
const upload = multer({ storage, limits: { fileSize: 1024 * 1024 * 3 } });

module.exports = upload;
