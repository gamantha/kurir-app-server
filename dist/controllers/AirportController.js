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

var _index = require('../services/index');

var _ResponseBuilder = require('../helpers/ResponseBuilder');

var _ResponseBuilder2 = _interopRequireDefault(_ResponseBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AirportController = function () {
  /**
   * Airport Controller
   */
  function AirportController() {
    (0, _classCallCheck3.default)(this, AirportController);

    this.service = new _index.AirportService();
  }

  (0, _createClass3.default)(AirportController, [{
    key: 'get',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var _req$query, page, limit, fields, order, response, name, iso_country;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _req$query = req.query, page = _req$query.page, limit = _req$query.limit, fields = _req$query.fields, order = _req$query.order;
                response = null;
                name = typeof req.query.name === 'undefined' ? '' : req.query.name;
                iso_country = typeof req.query.iso_country === 'undefined' ? 'ID' : req.query.iso_country;
                _context.next = 7;
                return this.service.paginate(req, page, limit, order, fields, undefined, {
                  name: {
                    ilike: '%' + name + '%'
                  },
                  iso_country: iso_country
                });

              case 7:
                response = _context.sent;

                res.status(200).json(new _ResponseBuilder2.default().setData(response.data).setTotal(response.total).setCount(response.count).setLinks(response.links).build());
                _context.next = 14;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context['catch'](0);

                res.status(400).json(new _ResponseBuilder2.default().setMessage(_context.t0.message).setSuccess(false).build());

              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 11]]);
      }));

      function get(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: 'find',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
        var id, response;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = req.params.id;
                _context2.prev = 1;
                _context2.next = 4;
                return this.service.findOne({ id: id });

              case 4:
                response = _context2.sent;

                if (response !== null) {
                  res.status(200).json(new _ResponseBuilder2.default().setData(response).build());
                } else {
                  res.status(404).json(new _ResponseBuilder2.default().setMessage('data not found').setSuccess(false).build());
                }
                _context2.next = 11;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2['catch'](1);

                res.status(404).json(new _ResponseBuilder2.default().setMessage(_context2.t0.message).setSuccess(false).build());

              case 11:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 8]]);
      }));

      function find(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return find;
    }()
  }]);
  return AirportController;
}();

exports.default = AirportController;