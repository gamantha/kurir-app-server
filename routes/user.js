const express = require('express');
const passport = require('passport');

const router = express.Router();
const User = require('../controllers/user');

router.get('/', User.getUsers);
router.post('/create', User.create);
router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  const { user } = req;
  res.json(user);
});

module.exports = router;
