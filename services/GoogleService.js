import { OAuth2Client } from 'google-auth-library';

export default class GoogleService {

  constructor() {
    this.clientId = process.env.GOOGLE_AUTH_CLIENT_ID;
    this.client = new OAuth2Client(this.clientId, '', '');
  }

  /**
   * Verify google token identity.
   * @param {String} token
   */
  async verifyToken(token) {
    try {
      const result = await this.client.verifyIdToken({
        idToken: token,
        audiance: this.clientId,
      });
      return result.getPayload();
    } catch (error) {
      throw Error(error);
    }
  }
}