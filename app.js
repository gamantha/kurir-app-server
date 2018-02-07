import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import logger from 'morgan';
import passport from 'passport';
import LocalStrategy from 'passport-local';

import { userController } from './controllers';
// routes import
import user from './routes/user';
import item from './routes/item';
import receiver from './routes/receiver';
import mail from './routes/mail';
import google from './routes/google';
import facebook from './routes/facebook';

const app = express();
require('dotenv').config();

app.use(cors());

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    userController.login.bind(userController)
  )
);

// port setup
app.set('port', process.env.PORT || 3000);
// log setup
app.use(logger('dev'));

// bodyparser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/item', item);
app.use('/api/user', user);
app.use('/api/receiver', receiver);
app.use('/api/mails', mail);
app.use('/api/google', google);
app.use('/api/facebook', facebook);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    data: {},
    meta: {
      message: err.message,
      success: false,
    },
  });
});

app.listen(app.get('port'), () => {
  console.log(`app listening on ${app.get('port')}`);
});

module.exports = app;
