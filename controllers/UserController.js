import bcrypt from 'bcrypt';
import Sequelize from 'sequelize';
import helpers from '../helpers';
// import auth from '../helpers/Auth';
import models from '../models';
import ResponseBuilder from '../helpers/ResponseBuilder';
import {
  UserService,
  SenderService,
  TokenService,
  MailService,
  DroppointService,
  S3Service,
} from '../services/index';

export default class UserController {
  /**
   * User controller class
   */
  constructor() {
    this.service = new UserService();
    this.senderService = new SenderService();
    this.tokenService = new TokenService();
    this.mailService = new MailService();
    this.droppointService = new DroppointService();
    this.S3Service = new S3Service();
  }

  // TODO: dont get user that has role sysadmin
  async get(req, res) {
    try {
      const response = await this.service.findAll();
      res.status(200).json(new ResponseBuilder().setData(response).build());
    } catch (error) {
      res.status(400).json(
        new ResponseBuilder()
          .setMessage(error)
          .setSuccess(false)
          .build()
      );
    }
  }

  async create(req, res) {
    const { email, password, username, role } = req.body;
    const { authorization } = req.headers;
    if (!password || password === '') {
      res.status(400).json(
        new ResponseBuilder()
          .setMessage('password cannot be blank or not provided')
          .setSuccess(false)
          .build()
      );
    }
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);
    const payload = {
      email,
      password: hash,
      username,
      role,
    };
    let response = null;
    let uniqueEmail = null;
    let uniqueUsername = null;
    let validation = false;
    try {
      uniqueEmail = await this.service.findOne({
        email,
      });
      uniqueUsername = await this.service.findOne({
        username,
      });
      if (uniqueEmail === null && uniqueUsername === null) {
        validation = true;
      } else if (uniqueEmail) {
        res.status(400).json(
          new ResponseBuilder()
            .setMessage('Oops. Looks we already have this email registered.')
            .setSuccess(false)
            .build()
        );
      } else if (uniqueUsername) {
        res.status(400).json(
          new ResponseBuilder()
            .setMessage('Oops. Username already exist. Please choose another.')
            .setSuccess(false)
            .build()
        );
      }
    } catch (error) {
      res.status(400).json(
        new ResponseBuilder()
          .setMessage(error.message)
          .setSuccess(false)
          .build()
      );
    }

