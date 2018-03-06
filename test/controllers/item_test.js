import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import models from '../../models';
import { BASE_RESPONSE_STRUCTURE } from '../constants';
import {
  GET_ITEM_RESPONSE_STRUCTURE,
  SENDER_ITEM_RESPONSE_STRUCTURE,
  USER_ITEM_RESPONSE_STRUCTURE,
  CREATE_ITEM_RESPONSE_STRUCTURE,
} from './constants';

chai.use(chaiHttp);

const { user } = require('../../config/config.test.json');
const should = chai.should();

describe('Items', () => {
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
    models.Item.destroy({
      where: {},
      truncate: true,
    });
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
  describe('/Post item', () => {
    it('should posted a item', done => {
      chai
        .request(app)
        .post('/api/item')
        .set('Authorization', `bearer ${token}`)
        .send({
          from: 'Jakarta',
          to: 'Bandung',
          weight: 10,
          country: 'Indonesia',
          city: 'Jakarta Barat',
          address: 'some address',
          ticketNumber: '3234322',
          itemName: 'xiaomi 4x',
          note: 'some note',
          reward: 'some reward',
          category: 'phone',
          phone: '3482043240',
          receiverName: 'Guy',
          email: 'guy@mail.com',
          cost: '2000',
          ReceiverId: 3,
          cost: '10000',
          type: 'sometype',
          status: 'stillWaitingCourier',
          senderId: 1,
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          res.body.data.should.include.keys(CREATE_ITEM_RESPONSE_STRUCTURE);
          res.body.meta.success.should.be.eql(true);
          postedId = res.body.data.ticketNumber;
          res.body.meta.message.should.be.eql('operations success');
          done();
        });
    });
  });

  /**
   * Test get item endpoint
   */
  describe('/Get item', () => {
    it('should get all item', done => {
      chai
        .request(app)
        .get('/api/item')
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          // res.should.have.status(200);
          // res.body.should.be.a('object');
          /** structural response check */
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          // res.body.data[0].Sender.should.include.keys(
          //   SENDER_ITEM_RESPONSE_STRUCTURE
          // );
          // res.body.data[0].Sender.User.should.include.keys(
          //   USER_ITEM_RESPONSE_STRUCTURE
          // );c
          console.log('data1', res.body.data[0].Sender);
          res.body.data[0].should.include.keys(GET_ITEM_RESPONSE_STRUCTURE);
          // res.body.meta.success.should.be.eql(true);
          // res.body.meta.message.should.be.eql('operations success2');
          done();
        });
    });
    // Unauthorized, make sure route is protected.
    it('should be unauthorized', done => {
      chai
        .request(app)
        .get('/api/item')
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
    // show item
    it('should get single posted item', done => {
      chai
        .request(app)
        .get(`/api/item/${postedId}`)
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          res.body.data.should.be.a('object');
          res.body.data.should.include.keys(ITEM_RESPONSE_STRUCTURE);
          res.body.meta.success.should.eql(true);
          res.body.meta.message.should.be.eql('operations success');
          done();
        });
    });
    it('should get single posted item returning 404 not found', done => {
      chai
        .request(app)
        .get(`/api/item/${postedId}1`)
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
   * Test put item endpoint
   */
  describe('/PUT item', () => {
    it('should update a item', done => {
      chai
        .request(app)
        .put(`/api/item/${postedId}`)
        .set('Authorization', `bearer ${token}`)
        .send({
          address: 'new address',
          ticketNumber: 3234322,
          city: 'Jakarta Utara',
          country: 'Indonesia',
          phone: '3482043240',
          from: 'Jakarta',
          to: 'Bandung',
          ReceiverId: 3,
          name: 'xiaomi 4x',
          category: 'phone',
          type: 'sometype',
          weight: 10,
          cost: 10000,
          reward: 'some reward',
          note: 'some note',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          res.body.meta.success.should.be.eql(true);
          res.body.data.should.include.keys(ITEM_RESPONSE_STRUCTURE);
          res.body.meta.message.should.be.eql('operations success');
          done();
        });
    });
    it('should return 404 not found', done => {
      chai
        .request(app)
        .put(`/api/item/${postedId}1`)
        .set('Authorization', `bearer ${token}`)
        .send({
          address: 'new address',
          ticketNumber: 3234322,
          city: 'Jakarta Utara',
          country: 'Indonesia',
          phone: '3482043240',
          from: 'Jakarta',
          to: 'Bandung',
          ReceiverId: 3,
          name: 'xiaomi 4x',
          category: 'phone',
          type: 'sometype',
          weight: 10,
          cost: 10000,
          reward: 'some reward',
          note: 'some note',
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

  describe('/DELETE item', () => {
    it('should delete a item', done => {
      chai
        .request(app)
        .delete(`/api/item/${postedId}`)
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
        .put(`/api/item/${postedId}1`)
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
