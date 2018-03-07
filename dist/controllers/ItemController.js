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

var ItemController = function () {
  /**
   * Item Controller
   */
  function ItemController() {
    (0, _classCallCheck3.default)(this, ItemController);

    this.service = new _index.ItemService();
    this.receiverService = new _index.ReceiverService();
  }

  (0, _createClass3.default)(ItemController, [{
    key: 'create',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var _req$body, from, to, weight, country, city, address, itemName, note, reward, category, type, cost, receiverName, email, phone, senderId, ticketNumber, status, receiverPayload, receiver, itemPayload, item;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, from = _req$body.from, to = _req$body.to, weight = _req$body.weight, country = _req$body.country, city = _req$body.city, address = _req$body.address, itemName = _req$body.itemName, note = _req$body.note, reward = _req$body.reward, category = _req$body.category, type = _req$body.type, cost = _req$body.cost, receiverName = _req$body.receiverName, email = _req$body.email, phone = _req$body.phone;
                senderId = res.locals.user.id;
                ticketNumber = this.service.generateTicketNumber();
                status = 'stillWaitingCourier';
                _context.prev = 4;
                receiverPayload = {
                  name: receiverName,
                  email: email,
                  phone: phone
                };
                _context.next = 8;
                return this.receiverService.create(receiverPayload);

              case 8:
                receiver = _context.sent;
                itemPayload = {
                  address: address,
                  ticketNumber: ticketNumber,
                  city: city,
                  country: country,
                  senderId: senderId,
                  status: status,
                  name: itemName,
                  from: from,
                  to: to,
                  note: note,
                  reward: reward,
                  category: category,
                  type: type,
                  weight: weight,
                  cost: cost,
                  ReceiverId: receiver.id
                };
                _context.next = 12;
                return this.service.create(itemPayload);

              case 12:
                item = _context.sent;

                res.status(201).json(new _ResponseBuilder2.default().setData(item).build());
                _context.next = 19;
                break;

              case 16:
                _context.prev = 16;
                _context.t0 = _context['catch'](4);

                res.status(400).json(new _ResponseBuilder2.default().setMessage(_context.t0.message).setSuccess(false).build());

              case 19:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 16]]);
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
        var _req$query, page, limit, fields, order, include, response;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _req$query = req.query, page = _req$query.page, limit = _req$query.limit, fields = _req$query.fields, order = _req$query.order;
                include = this.service.returnInclude();
                _context2.next = 5;
                return this.service.paginate(req, page, limit, order, fields, include);

              case 5:
                response = _context2.sent;

                res.status(200).json(new _ResponseBuilder2.default().setData(response.data).setTotal(response.total).setCount(response.count).setLinks(response.links).build());
                _context2.next = 12;
                break;

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2['catch'](0);

                res.status(400).json(new _ResponseBuilder2.default().setMessage(_context2.t0.message).setSuccess(false).build());

              case 12:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 9]]);
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
        var id, include, response;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = req.params.id;
                include = this.service.returnInclude();
                _context3.prev = 2;
                _context3.next = 5;
                return this.service.findOne({ ticketNumber: id }, include);

              case 5:
                response = _context3.sent;

                if (response !== null) {
                  res.status(200).json(new _ResponseBuilder2.default().setData(response).build());
                } else {
                  res.status(404).json(new _ResponseBuilder2.default().setMessage('data not found').setSuccess(false).build());
                }
                _context3.next = 12;
                break;

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3['catch'](2);

                res.status(404).json(new _ResponseBuilder2.default().setMessage(_context3.t0.message).setSuccess(false).build());

              case 12:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 9]]);
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
                return this.service.destroy({ ticketNumber: id });

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
        var id, _req$body2, address, city, country, senderId, courierId, from, to, ReceiverId, itemName, note, reward, status, category, type, weight, cost, receiverName, email, phone, receiverPayload, itemPayload, receiver, item;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                id = req.params.id;
                _req$body2 = req.body, address = _req$body2.address, city = _req$body2.city, country = _req$body2.country, senderId = _req$body2.senderId, courierId = _req$body2.courierId, from = _req$body2.from, to = _req$body2.to, ReceiverId = _req$body2.ReceiverId, itemName = _req$body2.itemName, note = _req$body2.note, reward = _req$body2.reward, status = _req$body2.status, category = _req$body2.category, type = _req$body2.type, weight = _req$body2.weight, cost = _req$body2.cost, receiverName = _req$body2.receiverName, email = _req$body2.email, phone = _req$body2.phone;
                _context5.prev = 2;
                receiverPayload = {
                  name: receiverName,
                  email: email,
                  phone: phone
                };
                itemPayload = {
                  address: address,
                  city: city,
                  country: country,
                  senderId: senderId,
                  courierId: courierId,
                  status: status,
                  name: itemName,
                  from: from,
                  to: to,
                  note: note,
                  reward: reward,
                  category: category,
                  type: type,
                  weight: weight,
                  cost: cost,
                  ReceiverId: ReceiverId
                };
                _context5.next = 7;
                return this.receiverService.update(receiverPayload, {
                  id: ReceiverId
                }, {
                  returning: true,
                  plain: true
                });

              case 7:
                receiver = _context5.sent;
                _context5.next = 10;
                return this.service.update(itemPayload, { ticketNumber: id }, {
                  returning: true,
                  plain: true
                });

              case 10:
                item = _context5.sent;

                res.status(200).json(new _ResponseBuilder2.default().setData({ item: item, receiver: receiver }).build());
                _context5.next = 17;
                break;

              case 14:
                _context5.prev = 14;
                _context5.t0 = _context5['catch'](2);

                res.status(404).json(new _ResponseBuilder2.default().setMessage(_context5.t0.message).setSuccess(false).build());

              case 17:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[2, 14]]);
      }));

      function update(_x9, _x10) {
        return _ref5.apply(this, arguments);
      }

      return update;
    }()
  }]);
  return ItemController;
}();

exports.default = ItemController;