import helper from '../helpers';
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
      const refreshToken = helper.refreshToken();
      const user = helper.verifyJwt(token);
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
            userAgent: userAgent,
          },
          include: [{
            model: models.User,
            attributes: { exclude: ['password'] },
            required: true,
          }]
        });
        if (exist) {
          // if exist update existing token
          try {
            await this.model.update({
              accessToken: token, refreshToken
            }, { where: { id: exist.id } });
            exist.accessToken = token;
            exist.refreshToken = refreshToken;
            return exist;
          } catch (error) {
            throw Error(error.message);
          }
        }
        try {
          // TODO: simplify this query call
          const token = await this.model.create(payload);
          const response = await this.model.findOne({
            where: { id: token.id },
            include: [{
              model: models.User,
              attributes: { exclude: ['password'] },
              required: true,
            }]
          });
          return response;
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

  /**
   * refresh the token.
   * @param {String} bearer 
   * @param {String} refreshToken 
   * @param {String} userAgent 
   */
  async refreshToken(bearer, refreshToken, userAgent) {
    try {
      const token = await this.model.findOne({
        where: { refreshToken, userAgent, accessToken: helper.parseToken(bearer) },
        include: [{
          model: models.User,
          attributes: { exclude: ['password'] },
          required: true,
        }],
      });
      if (!token) {
        throw Error('refresh token not found');
      }
      // generate token here
      const payload = {
        email: token.User.email,
        id: token.User.id
      };
      const accessToken = helper.createJWT(payload);
      const newRefreshToken = helper.refreshToken();
      try {
        await this.model.update({
          accessToken, refreshToken: newRefreshToken,
        }, { where: { id: token.id } });
        token.accessToken = accessToken;
        token.refreshToken = newRefreshToken;
        return token;
      } catch (error) {
        throw Error(error.message);
      }
    } catch (error) {
      throw Error(error.message);
    }
  }
}
