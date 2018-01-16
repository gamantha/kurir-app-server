import BaseService from './BaseService';
import models from '../models';

export default class ReceiverService extends BaseService {
  /**
    * Receiver specific service class
    */
  constructor() {
    super(models.Receiver);
  }
}
