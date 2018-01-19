import BaseService from './BaseService';
import models from '../models';

export default class SenderService extends BaseService {
  /**
   * Sender specific service class
   */
  constructor() {
    super(models.Sender);
  }
}
