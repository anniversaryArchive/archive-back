const express = require('express'); 
const router = express.Router();
const Archive = require('../models/archive');


router.get('/', async (_, res) => {
  try {
    const archives = await Archive.find({});
    res.json({ success: true, data: archives });
  } catch (error) {
    res.json({ success: false, error });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const archvie = await Archive.findById(req.params.id);
    if (!archvie) { return res.json({ success: false, message: 'not found', code: 404 }); }
    res.json({ success: true, archvie });
  } catch (error) {
    res.json({ success: false, error });
  }
});

router.post('/', async (req, res) => {
  try {
    const archive = await new Archive(req.body).save();
    res.json({ success: true, data: archive });
  } catch (error) {
    res.json({ success: false, error });
  }
});

module.exports = router;