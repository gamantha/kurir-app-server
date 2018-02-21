import config from '../config/config.json';

export default class BaseService {
  /**
   * Base service class providing common used operations
   * @param {Model} model
   */
  constructor(model) {
    this.model = model;
  }

  /**
   * Fetch all rows.
   * @param {Array} attributes
   * @param {Array} orders
   */
  async findAll(attributes = {}, orders = ['id', 'ASC']) {
    try {
      const response = await this.model.findAll({
        attributes,
        order: [orders],
      });
      if (response) {
        return response;
      }
      throw Error('fail to fetch data');
    } catch (error) {
      throw error.message;
    }
  }

  /**
   * Get row by condition
   * @param {Object} payload
   */
  async findOne(payload) {
    try {
      const response = await this.model.findOne({ where: payload });
      if (response) {
        return response;
      } else {
        return null;
      }
    } catch (error) {
      throw Error(error.message);
    }
  }

  /**
   * insert a new row
   * @param {Object} payload
   */
  async create(payload) {
    try {
      const response = await this.model.create(payload);
      if (response) {
        return response;
      }
      throw Error('fail to insert data');
    } catch (error) {
      throw Error(error.message);
    }
  }

  /**
   * Delete rows by condition
   * @param {Object} payload
   */
  async destroy(payload) {
    try {
      const response = await this.model.destroy({ where: payload });
      if (response > 0) {
        return response;
      }
      throw Error('data not found');
    } catch (error) {
      throw Error(error.message);
    }
  }

  /**
   * Update specific rows by identifier
   * @param {Object} payload
   * @param {Object} identifier
   * @param {Object} options
   */
  async update(payload, identifier, options) {
    try {
      const affected = await this.model.update(
        payload,
        { where: identifier },
        options
      );
      if (affected > 0) {
        try {
          const row = await this.model.findOne({ where: identifier });
          return row;
        } catch (error) {
          throw Error(error.message);
        }
      }
    } catch (error) {
      throw Error(error.message);
    }
    throw Error('fail to update row');
  }

  /**
   * Paginate fetch result.
   * @param {Request} req
   * @param {Integer} limit
   * @param {Array} orders
   * @param {Array} attributes
   */
  async paginate(req, page = 1, limit, orders, attributes) {
    limit = typeof limit !== 'undefined' ? parseInt(limit) : 10;
    attributes = typeof attributes !== 'undefined' ? attributes.split(',') : {};
    const order =
      typeof orders !== 'undefined'
        ? BaseService.parseOrder(orders)
        : ['id', 'ASC'];
    const offset = typeof page !== 'undefined' ? (page - 1) * limit : page;
    try {
      const response = await this.model.findAndCountAll({
        attributes,
        limit,
        offset,
        order: [order],
      });
      try {
        const lastPage = Math.ceil(response.count / limit);
        const links = await BaseService.generateLinks(
          page,
          lastPage,
          req.baseUrl,
          limit,
          orders,
          attributes,
        );
        if (response) {
          return {
            data: response.rows,
            links,
            count: page < lastPage ? limit : response.count % limit,
            total: response.count,
          };
        }
      } catch (error) {
        throw Error(error.message);
      }
    } catch (error) {
      throw Error(error.message);
    }
    throw Error('Paginating fail to execute');
  }

  /**
   * parse order string, (-) for descending order
   * and default for ascending ordering.
   * @param {String} string
   */
  static parseOrder(string) {
    if (string[0] === '-') {
      return [string.slice(1), 'DESC'];
    }
    return [string, 'ASC'];
  }

  /**
   * Get links for pagination
   * @param {Integer} page
   * @param {Integer} lastPage
   * @param {String} url
   */
  static generateLinks(page, lastPage, url, limit, orders, attributes) {
    return new Promise((resolve, reject) => {
      if (page === 0) {
        reject(new Error('page cannot be 0'));
      }
      const baseUrl = `${config.domain.base_url}${url}?page=`;
      orders = typeof orders === 'undefined' ? '' : `&order=${orders}`;
      attributes = Object.keys(attributes).length === 0 ? '' : `&fields=${attributes.toString()}`
      const params = `&limit=${limit}${orders}${attributes}`
      const links = {
        prev: null,
        next: null,
        last: `${baseUrl}${lastPage}${params}`,
        curr: `${baseUrl}${page}${params}`,
      };
      if (page > 1) {
        links.prev = `${baseUrl}${(parseInt(page) - 1)}${params}`;
      }
      if (page < lastPage) {
        links.next = `${baseUrl}${(parseInt(page) + 1)}${params}`;
      }
      resolve(links);
    });
  }
}
