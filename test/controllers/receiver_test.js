import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import models from '../../models';
import { BASE_RESPONSE_STRUCTURE } from '../constants';
import { RECEIVER_RESPONSE_STRUCTURE } from './constants';

chai.use(chaiHttp);

const { user } = require('../../config/config.test.json');
const should = chai.should();

describe('Receivers', () => {
  /**
   * Base attribute definition.
   */
  let token = '';
  let postedId = null;

  /**
   * Setup
   */
  before(done => {
    // clean up receiver table
    models.Receiver.destroy({
      where: {},
      truncate: true,
    });
    // login and receive token
    chai
      .request(app)
      .post('/api/user/login')
      .send({ username: user.email, password: user.password })
      .end((err, res) => {
        token = res.body.data.accessToken;
        done();
      });
  });

  /**
   * Test post receiver endpoint
   */
  describe('/Post receiver', () => {
    it('should posted a receiver', done => {
      chai
        .request(app)
        .post('/api/receiver')
        .set('Authorization', `bearer ${token}`)
        .send({
          name: 'some name',
          address: 'some address',
          phone: '89283924983',
          city: 'some city',
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          res.body.meta.success.should.be.eql(true);
          res.body.data.should.include.keys(RECEIVER_RESPONSE_STRUCTURE);
          postedId = res.body.data.id;
          res.body.meta.message.should.be.eql('operations success');
          done();
        });
    });
  });

  /**
   * Test get receiver endpoint
   */
  describe('/Get receiver', () => {
    it('should get all receiver', done => {
      chai
        .request(app)
        .get('/api/receiver')
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          /** structural response check */
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          res.body.data[0].should.include.keys(RECEIVER_RESPONSE_STRUCTURE);
          res.body.meta.success.should.be.eql(true);
          res.body.meta.message.should.be.eql('operations success');
          done();
        });
    });
    // Unauthorized, make sure route is protected.
    it('should be unauthorized', done => {
      chai
        .request(app)
        .get('/api/receiver')
        .set('Authorization', 'bearer obviouslynotjsonwebtoken')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.meta.success.should.be.eql(false);
          res.body.data.should.be.eql({});
          res.body.meta.message.should.be.eql(
            'JsonWebTokenError: jwt malformed'
          );
          done();
        });
    });
    // show receiver
    it('should get single posted receiver', done => {
      chai
        .request(app)
        .get(`/api/receiver/${postedId}`)
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          res.body.data.should.be.a('object');
          res.body.data.should.include.keys(RECEIVER_RESPONSE_STRUCTURE);
          res.body.meta.success.should.eql(true);
          res.body.meta.message.should.be.eql('operations success');
          done();
        });
    });
    it('should get single posted receiver returning 404 not found', done => {
      chai
        .request(app)
        .get(`/api/receiver/${postedId}1`)
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          res.body.meta.success.should.eql(false);
          res.body.meta.message.should.be.eql('data not found');
          done();
        });
    });
  });

  /**
   * Test put receiver endpoint
   */
  describe('/PUT receiver', () => {
    it('should update a receiver', done => {
      chai
        .request(app)
        .put(`/api/receiver/${postedId}`)
        .set('Authorization', `bearer ${token}`)
        .send({
          name: 'some new name',
          address: 'some new address',
          phone: '48398435924983',
          city: 'some new city',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          res.body.meta.success.should.be.eql(true);
          res.body.data.should.include.keys(RECEIVER_RESPONSE_STRUCTURE);
          res.body.meta.message.should.be.eql('operations success');
          done();
        });
    });
    it('should return 404 not found', done => {
      chai
        .request(app)
        .put(`/api/receiver/${postedId}1`)
        .set('Authorization', `bearer ${token}`)
        .send({
          name: 'some unique name',
          address: 'some unique address',
          phone: '89283924983',
          city: 'some city',
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          res.body.meta.success.should.be.eql(false);
          res.body.meta.message.should.be.eql('fail to update row');
          done();
        });
    });
  });

  describe('/DELETE receiver', () => {
    it('should delete a receiver', done => {
      chai
        .request(app)
        .delete(`/api/receiver/${postedId}`)
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          res.body.meta.success.should.be.eql(true);
          res.body.meta.message.should.be.eql('operations success');
          done();
        });
    });
    it('should return 404 not found', done => {
      chai
        .request(app)
        .put(`/api/receiver/${postedId}1`)
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          res.body.meta.success.should.be.eql(false);
          res.body.meta.message.should.be.eql('fail to update row');
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
