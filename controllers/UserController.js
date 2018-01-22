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
      res.status(400).json(new ResponseBuilder()
        .setMessage(error)
        .setSuccess(false)
        .build());
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
      const response = await this.service.register(payload, password);
      const senderPayload = {
        userId: response.id,
      };
      try {
        await this.senderService.create(senderPayload);
        res.status(201).json(new ResponseBuilder()
          .setData(response)
          .setMessage('successfully created new sender')
          .build());
      } catch (error) {
        res.status(400).json(new ResponseBuilder()
          .setMessage(error.message)
          .setSuccess(false)
          .build());
      }
    } catch (error) {
      res.status(400).json(new ResponseBuilder()
        .setMessage(error.message)
        .setSuccess(false)
        .build());
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
            ok: true,
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
}
