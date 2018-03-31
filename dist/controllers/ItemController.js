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

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

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
    this.reservetime = 30;
    this.mailService = new _index.MailService();
    this.env = process.env.NODE_ENV;
  }

  (0, _createClass3.default)(ItemController, [{
    key: 'get_history',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var _req$query, page, limit, fields, order, result, _result;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$query = req.query, page = _req$query.page, limit = _req$query.limit, fields = _req$query.fields, order = _req$query.order;

                if (!(res.locals.user.role !== 'sender')) {
                  _context.next = 15;
                  break;
                }

                _context.prev = 2;
                _context.next = 5;
                return this.service.getCourierHistory(req, page, limit, fields, order, res.locals.user.id, res.locals.user.senderId);

              case 5:
                result = _context.sent;

                res.status(200).json(new _ResponseBuilder2.default().setMessage('history retrieved').setData(result).build());
                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context['catch'](2);

                res.status(400).json(new _ResponseBuilder2.default().setMessage(_context.t0.message).setSuccess(false).build());

              case 12:
                return _context.abrupt('return');

              case 15:
                _context.prev = 15;
                _context.next = 18;
                return this.service.getSenderHistory(req, page, limit, fields, order, res.locals.user.senderId);

              case 18:
                _result = _context.sent;

                res.status(200).json(new _ResponseBuilder2.default().setMessage('history retrieved').setData(_result).build());
                _context.next = 25;
                break;

              case 22:
                _context.prev = 22;
                _context.t1 = _context['catch'](15);

                res.status(400).json(new _ResponseBuilder2.default().setMessage(_context.t1.message).setSuccess(false).build());

              case 25:
                return _context.abrupt('return');

              case 26:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 9], [15, 22]]);
      }));

      function get_history(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return get_history;
    }()
  }, {
    key: 'create',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
        var _req$body, from, originCoord, to, destinationCoord, weight, country, city, address, itemName, note, reward, category, type, cost, ticketNumber, status, senderEmail, senderId, itemPayload, item;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _req$body = req.body, from = _req$body.from, originCoord = _req$body.originCoord, to = _req$body.to, destinationCoord = _req$body.destinationCoord, weight = _req$body.weight, country = _req$body.country, city = _req$body.city, address = _req$body.address, itemName = _req$body.itemName, note = _req$body.note, reward = _req$body.reward, category = _req$body.category, type = _req$body.type, cost = _req$body.cost;
                ticketNumber = this.service.generateTicketNumber();
                status = 'stillWaitingCourier';
                senderEmail = res.locals.user.email;
                _context2.prev = 4;

                // const senderId = await this.service.returnSenderId(userId);
                // const receiverPayload = {
                //   name: receiverName,
                //   email,
                //   phone,
                // };
                senderId = res.locals.user.senderId;

                // const receiver = await this.receiverService.create(receiverPayload);

                itemPayload = {
                  address: address,
                  ticketNumber: ticketNumber,
                  city: city,
                  country: country,
                  senderId: senderId,
                  status: status,
                  name: itemName,
                  from: from,
                  originCoord: originCoord,
                  to: to,
                  destinationCoord: destinationCoord,
                  note: note,
                  reward: reward,
                  category: category,
                  type: type,
                  weight: weight,
                  cost: cost
                  // ReceiverId,
                };
                _context2.next = 9;
                return this.service.create(itemPayload);

              case 9:
                item = _context2.sent;

                if (!(this.env !== 'test')) {
                  _context2.next = 13;
                  break;
                }

                _context2.next = 13;
                return this.mailService.onUpdateItemStatus({
                  senderEmail: senderEmail,
                  ticketNumber: item.dataValues.ticketNumber
                }, 'stillWaitingCourier');

              case 13:
                res.status(201).json(new _ResponseBuilder2.default().setData(item).build());
                _context2.next = 19;
                break;

              case 16:
                _context2.prev = 16;
                _context2.t0 = _context2['catch'](4);

                res.status(400).json(new _ResponseBuilder2.default().setMessage(_context2.t0.message).setSuccess(false).build());

              case 19:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[4, 16]]);
      }));

      function create(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: 'get',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
        var _req$query2, page, limit, fields, order, include, response;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _req$query2 = req.query, page = _req$query2.page, limit = _req$query2.limit, fields = _req$query2.fields, order = _req$query2.order;
                include = this.service.returnInclude();
                _context3.next = 5;
                return this.service.paginate(req, page, limit, order, fields, include, {
                  $or: [{
                    reserved: {
                      $lt: (0, _moment2.default)().subtract(this.reservetime, 'minutes').toDate()
                    }
                  }, {
                    reserved: {
                      $eq: null
                    }
                  }]
                });

              case 5:
                response = _context3.sent;

                res.status(200).json(new _ResponseBuilder2.default().setData(response.data).setTotal(response.total).setCount(response.count).setLinks(response.links).build());
                _context3.next = 12;
                break;

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3['catch'](0);

                res.status(400).json(new _ResponseBuilder2.default().setMessage(_context3.t0.message).setSuccess(false).build());

              case 12:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 9]]);
      }));

      function get(_x5, _x6) {
        return _ref3.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: 'get_current_trip',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
        var _req$query3, page, limit, fields, order, _req$body2, from, to, response;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _req$query3 = req.query, page = _req$query3.page, limit = _req$query3.limit, fields = _req$query3.fields, order = _req$query3.order;
                _req$body2 = req.body, from = _req$body2.from, to = _req$body2.to;

                if (!(typeof from === 'undefined' || typeof to === 'undefined')) {
                  _context4.next = 5;
                  break;
                }

                res.status(422).json(new _ResponseBuilder2.default().setMessage('invalid payload').setSuccess(false).build());
                return _context4.abrupt('return');

              case 5:
                _context4.prev = 5;
                _context4.next = 8;
                return this.service.paginate(req, page, limit, order, fields, undefined, {
                  from: from,
                  to: to,
                  $or: [{
                    reserved: {
                      $lt: (0, _moment2.default)().subtract(this.reservetime, 'minutes').toDate()
                    }
                  }, {
                    reserved: {
                      $eq: null
                    }
                  }]
                });

              case 8:
                response = _context4.sent;

                res.status(200).json(new _ResponseBuilder2.default().setData(response.data).setTotal(response.total).setCount(response.count).setLinks(response.links).build());
                _context4.next = 15;
                break;

              case 12:
                _context4.prev = 12;
                _context4.t0 = _context4['catch'](5);

                res.status(400).json(new _ResponseBuilder2.default().setMessage(_context4.t0.message).setSuccess(false).build());

              case 15:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[5, 12]]);
      }));

      function get_current_trip(_x7, _x8) {
        return _ref4.apply(this, arguments);
      }

      return get_current_trip;
    }()
  }, {
    key: 'find',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
        var id, include, response;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                id = req.params.id;
                include = this.service.returnInclude();
                _context5.prev = 2;
                _context5.next = 5;
                return this.service.findOne({
                  ticketNumber: id,
                  $or: [{
                    reserved: {
                      $lt: (0, _moment2.default)().subtract(this.reservetime, 'minutes').toDate()
                    }
                  }, {
                    reserved: {
                      $eq: null
                    }
                  }]
                }, include);

              case 5:
                response = _context5.sent;

                if (response !== null) {
                  res.status(200).json(new _ResponseBuilder2.default().setData(response).build());
                } else {
                  res.status(404).json(new _ResponseBuilder2.default().setMessage('data not found').setSuccess(false).build());
                }
                _context5.next = 12;
                break;

              case 9:
                _context5.prev = 9;
                _context5.t0 = _context5['catch'](2);

                res.status(404).json(new _ResponseBuilder2.default().setMessage(_context5.t0.message).setSuccess(false).build());

              case 12:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[2, 9]]);
      }));

      function find(_x9, _x10) {
        return _ref5.apply(this, arguments);
      }

      return find;
    }()
  }, {
    key: 'destroy',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res) {
        var id;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                id = req.params.id;
                _context6.prev = 1;
                _context6.next = 4;
                return this.service.destroy({ ticketNumber: id });

              case 4:
                res.status(200).json(new _ResponseBuilder2.default().setData({}).build());
                _context6.next = 10;
                break;

              case 7:
                _context6.prev = 7;
                _context6.t0 = _context6['catch'](1);

                res.status(404).json(new _ResponseBuilder2.default().setMessage(_context6.t0.message).setSuccess(false).build());

              case 10:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[1, 7]]);
      }));

      function destroy(_x11, _x12) {
        return _ref6.apply(this, arguments);
      }

      return destroy;
    }()
  }, {
    key: 'reserve',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(req, res) {
        var id, itemPayload, item;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                id = req.params.id;
                _context7.prev = 1;
                itemPayload = {
                  courierId: res.locals.user.id,
                  reserved: Date.now()
                };
                _context7.next = 5;
                return this.service.update(itemPayload, { ticketNumber: id }, {
                  returning: true,
                  plain: true
                });

              case 5:
                item = _context7.sent;

                res.status(200).json(new _ResponseBuilder2.default().setData({ item: item }).build());
                _context7.next = 12;
                break;

              case 9:
                _context7.prev = 9;
                _context7.t0 = _context7['catch'](1);

                res.status(404).json(new _ResponseBuilder2.default().setMessage(_context7.t0.message).setSuccess(false).build());

              case 12:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this, [[1, 9]]);
      }));

      function reserve(_x13, _x14) {
        return _ref7.apply(this, arguments);
      }

      return reserve;
    }()

    /* For updating item, mainly used for item status update
    /* required params:
    /* id: ticketNumber
    /* senderEmail: sender email
    */

  }, {
    key: 'update',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(req, res) {
        var _req$params, id, senderEmail, _req$body3, address, city, country, senderId, courierId, from, originCoord, to, destinationCoord, ReceiverId, itemName, note, reward, status, category, type, weight, cost, itemPayload, item;

        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _req$params = req.params, id = _req$params.id, senderEmail = _req$params.senderEmail;
                _req$body3 = req.body, address = _req$body3.address, city = _req$body3.city, country = _req$body3.country, senderId = _req$body3.senderId, courierId = _req$body3.courierId, from = _req$body3.from, originCoord = _req$body3.originCoord, to = _req$body3.to, destinationCoord = _req$body3.destinationCoord, ReceiverId = _req$body3.ReceiverId, itemName = _req$body3.itemName, note = _req$body3.note, reward = _req$body3.reward, status = _req$body3.status, category = _req$body3.category, type = _req$body3.type, weight = _req$body3.weight, cost = _req$body3.cost;
                _context8.prev = 2;

                // const receiverPayload = {
                //   name: receiverName,
                //   email,
                //   phone,
                // };
                itemPayload = {
                  address: address,
                  city: city,
                  country: country,
                  senderId: senderId,
                  courierId: courierId,
                  status: status,
                  name: itemName,
                  from: from,
                  originCoord: originCoord,
                  to: to,
                  destinationCoord: destinationCoord,
                  note: note,
                  reward: reward,
                  category: category,
                  type: type,
                  weight: weight,
                  cost: cost,
                  ReceiverId: ReceiverId
                };
                // const receiver = await this.receiverService.update(
                //   receiverPayload,
                //   {
                //     id: ReceiverId,
                //   },
                //   {
                //     returning: true,
                //     plain: true,
                //   }
                // );

                _context8.next = 6;
                return this.service.update(itemPayload, { ticketNumber: id }, {
                  returning: true,
                  plain: true
                });

              case 6:
                item = _context8.sent;

                if (!(this.env !== 'test')) {
                  _context8.next = 31;
                  break;
                }

                if (!(status === 'startDroppoint')) {
                  _context8.next = 13;
                  break;
                }

                _context8.next = 11;
                return this.mailService.onUpdateItemStatus({ senderEmail: senderEmail, ticketNumber: id }, 'startDroppoint');

              case 11:
                _context8.next = 31;
                break;

              case 13:
                if (!(status === 'onTravel')) {
                  _context8.next = 18;
                  break;
                }

                _context8.next = 16;
                return this.mailService.onUpdateItemStatus({ senderEmail: senderEmail, ticketNumber: id }, 'onTravel');

              case 16:
                _context8.next = 31;
                break;

              case 18:
                if (!(status === 'endDroppoint')) {
                  _context8.next = 23;
                  break;
                }

                _context8.next = 21;
                return this.mailService.onUpdateItemStatus({ senderEmail: senderEmail, ticketNumber: id }, 'endDroppoint');

              case 21:
                _context8.next = 31;
                break;

              case 23:
                if (!(status === 'ontheway')) {
                  _context8.next = 28;
                  break;
                }

                _context8.next = 26;
                return this.mailService.onUpdateItemStatus({ senderEmail: senderEmail, ticketNumber: id }, 'ontheway');

              case 26:
                _context8.next = 31;
                break;

              case 28:
                if (!(status === 'received')) {
                  _context8.next = 31;
                  break;
                }

                _context8.next = 31;
                return this.mailService.onUpdateItemStatus({ senderEmail: senderEmail, ticketNumber: id }, 'received');

              case 31:
                res.status(200).json(new _ResponseBuilder2.default().setData({ item: item }).build());
                _context8.next = 37;
                break;

              case 34:
                _context8.prev = 34;
                _context8.t0 = _context8['catch'](2);

                res.status(404).json(new _ResponseBuilder2.default().setMessage(_context8.t0.message).setSuccess(false).build());

              case 37:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this, [[2, 34]]);
      }));

      function update(_x15, _x16) {
        return _ref8.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: 'assignItemToCourier',
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(req, res) {
        var ticketNumber, userId, senderEmail, result;
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                ticketNumber = req.params.ticketNumber;
                userId = res.locals.user.id;
                senderEmail = res.locals.user.email;
                _context9.prev = 3;
                _context9.next = 6;
                return this.service.assignItemToCourier(userId, ticketNumber);

              case 6:
                result = _context9.sent;

                if (!(this.env !== 'test')) {
                  _context9.next = 10;
                  break;
                }

                _context9.next = 10;
                return this.mailService.onUpdateItemStatus({ senderEmail: senderEmail, ticketNumber: ticketNumber }, 'pickedByCourier');

              case 10:
                res.status(200).json(new _ResponseBuilder2.default().setData({ assignedItem: result }).setMessage('Item with ticket number of ' + ticketNumber + ' successfully assigned to this courier.').build());
                _context9.next = 16;
                break;

              case 13:
                _context9.prev = 13;
                _context9.t0 = _context9['catch'](3);

                res.status(404).json(new _ResponseBuilder2.default().setMessage(_context9.t0.message).setSuccess(false).build());

              case 16:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this, [[3, 13]]);
      }));

      function assignItemToCourier(_x17, _x18) {
        return _ref9.apply(this, arguments);
      }

      return assignItemToCourier;
    }()
  }]);
  return ItemController;
}();

exports.default = ItemController;