import helpers from '../helpers';
import { GoogleService, TokenService, UserService } from '../services/index';
import ResponseBuilder from '../helpers/ResponseBuilder';

export default class GoogleController {

  constructor() {
    this.googleService = new GoogleService();
    this.userService = new UserService();
    this.tokenService = new TokenService();
  }

  async login(req, res) {
    const { tokenId } = req.body;
    if (typeof tokenId === 'undefined') {
      res.status(403).json(new ResponseBuilder()
        .setMessage('Invalid payload')
        .setSuccess(false)
        .build());
      return;
    }
    try {
      const user = await this.googleService.verifyToken(tokenId);
      const exist = await this.userService.findOne({ email: user.email });
      if (exist !== null) {
        // return token
        const userData = Object.assign({
          email: exist.email,
          id: exist.id,
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
        res.status(200).json(
          new ResponseBuilder()
            .setData({
              email: user.email,
              registered: false
            })
            .setMessage('User information retrieved successfully')
            .build()
        );
        return;
      }
    } catch (error) {
      res.status(400).json(new ResponseBuilder()
        .setMessage('Provided tokenId is not valid')
        .setSuccess(false)
        .build()
      );
    }
  }

  async register(req, res) {
    const { tokenId } = req.body;
    if (typeof tokenId === 'undefined') {
      res.status(403).json(new ResponseBuilder()
        .setMessage('Invalid payload')
        .setSuccess(false)
        .build());
      return;
    }
    try {
      const user = await this.googleService.verifyToken(tokenId);
      const exist = await this.userService.findOne({ email: user.email });
      if (exist !== null) {
        res.status(200).json(
          new ResponseBuilder()
            .setData({
              registered: true
            })
            .setMessage('You have already registered with this email, procceed to login')
            .setSuccess(false)
            .build()
        );
        return;
      } else {
        res.status(200).json(
          new ResponseBuilder()
            .setData({
              email: user.email,
              registered: false
            })
            .setMessage('User information retrieved successfully')
            .build()
        );
        return;
      }
    } catch (error) {
      res.status(400).json(new ResponseBuilder()
        .setMessage(error.message)
        .setSuccess(false)
        .build()
      );
    }
  }
}