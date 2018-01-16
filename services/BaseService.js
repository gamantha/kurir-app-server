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
  async findAll() {
    const response = await this.model.findAll();
    if (response) {
      return response;
    }
    throw Error('fail to fetch data');
  }

  /**
   * Get row by condition
   * @param {Object} payload
   * @param {func} callback
   */
  async findOne(payload) {
    const response = await this.model.findOne({ where: payload });
    if (response) {
      return response;
    }
    throw Error('data not found');
  }

  /**
   * insert a new row
   * @param {Object} payload
   * @param {func} callback
   */
  async create(payload) {
    const response = await this.model.create(payload);
    if (response) {
      return response;
    }
    throw Error('fail to insert data');
  }

  /**
   * Delete rows by condition
   * @param {Object} payload
   * @param {func} callback
   */
  async destroy(payload) {
    const response = await this.model.destroy({ where: payload });
    if (response > 0) {
      return response;
    }
    throw Error('data not found');
  }

  /**
   * Update specific rows by identifier
   * @param {Object} payload
   * @param {Object} identifier
   * @param {func} callback
   */
  async update(payload, identifier) {
    const affected = await this.model.update(payload, { where: identifier });
    if (affected > 0) {
      const row = await this.model.findOne({ where: identifier });
      return row;
    }
    throw Error('row not found');
  }
}
