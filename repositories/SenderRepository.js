import Repository from './Repository';
import models from '../models';

export default class SenderRepository extends Repository {
  /**
   * Sender repository
   */
  constructor() {
    super(models.Sender);
  }
}