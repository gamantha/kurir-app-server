import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import models from '../../models';
import { BASE_RESPONSE_STRUCTURE } from '../constants';

chai.use(chaiHttp);

const { user, sysadmin } = require('../../config/config.test.json');
const should = chai.should();

describe('Proposal Controller Test', () => {
  /**
   * Base attribute definition.
   */
  let userId = '';
  let sysToken = '';
  let userToken = '';

  /**
   * Setup
   */
  before((done) => {
    // clean up receiver table
    models.CourierProposal.destroy({
      where: {},
      truncate: true,
    });
    // login and receive token
    chai.request(app)
      .post('/api/user/login')
      .send({ username: user.email, password: user.password })
      .end((err, res) => {
        userToken = res.body.data.accessToken;
        userId = res.body.data.userId;
        chai.request(app)
          .post('/api/user/login')
          .send({ username: sysadmin.email, password: sysadmin.password })
          .end((err, res) => {
            sysToken = res.body.data.accessToken;
            done()
          });
      });
  });

  /**
     * Test post proposal endpoint
     */
  describe('/Post propose', () => {
    it('should return 201 proposed successfully', (done) => {
      chai.request(app)
        .post('/api/proposals/propose')
        .set('Authorization', `bearer ${userToken}`)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          res.body.meta.success.should.be.eql(true);
          done();
        });
    });
    it('should return 200 already proposed', (done) => {
      chai.request(app)
        .post('/api/proposals/propose')
        .set('Authorization', `bearer ${userToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          res.body.meta.success.should.be.eql(false);
          done();
        });
    });
  });

  /**
   * Test admin proposal rejection and approvement
   */
  describe('/PUT update-proposal', () => {
    it('should return 200 operation success', (done) => {
      chai.request(app)
        .put('/api/proposals/update-propose')
        .set('Authorization', `bearer ${sysToken}`)
        .send({
          status: 'rejected',
          userId,
          rejectReason: 'reject just reject damn it',
        })
        .end((err, res) => {
          console.log(res, '1')

          res.should.have.status(200);
          /** structural response check */
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          res.body.meta.success.should.be.eql(true);
          done();
        });
    });
    // Update to verified
    it('should return 200 operation success', (done) => {
      chai.request(app)
        .put('/api/proposals/update-propose')
        .set('Authorization', `bearer ${sysToken}`)
        .send({
          status: 'verified',
          userId,
        })
        .end((err, res) => {
          console.log(res, '2')
          res.should.have.status(200);
          res.body.meta.success.should.be.eql(true);
          res.body.data.should.be.eql({});
          done();
        });
    });
  });

  /**
   * Teardown
   */
  after((done) => {
    done();
  });
});
