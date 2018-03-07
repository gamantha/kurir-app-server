import { MailService } from '../services';
import ResponseBuilder from '../helpers/ResponseBuilder';

export default class MailController {
  constructor() {
    this.service = new MailService();
  }

  async checkEmail(req, res) {
    const token = req.params.token;
    const email = this.service.decodeToken(token);
    try {
      const result = await this.service.checkEmail(email);
      if (result) {
        res.sendFile('confirmed.html', { root: 'views/confirmation/' });
      } else {
        res.sendFile('fail.html', { root: 'views/confirmation/' });
      }
    } catch (error) {
      res.status(400).json(
        new ResponseBuilder()
          .setMessage(error.message)
          .setSuccess(false)
          .build()
      );
    }
  }

  async sendRegisValidationLink(req, res) {
    const { email } = req.body;
    const result = await this.service.sendRegisValidationLink(email);

    const response = result
      ? [200, `Successfully sent verification link to ${email}`]
      : [
        422,
        `${
          email ? email : 'email'
        } is not valid or you already verified your email!`,
      ];

    res
      .status(response[0])
      .json(new ResponseBuilder().setMessage(response[1]).build());
  }
}
