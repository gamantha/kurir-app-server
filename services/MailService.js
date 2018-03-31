// import axios from 'axios';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { advTemplate, simpleTemplate, mediumTemplate } from '../helpers/email';
import BaseService from './BaseService';
import randtoken from 'rand-token';
import models from '../models';
import mailgun from 'mailgun-js';
import config from '../config/config.json';

// import { buildEmailValidationUri } from '../helpers/constants';

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
      html = simpleTemplate(payload, 'Don\'t share this code with anyone.');
      subject = 'Your verification code for Kurir.id forgot password';
    }
    if (template === 'welcome') {
      html = advTemplate(
        'Curious?',
        'How Kurir.id works',
        'Thank you! You had successfully activate your email. Now you can use our service. Wondering why you will be happy using Kurir.id? You can take a look at our detailed information by clicking the link below.',
        payload,
        'https://s3-ap-southeast-1.amazonaws.com/kurir-assets/thumbsup.gif'
      );
      // '<h1>Your email has been verified! Thank your for being awesome and being part of Kurir.id</h1>';
      subject = 'Welcome to Kurir.id';
    }
    if (template === 'link') {
      html = advTemplate(
        'Activate',
        'Welcome to Kurir.id!',
        'We pleased and happy to be able to giving you an easy and cheap service for your package and courier needs. We want you to have the best experience for using Kurir.id, so please activate your account by clicking the button below. <i>Note: this link will expire in 1 hour</i>',
        payload,
        'https://s3-ap-southeast-1.amazonaws.com/kurir-assets/welcome.gif'
      );
      subject = 'Email Verification for new user';
    }
    if (template === 'change-password') {
      html = `<div>This email inform you that you have successfully change your password.
       Here are your new password: <b>${payload}</b>
       Please keep it in safe place. </div>`;
      subject = 'Change password information';
    }
    if (template === 'reactivate-account') {
      html = `Please reactivate your account by clicking on this link <u>${payload}</u>`;
      subject = 'Reactivate account';
    }
    if (template === 'again') {
      html = simpleTemplate('Your new email verification link', payload);
      subject = 'Your new email verification link';
    }
    if (template === 'stillWaitingCourier') {
      html = mediumTemplate(
        'Package Status Updated',
        `Thank you for sending your item with Kurir.id! Please keep the ticket number of this package: <strong> ${payload}.</strong> The status of this package is: <strong>still waiting for a courier to pick it up.</strong> You will receive another update soon.`,
        'https://s3-ap-southeast-1.amazonaws.com/kurir-assets/email-status.png'
      );
      subject = `Package status for ${payload}`;
    }
    if (template === 'pickedByCourier') {
      html = mediumTemplate(
        'Package Status Updated',
        `We inform you that the package status with ticket number of ${payload} is: <strong>Has been picked up by a courier.</strong> You will receive another update soon.`,
        'https://s3-ap-southeast-1.amazonaws.com/kurir-assets/email-status.png'
      );
      subject = `Package status for ${payload}`;
    }
    if (template === 'startDroppoint') {
      html = mediumTemplate(
        'Package Status Updated',
        `We inform you that the package status with ticket number of ${payload} is: <strong>Arrived at origin airport droppoint.</strong> You will receive another update soon.`,
        'https://s3-ap-southeast-1.amazonaws.com/kurir-assets/email-status.png'
      );
      subject = `Package status for ${payload}`;
    }
    if (template === 'onTravel') {
      html = mediumTemplate(
        'Package Status Updated',
        `We inform you that the package status with ticket number of ${payload} is: <strong>On the way to arrival airport droppoint.</strong> You will receive another update soon.`,
        'https://s3-ap-southeast-1.amazonaws.com/kurir-assets/email-status.png'
      );
      subject = `Package status for ${payload}`;
    }
    if (template === 'endDroppoint') {
      html = mediumTemplate(
        'Package Status Updated',
        `We inform you that the package status with ticket number of ${payload} is: <strong>Arrived at destination airport droppoint.</strong> You will receive another update soon.`,
        'https://s3-ap-southeast-1.amazonaws.com/kurir-assets/email-status.png'
      );
      subject = `Package status for ${payload}`;
    }
    if (template === 'ontheway') {
      html = mediumTemplate(
        'Package Status Updated',
        `We inform you that the package status with ticket number of ${payload} is: <strong>On the way to receiver address.</strong> You will receive another update soon.`,
        'https://s3-ap-southeast-1.amazonaws.com/kurir-assets/email-status.png'
      );
      subject = `Package status for ${payload}`;
    }
    if (template === 'received') {
      html = mediumTemplate(
        'Package Status Updated',
        `We inform you that the package status with ticket number of ${payload} is: <strong>Package successfully received by the receiver.</strong> You will receive another update soon.`,
        'https://s3-ap-southeast-1.amazonaws.com/kurir-assets/email-status.png'
      );
      subject = `Package status for ${payload}`;
    }

    return {
      from: 'Kurir.id <noreply@kurir.id>',
      to: email,
      subject: subject,
      html: html,
    };
  }

  async decodeToken(token) {
    try {
      const result = jwt.verify(token, process.env.SECRET).email;
      return result;
    } catch (error) {
      return error.message;
    }
  }

  /**
   * Check whether email is valid or not using mailgun services.
   *
   * @param  {String}  email
   * @return {Boolean}
   */
  async checkEmail(email) {
    try {
      const userEmail = await this.findOne({ email });
      if (!userEmail.dataValues.isEmailValidated) {
        // const validateEmailUri = buildEmailValidationUri(email);
        // console.log(validateEmailUri);
        // const validEmail = await axios.get(validateEmailUri);

        const updateValidEmail = await this.update(
          { isEmailValidated: true },
          { email: email }
        );
        if (updateValidEmail) {
          const welcomeMessage = this.setMailgunTemplate(
            email,
            'welcome',
            `${config.domain.base_url}/article/how-kuririd-works/`
          );
          await this.sendMailgunEmail(welcomeMessage);
          return true;
        }

        return false;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
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
    if (userEmail && !userEmail.dataValues.isEmailValidated) {
      const verificationLink = `${
        config.domain.base_url
      }/api/mail/registration/check/${tokenifyEmail}`;

      const verificationMessage = this.setMailgunTemplate(
        email,
        'link',
        verificationLink
      );

      await this.sendMailgunEmail(verificationMessage);
      return true;
    } else {
      return false;
    }
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

  /**
   * Send email on item status update.
   *
   * @param  {Object} senderEmail, ticketNumber
   * @param  {String} type
   * @return {Boolean}
   */
  async onUpdateItemStatus(payload, type) {
    try {
      const message = this.setMailgunTemplate(
        payload.senderEmail,
        type,
        payload.ticketNumber
      );
      await this.sendMailgunEmail(message);
      return true;
    } catch (error) {
      throw Error(error.message);
    }
  }

  /**
   * Send an email verification again to registered user.
   *
   * @param  {String}  email
   * @return {Boolean}
   */
  async sendRegisValidationLinkAgain(email) {
    const tokenifyEmail = jwt.sign({ email }, process.env.SECRET, {
      expiresIn: '1h',
      issuer: 'kurir-id-backend',
      subject: 'email-validation',
    });
    const userEmail = await this.findOne({ email });
    if (userEmail && !userEmail.dataValues.isEmailValidated) {
      const verificationLink = `${
        config.domain.base_url
      }/api/mail/registration/check/${tokenifyEmail}`;

      const verificationMessage = this.setMailgunTemplate(
        email,
        'again',
        verificationLink
      );

      await this.sendMailgunEmail(verificationMessage);
      return true;
    } else {
      return false;
    }
  }
}
