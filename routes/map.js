import express from 'express';
import { mapController } from '../controllers';

const router = express.Router();

router.post('/', (req, res) => {
  mapController.getDistance(req, res);
});

module.exports = router;
