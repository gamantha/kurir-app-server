const express = require('express');

const router = express.Router();
const mail = require('../controllers/mail');

router.post('/sent-forgot-pass-code', mail.getVeriCodeForgotPassword);
router.post('/change-password', mail.changePassword);
router.post('/check-forgot-code', mail.checkForgotPassVeriCode);

module.exports = router;
