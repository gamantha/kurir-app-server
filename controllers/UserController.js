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

  get(req, res) {
    this.service.findAll((rows) => {
      const result = new ResponseBuilder().setData(rows).build();
      res.status(200).json(result);
    });
  }

  create(req, res) {
    const { email, password } = req.body;
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);
    const payload = {
      email, password: hash,
    };
    this.service.create(payload, (user) => {
      const senderPayload = {
        userId: user.id,
      };
      this.senderService.create(senderPayload, () => {
        const result = new ResponseBuilder().setData(user)
          .setMessage('successfully created new sender')
          .setSuccess(true)
          .build();
        res.json(result);
      });
    });
  }

  login(email, password, next) {
    this.service.findOne({
      where: { email },
    }, (user) => {
      if (!user) {
        next(null, { msg: 'email salah/tidak tersedia', ok: false });
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
    });
  }
}
