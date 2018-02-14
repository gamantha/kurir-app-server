import BaseService from './BaseService';
import models from '../models';

export default class CourierProposalService extends BaseService {
  /**
   * Courier Proposal specific service class
   */
  constructor() {
    super(models.CourierProposal);
  }
}
