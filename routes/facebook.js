import express from 'express';
import { facebookController } from '../controllers';

const router = express.Router();

router.post('/login', (req, res) => {
  facebookController.login(req, res);
});

router.post('/register', (req, res) => {
  facebookController.register(req, res);
});

module.exports = router;
