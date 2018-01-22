import ReceiverRepository from '../repositories/ReceiverRepository';
import BaseService from './BaseService';

export default class ReceiverService extends BaseService {
  /**
   * Receiver specific service class
   */
  constructor() {
    super(new ReceiverRepository());
  }
}