    if (role !== 'sysadmin' && role !== 'siteadmin' && role !== 'sender') {
      res.status(417).json(
        new ResponseBuilder()
          .setMessage('role must one of sysadmin,siteadmin or sender')
          .setSuccess(false)
          .build()
      );
    } else if (role === 'sysadmin' && validation) {
      try {
        response = await this.service.create(payload);
        res.status(201).json(
          new ResponseBuilder()
            .setData(response)
            .setMessage('successfully created new system admin')
            .build()
        );
      } catch (error) {
        res.status(400).json(
          new ResponseBuilder()
            .setMessage(error.message)
            .setSuccess(false)
            .build()
        );
      }
    } else if (role === 'siteadmin' && validation) {
      // hanya sysadmin yg bisa create siteadmin
      if (!authorization || authorization === '') {
        // Auth token not provided
        res.status(403).json(
          new ResponseBuilder()
            .setMessage('Authorization header not provided or empty.')
            .setSuccess(false)
            .build()
        );
      }
      const token = helpers.parseToken(authorization);
      const parsed = helpers.verifyJwt(token);
      if (parsed.role === 'sysadmin') {
        try {
          response = await this.service.create(payload);
          const siteadminPayload = {
            userId: response.id,
          };
          // tambah payload lain yg dibutuhkan model droppoint
          await this.droppointService.create(siteadminPayload);
          res.status(201).json(
            new ResponseBuilder()
              .setData(response)
              .setMessage('successfully created new site admin')
              .build()
          );
        } catch (error) {
          res.status(400).json(
            new ResponseBuilder()
              .setMessage(error.message)
              .setSuccess(false)
              .build()
          );
        }
      } else {
        res.status(400).json(
          new ResponseBuilder()
            .setMessage('only sysadmin can create site admin')
            .setSuccess(false)
            .build()
        );
      }
    } else {
      try {
        response = await this.service.create(payload);
        const senderPayload = {
          userId: response.id,
        };
        await this.senderService.create(senderPayload);
        res.status(201).json(
          new ResponseBuilder()
            .setData(response)
            .setMessage('successfully created new sender')
            .build()
        );
      } catch (error) {
        res.status(400).json(
          new ResponseBuilder()
            .setMessage(error.message)
            .setSuccess(false)
            .build()
        );
      }
    }
  }

  async confirmReactivation(req, res) {
    const { token } = req.query;
    if (typeof token === 'undefined') {
      res.status(422).json(
        new ResponseBuilder()
          .setMessage('invalid payload')
          .setSuccess(false)
          .build()
      );
    } else {
      try {
        const result = await this.service.confirmReactivation(token);
        if (result === true) {
          res
            .status(200)
            .json(
              new ResponseBuilder()
                .setMessage('Your account has been successfully reactivated')
                .build()
            );
        } else {
          res.status(400).json(
            new ResponseBuilder()
              .setMessage('Fail to reactivate your email')
              .setSuccess(false)
              .build()
          );
          return;
        }
      } catch (error) {
        res.status(400).json(
          new ResponseBuilder()
            .setMessage('token invalid')
            .setSuccess(false)
            .build()
        );
      }
    }
  }

  async reactivate(req, res) {
    const { email } = req.body;
    if (typeof email !== 'undefined') {
      try {
        const result = await this.mailService.sendReactivateAccountLink(email);
        if (result == false) {
          res.status(404).json(
            new ResponseBuilder()
              .setMessage('invalid email')
              .setSuccess(false)
              .build()
          );
          return;
        }
        res
          .status(200)
          .json(
            new ResponseBuilder()
              .setMessage('Reactivation email sent, please check your email.')
              .build()
          );
        return;
      } catch (error) {
        res.status(400).json(
          new ResponseBuilder()
            .setMessage('Fail to send reactivation email.')
            .setSuccess(false)
            .build()
        );
      }
    } else {
      res.status(422).json(
        new ResponseBuilder()
          .setMessage('Invalid payload')
          .setSuccess(false)
          .build()
      );
    }
  }

  async login(req, res) {
    const { username, password } = req.body;

    if (username && password) {
      const Op = Sequelize.Op;
      // find with username or email
      try {
        const user = await this.service.findOne({
          [Op.or]: [
            {
              email: username,
            },
            {
              username,
            },
          ],
        });
        if (user === null) {
          res.status(404).json(
            new ResponseBuilder()
              .setMessage('username or email not found')
              .setSuccess(false)
              .build()
          );
          return;
        }
        if (bcrypt.compareSync(password, user.password)) {
          const userData = Object.assign({
            email: user.email,
            id: user.id,
            role: user.role,
          });
          const token = helpers.createJWT(userData);
          try {
            const accessToken = await this.tokenService.saveToken(
              token,
              req.headers['user-agent']
            );
            res.status(200).json(
              new ResponseBuilder()
                .setData(accessToken)
                .setMessage('Logged in successfully')
                .build()
            );
            return;
          } catch (error) {
            res.status(400).json(
              new ResponseBuilder()
                .setMessage(error.message)
                .setSuccess(false)
                .build()
            );
            return;
          }
        } else {
          res.status(200).json(
            new ResponseBuilder()
              .setMessage('Invalid password')
              .setSuccess(false)
              .build()
          );
          return;
        }
      } catch (error) {
        res.status(404).json(
          new ResponseBuilder()
            .setMessage('username or email not found')
            .setSuccess(false)
            .build()
        );
        return;
      }
    }
    res.status(400).json(
      new ResponseBuilder()
        .setMessage('invalid payload')
        .setSuccess(false)
        .build()
    );
    return;
  }

  async refreshToken(req, res) {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(400).json(
        new ResponseBuilder()
          .setMessage('invalid payload')
          .setSuccess(false)
          .build()
      );
      return;
    }
    try {
      const response = await this.tokenService.refreshToken(
        req.headers.authorization,
        refreshToken,
        req.headers['user-agent']
      );
      res.status(200).json(
        new ResponseBuilder()
          .setData(response)
          .setMessage('Access token successfully refreshed.')
          .build()
      );
      return;
    } catch (error) {
      res.status(400).json(
        new ResponseBuilder()
          .setMessage(error.message)
          .setSuccess(false)
          .build()
      );
      return;
    }
  }

  async logout(req, res) {
    try {
      const token = helpers.parseToken(req.headers['authorization']);
      await this.tokenService.destroy({
        accessToken: token,
      });
      res.status(200).json(new ResponseBuilder().setData({}).build());
    } catch (error) {
      res.status(404).json(
        new ResponseBuilder()
          .setMessage(error.message)
          .setSuccess(false)
          .build()
      );
    }
  }

  async checkForgotPassVeriCode(req, res) {
    const { email, veriCode } = req.body;

    try {
      const response = await this.service.findOne({
        email,
      });
      const userPayload = response.forgotPassVeriCode;

      if (userPayload === veriCode) {
        try {
          await this.service.update(
            {
              forgotPassVeriCode: null,
            },
            {
              email,
            }
          );
          res
            .status(200)
            .json(
              new ResponseBuilder()
                .setMessage(
                  'Verification code match. User now can safely reset password.'
                )
                .build()
            );
        } catch (error) {
          res.status(400).json(
            new ResponseBuilder()
              .setMessage(error.message)
              .setSuccess(false)
              .build()
          );
        }
      } else {
        res.status(400).json(
          new ResponseBuilder()
            .setMessage('Verification code didn\'t match')
            .setSuccess(false)
            .build()
        );
      }
    } catch (error) {
      res.status(400).json(
        new ResponseBuilder()
          .setMessage(error.message)
          .setSuccess(false)
          .build()
      );
    }
  }

  async changePassword(req, res) {
    const { email, password } = req.body;

    const result = await this.mailService.changePassword(email, password);

    const response = result
      ? [200, `Password changed successfully! an email is sent to ${email}.`]
      : [422, `uh oh! there is an error when updating ${email} password`];

    res
      .status(response[0])
      .json(new ResponseBuilder().setMessage(response[1]).build());
  }

  async deactivate(req, res) {
    try {
      await this.service.update(
        {
          deletedAt: new Date(),
        },
        {
          email: res.locals.user.email,
        }
      );
      res.status(200).json(
        new ResponseBuilder()
          .setMessage('User deactivated')
          .setSuccess(true)
          .build()
      );
    } catch (error) {
      res.status(400).json(
        new ResponseBuilder()
          .setMessage('error occured')
          .setSuccess(false)
          .build()
      );
    }
  }

  async proposeToCourier(req, res) {
    // link from aws s3
    // const { idLink, photoLink }

    try {
      // make sure sender not double request
      const checkUser = await this.service.proposeModel.findOne({
        // where must provided, otherwise won't work
        where: {
          UserId: res.locals.user.id,
        },
      });
      // first proposal from user
      // TODO: send email to user in this first attempt
      if (checkUser === null) {
        const response = await this.service.proposeModel.create({
          status: 'waiting',
          UserId: res.locals.user.id,
          proposeDate: new Date(),
        });
        res.status(201).json(
          new ResponseBuilder()
            .setData(response)
            .setMessage('We are reviewing your process. Thank you.')
            .setSuccess(true)
            .build()
        );
        // user that rejected send another request
      } else if (checkUser.status === 'rejected') {
        // TODO: send email to user
        await this.service.proposeModel.update(
          {
            status: 'waiting',
          },
          {
            where: {
              UserId: res.locals.user.id,
            },
          }
        );
        res.status(200).json(
          new ResponseBuilder()
            .setSuccess(true)
            .setMessage('We are reviewing your process. Thank you.')
            .build()
        );
      } else if (checkUser.status === 'verified') {
        res.status(401).json(
          new ResponseBuilder()
            .setMessage('You already a courier')
            .setSuccess(false)
            .build()
        );
      } else {
        res.status(401).json(
          new ResponseBuilder()
            .setMessage(
              'You already submit upgrade proposal. Please wait for our team to reach you.'
            )
            .setSuccess(false)
            .build()
        );
      }
    } catch (error) {
      res.status(400).json(
        new ResponseBuilder()
          .setMessage(error.message)
          .setSuccess(false)
          .build()
      );
    }
  }

  // sysadmin method
  async updateSenderProposal(req, res) {
    const { status, userId, rejectReason } = req.body;
    if (
      status === 'verified' ||
      status === 'rejected' ||
      status === 'waiting'
    ) {
      try {
        if (status === 'verified') {
          // TODO: send email to user to inform
          await this.service.proposeModel.update(
            {
              status,
              acceptDate: new Date(),
              rejectDate: null,
              rejectReason: null,
            },
            {
              where: {
                UserId: parseInt(userId),
              },
            }
          );
          await this.service.update(
            {
              role: 'sender+kurir',
            },
            {
              id: userId,
            }
          );
          res.status(200).json(new ResponseBuilder().setSuccess(true).build());
        } else if (status === 'rejected') {
          // TODO: send email to user to inform
          await this.service.proposeModel.update(
            {
              status,
              rejectDate: new Date(),
              acceptDate: null,
              rejectReason,
            },
            {
              where: {
                UserId: parseInt(userId),
              },
            }
          );
          await this.service.update(
            {
              role: 'sender',
            },
            {
              id: userId,
            }
          );
          res.status(200).json(new ResponseBuilder().setSuccess(true).build());
        } else {
          // TODO: send email to user to inform
          // status:waiting
          await this.service.proposeModel.update(
            {
              status,
              rejectDate: null,
              acceptDate: null,
              rejectReason: null,
            },
            {
              where: {
                userId: parseInt(userId),
              },
            }
          );
          await this.service.update(
            {
              role: 'sender',
            },
            {
              id: userId,
            }
          );
          res.status(200).json(new ResponseBuilder().setSuccess(true).build());
        }
      } catch (error) {
        res.status(400).json(
          new ResponseBuilder()
            .setMessage(error.message)
            .setSuccess(false)
            .build()
        );
      }
    } else {
      res.status(400).json(
        new ResponseBuilder()
          .setMessage('invalid request body on status')
          .setSuccess(false)
          .build()
      );
    }
  }

  async uploadImg(req, res) {
    try {
      // TODO: this path must be dynamic to accomodate mobile
      const base64 = await this.S3Service.convertToBase64(
        'assets/ktp-test.jpg'
      );
      const buf = new Buffer(
        base64.replace(/^data:image\/\w+;base64,/, ''),
        'base64'
      );
      const imgPayload = {
        Bucket: `kurir-backend/${this.S3Service.idBucket}/test`,
        Key: 'ktp-test.jpg',
        Body: buf,
        ACL: 'public-read',
      };
      try {
        await this.S3Service.client.upload(imgPayload, (err, data) => {
          return data;
        });
        res.status(200).json(
          new ResponseBuilder()
            .setMessage('successfully upload image to S3')
            .setSuccess(true)
            .build()
        );
      } catch (error) {
        res.status(400).json(
          new ResponseBuilder()
            .setMessage(error.message)
            .setSuccess(false)
            .build()
        );
      }
    } catch (error) {
      res.status(400).json(
        new ResponseBuilder()
          .setMessage(error.message)
          .setSuccess(false)
          .build()
      );
    }
  }

  async checkToken(req, res) {
    const { token } = req.body;
    try {
      const result = await helpers.verifyJwt(token);
      res.status(200).json(
        new ResponseBuilder()
          .setData(result)
          .setMessage('token still valid')
          .setSuccess(true)
          .build()
      );
    } catch (error) {
      res.status(400).json(
        new ResponseBuilder()
          .setMessage('token is expired/not valid')
          .setSuccess(false)
          .build()
      );
    }
  }

  async getSenderProposals(req, res) {
    try {
      const result = await this.service.proposeModel.findAll({
        include: [
          {
            model: models.User,
            attributes: {
              exclude: ['password', 'forgotPassVeriCode'],
            },
          },
        ],
      });
      // const user = await result.getUser();
      res.status(200).json(
        new ResponseBuilder()
          .setData(result)
          .setSuccess(true)
          .build()
      );
    } catch (error) {
      res.status(400).json(new ResponseBuilder().setSuccess(false).build());
    }
  }
}
