import bcrypt from 'bcrypt';
import Sequelize from 'sequelize';
import helpers from '../helpers';
import ResponseBuilder from '../helpers/ResponseBuilder';
import { UserService, SenderService, TokenService } from '../services/index';

export default class UserController {
  /**
   * User controller class
   */
  constructor() {
    this.service = new UserService();
    this.senderService = new SenderService();
    this.tokenService = new TokenService();
  }

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
    const { email, password, username } = req.body;
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);
    const payload = {
      email,
      password: hash,
      username,
    };
    try {
      const response = await this.service.register(payload, password, email);
      const senderPayload = {
        userId: response.id,
      };
      try {
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
    } catch (error) {
      res.status(400).json(
        new ResponseBuilder()
          .setMessage(error.message)
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
          [Op.or]: [{ email: username }, { username }]
        });
        if (bcrypt.compareSync(password, user.password)) {
          const userData = Object.assign({
            email: user.email,
            id: user.id,
          });
          const token = helpers.createJWT(userData);
          try {
            const accessToken = await this.tokenService.saveToken(token, req.headers['user-agent']);
            res.status(200).json(new ResponseBuilder()
              .setData(accessToken)
              .setMessage('Logged in successfully')
              .build());
            return;
          } catch (error) {
            res.status(400).json(new ResponseBuilder()
              .setMessage(error.message)
              .setSuccess(false)
              .build());
            return;
          }
        } else {
          res.status(200).json(new ResponseBuilder()
            .setMessage('Invalid password')
            .setSuccess(false)
            .build());
          return;
        }
      } catch (error) {
        res.status(400).json(new ResponseBuilder()
          .setMessage('email/username invalid or unavailable')
          .setSuccess(false)
          .build());
        return;
      }
    }
    res.status(400).json(new ResponseBuilder()
      .setMessage('invalid payload')
      .setSuccess(false).build());
    return;
  }

  async refreshToken(req, res) {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(400).json(new ResponseBuilder()
        .setMessage('invalid payload')
        .setSuccess(false).build());
      return;
    }
    try {
      const response = await this.tokenService.refreshToken(req.headers.authorization, refreshToken, req.headers['user-agent']);
      res.status(200).json(new ResponseBuilder()
        .setData(response)
        .setMessage('Access token successfully refreshed.')
        .build()
      );
      return;
    } catch (error) {
      res.status(400).json(new ResponseBuilder()
        .setMessage(error.message)
        .setSuccess(false)
        .build());
      return;
    }
  }

  async logout(req, res) {
    try {
      const token = helpers.parseToken(req.headers['authorization']);
      await this.tokenService.destroy({
        accessToken: token
      });
      res.status(200).json(new ResponseBuilder().setData({}).build());
    } catch (error) {
      res.status(404).json(new ResponseBuilder()
        .setMessage(error.message)
        .setSuccess(false)
        .build());
    }
  }

  async checkForgotPassVeriCode(req, res) {
    const { email, veriCode } = req.body;

    try {
      const response = await this.service.findOne({ email });
      const userPayload = response.forgotPassVeriCode;

      if (userPayload === veriCode) {
        try {
          await this.service.update({ forgotPassVeriCode: null }, { email });
          res
            .status(200)
            .json(new ResponseBuilder()
              .setMessage('Verification code match. User now can safely reset password.')
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

  async deactivate(req, res) {
    try {
      await this.service.update({ deletedAt: new Date() }, { email: res.locals.user.email });
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
}
