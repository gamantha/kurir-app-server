import helper from './';
import ResponseBuilder from './ResponseBuilder';
import { TokenService } from '../services/index';

export default async (req, res, next) => {
  const { authorization } = req.headers;
  const response = new ResponseBuilder();
  if (typeof authorization === 'undefined' || authorization === '') {
    // Auth token not provided
    response
      .setMessage('Authorization header not provided or empty.')
      .setSuccess(false)
      .build();
    res.status(403).json(response);
    return;
  }
  // validate token
  try {
    const token = helper.parseToken(authorization);

    const result = helper.verifyJwt(token);
    const tokenService = new TokenService();
    try {
      /**
       * Pass token payload to next function
       * it'll be accessible through res.locals.user
       * */
      const accessToken = await tokenService.findOne({
        accessToken: token,
        userAgent: req.headers['user-agent'],
      });
      if (accessToken === null) {
        res.status(401).json(
          new ResponseBuilder()
            .setMessage('you have not logged in')
            .setSuccess(false)
            .build()
        );
        return;
      }
      res.locals.user = {
        email: result.email,
        id: result.id,
        senderId: result.senderId,
        role: result.role,
      };
    } catch (error) {
      throw Error(error);
    }
  } catch (error) {
    res.status(401).json(
      response
        .setMessage(error.message)
        .setSuccess(false)
        .build()
    );
    return;
  }
  next();
};
