import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import models from '../../models';

chai.use(chaiHttp);

const { user } = require('../../config/config.test.json');
const should = chai.should();

describe('Login', () => {

  let accessToken = '';
  let refreshToken = '';
  const baseResponseStructure = [
    'meta', 'data', 'links', 'include',
  ];
  const tokenStructure = [
    'id', 'accessToken', 'refreshToken', 'userId',
    'userAgent', 'updatedAt', 'createdAt', 'User'
  ];

  before((done) => {
    console.log('sss');
    models.Token.destroy({
      where: {},
      truncate: true,
    });
    done();
  });

  describe('Login attempt', () => {
    it('should return 400 username/email unavailable', (done) => {
      chai.request(app)
        .post('/api/user/login')
        .send({
          username: 'randomunexistingusername',
          password: 'randomfalsepassword',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.include.keys(baseResponseStructure);
          res.body.meta.success.should.be.eql(false);
          done();
        });
    });
    it('should return 400 invalid payload', (done) => {
      chai.request(app)
        .post('/api/user/login')
        .send({
          randomkey: 'randomunexistingusername',
          password: 'randomfalsepassword',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.include.keys(baseResponseStructure);
          res.body.meta.success.should.be.eql(false);
          done();
        });
    });
    it('should return 200 logged in successfully', (done) => {
      chai.request(app)
        .post('/api/user/login')
        .send({
          username: user.email,
          password: user.password,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.include.keys(baseResponseStructure);
          res.body.data.should.include.keys(tokenStructure);
          accessToken = res.body.data.accessToken;
          refreshToken = res.body.data.refreshToken;
          res.body.meta.success.should.be.eql(true);
          done();
        });
    });
  });

  describe('Refresh token attempt', () => {
    it('should return 400 refreshtoken not found', (done) => {
      chai.request(app)
        .post('/api/user/refreshtoken')
        .send({
          refreshToken: 'randomrefreshtoken'
        })
        .set('Authorization', `bearer ${accessToken}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.include.keys(baseResponseStructure);
          res.body.meta.success.should.be.eql(false);
          done();
        });
    });
    it('should return 400 refresh token not found', (done) => {
      chai.request(app)
        .post('/api/user/refreshtoken')
        .send({
          refreshToken: refreshToken
        })
        .set('Authorization', 'bearer randomebearertoken')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.include.keys(baseResponseStructure);
          res.body.meta.success.should.be.eql(false);
          done();
        });
    });
    it('should return 200 token refreshed', (done) => {
      chai.request(app)
        .post('/api/user/refreshtoken')
        .send({
          refreshToken: refreshToken
        })
        .set('Authorization', `bearer ${accessToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.include.keys(baseResponseStructure);
          res.body.data.should.include.keys(tokenStructure);
          res.body.meta.success.should.be.eql(true);
          done();
        });
    })
  });
});
