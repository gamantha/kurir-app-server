import express from 'express';
import { mapController } from '../controllers';

import Auth from '../helpers/Auth';

const router = express.Router();

router.post('/', Auth, (req, res) => {
  mapController.getDistance(req, res);
});

module.exports = router;
