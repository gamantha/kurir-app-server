import bcrypt from 'bcrypt';
import ResponseBuilder from '../helpers/ResponseBuilder';
import { AdminService } from '../services/index';

export default class AdminController {
  constructor() {
    this.service = new AdminService();
  }

  async create(req, res) {
    const { username, password, role } = req.body;
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);
    const payload = {
      username,
      password: hash,
      role,
    };
    if (role !== 'sysadmin' && role !== 'siteadmin') {
      res.status(400).json(
        new ResponseBuilder()
          .setMessage('cannot create role other than sysadmin or siteadmin')
          .setSuccess(false)
          .build()
      );
    } else {
      try {
        const response = await this.service.create(payload);
        res.status(201).json(
          new ResponseBuilder()
            .setData(response)
            .setMessage(`successfully created new admin with role ${role}`)
            .build()
        );
      } catch (error) {
        res.status(400).json(
          new ResponseBuilder()
            .setMessage(error)
            .setSuccess(false)
            .build()
        );
      }
    }
  }
}
