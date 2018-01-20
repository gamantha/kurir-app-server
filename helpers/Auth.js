import jwt from 'jsonwebtoken';
import ResponseBuilder from './ResponseBuilder';

/**
 * Parse authorization header
 * @param {String} token
 */
const parseToken = (token) => {
  if (token.includes('bearer ')) {
    return token.slice('bearer '.length);
  }
  throw Error('invalid token');
};

export default (req, res, next) => {
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
    const token = parseToken(authorization);
    const result = jwt.verify(token, process.env.SECRET);
    /**
     * Pass token payload to next function
     * it'll be accessible through res.locals.user
     * */
    res.locals.user = {
      email: result.email,
      id: result.id,
    };
  } catch (error) {
    res.status(401).json(response
      .setMessage(error.message)
      .setSuccess(false)
      .build());
    return;
  }
  next();
};
