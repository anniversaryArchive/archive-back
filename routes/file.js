const express = require('express'); 
const multer = require('multer');
const File = require('../models/file');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const storage = require('../firebase');

const router = express.Router();
const memoStorage = multer.memoryStorage();
const upload = multer({ memoStorage });

/**
 * Upload File 
 * 1. Firebase Storage Upload
 * 2. Database File 추가 
 */
router.post('/', upload.single('file'), async (req, res) => {
  const file = req.file;
  const imageRef = ref(storage, file.originalname);
  const metatype = { contentType: file.mimetype, name: file.originalname };

  const newFileData = {
    name: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
  };

  try {
    // 1. Firebase Storage Upload
    const snapshot = await uploadBytes(imageRef, file.buffer, metatype);
    const path = await getDownloadURL(snapshot.ref);
    newFileData.path = path;
    // 2. Database File 추가 
    const savedFile = await new File(newFileData).save();
    res.json({ success: true, data: savedFile });
  } catch (error) {
    res.json({ success: false, error });
  }
});

module.exports = router;
