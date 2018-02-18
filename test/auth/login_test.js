import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../app';
import models from '../../models';
import { TOKEN_RESPONSE_STRUCTURE } from './constants';
import { BASE_RESPONSE_STRUCTURE } from '../constants';
import { UserService, MailService } from '../../services/index';

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
    it('should return 400 username/email not found', done => {
      chai
        .request(app)
        .post('/api/user/login')
        .send({
          username: 'randomunexistingusername',
          password: 'randomfalsepassword',
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          res.body.meta.success.should.be.eql(false);
          res.body.meta.message.should.be.eql('username or email not found');
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
          res.body.meta.message.should.be.eql('invalid payload');
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
          res.body.data.should.include.keys(TOKEN_RESPONSE_STRUCTURE);
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          accessToken = res.body.data.accessToken;
          refreshToken = res.body.data.refreshToken;
          res.body.meta.success.should.be.eql(true);
          res.body.meta.message.should.be.eql('Logged in successfully');
          done();
        });
    });
  });

  describe('Change password attempt', () => {
    it('should return 401 wrong old password', done => {
      chai
        .request(app)
        .post('/api/user/change-password?forgotpassword=false')
        .set('Authorization', `bearer ${accessToken}`)
        .send({
          old_password: 'randomoldpassword',
          new_password: 'newpassword',
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          res.body.meta.success.should.be.eql(false);
          res.body.meta.message.should.be.eql('Wrong old password');
          done();
        });
    });
    it('PARAMS FALSE: should return 200 password successfully changed', done => {
      chai
        .request(app)
        .post('/api/user/change-password?forgotpassword=false')
        .set('Authorization', `bearer ${accessToken}`)
        .send({
          old_password: user.password,
          new_password: user.password,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          res.body.meta.success.should.be.eql(true);
          res.body.meta.message.should.be.eql('password successfully changed');
          done();
        });
    });
    it('PARAMS TRUE: should return 200 password successfully changed', done => {
      chai
        .request(app)
        .post('/api/user/change-password?forgotpassword=true')
        .set('Authorization', `bearer ${accessToken}`)
        .send({
          new_password: user.password,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          res.body.meta.success.should.be.eql(true);
          res.body.meta.message.should.be.eql('password successfully changed');
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
          res.body.meta.message.should.be.eql('refresh token not found');
          done();
        });
    });
    it('IF TOKEN IS RANDOM: should return 401 unauthenticated', done => {
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
          res.body.meta.message.should.be.eql('invalid token provided');
          done();
        });
    });
    it('SUCCESS REFRESH: should return 200 token refreshed', done => {
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
          accessToken = res.body.data.accessToken;
          res.body.meta.message.should.be.eql(
            'Access token successfully refreshed.'
          );
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
          res.body.meta.message.should.be.eql('operations success');
          done();
        });
    });
    it('USER NOT LOGGED IN YET: should return 401 unauthorized', done => {
      chai
        .request(app)
        .post('/api/user/logout')
        .set('Authorization', `bearer ${accessToken}`)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          res.body.meta.success.should.be.eql(false);
          res.body.meta.message.should.be.eql('you have not logged in');
          done();
        });
    });
  });

  describe('deactivate account', () => {
    it('should return re-logged in successfully', done => {
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
          res.body.meta.message.should.be.eql('Logged in successfully');
          done();
        });
    });
    it('success deactivate account should return 200', done => {
      chai
        .request(app)
        .delete('/api/user/deactivate')
        .set('Authorization', `bearer ${accessToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          res.body.meta.success.should.be.eql(true);
          res.body.meta.message.should.be.eql('User deactivated');
          done();
        });
    });
    it('if random token provided: should return 401 unauthorized', done => {
      chai
        .request(app)
        .delete('/api/user/deactivate')
        .set('Authorization', 'bearer randomtoken')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          res.body.meta.success.should.be.eql(false);
          res.body.meta.message.should.be.eql('invalid token provided');
          done();
        });
    });
  });

  describe('reactivate account', () => {
    it('if email not provided: should return 422 invalid payload', done => {
      chai
        .request(app)
        .post('/api/user/reactivate')
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          res.body.meta.success.should.be.eql(false);
          res.body.meta.message.should.be.eql('Invalid payload');
          done();
        });
    });
    it('if email not found: should return 404 email not found', done => {
      chai
        .request(app)
        .post('/api/user/reactivate')
        .send({
          email: 'random@mail.com',
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          res.body.meta.success.should.be.eql(false);
          res.body.meta.message.should.be.eql('invalid email');
          done();
        });
    });
    it('should return 200 reactivation email sent', done => {
      const stub = sinon
        .stub(MailService.prototype, 'sendReactivateAccountLink')
        .callsFake(email => {
          return true;
        });
      chai
        .request(app)
        .post('/api/user/reactivate')
        .send({
          email: user.email,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          res.body.meta.success.should.be.eql(true);
          res.body.meta.message.should.be.eql(
            'Reactivation email sent, please check your email.'
          );
          done();
        });
    });
    it('if email not found on database: should return 404 invalid email', done => {
      MailService.prototype.sendReactivateAccountLink.restore();
      const stub = sinon
        .stub(MailService.prototype, 'sendReactivateAccountLink')
        .callsFake(email => {
          return false;
        });
      chai
        .request(app)
        .post('/api/user/reactivate')
        .send({
          email: user.email,
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          res.body.meta.success.should.be.eql(false);
          res.body.meta.message.should.be.eql('invalid email');
          done();
        });
    });
  });

  describe('confirm reactivation link', () => {
    it('should return 422 invalid payload', done => {
      chai
        .request(app)
        .get('/api/user/confirmreactivation?random=random')
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          res.body.meta.success.should.be.eql(false);
          res.body.meta.message.should.be.eql('invalid payload');
          done();
        });
    });
    it('should return 200 account successfully reactivated', done => {
      const stub = sinon
        .stub(UserService.prototype, 'confirmReactivation')
        .callsFake(token => {
          return true;
        });
      chai
        .request(app)
        .get('/api/user/confirmreactivation?token=correcttoken')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          res.body.meta.success.should.be.eql(true);
          res.body.meta.message.should.be.eql(
            'Your account has been successfully reactivated'
          );
          done();
        });
    });
    it('if token not valid: should return 400 invalid token', done => {
      UserService.prototype.confirmReactivation.restore();

      const stub = sinon
        .stub(UserService.prototype, 'confirmReactivation')
        .callsFake(token => {
          return false;
        });
      chai
        .request(app)
        .get('/api/user/confirmreactivation?token=invalidtoken')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          res.body.meta.success.should.be.eql(false);
          res.body.meta.message.should.be.eql('Fail to reactivate your email');
          done();
        });
    });
  });

  after(done => {
    models.User.update(
      { deletedAt: null },
      { where: { email: user.email } }
    ).then(() => {
      done();
    });
  });
});
