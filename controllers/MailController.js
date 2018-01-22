import { MailService } from '../services';
import ResponseBuilder from '../helpers/ResponseBuilder';
const localBaseUrl = require('../config/config.json');

export default class MailController {
  constructor() {
    this.service = new MailService();
  }

  async sentRegistrationVerif(req, res) {
    const { email } = req.body;
    try {
      await this.service.findOne({ email });
      let setup = this.service.mailgunSetup;
      let mailgunSetup = setup({
        apiKey: process.env.mailgunPrivateApiKey,
        domain: process.env.mailgunDomain,
      });
      const mailOptions = {
        from: 'Kurir.id <noreply@kurir.id>',
        to: email,
        subject: 'Welcome to Kurir.id',
        text: 'Please verify your account by clicking on this link',
      };
      try {
        mailgunSetup.messages().send(mailOptions);
        res
          .status(200)
          .json(
            new ResponseBuilder()
              .setData({ msg: 'successfully sent verification link' })
              .build()
          );
      } catch (error) {
        res.status(400).json(
          new ResponseBuilder()
            .setMessage(error)
            .setSuccess(false)
            .build()
        );
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
}
