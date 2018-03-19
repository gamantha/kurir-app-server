import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import models from '../../models';
import { BASE_RESPONSE_STRUCTURE } from '../constants';
import { EDIT_PROFILE_RESPONSE_STRUCTURE } from './constants';

chai.use(chaiHttp);

const { user } = require('../../config/config.test.json');
const should = chai.should();

describe('Proposal Controller Test', () => {
  /**
   * Base attribute definition.
   */
  let userId = '';
  let accessToken = '';

  /**
   * Setup
   */
  before(done => {
    // login and receive token
    chai
      .request(app)
      .post('/api/user/login')
      .send({ username: user.email, password: user.password })
      .end((err, res) => {
        accessToken = res.body.data.accessToken;
        userId = res.body.data.userId;
        // models.Sender.create({
        //   UserId: userId,
        // });
        done();
      });
  });

  describe('Edit profile controller test', () => {
    it('should return 200 operation success', done => {
      chai
        .request(app)
        .put('/api/user/')
        .set('Authorization', `bearer ${accessToken}`)
        .send({
          name: 'test-edit',
          address: 'some-address',
          phone: '087782282',
          email: 'someedit@gmail.com',
          photoLink: '',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          res.body.data.should.include.keys(EDIT_PROFILE_RESPONSE_STRUCTURE);
          res.body.meta.success.should.be.eql(true);
          res.body.meta.message.should.be.eql('operations success');
          done();
        });
    });
  });

  /**
   * Teardown
   */
  after(done => {
    models.User.update(
      { email: 'test@development.com' },
      { where: { email: 'someedit@gmail.com' } }
    ).then(() => {
      // models.Sender.destroy({
      //   where: {
      //     UserId: userId,
      //   },
      // });
      done();
    });
  });
});
