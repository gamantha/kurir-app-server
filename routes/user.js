const express = require('express');
const passport = require('passport');

const router = express.Router();
const user = require('../controllers/user');

router.get('/', user.getUsers);
router.post('/create', user.create);
router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  const { loggedUser } = req;
  res.json(loggedUser);
});

module.exports = router;
