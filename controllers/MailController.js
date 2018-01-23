import axios from 'axios';
import bcrypt from 'bcrypt';
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
          res
            .status(200)
            .json(
              new ResponseBuilder()
                .setMessage('successfully sent welcome msg to email')
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
              .setMessage('successfully sent verification link to email')
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
          res
            .status(200)
            .json(
              new ResponseBuilder()
                .setMessage(
                  'successfully sent verification code forgot password to email'
                )
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

  async changePassword(req, res) {
    const { email, password } = req.body;
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);
    const setup = this.service.mailgunSetup;
    const mailgunSetup = setup({
      apiKey: process.env.mailgunPrivateApiKey,
      publicApiKey: process.env.mailgunPublicValidationKey,
      domain: process.env.mailgunDomain,
    });

    let changePasswordMsg = this.service.mailgunMsg;

    changePasswordMsg = {
      from: 'Kurir.id <noreply@kurir.id>',
      to: email,
      subject: 'Change password information',
      html: `<div>This email inform you that you have successfully change your password.
       Here are your new password: <b>${password}</b>
       Please keep it in safe place. </div>`,
    };

    try {
      await this.service.findOne({ email });
      try {
        await this.service.update({ password: hash }, { email });
        try {
          mailgunSetup.messages().send(changePasswordMsg);
          res
            .status(200)
            .json(
              new ResponseBuilder()
                .setMessage(
                  'successfully sent information to email that user has changed password.'
                )
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
