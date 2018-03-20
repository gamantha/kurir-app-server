'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
  development: {
    username: 'postgres',
    password: '12345',
    database: 'kurir_mobile',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    password: '12345',
    database: 'kurir_test',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL'
  },
  domain: {
    base_url: 'BASE_URL'
  }
};

var BaseService = function () {
  /**
   * Base service class providing common used operations
   * @param {Model} model
   */
  function BaseService(model) {
    (0, _classCallCheck3.default)(this, BaseService);

    this.model = model;
  }

  /**
   * Fetch all rows.
   * @param {Array} attributes
   * @param {Array} orders
   */


  (0, _createClass3.default)(BaseService, [{
    key: 'findAll',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var orders = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['id', 'ASC'];
        var response;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.model.findAll({
                  attributes: attributes,
                  order: [orders]
                });

              case 3:
                response = _context.sent;

                if (!response) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt('return', response);

              case 6:
                throw Error('fail to fetch data');

              case 9:
                _context.prev = 9;
                _context.t0 = _context['catch'](0);
                throw _context.t0.message;

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 9]]);
      }));

      function findAll() {
        return _ref.apply(this, arguments);
      }

      return findAll;
    }()

    /**
     * Get row by condition
     * @param {Object} payload
     * @param {Array} options
     */

  }, {
    key: 'findOne',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(payload, options) {
        var response;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.model.findOne({
                  include: options,
                  where: payload
                });

              case 3:
                response = _context2.sent;

                if (!response) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt('return', response);

              case 8:
                return _context2.abrupt('return', null);

              case 9:
                _context2.next = 14;
                break;

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2['catch'](0);
                throw Error(_context2.t0.message);

              case 14:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 11]]);
      }));

      function findOne(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return findOne;
    }()

    /**
     * insert a new row
     * @param {Object} payload
     */

  }, {
    key: 'create',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(payload) {
        var response;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return this.model.create(payload);

              case 3:
                response = _context3.sent;

                if (!response) {
                  _context3.next = 6;
                  break;
                }

                return _context3.abrupt('return', response);

              case 6:
                throw Error('fail to insert data');

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3['catch'](0);
                throw Error(_context3.t0.message);

              case 12:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 9]]);
      }));

      function create(_x5) {
        return _ref3.apply(this, arguments);
      }

      return create;
    }()

    /**
     * Delete rows by condition
     * @param {Object} payload
     */

  }, {
    key: 'destroy',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(payload) {
        var response;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return this.model.destroy({ where: payload });

              case 3:
                response = _context4.sent;

                if (!(response > 0)) {
                  _context4.next = 6;
                  break;
                }

                return _context4.abrupt('return', response);

              case 6:
                throw Error('data not found');

              case 9:
                _context4.prev = 9;
                _context4.t0 = _context4['catch'](0);
                throw Error(_context4.t0.message);

              case 12:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 9]]);
      }));

      function destroy(_x6) {
        return _ref4.apply(this, arguments);
      }

      return destroy;
    }()

    /**
     * Update specific rows by identifier
     * @param {Object} payload
     * @param {Object} identifier
     * @param {Object} options
     */

  }, {
    key: 'update',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(payload, identifier, options) {
        var affected, row;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return this.model.update(payload, { where: identifier }, options);

              case 3:
                affected = _context5.sent;

                if (!(affected > 0)) {
                  _context5.next = 15;
                  break;
                }

                _context5.prev = 5;
                _context5.next = 8;
                return this.model.findOne({ where: identifier });

              case 8:
                row = _context5.sent;
                return _context5.abrupt('return', row);

              case 12:
                _context5.prev = 12;
                _context5.t0 = _context5['catch'](5);
                throw Error(_context5.t0.message);

              case 15:
                _context5.next = 20;
                break;

              case 17:
                _context5.prev = 17;
                _context5.t1 = _context5['catch'](0);
                throw Error(_context5.t1.message);

              case 20:
                throw Error('fail to update row');

              case 21:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 17], [5, 12]]);
      }));

      function update(_x7, _x8, _x9) {
        return _ref5.apply(this, arguments);
      }

      return update;
    }()

    /**
     * Paginate fetch result.
     * @param {Request} req
     * @param {Integer} limit
     * @param {Array} orders
     * @param {Array} attributes
     * @param {Array} options
     */

  }, {
    key: 'paginate',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req) {
        var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        var limit = arguments[2];
        var orders = arguments[3];
        var attributes = arguments[4];
        var options = arguments[5];
        var condition = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : '';
        var order, offset, response, lastPage, links;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                limit = typeof limit !== 'undefined' ? parseInt(limit) : 10;
                attributes = typeof attributes !== 'undefined' ? attributes.split(',') : {};
                order = typeof orders !== 'undefined' ? BaseService.parseOrder(orders) : ['id', 'ASC'];
                offset = typeof page !== 'undefined' ? (page - 1) * limit : page;
                _context6.prev = 4;
                _context6.next = 7;
                return this.model.findAndCountAll({
                  where: condition,
                  include: options,
                  attributes: attributes,
                  limit: limit,
                  offset: offset,
                  order: [order]
                });

              case 7:
                response = _context6.sent;
                _context6.prev = 8;
                lastPage = Math.ceil(response.count / limit);
                _context6.next = 12;
                return BaseService.generateLinks(page, lastPage, req.baseUrl, limit, orders, attributes);

              case 12:
                links = _context6.sent;

                if (!response) {
                  _context6.next = 15;
                  break;
                }

                return _context6.abrupt('return', {
                  data: response.rows,
                  links: links,
                  count: page < lastPage ? limit : response.count % limit,
                  total: response.count
                });

              case 15:
                _context6.next = 20;
                break;

              case 17:
                _context6.prev = 17;
                _context6.t0 = _context6['catch'](8);
                throw Error(_context6.t0.message);

              case 20:
                _context6.next = 25;
                break;

              case 22:
                _context6.prev = 22;
                _context6.t1 = _context6['catch'](4);
                throw Error(_context6.t1.message);

              case 25:
                throw Error('Paginating fail to execute');

              case 26:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[4, 22], [8, 17]]);
      }));

      function paginate(_x12) {
        return _ref6.apply(this, arguments);
      }

      return paginate;
    }()

    /**
     * parse order string, (-) for descending order
     * and default for ascending ordering.
     * @param {String} string
     */

  }], [{
    key: 'parseOrder',
    value: function parseOrder(string) {
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

  }, {
    key: 'generateLinks',
    value: function generateLinks(page, lastPage, url, limit, orders, attributes) {
      return new Promise(function (resolve, reject) {
        if (page === 0) {
          reject(new Error('page cannot be 0'));
        }
        var baseUrl = '' + config.domain.base_url + url + '?page=';
        orders = typeof orders === 'undefined' ? '' : '&order=' + orders;
        attributes = Object.keys(attributes).length === 0 ? '' : '&fields=' + attributes.toString();
        var params = '&limit=' + limit + orders + attributes;
        var links = {
          prev: null,
          next: null,
          last: '' + baseUrl + lastPage + params,
          curr: '' + baseUrl + page + params
        };
        if (page > 1) {
          links.prev = '' + baseUrl + (parseInt(page) - 1) + params;
        }
        if (page < lastPage) {
          links.next = '' + baseUrl + (parseInt(page) + 1) + params;
        }
        resolve(links);
      });
    }
  }]);
  return BaseService;
}();

exports.default = BaseService;