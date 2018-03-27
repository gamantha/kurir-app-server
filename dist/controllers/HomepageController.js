'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MailController = function () {
  function MailController() {
    (0, _classCallCheck3.default)(this, MailController);
  }

  (0, _createClass3.default)(MailController, [{
    key: 'sendWorksPage',
    value: function sendWorksPage(req, res) {
      res.sendFile('how-works.html', { root: 'views/articles/' });
    }
  }]);
  return MailController;
}();

exports.default = MailController;