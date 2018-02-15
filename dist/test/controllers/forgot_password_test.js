'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

var _index = require('../../services/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);

var _require = require('../../config/config.test.json'),
    user = _require.user;

var should = _chai2.default.should();

describe('Forgot Password Controller Test', function () {
  var baseResponseStructure = ['meta', 'data', 'links', 'include'];

  before(function (done) {
    done();
  });

  it('should return 422 something wrong when sending email', function (done) {
    var stub = _sinon2.default.stub(_index.MailService.prototype, 'sendVerificationCode').callsFake(function (email) {
      return false;
    });

    _chai2.default.request(_app2.default).post('/api/user/forgot-password').send({
      email: user.email
    }).end(function (err, res) {
      res.should.have.status(422);
      res.body.should.include.keys(baseResponseStructure);
      res.body.meta.success.should.be.eql(false);
      done();
    });
  });

  it('should return 200 email verification code sent', function (done) {
    _index.MailService.prototype.sendVerificationCode.restore();
    var stub = _sinon2.default.stub(_index.MailService.prototype, 'sendVerificationCode').callsFake(function (email) {
      return true;
    });
    _chai2.default.request(_app2.default).post('/api/user/forgot-password').send({
      email: user.email
    }).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.include.keys(baseResponseStructure);
      res.body.meta.success.should.be.eql(true);
      done();
    });
  });
});