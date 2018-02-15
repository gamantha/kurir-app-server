'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

var _constants = require('../constants');

var _constants2 = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);

var _require = require('../../config/config.test.json'),
    user = _require.user;

var should = _chai2.default.should();

describe('Receivers', function () {
  /**
   * Base attribute definition.
   */
  var token = '';
  var postedId = null;

  /**
   * Setup
   */
  before(function (done) {
    // clean up receiver table
    _models2.default.Receiver.destroy({
      where: {},
      truncate: true
    });
    // login and receive token
    _chai2.default.request(_app2.default).post('/api/user/login').send({ username: user.email, password: user.password }).end(function (err, res) {
      token = res.body.data.accessToken;
      done();
    });
  });

  /**
     * Test post receiver endpoint
     */
  describe('/Post receiver', function () {
    it('should posted a receiver', function (done) {
      _chai2.default.request(_app2.default).post('/api/receiver').set('Authorization', 'bearer ' + token).send({
        name: 'some name',
        address: 'some address',
        phone: '89283924983',
        city: 'some city'
      }).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.include.keys(_constants.BASE_RESPONSE_STRUCTURE);
        res.body.meta.success.should.be.eql(true);
        res.body.data.should.include.keys(_constants2.RECEIVER_RESPONSE_STRUCTURE);
        postedId = res.body.data.id;
        done();
      });
    });
  });

  /**
   * Test get receiver endpoint
   */
  describe('/Get receiver', function () {
    it('should get books paginated by default', function (done) {
      _chai2.default.request(_app2.default).get('/api/receiver').set('Authorization', 'bearer ' + token).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        /** structural response check */
        res.body.should.include.keys(_constants.BASE_RESPONSE_STRUCTURE);
        res.body.data[0].should.include.keys(_constants2.RECEIVER_RESPONSE_STRUCTURE);
        res.body.meta.success.should.be.eql(true);
        done();
      });
    });
    // Unauthorized, make sure route is protected.
    it('should be unauthorized', function (done) {
      _chai2.default.request(_app2.default).get('/api/receiver').set('Authorization', 'bearer obviouslynotjsonwebtoken').end(function (err, res) {
        res.should.have.status(401);
        res.body.meta.success.should.be.eql(false);
        res.body.data.should.be.eql({});
        done();
      });
    });
    // show receiver
    it('should get single posted receiver', function (done) {
      _chai2.default.request(_app2.default).get('/api/receiver/' + postedId).set('Authorization', 'bearer ' + token).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.include.keys(_constants.BASE_RESPONSE_STRUCTURE);
        res.body.data.should.be.a('object');
        res.body.data.should.include.keys(_constants2.RECEIVER_RESPONSE_STRUCTURE);
        res.body.meta.success.should.eql(true);
        done();
      });
    });
    it('should get single posted receiver returning 404 not found', function (done) {
      _chai2.default.request(_app2.default).get('/api/receiver/' + postedId + '1').set('Authorization', 'bearer ' + token).end(function (err, res) {
        res.should.have.status(404);
        res.body.should.include.keys(_constants.BASE_RESPONSE_STRUCTURE);
        res.body.meta.success.should.eql(false);
        done();
      });
    });
  });

  /**
   * Test put receiver endpoint
   */
  describe('/PUT receiver', function () {
    it('should update a receiver', function (done) {
      _chai2.default.request(_app2.default).put('/api/receiver/' + postedId).set('Authorization', 'bearer ' + token).send({
        name: 'some new name',
        address: 'some new address',
        phone: '48398435924983',
        city: 'some new city'
      }).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.include.keys(_constants.BASE_RESPONSE_STRUCTURE);
        res.body.meta.success.should.be.eql(true);
        res.body.data.should.include.keys(_constants2.RECEIVER_RESPONSE_STRUCTURE);
        done();
      });
    });
    it('should return 404 not found', function (done) {
      _chai2.default.request(_app2.default).put('/api/receiver/' + postedId + '1').set('Authorization', 'bearer ' + token).send({
        name: 'some unique name',
        address: 'some unique address',
        phone: '89283924983',
        city: 'some city'
      }).end(function (err, res) {
        res.should.have.status(404);
        res.body.should.include.keys(_constants.BASE_RESPONSE_STRUCTURE);
        res.body.meta.success.should.be.eql(false);
        done();
      });
    });
  });

  describe('/DELETE receiver', function () {
    it('should delete a receiver', function (done) {
      _chai2.default.request(_app2.default).delete('/api/receiver/' + postedId).set('Authorization', 'bearer ' + token).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.include.keys(_constants.BASE_RESPONSE_STRUCTURE);
        res.body.meta.success.should.be.eql(true);
        done();
      });
    });
    it('should return 404 not found', function (done) {
      _chai2.default.request(_app2.default).put('/api/receiver/' + postedId + '1').set('Authorization', 'bearer ' + token).end(function (err, res) {
        res.should.have.status(404);
        res.body.should.include.keys(_constants.BASE_RESPONSE_STRUCTURE);
        res.body.meta.success.should.be.eql(false);
        done();
      });
    });
  });

  /**
   * Teardown
   */
  after(function (done) {
    done();
  });
});