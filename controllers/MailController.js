import axios from 'axios';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { MailService } from '../services';
import ResponseBuilder from '../helpers/ResponseBuilder';
import { mailgunValidateAddress } from '../helpers/constants';
const config = require('../config/config.json');

export default class MailController {
  constructor() {
    this.service = new MailService();
  }

  async checkEmail(req, res) {
    const { token } = req.query;
    const tokenDecrypt = jwt.verify(token, process.env.SECRET);
    const setup = this.service.mailgunSetup;
    const mailgunSetup = setup({
      apiKey: process.env.mailgunPrivateApiKey,
      publicApiKey: process.env.mailgunPublicValidationKey,
      domain: process.env.mailgunDomain,
    });
    const validate = mailgunValidateAddress(tokenDecrypt.email);
    try {
      const response = await axios.get(validate);
      const validationResult = response.data.is_valid;
      if (validationResult) {
        try {
          await this.service.update(
            { isEmailValidated: true },
            { email: tokenDecrypt.email }
          );
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
          to: tokenDecrypt.email,
          subject: 'Welcome to Kurir.id',
          html:
            '<h1>Your email has been verified! Thank your for being awesome and being part of Kurir.id</h1>',
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
      } else {
        res.status(400).json(
          new ResponseBuilder()
            .setMessage(response.data.reason)
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
  }

  async sendRegisValidationLink(req, res) {
    const { email } = req.body;
    const setup = this.service.mailgunSetup;
    const mailgunSetup = setup({
      apiKey: process.env.mailgunPrivateApiKey,
      publicApiKey: process.env.mailgunPublicValidationKey,
      domain: process.env.mailgunDomain,
    });

    const emailToken = jwt.sign({ email }, process.env.SECRET, {
      expiresIn: '1h',
      issuer: 'kurir-id-backend',
      subject: 'email-validation',
    });

    const verificationLink = `${
      config.domain.base_url
    }/api/mail/check-email-is-valid?token=${emailToken}`;

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
}
