import jwt from 'jsonwebtoken';
import BaseService from './BaseService';
import models from '../models';

export default class TokenService extends BaseService {
  /**
   * Token specific service class
   */
  constructor() {
    super(models.Token);
  }

  /**
   * Save jwt token to db and generate refresh token.
   * @param {String} token
   * @param {String} userAgent
   */
  async saveToken(token, userAgent) {
    try {
      const refreshToken = Math.random().toString(36).substring(3);
      const user = jwt.verify(token, process.env.SECRET);
      const payload = {
        accessToken: token,
        refreshToken,
        userId: user.id,
        userAgent,
      };
      try {
        const exist = await this.model.findOne({
          where: {
            userId: user.id,
            userAgent: userAgent
          },
        });
        if (exist) {
          return exist;
        }
        try {
          const user = await this.model.create(payload);
          return user;
        } catch (error) {
          throw Error(error.message);
        }
      } catch (error) {
        throw Error(error.message);
      }
    } catch (error) {
      throw Error(error.message);
    }
  }
}
