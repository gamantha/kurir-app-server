'use strict';

var jwt = require('jsonwebtoken');

var methods = {};

var options = {
  expiresIn: 3 * 60 * 60,
  issuer: 'courier.id-backend',
  jwtid: 'courier.user',
  subject: 'courier-access-token'
};

/**
 * Sign new jwt token from passed data.
 * @param {Object} data
 */
methods.createJWT = function (data) {
  try {
    var token = jwt.sign(data, process.env.SECRET, options);
    return token;
  } catch (error) {
    throw Error(error.message);
  }
};

/**
 * parse JWT with specified options.
 * @param {String} token
 */
methods.verifyJwt = function (token) {
  try {
    var payload = jwt.verify(token, process.env.SECRET, options);
    return payload;
  } catch (error) {
    throw Error(error);
  }
};

/**
 * Parse authorization header
 * @param {String} token
 */
methods.parseToken = function (token) {
  if (token.includes('bearer ')) {
    return token.slice('bearer '.length);
  }
  throw Error('invalid token');
};

methods.refreshToken = function () {
  return Math.random().toString(36).substring(3);
};

module.exports = methods;