import helper from './';
import ResponseBuilder from './ResponseBuilder';
import { TokenService, UserService } from '../services/index';

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
    const parsed = helper.verifyJwt(token);
    const tokenService = new TokenService();
    const userService = new UserService();
    try {
      /**
       * Pass token payload to next function
       * it'll be accessible through res.locals.user
       * */
      const findToken = await tokenService.findOne({
        accessToken: token,
        userAgent: req.headers['user-agent'],
      });
      if (findToken === null) {
        res.status(401).json(
          new ResponseBuilder()
            .setMessage('you have not logged in')
            .setSuccess(false)
            .build()
        );
        return;
      }
      const user = await userService.findOne({ email: parsed.email });
      if (user.role !== 'sysadmin') {
        res.status(401).json(
          new ResponseBuilder()
            .setMessage('You are not authorized to access this page.')
            .setSuccess(false)
            .build()
        );
        return;
      }
      res.locals.user = {
        email: parsed.email,
        id: parsed.id,
        role: parsed.role,
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
