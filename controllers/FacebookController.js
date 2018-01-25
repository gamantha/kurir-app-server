import helpers from '../helpers';
import { FacebookService, TokenService, UserService } from '../services/index';
import ResponseBuilder from '../helpers/ResponseBuilder';

export default class FacebookController {

  constructor() {
    this.service = new FacebookService();
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
      const user = await this.service.verifyToken(tokenId);
      if (!('email' in user)) {
        res.status(404).json(
          new ResponseBuilder()
            .setSuccess(false)
            .setMessage('Email scope is not enabled')
            .build()
        );
        return;
      } else {
        try {
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
          res.status(400).json(
            new ResponseBuilder()
              .setSuccess(false)
              .setMessage('An error occured while searching for you in our database.')
              .build()
          );
          return;
        }
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
    if (typeof tokenId !== 'undefined') {
      try {
        const result = await this.service.verifyToken(tokenId);
        if (!('email' in result)) {
          res.status(404).json(
            new ResponseBuilder()
              .setSuccess(false)
              .setMessage('Email scope is not enabled')
              .build()
          );
          return;
        } else {
          try {
            const exist = await this.userService.findOne({ email: result.email });
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
                    email: result.email,
                    registered: false
                  })
                  .setMessage('User information retrieved successfully')
                  .build()
              );
              return;
            }
          } catch (error) {
            res.status(400).json(
              new ResponseBuilder()
                .setSuccess(false)
                .setMessage('An error occured while searching for you in our database.')
                .build()
            );
            return;
          }
        }
      } catch (error) {
        res.status(400).json(
          new ResponseBuilder()
            .setSuccess(false)
            .setMessage('Invalid access token')
            .build()
        );
        return;
      }
    }
    res.status(403).json(
      new ResponseBuilder()
        .setSuccess(false)
        .setMessage('Invalid payload')
        .build()
    );
  }
}