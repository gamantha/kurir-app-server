import BaseService from './BaseService';
import models from '../models';

export default class AirportService extends BaseService {
  /**
   * Airport specific service class
   */
  constructor() {
    super(models.Airport);
  }
}
