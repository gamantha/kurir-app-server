import express from 'express';

const router = express.Router();
import { mailController } from '../controllers';

router.get('/token/:token', (req, res) => {
  mailController.checkEmail(req, res);
});

router.post('/validation-link', (req, res) => {
  mailController.sendRegisValidationLink(req, res);
});

router.post('/forgot-password', (req, res) => {
  mailController.sendForgotPassVerifCode(req, res);
});

router.post('/check-code', (req, res) => {
  mailController.checkForgotPassVeriCode(req, res);
});

module.exports = router;
