import express from 'express';
import { googleController } from '../controllers';

const router = express.Router();

router.post('/login', (req, res) => {
  googleController.login(req, res);
});

router.post('/register', (req, res) => {
  googleController.register(req, res);
});

module.exports = router;
