import bcrypt from 'bcrypt';
import helpers from '../helpers';
import ResponseBuilder from '../helpers/ResponseBuilder';
import { UserService, SenderService } from '../services/index';

export default class UserController {
  /**
   * User controller class
   */
  constructor() {
    this.service = new UserService();
    this.senderService = new SenderService();
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

  async login(email, password, next) {
    const user = await this.service.findOne();
    if (!user) {
      next(null, {
        meta: {
          message: 'email salah/tidak tersedia',
          success: false,
        },
        data: {},
      });
    } else if (bcrypt.compareSync(password, user.password)) {
      const userData = Object.assign({
        email: user.email,
        id: user.id,
        ok: true,
      });
      next(null, {
        data: {
          token: helpers.createJWT(userData),
        },
        meta: {
          message: 'Logged in successfully',
          success: true,
        },
      });
    } else {
      next(null, {
        data: {},
        meta: {
          message: 'invalid password',
          success: false,
        },
      });
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
}
