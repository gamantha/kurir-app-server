export default class BaseService {
  /**
   * Base service class providing common used operations
   * @param {Model} model
   */
  constructor(model) {
    this.model = model;
  }

  /**
   * get all rows
   * @param {func} callback
   */
  findAll(callback) {
    this.model.findAll().then(callback);
  }

  /**
   * Get row by condition
   * @param {Object} payload
   * @param {func} callback
   */
  findOne(payload, callback) {
    this.model.findOne({
      payload,
    }).then(callback);
  }

  /**
   * insert a new row
   * @param {Object} payload
   * @param {func} callback
   */
  create(payload, callback) {
    this.model.create(payload).then(callback);
  }
}
