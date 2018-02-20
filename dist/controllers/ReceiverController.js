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

var ReceiverController = function () {
  /**
   * Receiver Controller
   */
  function ReceiverController() {
    (0, _classCallCheck3.default)(this, ReceiverController);

    this.service = new _index.ReceiverService();
  }

  (0, _createClass3.default)(ReceiverController, [{
    key: 'create',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var _req$body, name, address, phone, city, payload, response;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, name = _req$body.name, address = _req$body.address, phone = _req$body.phone, city = _req$body.city;
                payload = {
                  name: name,
                  address: address,
                  phone: phone,
                  city: city
                };
                _context.prev = 2;
                _context.next = 5;
                return this.service.create(payload);

              case 5:
                response = _context.sent;

                res.status(201).json(new _ResponseBuilder2.default().setData(response).build());
                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context['catch'](2);

                res.status(400).json(new _ResponseBuilder2.default().setMessage(_context.t0.message).setSuccess(false).build());

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 9]]);
      }));

      function create(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: 'get',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
        var _req$query, page, limit, fields, order, response;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _req$query = req.query, page = _req$query.page, limit = _req$query.limit, fields = _req$query.fields, order = _req$query.order;
                _context2.next = 4;
                return this.service.paginate(req, page, limit, order, fields);

              case 4:
                response = _context2.sent;

                res.status(200).json(new _ResponseBuilder2.default().setData(response.data).setTotal(response.total).setCount(response.count).setLinks(response.links).build());
                _context2.next = 11;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2['catch'](0);

                res.status(400).json(new _ResponseBuilder2.default().setMessage(_context2.t0.message).setSuccess(false).build());

              case 11:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 8]]);
      }));

      function get(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: 'find',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
        var id, response;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = req.params.id;
                _context3.prev = 1;
                _context3.next = 4;
                return this.service.findOne({ id: id });

              case 4:
                response = _context3.sent;

                if (response !== null) {
                  res.status(200).json(new _ResponseBuilder2.default().setData(response).build());
                } else {
                  res.status(404).json(new _ResponseBuilder2.default().setMessage('data not found').setSuccess(false).build());
                }
                _context3.next = 11;
                break;

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3['catch'](1);

                res.status(404).json(new _ResponseBuilder2.default().setMessage(_context3.t0.message).setSuccess(false).build());

              case 11:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 8]]);
      }));

      function find(_x5, _x6) {
        return _ref3.apply(this, arguments);
      }

      return find;
    }()
  }, {
    key: 'destroy',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
        var id;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                id = req.params.id;
                _context4.prev = 1;
                _context4.next = 4;
                return this.service.destroy({ id: id });

              case 4:
                res.status(200).json(new _ResponseBuilder2.default().setData({}).build());
                _context4.next = 10;
                break;

              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4['catch'](1);

                res.status(404).json(new _ResponseBuilder2.default().setMessage(_context4.t0.message).setSuccess(false).build());

              case 10:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 7]]);
      }));

      function destroy(_x7, _x8) {
        return _ref4.apply(this, arguments);
      }

      return destroy;
    }()
  }, {
    key: 'update',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
        var id, _req$body2, name, address, phone, city, payload, response;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                id = req.params.id;
                _req$body2 = req.body, name = _req$body2.name, address = _req$body2.address, phone = _req$body2.phone, city = _req$body2.city;
                payload = {
                  name: name,
                  address: address,
                  phone: phone,
                  city: city
                };
                _context5.prev = 3;
                _context5.next = 6;
                return this.service.update(payload, { id: id });

              case 6:
                response = _context5.sent;

                res.status(200).json(new _ResponseBuilder2.default().setData(response).build());
                _context5.next = 13;
                break;

              case 10:
                _context5.prev = 10;
                _context5.t0 = _context5['catch'](3);

                res.status(404).json(new _ResponseBuilder2.default().setMessage(_context5.t0.message).setSuccess(false).build());

              case 13:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[3, 10]]);
      }));

      function update(_x9, _x10) {
        return _ref5.apply(this, arguments);
      }

      return update;
    }()
  }]);
  return ReceiverController;
}();

exports.default = ReceiverController;