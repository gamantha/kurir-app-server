import BaseService from './BaseService';
import randtoken from 'rand-token';
import models from '../models';
import mailgun from 'mailgun-js';

export default class MailBuilder extends BaseService {
  constructor() {
    super(models.User);
    this.meta = {
      message: 'success',
      success: true,
    };
    this.verifCodeGenerator = randtoken;
    this.mailgunSetup = mailgun;
    this.mailgunMsg = {
      from: null,
      to: null,
      subject: null,
      html: null,
    };
    this.data = {};
  }
}
