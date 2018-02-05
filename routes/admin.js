import express from 'express';
import { adminController } from '../controllers';
import Auth from '../helpers/Auth';

const router = express.Router();

router.post('/create', Auth, (req, res) => {
  adminController.create(req, res);
});

module.exports = router;
