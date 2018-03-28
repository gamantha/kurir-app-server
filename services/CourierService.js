import BaseService from './BaseService';
import models from '../models';

export default class CourierService extends BaseService {
  /**
   * Courier specific service class
   */
  constructor() {
    super(models.Courier);
  }
}
