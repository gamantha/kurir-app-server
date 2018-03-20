import bcrypt from 'bcrypt';
import Sequelize from 'sequelize';
import helpers from '../helpers';
import ResponseBuilder from '../helpers/ResponseBuilder';
import models from '../models';
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
      if (uniqueEmail === null && uniqueUsername == null) {
        validation = true;
      } else if (uniqueEmail) {
        res.status(400).json(
          new ResponseBuilder()
            .setMessage('Oops. Looks we already have this email registered.')
            .setSuccess(false)
            .build()
        );
        return;
      } else if (uniqueUsername) {
        res.status(400).json(
          new ResponseBuilder()
            .setMessage('Oops. Username already exist. Please choose another.')
            .setSuccess(false)
            .build()
        );
        return;
      }
    } catch (error) {
      res.status(400).json(
        new ResponseBuilder()
          .setMessage(error.message)
          .setSuccess(false)
          .build()
      );
      return;
    }

    if (role !== 'sysadmin' && role !== 'siteadmin' && role !== 'sender') {
      res.status(417).json(
        new ResponseBuilder()
          .setMessage('role must one of sysadmin,siteadmin or sender')
          .setSuccess(false)
          .build()
      );
      return;
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
        return;
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
        return;
      }
      const token = helpers.parseToken(authorization);
      let parsed = null;
      try {
        parsed = helpers.verifyJwt(token);
      } catch (error) {
        res.status(400).json(
          new ResponseBuilder()
            .setMessage(error.message)
            .setSuccess(false)
            .build()
        );
        return;
      }
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
          return;
        }
      } else {
        res.status(400).json(
          new ResponseBuilder()
            .setMessage('only sysadmin can create site admin')
            .setSuccess(false)
            .build()
        );
        return;
      }
    } else {
      try {
        response = await this.service.create(payload);
        const senderPayload = {
          UserId: response.id,
        };
        await this.senderService.create(senderPayload);
        /** Send Confirmation Email Only for Sender Role */
        await this.mailService.sendRegisValidationLink(email);
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
        return;
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
        const user = await this.service.findOne(
          {
            [Op.or]: [
              {
                email: username,
              },
              {
                username,
              },
            ],
          },
          [{ model: models.Sender }]
        );
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
            senderId: user.Sender.id,
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
        // sysadmin & siteadmin login
        if (error.message === 'Cannot read property \'id\' of null') {
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
                .setMessage(error.message)
                .setSuccess(false)
                .build()
            );
            return;
          }
        } else {
          res.status(404).json(
            new ResponseBuilder()
              .setMessage('error at login')
              .setSuccess(false)
              .build()
          );
        }
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

  async checkForgotCode(req, res) {
    const { email, veriCode } = req.body;

    try {
      const response = await this.service.findOne({
        email,
      });
      if (response === null) {
        res.status(404).json(
          new ResponseBuilder()
            .setSuccess(false)
            .setMessage('User not found')
            .build()
        );
        return;
      }

      if (response.forgotPassVeriCode === veriCode) {
        try {
          await this.service.update({ forgotPassVeriCode: null }, { email });
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
              .setMessage(
                'There is a problem with our server please try again later'
              )
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
          .setMessage(
            'There is a problem with our server please try again later'
          )
          .setSuccess(false)
          .build()
      );
    }
  }

  async sendForgotCode(req, res) {
    const { email } = req.body;

    const result = await this.mailService.sendVerificationCode(email);

    const response = result
      ? [
        200,
        'Successfully sent verification code forgot password to email',
        true,
      ]
      : [422, `${email ? email : 'email'} is not registered!`, false];

    res.status(response[0]).json(
      new ResponseBuilder()
        .setMessage(response[1])
        .setSuccess(response[2])
        .build()
    );
  }

  async changePassword(req, res) {
    const { forgotpassword } = req.query;
    const { old_password, new_password } = req.body;
    const email = res.locals.user.email;
    try {
      if (forgotpassword === 'false') {
        const user = await this.service.findOne({ email });
        const oldPass = bcrypt.compareSync(
          old_password,
          user.dataValues.password
        );
        // if oldPass same with in db
        if (oldPass) {
          const result = await this.service.changePassword(
            email,
            new_password,
            forgotpassword
          );
          if (result) {
            res
              .status(200)
              .json(
                new ResponseBuilder()
                  .setMessage('password successfully changed')
                  .build()
              );
          }
        } else {
          res.status(401).json(
            new ResponseBuilder()
              .setMessage('Wrong old password')
              .setSuccess(false)
              .build()
          );
        }
      } else if (forgotpassword === 'true') {
        const result = await this.service.changePassword(
          email,
          new_password,
          forgotpassword
        );
        if (result) {
          res
            .status(200)
            .json(
              new ResponseBuilder()
                .setMessage('password successfully changed')
                .build()
            );
        }
      } else {
        res.status(400).json(
          new ResponseBuilder()
            .setMessage('forgot password params value is invalid')
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

  async deactivate(req, res) {
    try {
      await this.service.update(
        { deletedAt: new Date() },
        { email: res.locals.user.email }
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

  async uploadImg(req, res) {
    // convert image to base64 from mobile client
    /**
     * send image to S3
     * @param {string} base64
     * @param {string} type of upload (ID,Photo)
     * @param {string} extension jpg, png, etc.
     */
    // base64 format: data:image/${extension};base64,${base64}
    const { base64, type, extension } = req.body;
    if (type !== 'ID' && type !== 'Photo') {
      res.status(400).json(
        new ResponseBuilder()
          .setMessage('type only ID or Photo')
          .setSuccess(false)
          .build()
      );
    } else {
      try {
        // const base64 = await this.S3Service.convertToBase64(
        //   'assets/ktp-test.jpg'
        // );
        const buf = new Buffer(
          base64.replace(/^data:image\/\w+;base64,/, ''),
          'base64'
        );

        const encodeEmail = encodeURIComponent(res.locals.user.email);
        const link = `https://s3-ap-southeast-1.amazonaws.com/kurir-backend/${encodeEmail}/${encodeEmail}-${type}.${extension}`;

        const imgPayload = {
          Bucket: `kurir-backend/${res.locals.user.email}`,
          Key: `${res.locals.user.email}-${type}.${extension}`,
          Body: buf,
          ACL: 'public-read',
        };

        try {
          await this.S3Service.client.upload(imgPayload, (err, data) => {
            return data;
          });
          if (type === 'ID') {
            await this.service.proposeModel.update(
              {
                idLink: link,
              },
              {
                where: {
                  UserId: res.locals.user.id,
                },
              }
            );
          } else if (type === 'Photo') {
            await this.service.proposeModel.update(
              {
                photoLink: link,
              },
              {
                where: {
                  UserId: res.locals.user.id,
                },
              }
            );
          }
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
          .setMessage('invalid_token')
          .setSuccess(false)
          .build()
      );
    }
  }

  async editUserProfile(req, res) {
    const { email, photoLink } = req.body;
    const { name, address, phone } = req.body;
    const loggedInUser = res.locals.user.id;
    try {
      const user = await this.service.update(
        { email, photoLink },
        { id: loggedInUser },
        {
          returning: true,
          plain: true,
        }
      );
      const sender = await this.senderService.update(
        { name, address, phone },
        { UserId: loggedInUser }
      );
      res.status(200).json(
        new ResponseBuilder()
          .setData({ user, sender })
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
  }
}
