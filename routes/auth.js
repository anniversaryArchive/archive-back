const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    console.log(req.params);
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, error });
  }
});

// const newUser = await new User({
//    email: profile.emails[0].value,
//    nickName: profile.displayName,
//    provider: 'google',
//    token: accessToken,
// }).save();
module.exports = router;
