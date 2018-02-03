import { MailService } from '../services';
import ResponseBuilder from '../helpers/ResponseBuilder';

export default class MailController {
  constructor() {
    this.service = new MailService();
  }

  async checkEmail(req, res) {
    const token = req.params.token;
    const email = this.service.decodeToken(token);

    const result = await this.service.checkEmail(email);

    const response = result
      ? [200, `Email ${email} is valid, we are pleased you are being here!`]
      : [422, `${email ? email : 'email'} is not valid!`];

    res
      .status(response[0])
      .json(new ResponseBuilder().setMessage(response[1]).build());
  }

  async sendRegisValidationLink(req, res) {
    const { email } = req.body;
    const result = await this.service.sendRegisValidationLink(email);

    const response = result
      ? [200, `Successfully sent verification link to ${email}`]
      : [422, `${email ? email : 'email'} is not valid or registered!`];

    res
      .status(response[0])
      .json(new ResponseBuilder().setMessage(response[1]).build());
  }

  async sendForgotPassVerifCode(req, res) {
    const { email } = req.body;

    const result = await this.service.sendVerificationCode(email);

    const response = result
      ? [200, 'Successfully sent verification code forgot password to email']
      : [422, `${email ? email : 'email'} is not registered!`];

    res
      .status(response[0])
      .json(new ResponseBuilder().setMessage(response[1]).build());
  }
}
