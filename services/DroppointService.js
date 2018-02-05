import BaseService from './BaseService';
import models from '../models';

export default class DroppointService extends BaseService {
  /**
   * User specific service class
   */
  constructor() {
    super(models.Droppoint);
  }
}
