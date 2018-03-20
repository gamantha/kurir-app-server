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

var MapController = function () {
  function MapController() {
    (0, _classCallCheck3.default)(this, MapController);

    this.service = new _index.MapService();
  }

  (0, _createClass3.default)(MapController, [{
    key: 'getDistance',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var _req$body, origin, destination, weight, distance, result;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, origin = _req$body.origin, destination = _req$body.destination, weight = _req$body.weight;

                if (!(typeof origin == 'undefined' || typeof destination == 'undefined' || typeof weight == 'undefined')) {
                  _context.next = 4;
                  break;
                }

                res.status(422).json(new _ResponseBuilder2.default().setSuccess(false).setMessage('Invalid payload').build());
                return _context.abrupt('return');

              case 4:
                _context.prev = 4;
                _context.next = 7;
                return this.service.calculateDistance(origin, destination);

              case 7:
                distance = _context.sent;
                result = this.service.calculatePrice(distance, weight);

                res.status(200).json(new _ResponseBuilder2.default().setData(result).setMessage('Distance calculated').build());
                _context.next = 15;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context['catch'](4);

                res.status(400).json(new _ResponseBuilder2.default().setSuccess(false).setMessage('Some error occured in our system, please try again later').build());

              case 15:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 12]]);
      }));

      function getDistance(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return getDistance;
    }()
  }]);
  return MapController;
}();

exports.default = MapController;