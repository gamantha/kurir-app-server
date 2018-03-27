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

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MapService = function () {
  function MapService() {
    (0, _classCallCheck3.default)(this, MapService);

    this.apiKey = 'AIzaSyBOp_4S1bjUWaxisRIv51tgToK-sucebnE';
    this.baseUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json?';
  }

  /**
   * Calculate Distance
   * @param {String} origin [origin coordinate]
   * @param {String} destination [destination coordinate]
   */


  (0, _createClass3.default)(MapService, [{
    key: 'calculateDistance',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(origin, destination) {
        var url, result;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                url = this.baseUrl + 'origins=' + origin + '&destinations=' + destination;
                _context.prev = 1;
                _context.next = 4;
                return _axios2.default.post(url + '&key=' + this.apiKey);

              case 4:
                result = _context.sent;
                return _context.abrupt('return', {
                  destination: result.data.destination_addresses[0],
                  origin: result.data.origin_addresses[0],
                  distance: result.data.rows[0].elements[0].distance
                });

              case 8:
                _context.prev = 8;
                _context.t0 = _context['catch'](1);
                throw new Error(_context.t0.message);

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 8]]);
      }));

      function calculateDistance(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return calculateDistance;
    }()

    /**
     * Calculate the price
     * @param {Float} weight 
     */

  }, {
    key: 'calculatePrice',
    value: function calculatePrice(distance, weight) {
      var unitPrice = 100;
      var unitDistance = distance.distance.value / 1000;
      distance.price = unitPrice * unitDistance * weight;
      return distance;
    }
  }]);
  return MapService;
}();

exports.default = MapService;