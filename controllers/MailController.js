import axios from 'axios';
import { MailService } from '../services';
import ResponseBuilder from '../helpers/ResponseBuilder';
const config = require('../config/config.json');

export default class MailController {
  constructor() {
    this.service = new MailService();
  }

  async checkEmail(req, res) {
    const { email } = req.query;
    let setup = this.service.mailgunSetup;
    let mailgunSetup = setup({
      apiKey: process.env.mailgunPrivateApiKey,
      publicApiKey: process.env.mailgunPublicValidationKey,
      domain: process.env.mailgunDomain,
    });
    try {
      let response = await axios.get(
        `https://api.mailgun.net/v3/address/validate?address=${email}&api_key=${
          process.env.mailgunPublicValidationKey
        }`
      );
      const validationResult = response.data.is_valid;
      if (validationResult) {
        try {
          await this.service.update({ isEmailValidated: true }, { email });
        } catch (error) {
          res.status(400).json(
            new ResponseBuilder()
              .setMessage(error)
              .setSuccess(false)
              .build()
          );
        }
        const welcomeMsg = {
          from: 'Kurir.id <noreply@kurir.id>',
          to: email,
          subject: 'Welcome to Kurir.id',
          html:
            '<h1>You\'ve successfully verified your email! Thank your for being awesome and being part of Kurir.id</h1>',
        };
        try {
          mailgunSetup.messages().send(welcomeMsg);
          res.status(200).json(
            new ResponseBuilder()
              .setData({
                msg: 'successfully sent welcome msg to email',
              })
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
        res
          .status(200)
          .json(
            new ResponseBuilder()
              .setMessage('Email berhasil divalidasi dengan sempurna')
              .build()
          );
      }

      res.status(400).json(
        new ResponseBuilder()
          .setMessage(response.data.reason)
          .setSuccess(false)
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
  }

  async sendRegisValidationLink(req, res) {
    const { email } = req.body;
    try {
      await this.service.findOne({ email });
      let setup = this.service.mailgunSetup;
      let mailgunSetup = setup({
        apiKey: process.env.mailgunPrivateApiKey,
        publicApiKey: process.env.mailgunPublicValidationKey,
        domain: process.env.mailgunDomain,
      });

      const verificationLink = `${
        config.domain.base_url
      }/api/mail/check-email-is-valid?email=${email}`;

      const verificationLinkMsg = {
        from: 'Kurir.id <noreply@kurir.id>',
        to: email,
        subject: 'Email Verification for Newly Onboarding User',
        html: `Please verify your account by clicking on this link <u>${verificationLink}</u>`,
      };
      try {
        mailgunSetup.messages().send(verificationLinkMsg);
        res
          .status(200)
          .json(
            new ResponseBuilder()
              .setData({ msg: 'successfully sent verification link to email' })
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

  async sendForgotPassVerifCode(req, res) {}
}
