const express = require('express');
const passport = require('passport');

const router = express.Router();
const sender = require('../controllers/sender');

router.get('/', sender.getUsers);
router.post('/create', sender.create);
router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  const { user } = req;
  res.json(user);
});

module.exports = router;
