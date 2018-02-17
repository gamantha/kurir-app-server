import BaseService from './BaseService';
import models from '../models';

export default class CourierProposalService extends BaseService {
  /**
   * Courier Proposal specific service class
   */
  constructor() {
    super(models.CourierProposal);
    this.userModel = models.User;
  }

  async proposalRejected(status, rejectReason, userId) {
    const updated = await super.update(
      {
        status,
        rejectDate: new Date(),
        acceptDate: null,
        rejectReason,
      },
      {
        UserId: userId,
      },
      {
        returning: true,
        plain: true,
      }
    );
    await this.userModel.update(
      {
        role: 'sender',
      },
      {
        where: {
          id: userId,
        },
      }
    );
    return updated;
  }

  async proposalAccepted(status, rejectReason, userId) {
    const updated = await super.update(
      {
        status,
        acceptDate: new Date(),
        rejectDate: null,
        rejectReason: null,
      },
      {
        UserId: userId,
      },
      {
        returning: true,
        plain: true,
      }
    );
    await this.userModel.update(
      {
        role: 'sender+kurir',
      },
      {
        where: {
          id: userId,
        },
      }
    );
    return updated;
  }

  async proposalWaiting(status, rejectReason, userId) {
    const updated = await super.update(
      {
        status,
        rejectDate: null,
        acceptDate: null,
        rejectReason: null,
      },
      {
        UserId: userId,
      },
      {
        returning: true,
        plain: true,
      }
    );
    await this.userModel.update(
      {
        role: 'sender',
      },
      {
        where: {
          id: userId,
        },
      }
    );
    return updated;
  }
}
