import bcrypt from 'bcrypt';
import helpers from '../helpers';
import Response from '../helpers/Response';
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
      Response.respond(res, result);
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
        res.json({
          user, msg: 'berhasil membuat sender baru', ok: true,
        });
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
          token: helpers.createJWT(userData),
          ok: true,
          msg: `berhasil login dengan email ${email}`,
        });
      } else {
        next(null, { msg: 'password salah', ok: false });
      }
    });
  }
}
