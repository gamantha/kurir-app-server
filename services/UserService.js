import jwt from 'jsonwebtoken';
import BaseService from './BaseService';
import models from '../models';

export default class UserService extends BaseService {
  /**
   * User specific service class
   */
  constructor() {
    super(models.User);
  }

  async register(payload, password) {
    let errMsg = null;
    try {
      if (password === '') {
        throw Error('password cannot be blank');
      }
      const response = await this.model.create(payload);
      if (response) return response;
      throw Error('fail to insert data');
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        if (error.errors[0].message === 'email must be unique') {
          errMsg =
            'Oops. Looks we already have this email registered. Perharps another one?';
        } else if (error.errors[0].message === 'username must be unique') {
          errMsg = 'Oops. Username already exist. Please choose another.';
        }
        throw Error(errMsg);
      }
      throw Error(error.message);
    }
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
}
