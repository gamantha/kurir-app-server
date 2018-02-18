import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import models from '../../models';
import { BASE_RESPONSE_STRUCTURE } from '../constants';
import {
  UPDATE_PROPOSAL_RESPONSE_STRUCTURE,
  GET_PROPOSAL_RESPONSE_STRUCTURE,
} from './constants';

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
  before(done => {
    // clean up receiver table
    models.CourierProposal.destroy({
      where: {},
      truncate: true,
    });
    // login and receive token
    chai
      .request(app)
      .post('/api/user/login')
      .send({ username: user.email, password: user.password })
      .end((err, res) => {
        userToken = res.body.data.accessToken;
        userId = res.body.data.userId;
        chai
          .request(app)
          .post('/api/user/login')
          .send({ username: sysadmin.email, password: sysadmin.password })
          .end((err, res) => {
            sysToken = res.body.data.accessToken;
            done();
          });
      });
  });

  /**
   * Test post proposal endpoint
   */
  describe('/Post propose', () => {
    it('should return 201 proposed successfully', done => {
      chai
        .request(app)
        .post('/api/proposal')
        .set('Authorization', `bearer ${userToken}`)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          res.body.meta.success.should.be.eql(true);
          res.body.meta.message.should.be.eql(
            'We\'ll be reviewing your proposal and respond very soon. Thank you'
          );
          done();
        });
    });
    it('should return 200 already proposed', done => {
      chai
        .request(app)
        .post('/api/proposal')
        .set('Authorization', `bearer ${userToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          // res.body.meta.success.should.be.eql(false);
          res.body.meta.message.should.be.eql(
            'You already submit upgrade proposal. Please wait for our team to reach you.'
          );
          done();
        });
    });
  });

  /**
   * Test admin proposal rejection and approvement
   */
  describe('/PUT update-proposal', () => {
    // reject
    it('REJECT: should return 200 operation success', done => {
      chai
        .request(app)
        .put('/api/proposal')
        .set('Authorization', `bearer ${sysToken}`)
        .send({
          status: 'rejected',
          userId,
          rejectReason: 'reject just reject damn it',
        })
        .end((err, res) => {
          res.should.have.status(200);
          /** structural response check */
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          res.body.meta.success.should.be.eql(true);
          res.body.meta.message.should.be.eql('operations success');
          done();
        });
    });
    // Update to verified
    it('VERIFIED: should return 200 operation success', done => {
      chai
        .request(app)
        .put('/api/proposal')
        .set('Authorization', `bearer ${sysToken}`)
        .send({
          status: 'verified',
          userId,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.meta.success.should.be.eql(true);
          res.body.data.should.include.keys(UPDATE_PROPOSAL_RESPONSE_STRUCTURE);
          res.body.meta.message.should.be.eql('operations success');
          done();
        });
    });
  });

  describe('/GET get all proposal', () => {
    // get
    it('should return 200 operation success', done => {
      chai
        .request(app)
        .get('/api/proposal')
        .set('Authorization', `bearer ${sysToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          /** structural response check */
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          res.body.data[0].should.include.keys(GET_PROPOSAL_RESPONSE_STRUCTURE);
          res.body.data.should.be.an('array');
          res.body.meta.success.should.be.eql(true);
          res.body.meta.message.should.be.eql('operations success');
          done();
        });
    });
    // wrong token
    it('should return 401 Unauthorized', done => {
      chai
        .request(app)
        .get('/api/proposal')
        .set('Authorization', `bearer ${sysToken}22`)
        .end((err, res) => {
          res.should.have.status(401);
          /** structural response check */
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          res.body.data.should.be.an('object');
          res.body.meta.success.should.be.eql(false);
          res.body.meta.message.should.be.eql(
            'JsonWebTokenError: invalid signature'
          );
          done();
        });
    });
  });

  /**
   * Teardown
   */
  after(done => {
    done();
  });
});
