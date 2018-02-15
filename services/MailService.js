import axios from 'axios';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import BaseService from './BaseService';
import randtoken from 'rand-token';
import models from '../models';
import mailgun from 'mailgun-js';
import config from '../config/config.json';

import { buildEmailValidationUri } from '../helpers/constants';

export default class MailService extends BaseService {
  constructor() {
    super(models.User);
  }

  /**
   * Set credentials for mailgun service.
   */
  setAuth() {
    return mailgun({
      apiKey: process.env.mailgunPrivateApiKey,
      publicApiKey: process.env.mailgunPublicValidationKey,
      domain: process.env.mailgunDomain,
    });
  }

  /**
   * Send the template using mailgun service
   *
   * TODO Handle if mailgun server does not process the request
   * @param  {Object} message Email template for mailgun
   * @return {Mixed}
   *
   */
  async sendMailgunEmail(message) {
    const mail = this.setAuth();
    try {
      return await mail.messages().send(message);
    } catch (error) {
      throw Error(error);
    }
  }

  /**
   * Generate random number
   *
   * @return {Number} Random number
   */
  verificationCodeGenerator() {
    return randtoken
      .generator({
        source: 'math',
        chars: 'numeric',
      })
      .generate(6);
  }

  /**
   * Set mailgun template accordingly.
   *
   * @param {String} email    user email
   * @param {String} template will be used to determine the template
   * @param {Mixed} payload
   *
   * @return {Object}
   */
  setMailgunTemplate(email, template, payload) {
    let html, subject;
    if (template === 'code') {
      html = `<b>This is your verification code number. Do not share it with anyone.</b> ${payload}`;
      subject = 'Your verification code for Kurir.id forgot password';
    }
    if (template === 'welcome') {
      html =
        '<h1>Your email has been verified! Thank your for being awesome and being part of Kurir.id</h1>';
      subject = 'Welcome to Kurir.id';
    }
    if (template === 'link') {
      html = `Please verify your account by clicking on this link <u>${payload}</u>`;
      subject = 'Email Verification for Newly Onboarding User';
    }
    if (template === 'change-password') {
      html = `<div>This email inform you that you have successfully change your password.
       Here are your new password: <b>${payload}</b>
       Please keep it in safe place. </div>`;
      subject = 'Change password information';
    }
    if (template == 'reactivate-account') {
      html = `Please reactivate your account by clicking on this link <u>${payload}</u>`;
    }

    return {
      from: 'Kurir.id <noreply@kurir.id>',
      to: email,
      subject: subject,
      html: html,
    };
  }

  decodeToken(token) {
    return jwt.verify(token, process.env.SECRET).email;
  }

  /**
   * Check whether email is valid or not using mailgun services.
   *
   * @param  {String}  email
   * @return {Boolean}
   */
  async checkEmail(email) {
    const validateEmailUri = buildEmailValidationUri(email);
    const validEmail = await axios.get(validateEmailUri);

    if (validEmail && validEmail.data && validEmail.data.is_valid) {
      const updateValidEmail = await this.update(
        { isEmailValidated: true },
        { email: email }
      );

      if (updateValidEmail) {
        const welcomeMessage = this.setMailgunTemplate(email, 'welcome', null);
        await this.sendMailgunEmail(welcomeMessage);
        return true;
      }
      return false;
    }

    return false;
  }

  /**
   * Send an email verification to registered user.
   *
   * @param  {String}  email
   * @return {Boolean}
   */
  async sendRegisValidationLink(email) {
    const tokenifyEmail = jwt.sign({ email }, process.env.SECRET, {
      expiresIn: '1h',
      issuer: 'kurir-id-backend',
      subject: 'email-validation',
    });
    const userEmail = await this.findOne({ email });

    if (userEmail) {
      const verificationLink = `${
        config.domain.base_url
      }/api/mail/tokens/${tokenifyEmail}`;

      const verificationMessage = this.setMailgunTemplate(
        email,
        'link',
        verificationLink
      );

      await this.sendMailgunEmail(verificationMessage);
      return true;
    }

    return false;
  }

  /**
   * Send an email verification to registered user.
   *
   * @param  {String}  email
   * @return {Boolean}
   */
  async sendReactivateAccountLink(email) {
    const token = jwt.sign({ email }, process.env.SECRET, {
      expiresIn: '1h',
      issuer: 'courier.id-backend',
      jwtid: 'courier.user',
      subject: 'reactivate-account',
    });
    try {
      const userEmail = await this.findOne({ email });
      if (userEmail) {
        const verificationLink = `${
          config.domain.base_url
        }/api/mail/tokens/${token}`;

        const verificationMessage = this.setMailgunTemplate(
          email,
          'reactivate-account',
          verificationLink
        );
        try {
          await this.sendMailgunEmail(verificationMessage);
          return true;
        } catch (error) {
          throw Error(error);
        }
      } else {
        return false;
      }
    } catch (error) {
      throw Error(error);
    }
  }

  /**
   * Send verification code to the email when user forgot the password
   *
   * @param  {String}  email [description]
   * @return {Promise}       [description]
   */
  async sendVerificationCode(email) {
    const userEmail = await this.findOne({ email });

    if (userEmail) {
      const verificationCode = this.verificationCodeGenerator();
      const updatedEmail = await this.update(
        { forgotPassVeriCode: verificationCode },
        { email }
      );
      if (updatedEmail) {
        const verifCodeMsg = this.setMailgunTemplate(
          email,
          'code',
          verificationCode
        );
        await this.sendMailgunEmail(verifCodeMsg);
        return true;
      }
      return false;
    }

    return false;
  }

  /**
   * Change user password.
   *
   * @param  {String}  email
   * @param  {String}  password
   * @return {Boolean}
   */
  async changePassword(email, password) {
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);

    const userEmail = await this.findOne({ email });

    if (userEmail) {
      const updatedPassword = await this.update({ password: hash }, { email });
      if (updatedPassword) {
        const passwordUpdatedMessage = this.setMailgunTemplate(
          email,
          'change-password',
          password
        );
        await this.sendMailgunEmail(passwordUpdatedMessage);
        return true;
      }
      return false;
    }
    return false;
  }
}
