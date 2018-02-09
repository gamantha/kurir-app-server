import express from 'express';
import { proposalController } from '../controllers';
import Auth from '../helpers/Auth';
import SysAdmin from '../helpers/SysAdmin';

const router = express.Router();

router.post('/propose', Auth, (req, res) => {
  proposalController.proposeToCourier(req, res);
});

router.put('/update-propose', SysAdmin, (req, res) => {
  proposalController.updateSenderProposal(req, res);
});

module.exports = router;
