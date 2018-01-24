import chai from 'chai';
import sinon from 'sinon';
import chaiHttp from 'chai-http';
import app from '../../app';
import models from '../../models';
import { GoogleService } from '../../services/index';
import { STUBBED_GOOGLE_VERIFYID, TOKEN_RESPONSE_STRUCTURE } from './constants';

chai.use(chaiHttp);

const should = chai.should();

describe('Google Auth', () => {
  const baseResponseStructure = [
    'meta', 'data', 'links', 'include',
  ];

  before((done) => {
    models.Token.destroy({
      where: {},
      truncate: true,
    });
    done();
  })

  it('should return user already registered [register]', (done) => {
    const stub = sinon.stub(GoogleService.prototype, 'verifyToken').callsFake((token) => {
      return STUBBED_GOOGLE_VERIFYID
    });

    chai.request(app)
      .post('/api/google/register')
      .send({
        tokenId: 'randomtoken',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.include.keys(baseResponseStructure);
        res.body.meta.success.should.be.eql(false);
        res.body.data.should.include.keys(['registered']);
        res.body.data.registered.should.be.eql(true);
        done();
      });
  });

  it('should return logged in user token [login]', (done) => {
    chai.request(app)
      .post('/api/google/login')
      .send({
        tokenId: 'randomtoken',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.include.keys(baseResponseStructure);
        res.body.data.should.include.keys(TOKEN_RESPONSE_STRUCTURE);
        res.body.meta.success.should.be.eql(true);
        done();
      });
  });

  it('should return 200 user information [register]', (done) => {
    GoogleService.prototype.verifyToken.restore();
    const stub = sinon.stub(GoogleService.prototype, 'verifyToken').callsFake((token) => {
      return {
        email: 'somerandom@mail.com'
      }
    });

    chai.request(app)
      .post('/api/google/register')
      .send({
        tokenId: 'randomtoken',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.include.keys(baseResponseStructure);
        res.body.meta.success.should.be.eql(true);
        res.body.data.should.include.keys(['email', 'registered']);
        res.body.data.registered.should.be.eql(false);
        done();
      });
  });

  it('should return 200 user information [login]', (done) => {
    chai.request(app)
      .post('/api/google/login')
      .send({
        tokenId: 'randomtoken',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.include.keys(baseResponseStructure);
        res.body.meta.success.should.be.eql(true);
        res.body.data.should.include.keys(['email', 'registered']);
        res.body.data.registered.should.be.eql(false);
        done();
      });
  });
});
