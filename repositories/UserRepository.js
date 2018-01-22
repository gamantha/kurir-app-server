import Repository from './Repository';
import models from '../models';

export default class UserRepository extends Repository {
  /**
   * User repository
   */
  constructor() {
    super(models.User);
  }
}