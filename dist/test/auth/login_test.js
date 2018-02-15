'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

var _constants = require('./constants');

var _constants2 = require('../constants');

var _index = require('../../services/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);

var _require = require('../../config/config.test.json'),
    user = _require.user;

var should = _chai2.default.should();

describe('Login', function () {
  var accessToken = '';
  var refreshToken = '';

  before(function (done) {
    _models2.default.Token.destroy({
      where: {},
      truncate: true
    });
    done();
  });

  describe('Login attempt', function () {
    it('should return 400 username/email not found', function (done) {
      _chai2.default.request(_app2.default).post('/api/user/login').send({
        username: 'randomunexistingusername',
        password: 'randomfalsepassword'
      }).end(function (err, res) {
        res.should.have.status(404);
        res.body.should.include.keys(_constants2.BASE_RESPONSE_STRUCTURE);
        res.body.meta.success.should.be.eql(false);
        done();
      });
    });
    it('should return 400 invalid payload', function (done) {
      _chai2.default.request(_app2.default).post('/api/user/login').send({
        randomkey: 'randomunexistingusername',
        password: 'randomfalsepassword'
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.include.keys(_constants2.BASE_RESPONSE_STRUCTURE);
        res.body.meta.success.should.be.eql(false);
        done();
      });
    });
    it('should return 200 logged in successfully', function (done) {
      _chai2.default.request(_app2.default).post('/api/user/login').send({
        username: user.email,
        password: user.password
      }).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.include.keys(_constants2.BASE_RESPONSE_STRUCTURE);
        res.body.data.should.include.keys(_constants.TOKEN_RESPONSE_STRUCTURE);
        accessToken = res.body.data.accessToken;
        refreshToken = res.body.data.refreshToken;
        res.body.meta.success.should.be.eql(true);
        done();
      });
    });
  });

  describe('Change password attempt', function () {
    it('should return 401 wrong old password', function (done) {
      _chai2.default.request(_app2.default).post('/api/user/change-password').set('Authorization', 'bearer ' + accessToken).send({
        old_password: 'randomoldpassword',
        password: 'newpassword'
      }).end(function (err, res) {
        res.should.have.status(401);
        res.body.should.include.keys(_constants2.BASE_RESPONSE_STRUCTURE);
        res.body.meta.success.should.be.eql(false);
        done();
      });
    });
    it('should return 200 password successfully changed', function (done) {
      _chai2.default.request(_app2.default).post('/api/user/change-password').set('Authorization', 'bearer ' + accessToken).send({
        old_password: user.password,
        password: user.password
      }).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.include.keys(_constants2.BASE_RESPONSE_STRUCTURE);
        res.body.meta.success.should.be.eql(true);
        done();
      });
    });
  });

  describe('Refresh token attempt', function () {
    it('should return 400 refresh token not found', function (done) {
      _chai2.default.request(_app2.default).post('/api/user/refreshtoken').set('Authorization', 'bearer ' + accessToken).send({
        refreshToken: 'randomrefreshtoken'
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.include.keys(_constants2.BASE_RESPONSE_STRUCTURE);
        res.body.meta.success.should.be.eql(false);
        done();
      });
    });
    it('should return 401 unauthenticated', function (done) {
      _chai2.default.request(_app2.default).post('/api/user/refreshtoken').set('Authorization', 'bearer randomebearertoken').send({
        refreshToken: refreshToken
      }).end(function (err, res) {
        res.should.have.status(401);
        res.body.should.include.keys(_constants2.BASE_RESPONSE_STRUCTURE);
        res.body.meta.success.should.be.eql(false);
        done();
      });
    });
    it('should return 200 token refreshed', function (done) {
      _chai2.default.request(_app2.default).post('/api/user/refreshtoken').set('Authorization', 'bearer ' + accessToken).send({
        refreshToken: refreshToken
      }).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.include.keys(_constants2.BASE_RESPONSE_STRUCTURE);
        res.body.data.should.include.keys(_constants.TOKEN_RESPONSE_STRUCTURE);
        res.body.meta.success.should.be.eql(true);
        accessToken = res.body.data.accessToken;
        done();
      });
    });
    it('should logout successfully', function (done) {
      _chai2.default.request(_app2.default).post('/api/user/logout').set('Authorization', 'bearer ' + accessToken).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.include.keys(_constants2.BASE_RESPONSE_STRUCTURE);
        res.body.meta.success.should.be.eql(true);
        done();
      });
    });
    it('should return 401 unauthorized', function (done) {
      _chai2.default.request(_app2.default).post('/api/user/logout').set('Authorization', 'bearer ' + accessToken).end(function (err, res) {
        res.should.have.status(401);
        res.body.should.include.keys(_constants2.BASE_RESPONSE_STRUCTURE);
        res.body.meta.success.should.be.eql(false);
        done();
      });
    });
  });

  describe('deactivate account', function () {
    it('should return re-logged in successfully', function (done) {
      _chai2.default.request(_app2.default).post('/api/user/login').send({
        username: user.email,
        password: user.password
      }).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.include.keys(_constants2.BASE_RESPONSE_STRUCTURE);
        res.body.data.should.include.keys(_constants.TOKEN_RESPONSE_STRUCTURE);
        accessToken = res.body.data.accessToken;
        refreshToken = res.body.data.refreshToken;
        res.body.meta.success.should.be.eql(true);
        done();
      });
    });
    it('should return 200', function (done) {
      _chai2.default.request(_app2.default).delete('/api/user/deactivate').set('Authorization', 'bearer ' + accessToken).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.include.keys(_constants2.BASE_RESPONSE_STRUCTURE);
        res.body.meta.success.should.be.eql(true);
        done();
      });
    });
    it('should return 401 unauthorized', function (done) {
      _chai2.default.request(_app2.default).delete('/api/user/deactivate').set('Authorization', 'bearer randomtoken').end(function (err, res) {
        res.should.have.status(401);
        res.body.should.include.keys(_constants2.BASE_RESPONSE_STRUCTURE);
        res.body.meta.success.should.be.eql(false);
        done();
      });
    });
  });

  describe('reactivate account', function () {
    it('should return 422 invalid payload', function (done) {
      _chai2.default.request(_app2.default).post('/api/user/reactivate').end(function (err, res) {
        res.should.have.status(422);
        res.body.should.include.keys(_constants2.BASE_RESPONSE_STRUCTURE);
        res.body.meta.success.should.be.eql(false);
        done();
      });
    });
    it('should return 404 email not found', function (done) {
      _chai2.default.request(_app2.default).post('/api/user/reactivate').send({
        email: 'random@mail.com'
      }).end(function (err, res) {
        res.should.have.status(404);
        res.body.should.include.keys(_constants2.BASE_RESPONSE_STRUCTURE);
        res.body.meta.success.should.be.eql(false);
        done();
      });
    });
    it('should return 200 reactivation email sent', function (done) {
      var stub = _sinon2.default.stub(_index.MailService.prototype, 'sendReactivateAccountLink').callsFake(function (email) {
        return true;
      });
      _chai2.default.request(_app2.default).post('/api/user/reactivate').send({
        email: user.email
      }).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.include.keys(_constants2.BASE_RESPONSE_STRUCTURE);
        res.body.meta.success.should.be.eql(true);
        done();
      });
    });
    it('should return 404  invalid email', function (done) {
      _index.MailService.prototype.sendReactivateAccountLink.restore();
      var stub = _sinon2.default.stub(_index.MailService.prototype, 'sendReactivateAccountLink').callsFake(function (email) {
        return false;
      });
      _chai2.default.request(_app2.default).post('/api/user/reactivate').send({
        email: user.email
      }).end(function (err, res) {
        res.should.have.status(404);
        res.body.should.include.keys(_constants2.BASE_RESPONSE_STRUCTURE);
        res.body.meta.success.should.be.eql(false);
        done();
      });
    });
  });

  describe('confirm reactivation link', function () {
    it('should return 422 invalid payload', function (done) {
      _chai2.default.request(_app2.default).get('/api/user/confirmreactivation?random=random').end(function (err, res) {
        res.should.have.status(422);
        res.body.should.include.keys(_constants2.BASE_RESPONSE_STRUCTURE);
        res.body.meta.success.should.be.eql(false);
        done();
      });
    });
    it('should return 200 account successfully reactivated', function (done) {
      var stub = _sinon2.default.stub(_index.UserService.prototype, 'confirmReactivation').callsFake(function (token) {
        return true;
      });
      _chai2.default.request(_app2.default).get('/api/user/confirmreactivation?token=correcttoken').end(function (err, res) {
        res.should.have.status(200);
        res.body.should.include.keys(_constants2.BASE_RESPONSE_STRUCTURE);
        res.body.meta.success.should.be.eql(true);
        done();
      });
    });
    it('should return 400 invalid token', function (done) {
      _index.UserService.prototype.confirmReactivation.restore();

      var stub = _sinon2.default.stub(_index.UserService.prototype, 'confirmReactivation').callsFake(function (token) {
        return false;
      });
      _chai2.default.request(_app2.default).get('/api/user/confirmreactivation?token=invalidtoken').end(function (err, res) {
        res.should.have.status(400);
        res.body.should.include.keys(_constants2.BASE_RESPONSE_STRUCTURE);
        res.body.meta.success.should.be.eql(false);
        done();
      });
    });
  });

  after(function (done) {
    _models2.default.User.update({ deletedAt: null }, { where: { email: user.email } }).then(function () {
      done();
    });
  });
});