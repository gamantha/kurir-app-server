const jwt = require('jsonwebtoken');

const methods = {};

const options = {
  expiresIn: 60 * 60,
  issuer: 'courier.id-backend',
  jwtid: 'courier.user',
  subject: 'courier-access-token'
};

/**
 * Sign new jwt token from passed data.
 * @param {Object} data
 */
methods.createJWT = (data) => {
  try {
    const token = jwt.sign(data, process.env.SECRET, options);
    return token;
  } catch (error) {
    throw Error(error.message);
  }
};

/**
 * parse JWT with specified options.
 * @param {String} token 
 */
methods.verifyJwt = (token) => {
  try {
    const payload = jwt.verify(token, process.env.SECRET, options);
    return payload;
  } catch (error) {
    throw Error('invalid token provided');
  }
};

/**
 * Parse authorization header
 * @param {String} token
 */
methods.parseToken = (token) => {
  if (token.includes('bearer ')) {
    return token.slice('bearer '.length);
  }
  throw Error('invalid token');
};

methods.refreshToken = () => {
  return Math.random().toString(36).substring(3);
};

module.exports = methods;
