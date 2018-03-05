import BaseService from './BaseService';
import models from '../models';

export default class ItemService extends BaseService {
  /**
   * Item specific service class
   */
  constructor() {
    super(models.Item);
  }

  generateTicketNumber() {
    return Date.now();
  }
}
