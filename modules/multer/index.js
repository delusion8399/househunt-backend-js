const multer = require('multer');
const path = require('path');
const environments = require('../../environments');

const storage = multer.diskStorage({
  // Destination to store image
  destination: 'public/images',
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`,
    );
    // file.fieldname is name of the field (image)
    // path.extname get the uploaded file extension
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1000000, // 1000000 Bytes = 1 MB
  },
  // eslint-disable-next-line consistent-return
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      // upload only png and jpg format
      return cb(new Error('Please upload a Image'));
    }
    cb(undefined, true);
  },
});

const uploadImages = (req, res) => {
  if (req.files.length) {
    console.log(req.files);
    const imgUrls = req.files.map((img) => ({
      url: `${environments.server.hostWithPort}/${img.destination}/${img.filename}`,
      name: img.filename,
      path: img.path,
      size: img.size,
    }));

    return res.json({
      message: 'Images successfully uploaded',
      data: imgUrls,
      type: 'success',
      status: 200,
    });
  }
};
module.exports = { uploadImages, upload };
