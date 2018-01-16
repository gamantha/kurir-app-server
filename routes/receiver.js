import express from 'express';
import { receiverController } from '../controllers';

const router = express.Router();

router.post('/', (req, res) => {
  receiverController.create(req, res);
});

module.exports = router;
