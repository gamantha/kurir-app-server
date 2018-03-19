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
  EDIT_ITEM_RESPONSE_STRUCTURE,
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
  let userId = null;
  let senderId = null;
  let courierId = null;

  /**
   * Setup
   */
  before(done => {
    // clean up receiver table
    // login and receive token
    chai
      .request(app)
      .post('/api/user/login')
      .send({ username: user.email, password: user.password })
      .end((err, res) => {
        token = res.body.data.accessToken;
        done();
      });
    // chai
    //   .request(app)
    //   .post('/api/user/create')
    //   .send({ username: user.email, password: user.password })
    //   .end((err, res) => {
    //     accessToken = res.body.data.accessToken;
    //     userId = res.body.data.userId;
    //     models.Sender.create({
    //       UserId: userId,
    //     });
    //     done();
    //   });
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
          originCoord: '-6.127379,106.653361',
          to: 'Bandung',
          destinationCoord: '-6.130622,106.644778',
          weight: 10,
          country: 'Indonesia',
          city: 'Jakarta Barat',
          address: 'some address',
          ticketNumber: Date.now(),
          itemName: 'xiaomi 4x',
          note: 'some note',
          reward: 'some reward',
          category: 'phone',
          cost: '2000',
          ReceiverId: 2,
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
          // /** structural response check */
          // res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
          // res.body.data[0].Sender.should.include.keys(
          //   SENDER_ITEM_RESPONSE_STRUCTURE
          // );
          // res.body.data[0].Sender.User.should.include.keys(
          //   USER_ITEM_RESPONSE_STRUCTURE
          // );
          // res.body.data[0].should.include.keys(GET_ITEM_RESPONSE_STRUCTURE);
          // res.body.meta.success.should.be.eql(true);
          res.body.meta.message.should.be.eql('operations success');
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
          res.body.data.should.include.keys(GET_ITEM_RESPONSE_STRUCTURE);
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
    // it('should update a item', done => {
    //   chai
    //     .request(app)
    //     .put(`/api/item/${postedId}`)
    //     .set('Authorization', `bearer ${token}`)
    //     .send({
    //       address: 'update',
    //       city: 'update',
    //       country: 'update',
    //       // senderId: 2,
    //       // courierId: 1,
    //       from: 'update',
    //       // ReceiverId: 1,
    //       itemName: 'update',
    //       note: 'update',
    //       reward: 'update',
    //       status: 'update',
    //       category: 'update',
    //       type: 'update',
    //       weight: 2,
    //       cost: 'update',
    //       receiverName: 'update',
    //       email: 'update',
    //       phone: 'update',
    //     })
    //     .end((err, res) => {
    //       console.log('postedId', postedId);
    //       console.log('data1', res.body.data);
    //       // res.should.have.status(200);
    //       // res.body.should.include.keys(BASE_RESPONSE_STRUCTURE);
    //       // res.body.meta.success.should.be.eql(true);
    //       // res.body.data.should.include.keys(EDIT_ITEM_RESPONSE_STRUCTURE);
    //       res.body.meta.message.should.be.eql('operations success');
    //       done();
    //     });
    // });
    it('should return 404 not found', done => {
      chai
        .request(app)
        .put(`/api/item/${postedId}1`)
        .set('Authorization', `bearer ${token}`)
        .send({
          address: 'update',
          city: 'update',
          country: 'update',
          senderId: 2,
          courierId: 1,
          from: 'update',
          ReceiverId: 1,
          itemName: 'update',
          note: 'update',
          reward: 'update',
          status: 'update',
          category: 'update',
          type: 'update',
          weight: 2,
          cost: 'update',
          ReceiverId: 1,
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
    models.Receiver.destroy({
      where: { name: 'Guy' },
    }).then(() => {
      // models.Item.destroy({
      //   where: {},
      //   truncate: true,
      // });
      done();
    });
  });
});
