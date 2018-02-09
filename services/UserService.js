import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
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

  /**
   * Change user password here.
   * @param {String} email 
   * @param {String} oldPassword 
   * @param {String} newPassword 
   */
  async changePassword(email, oldPassword, newPassword) {
    const user = await this.findOne({ email });
    if (bcrypt.compareSync(oldPassword, user.password)) {
      const saltRounds = 10;
      const hash = bcrypt.hashSync(newPassword, saltRounds);
      try {
        await this.update({ password: hash }, { email });
        return true;
      } catch (error) {
        throw Error(error.message);
      }
    } else {
      return false;
    }
  }
}
