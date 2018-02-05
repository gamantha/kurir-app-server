import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import models from '../../models';
import { TOKEN_RESPONSE_STRUCTURE } from './constants';
import { BASE_RESPONSE_STRUCTURE } from '../constants';

chai.use(chaiHttp);

const { user } = require('../../config/config.test.json');
const should = chai.should();

describe('Login', () => {
  let accessToken = '';
  let refreshToken = '';

  before(done => {
    models.Token.destroy({
      where: {},
      truncate: true,
    });
    done();
  });

  describe('Login attempt', () => {
    it('should return 400 username/email unavailable', done => {
      chai
        .request(app)
        .post('/api/user/login')
        .send({
          username: 'randomunexistingusername',
          password: 'randomfalsepassword',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          res.body.meta.success.should.be.eql(false);
          done();
        });
    });
    it('should return 400 invalid payload', done => {
      chai
        .request(app)
        .post('/api/user/login')
        .send({
          randomkey: 'randomunexistingusername',
          password: 'randomfalsepassword',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          res.body.meta.success.should.be.eql(false);
          done();
        });
    });
    it('should return 200 logged in successfully', done => {
      chai
        .request(app)
        .post('/api/user/login')
        .send({
          username: user.email,
          password: user.password,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          res.body.data.should.include.keys(TOKEN_RESPONSE_STRUCTURE);
          accessToken = res.body.data.accessToken;
          refreshToken = res.body.data.refreshToken;
          res.body.meta.success.should.be.eql(true);
          done();
        });
    });
  });

  describe('Refresh token attempt', () => {
    it('should return 400 refresh token not found', done => {
      chai
        .request(app)
        .post('/api/user/refreshtoken')
        .set('Authorization', `bearer ${accessToken}`)
        .send({
          refreshToken: 'randomrefreshtoken',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          res.body.meta.success.should.be.eql(false);
          done();
        });
    });
    it('should return 401 unauthenticated', done => {
      chai
        .request(app)
        .post('/api/user/refreshtoken')
        .set('Authorization', 'bearer randomebearertoken')
        .send({
          refreshToken,
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          res.body.meta.success.should.be.eql(false);
          done();
        });
    });
    it('should return 200 token refreshed', done => {
      chai
        .request(app)
        .post('/api/user/refreshtoken')
        .set('Authorization', `bearer ${accessToken}`)
        .send({
          refreshToken,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          res.body.data.should.include.keys(TOKEN_RESPONSE_STRUCTURE);
          res.body.meta.success.should.be.eql(true);
          done();
        });
    });
    it('should logout successfully', done => {
      chai
        .request(app)
        .post('/api/user/logout')
        .set('Authorization', `bearer ${accessToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          res.body.meta.success.should.be.eql(true);
          done();
        });
    });
    it('should return 401 unauthorized', done => {
      chai
        .request(app)
        .post('/api/user/logout')
        .set('Authorization', `bearer ${accessToken}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          res.body.meta.success.should.be.eql(false);
          done();
        });
    });
  });

  describe('deactivate account', () => {
    it('should return 200', done => {
      chai
        .request(app)
        .delete('/api/user/deactivate')
        .set('Authorization', `bearer ${accessToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          res.body.meta.success.should.be.eql(true);
          done();
        });
    });
    it('should return 401 unauthorized', done => {
      chai
        .request(app)
        .delete('/api/user/deactivate')
        .set('Authorization', 'bearer randomtoken')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          res.body.meta.success.should.be.eql(false);
          done();
        });
    });
  });
});
