import BaseService from './BaseService';
import models from '../models';

export default class AdminService extends BaseService {
  /**
   * User specific service class
   */
  constructor() {
    super(models.Admin);
  }
}
