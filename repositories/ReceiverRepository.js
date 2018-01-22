import Repository from './Repository';
import models from '../models';

export default class ReceiverRepository extends Repository {
  /**
   * Sender repository
   */
  constructor() {
    super(models.Receiver);
  }
}