import express from 'express';

const router = express.Router();
import { mailController } from '../controllers';

router.get('/registration/check/:token', (req, res) => {
  mailController.checkEmail(req, res);
});

router.post('/registration/link', (req, res) => {
  mailController.sendRegisValidationLink(req, res);
});

module.exports = router;
