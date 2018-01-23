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
    const setup = this.service.mailgunSetup;
    const mailgunSetup = setup({
      apiKey: process.env.mailgunPrivateApiKey,
      publicApiKey: process.env.mailgunPublicValidationKey,
      domain: process.env.mailgunDomain,
    });
    try {
      const response = await axios.get(
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

        let welcomeMsg = this.service.mailgunMsg;

        welcomeMsg = {
          from: 'Kurir.id <noreply@kurir.id>',
          to: email,
          subject: 'Welcome to Kurir.id',
          html:
            '<h1>You\'ve successfully verified your account! Thank your for being awesome and being part of Kurir.id</h1>',
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
    const setup = this.service.mailgunSetup;
    const mailgunSetup = setup({
      apiKey: process.env.mailgunPrivateApiKey,
      publicApiKey: process.env.mailgunPublicValidationKey,
      domain: process.env.mailgunDomain,
    });

    const verificationLink = `${
      config.domain.base_url
    }/api/mail/check-email-is-valid?email=${email}`;

    let verificationLinkMsg = this.service.mailgunMsg;

    verificationLinkMsg = {
      from: 'Kurir.id <noreply@kurir.id>',
      to: email,
      subject: 'Email Verification for Newly Onboarding User',
      html: `Please verify your account by clicking on this link <u>${verificationLink}</u>`,
    };

    try {
      await this.service.findOne({ email });
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

  async sendForgotPassVerifCode(req, res) {
    const { email } = req.body;
    const setup = this.service.mailgunSetup;
    const mailgunSetup = setup({
      apiKey: process.env.mailgunPrivateApiKey,
      publicApiKey: process.env.mailgunPublicValidationKey,
      domain: process.env.mailgunDomain,
    });
    const token = this.service.verifCodeGenerator.generator({
      source: 'math',
      chars: 'numeric',
    });
    const verifCode = token.generate(6);
    let verifCodeMsg = this.service.mailgunMsg;

    verifCodeMsg = {
      from: 'Kurir.id <noreply@kurir.id>',
      to: email,
      subject: 'Your verification code for Kurir.id forgot password',
      html: `<b>This is your verification code number. Do not share it with anyone.</b> ${verifCode}`,
    };

    try {
      await this.service.findOne({ email });
      try {
        await this.service.update({ forgotPassVeriCode: verifCode }, { email });
        try {
          mailgunSetup.messages().send(verifCodeMsg);
          res.status(200).json(
            new ResponseBuilder()
              .setData({
                msg:
                  'successfully sent verification code forgot password to email',
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

  async checkForgotPassVeriCode(req, res) {
    const { email, veriCode } = req.body;

    try {
      const response = await this.service.findOne({ email });
      const userPayload = response.forgotPassVeriCode;

      if (userPayload === veriCode) {
        try {
          await this.service.update({ forgotPassVeriCode: null }, { email });
          res
            .status(200)
            .json(
              new ResponseBuilder()
                .setMessage(
                  'Verification code match. User now can safely reset password.'
                )
                .build()
            );
        } catch (error) {
          res.status(400).json(
            new ResponseBuilder()
              .setMessage(error.message)
              .setSuccess(false)
              .build()
          );
        }
      } else {
        res.status(400).json(
          new ResponseBuilder()
            .setMessage('Verification code didn\'t match')
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
