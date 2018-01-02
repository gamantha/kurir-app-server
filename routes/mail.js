const express = require('express');

const router = express.Router();
const mail = require('../controllers/mail');

router.post('/forgot-password', mail.forgotPassword);

module.exports = router;
