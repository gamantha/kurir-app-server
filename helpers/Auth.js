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
  }
  // validate token
  try {
    const token = parseToken(authorization);
    jwt.verify(token, process.env.SECRET);
  } catch (error) {
    response.setMessage(error.message).setSuccess(false).build();
    res.status(401).json(response);
  }
  next();
};

