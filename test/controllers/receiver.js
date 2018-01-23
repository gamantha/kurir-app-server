import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import models from '../../models';

chai.use(chaiHttp);

const { user } = require('../../config/config.test.json');
const should = chai.should();

describe('Receivers', () => {
  /**
   * Base attribute definition.
   */
  let token = '';
  let postedId = null;
  const baseResponseStructure = [
    'meta', 'data', 'links', 'include',
  ];
  const receiverStructure = [
    'id', 'name', 'address', 'phone',
    'city', 'updatedAt', 'createdAt',
  ];

  /**
   * Setup
   */
  before((done) => {
    // clean up receiver table
    models.Receiver.destroy({
      where: {},
      truncate: true,
    });
    // login and receive token
    chai.request(app)
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
    it('should posted a receiver', (done) => {
      chai.request(app)
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
          res.body.should.include.keys(baseResponseStructure);
          res.body.meta.success.should.be.eql(true);
          res.body.data.should.include.keys(receiverStructure);
          postedId = res.body.data.id;
          done();
        });
    });
  });

  /**
   * Test get receiver endpoint
   */
  describe('/Get receiver', () => {
    it('should get books paginated by default', (done) => {
      chai.request(app)
        .get('/api/receiver')
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          /** structural response check */
          res.body.should.include.keys(baseResponseStructure);
          res.body.data[0].should.include.keys(receiverStructure);
          res.body.meta.success.should.be.eql(true);
          done();
        });
    });
    // Unauthorized, make sure route is protected.
    it('should be unauthorized', (done) => {
      chai.request(app)
        .get('/api/receiver')
        .set('Authorization', 'bearer obviouslynotjsonwebtoken')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.meta.success.should.be.eql(false);
          res.body.data.should.be.eql({});
          done();
        });
    });
    // show receiver
    it('should get single posted receiver', (done) => {
      chai.request(app)
        .get(`/api/receiver/${postedId}`)
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.include.keys(baseResponseStructure);
          res.body.data.should.be.a('object');
          res.body.data.should.include.keys(receiverStructure);
          res.body.meta.success.should.eql(true);
          done();
        });
    });
    it('should get single posted receiver returning 404 not found', (done) => {
      chai.request(app)
        .get(`/api/receiver/${postedId}1`)
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.include.keys(baseResponseStructure);
          res.body.meta.success.should.eql(false);
          done();
        });
    });
  });

  /**
   * Test put receiver endpoint
   */
  describe('/PUT receiver', () => {
    it('should update a receiver', (done) => {
      chai.request(app)
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
          res.body.should.include.keys(baseResponseStructure);
          res.body.meta.success.should.be.eql(true);
          res.body.data.should.include.keys(receiverStructure);
          done();
        });
    });
    it('should return 404 not found', (done) => {
      chai.request(app)
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
          res.body.should.include.keys(baseResponseStructure);
          res.body.meta.success.should.be.eql(false);
          done();
        });
    });
  });

  describe('/DELETE receiver', () => {
    it('should delete a receiver', (done) => {
      chai.request(app)
        .delete(`/api/receiver/${postedId}`)
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.include.keys(baseResponseStructure);
          res.body.meta.success.should.be.eql(true);
          done();
        });
    });
    it('should return 404 not found', (done) => {
      chai.request(app)
        .put(`/api/receiver/${postedId}1`)
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.include.keys(baseResponseStructure);
          res.body.meta.success.should.be.eql(false);
          done();
        });
    });
  });

  /**
   * Teardown
   */
  after((done) => {
    done();
  });
});
