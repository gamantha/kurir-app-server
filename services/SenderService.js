import SenderRepository from '../repositories/SenderRepository';
import BaseService from './BaseService';

export default class SenderService extends BaseService {
  /**
   * Sender specific service class
   */
  constructor() {
    super(new SenderRepository());
  }
}
