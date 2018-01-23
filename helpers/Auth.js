import helper from './';
import ResponseBuilder from './ResponseBuilder';

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
    const token = helper.parseToken(authorization);
    const result = helper.verifyJwt(token);
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
