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

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);

var should = _chai2.default.should();

describe('Google Auth', function () {
  var baseResponseStructure = ['meta', 'data', 'links', 'include'];

  before(function (done) {
    _models2.default.Token.destroy({
      where: {},
      truncate: true
    });
    done();
  });

  it('should return user already registered [register]', function (done) {
    var stub = _sinon2.default.stub(_index.GoogleService.prototype, 'verifyToken').callsFake(function (token) {
      return _constants.STUBBED_GOOGLE_VERIFYID;
    });

    _chai2.default.request(_app2.default).post('/api/google/register').send({
      tokenId: 'randomtoken'
    }).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.include.keys(baseResponseStructure);
      res.body.meta.success.should.be.eql(false);
      res.body.data.should.include.keys(['registered']);
      res.body.data.registered.should.be.eql(true);
      done();
    });
  });

  it('should return logged in user token [login]', function (done) {
    _chai2.default.request(_app2.default).post('/api/google/login').send({
      tokenId: 'randomtoken'
    }).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.include.keys(baseResponseStructure);
      res.body.data.should.include.keys(_constants.TOKEN_RESPONSE_STRUCTURE);
      res.body.meta.success.should.be.eql(true);
      done();
    });
  });

  it('should return 200 user information [register]', function (done) {
    _index.GoogleService.prototype.verifyToken.restore();
    var stub = _sinon2.default.stub(_index.GoogleService.prototype, 'verifyToken').callsFake(function (token) {
      return {
        email: 'somerandom@mail.com'
      };
    });

    _chai2.default.request(_app2.default).post('/api/google/register').send({
      tokenId: 'randomtoken'
    }).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.include.keys(baseResponseStructure);
      res.body.meta.success.should.be.eql(true);
      res.body.data.should.include.keys(['email', 'registered']);
      res.body.data.registered.should.be.eql(false);
      done();
    });
  });

  it('should return 200 user information [login]', function (done) {
    _chai2.default.request(_app2.default).post('/api/google/login').send({
      tokenId: 'randomtoken'
    }).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.include.keys(baseResponseStructure);
      res.body.meta.success.should.be.eql(true);
      res.body.data.should.include.keys(['email', 'registered']);
      res.body.data.registered.should.be.eql(false);
      done();
    });
  });
});