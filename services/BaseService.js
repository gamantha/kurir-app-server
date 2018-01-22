export default class BaseService {
  /**
   * Base service class providing common used operations
   * on business logic side.
   * @param {Repository} repository
   */
  constructor(repository) {
    this.repository = repository;
  }

  /**
   * Fetch all rows.
   * @param {Array} attributes
   * @param {Array} orders
   */
  async findAll(attributes = {}, orders = ['id', 'ASC']) {
    return await this.repository.findAll(attributes, orders);
  }

  /**
   * Get row by condition
   * @param {Object} payload
   */
  async findOne(payload) {
    return await this.repository.findOne(payload);
  }

  /**
   * insert a new row
   * @param {Object} payload
   */
  async create(payload) {
    return await this.repository.create(payload);
  }

  /**
   * Delete rows by condition
   * @param {Object} payload
   */
  async destroy(payload) {
    return await this.repository.destroy(payload);
  }

  /**
   * Update specific rows by identifier
   * @param {Object} payload
   * @param {Object} identifier
   */
  async update(payload, identifier) {
    return await this.repository.update(payload, identifier);
  }

  /**
   * Paginate fetch result.
   * @param {Request} req
   * @param {Integer} limit
   * @param {Array} orders
   * @param {Array} attributes
   */
  async paginate(req, page = 1, limit, orders, attributes) {
    return await this.repository.paginate(req, page, limit, orders, attributes);
  }
}
