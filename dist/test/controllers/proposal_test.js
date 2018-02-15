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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);

var _require = require('../../config/config.test.json'),
    user = _require.user,
    sysadmin = _require.sysadmin;

var should = _chai2.default.should();

describe('Proposal Controller Test', function () {
  /**
   * Base attribute definition.
   */
  var userId = '';
  var sysToken = '';
  var userToken = '';

  /**
   * Setup
   */
  before(function (done) {
    // clean up receiver table
    _models2.default.CourierProposal.destroy({
      where: {},
      truncate: true
    });
    // login and receive token
    _chai2.default.request(_app2.default).post('/api/user/login').send({ username: user.email, password: user.password }).end(function (err, res) {
      userToken = res.body.data.accessToken;
      userId = res.body.data.userId;
      _chai2.default.request(_app2.default).post('/api/user/login').send({ username: sysadmin.email, password: sysadmin.password }).end(function (err, res) {
        sysToken = res.body.data.accessToken;
        done();
      });
    });
  });

  /**
   * Test post proposal endpoint
   */
  describe('/Post propose', function () {
    it('should return 201 proposed successfully', function (done) {
      _chai2.default.request(_app2.default).post('/api/proposal').set('Authorization', 'bearer ' + userToken).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.include.keys(_constants.BASE_RESPONSE_STRUCTURE);
        res.body.meta.success.should.be.eql(true);
        done();
      });
    });
    it('should return 200 already proposed', function (done) {
      _chai2.default.request(_app2.default).post('/api/proposal').set('Authorization', 'bearer ' + userToken).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.include.keys(_constants.BASE_RESPONSE_STRUCTURE);
        res.body.meta.success.should.be.eql(false);
        done();
      });
    });
  });

  /**
   * Test admin proposal rejection and approvement
   */
  describe('/PUT update-proposal', function () {
    // it('should return 200 operation success', (done) => {
    //   chai.request(app)
    //     .put('/api/proposal')
    //     .set('Authorization', `bearer ${sysToken}`)
    //     .send({
    //       status: 'rejected',
    //       userId,
    //       rejectReason: 'reject just reject damn it',
    //     })
    //     .end((err, res) => {
    //       res.should.have.status(200);
    //       /** structural response check */
    //       res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
    //       res.body.meta.success.should.be.eql(true);
    //       done();
    //     });
    // });
    // Update to verified
    it('should return 200 operation success', function (done) {
      _chai2.default.request(_app2.default).put('/api/proposal').set('Authorization', 'bearer ' + sysToken).send({
        status: 'verified',
        userId: userId
      }).end(function (err, res) {
        res.should.have.status(200);
        res.body.meta.success.should.be.eql(true);
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