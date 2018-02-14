import express from 'express';
import { proposalController } from '../controllers';
import Auth from '../helpers/Auth';
import SysAdmin from '../helpers/SysAdmin';

const router = express.Router();

router.post('/', Auth, (req, res) => {
  proposalController.proposeToCourier(req, res);
});

router.put('/', SysAdmin, (req, res) => {
  proposalController.updateSenderProposal(req, res);
});

router.get('/', SysAdmin, (req, res) => {
  proposalController.getSenderProposals(req, res);
});

module.exports = router;
