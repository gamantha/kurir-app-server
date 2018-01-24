const jwt = require('jsonwebtoken');

const methods = {};

methods.createJWT = data => {
  const token = jwt.sign(data, process.env.SECRET);
  return token;
};

module.exports = methods;
