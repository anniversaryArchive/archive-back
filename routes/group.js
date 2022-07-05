const express = require('express'); 
const router = express.Router();
const Group = require('../models/group');

router.get('/', async (_, res) => {
  try {
    const groups = await Group.find({});
    res.json({ success: true, data: groups });
  } catch (error) {
    res.json({ success: false, error });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) { return res.json({ success: false, message: 'not found', code: 404 }); }
    res.json({ success: true, group });
  } catch (error) {
    res.json({ success: false, error });
  }
});

router.post('/', async (req, res) => {
  try {
    const group = await new Group(req.body).save();
    res.json({ success: true, data: group });
  } catch (error) {
    res.json({ success: false, error });
  }
});

module.exports = router;
