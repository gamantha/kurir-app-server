import jwt from 'jsonwebtoken';
import BaseService from './BaseService';
import models from '../models';

export default class UserService extends BaseService {
  /**
   * User specific service class
   */
  constructor() {
    super(models.User);
    this.proposeModel = models.CourierProposal;
  }

  /**
   * Confirm the token validity.
   * @param {String} token
   */
  async confirmReactivation(token) {
    const options = {
      expiresIn: 60 * 60,
      issuer: 'courier.id-backend',
      jwtid: 'courier.user',
      subject: 'reactivate-account',
    };
    try {
      const payload = await jwt.verify(token, process.env.SECRET, options);
      try {
        await this.update({ deletedAt: null }, { email: payload.email });
        return true;
      } catch (error) {
        throw Error(error);
      }
    } catch (error) {
      throw Error(error);
    }
  }

  async proposalRejected(status, rejectReason, userId) {
    await this.proposeModel.update(
      {
        status,
        rejectDate: new Date(),
        acceptDate: null,
        rejectReason,
      },
      {
        where: {
          UserId: parseInt(userId),
        },
      }
    );
    await this.update(
      {
        role: 'sender',
      },
      {
        id: userId,
      }
    );
  }

  async proposalAccepted(status, rejectReason, userId) {
    await this.proposeModel.update(
      {
        status,
        acceptDate: new Date(),
        rejectDate: null,
        rejectReason: null,
      },
      {
        where: {
          UserId: parseInt(userId),
        },
      }
    );
    await this.update(
      {
        role: 'sender+kurir',
      },
      {
        id: userId,
      }
    );
  }

  async proposalWaiting(status, rejectReason, userId) {
    await this.proposeModel.update(
      {
        status,
        rejectDate: null,
        acceptDate: null,
        rejectReason: null,
      },
      {
        where: {
          UserId: parseInt(userId),
        },
      }
    );
    await this.update(
      {
        role: 'sender',
      },
      {
        id: userId,
      }
    );
  }
}
