import { Facebook } from 'fb';

export default class FacebookService {

  constructor() {
    this.clientId = process.env.FACEBOOK_AUTH_CLIENT_ID;
    this.client = new Facebook();
  }

  /**
   * Verify facebook token identity.
   * @param {String} token
   */
  async verifyToken(token) {
    this.client.setAccessToken(token);
    try {
      const result = await this.client.api('/me', { fields: 'email' });
      return result;
    } catch (error) {
      throw Error(error);
    }
  }
}
