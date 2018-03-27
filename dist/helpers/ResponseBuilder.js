'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ResponseBuilder = function () {
  /**
   * Response builder class
   */
  function ResponseBuilder() {
    (0, _classCallCheck3.default)(this, ResponseBuilder);

    this.meta = {
      message: 'operations success',
      success: true
    };
    this.links = null;
    this.data = {};
    this.includes = null;
  }

  /**
   * data setter
   * @param {Object} data
   */


  (0, _createClass3.default)(ResponseBuilder, [{
    key: 'setData',
    value: function setData(data) {
      this.data = data;
      return this;
    }

    /**
     * links setter
     * @param {Object} links
     */

  }, {
    key: 'setLinks',
    value: function setLinks(links) {
      this.links = links;
      return this;
    }

    /**
     * include setter
     * @param {Object} includes
     */

  }, {
    key: 'setIncludes',
    value: function setIncludes(includes) {
      this.includes = includes;
      return this;
    }

    /**
     * success setter
     * @param {Boolean} success
     */

  }, {
    key: 'setSuccess',
    value: function setSuccess(success) {
      this.meta.success = success;
      return this;
    }

    /**
     * message setter
     * @param {String} message
     */

  }, {
    key: 'setMessage',
    value: function setMessage(message) {
      this.meta.message = message;
      return this;
    }

    /**
     * set the total row count
     * @param {Integer} total
     */

  }, {
    key: 'setTotal',
    value: function setTotal(total) {
      this.meta.total = total;
      return this;
    }

    /**
     * set row count fetched
     * @param {Integer} count
     */

  }, {
    key: 'setCount',
    value: function setCount(count) {
      this.meta.count = count;
      return this;
    }
  }, {
    key: 'build',
    value: function build() {
      return {
        meta: this.meta,
        data: this.data,
        links: this.links,
        include: this.includes
      };
    }
  }]);
  return ResponseBuilder;
}();

exports.default = ResponseBuilder;