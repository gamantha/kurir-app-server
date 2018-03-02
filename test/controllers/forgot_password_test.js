import chai from 'chai';
import sinon from 'sinon';
import chaiHttp from 'chai-http';
import app from '../../app';
import models from '../../models';
import { MailService, UserService } from '../../services/index';

chai.use(chaiHttp);

const { user } = require('../../config/config.test.json');
const should = chai.should();

describe('Forgot Password Controller Test', () => {
  const baseResponseStructure = ['meta', 'data', 'links', 'include'];

  before(done => {
    done();
  });

  it('should return 422 something wrong when sending email', done => {
    const stub = sinon
      .stub(MailService.prototype, 'sendVerificationCode')
      .callsFake(email => {
        return false;
      });

    chai
      .request(app)
      .post('/api/user/password/send-code')
      .send({
        email: user.email,
      })
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.include.keys(baseResponseStructure);
        res.body.meta.success.should.be.eql(false);
        res.body.meta.message.should.be.eql(`${user.email} is not registered!`);
        done();
      });
  });

  it('should return 200 email verification code sent', done => {
    MailService.prototype.sendVerificationCode.restore();
    const stub = sinon
      .stub(MailService.prototype, 'sendVerificationCode')
      .callsFake(email => {
        return true;
      });
    chai
      .request(app)
      .post('/api/user/password/send-code')
      .send({
        email: user.email,
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.include.keys(baseResponseStructure);
        res.body.meta.success.should.be.eql(true);
        res.body.meta.message.should.be.eql(
          'Successfully sent verification code forgot password to email'
        );
        done();
      });
  });
});
