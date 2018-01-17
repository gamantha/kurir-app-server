import BaseService from './BaseService';
import models from '../models';

export default class UserService extends BaseService {
  /**
    * User specific service class
    */
  constructor() {
    super(models.User);
  }
}
