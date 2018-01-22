import express from 'express';
import { userController } from '../controllers';

const router = express.Router();

router.get('/', (req, res) => {
  userController.get(req, res);
});

router.post('/create', (req, res) => {
  userController.create(req, res);
});

router.post('/login', (req, res) => {
  userController.login(req, res);
});

module.exports = router;
