import UserRepository from '../repositories/UserRepository';
import BaseService from './BaseService';

export default class SenderService extends BaseService {
  /**
   * User specific service class
   */
  constructor() {
    super(new UserRepository());
  }

  /**
   * Register user.
   * @param {Object} payload 
   * @param {String} password 
   */
  async register(payload, password) {
    let errMsg = null;
    try {
      if (password === '') {
        throw Error('password cannot be blank');
      }
      const response = await this.repository.create(payload);
      if (response) return response;
      throw Error('fail to insert data');
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        if (error.errors[0].message === 'email must be unique') {
          errMsg = 'Oops. Looks we already have this email registered. Perharps another one?';
        } else if (error.errors[0].message === 'username must be unique') {
          errMsg = 'Oops. Username already exist. Please choose another.';
        }
        throw Error(errMsg);
      }
      throw Error(error.message);
    }
  }
}
