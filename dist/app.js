'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = require('passport-local');

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _controllers = require('./controllers');

var _user = require('./routes/user');

var _user2 = _interopRequireDefault(_user);

var _item = require('./routes/item');

var _item2 = _interopRequireDefault(_item);

var _receiver = require('./routes/receiver');

var _receiver2 = _interopRequireDefault(_receiver);

var _mail = require('./routes/mail');

var _mail2 = _interopRequireDefault(_mail);

var _google = require('./routes/google');

var _google2 = _interopRequireDefault(_google);

var _facebook = require('./routes/facebook');

var _facebook2 = _interopRequireDefault(_facebook);

var _proposal = require('./routes/proposal');

var _proposal2 = _interopRequireDefault(_proposal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Http from 'http';
// import Io from 'socket.io';

var app = (0, _express2.default)();
// const http = Http.Server(app);
// const io = Io(http);

// routes import
require('dotenv').config();

app.use((0, _cors2.default)());

_passport2.default.use(new _passportLocal2.default({ usernameField: 'email', passwordField: 'password' }, _controllers.userController.login.bind(_controllers.userController)));

// port setup
app.set('port', process.env.PORT || 3000);
// log setup
app.use((0, _morgan2.default)('dev'));

// bodyparser setup
app.use(_bodyParser2.default.json({ limit: '50mb' }));
app.use(_bodyParser2.default.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit: 50000
}));

app.use('/api/item', _item2.default);
app.use('/api/user', _user2.default);
app.use('/api/receiver', _receiver2.default);
app.use('/api/mail', _mail2.default);
app.use('/api/google', _google2.default);
app.use('/api/facebook', _facebook2.default);
app.use('/api/proposal', _proposal2.default);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    data: {},
    meta: {
      message: err.message,
      success: false
    }
  });
});

// io.on('connection', socket => {
//   console.log('a socket io connected');
// });

app.listen(app.get('port'), function () {
  console.log('app listening on ' + app.get('port'));
});

module.exports = app;