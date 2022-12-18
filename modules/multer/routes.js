const router = require('express').Router();
const { upload, uploadImages } = require('./index');

router.post('/images', upload.array('images', 10), uploadImages);

module.exports = router;
