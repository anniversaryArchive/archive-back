const express = require('express'); 
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const Image = require('../models/image');
const router = express.Router();

router.get('/', async (_, res) => {
  try {
    const images = await Image.find({});
    res.json({ success: true, data: images });
  } catch (error) {
    res.json({ success: false, error });
  }
});

/**
 * @POST
 * /image
 * - 이미지 업로드를 위한 로직
 */
const storage = multer.diskStorage({
  destination: function(_, __, cb) {
    cb(null, 'uploads')
  },
  filename: function (_, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });
router.post('/', upload.single('file'), async (req, res) => {
  const filePath = path.join(__dirname, '..', 'uploads/' + req.file.filename);
  const img = fs.readFileSync(filePath);
  const encodeImg = img.toString('base64');
  const buffer = Buffer.from(encodeImg, 'base64');
  const obj = {
    name: req.body.name,
    desc: req.body.desc,
    filename: req.file.filename,
    mimetype: req.file.mimetype,
    data: buffer,
  };
  try {
    const image = await new Image(obj).save();
    res.json({ success: true, data: image });
  } catch (error) {
    res.json({ success: false, error });
  }
});

/**
 * @GET 
 * /image/:id
 * - 이미지 자체를 return 해준다. 
 */
router.get('/:id', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    res.contentType(image.mimetype);
    res.send(image.data);
  } catch (error) {
    res.json({ success: false, error });
  }
});

module.exports = router;
