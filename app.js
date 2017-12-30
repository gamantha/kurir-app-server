const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(cors());

// passport
const Sender = require('./controllers/sender');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  Sender.login,
));

// port setup
app.set('port', process.env.PORT || 3000);

// bodyparser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
const item = require('./routes/item');
const sender = require('./routes/sender');
const receiver = require('./routes/receiver');

app.use('/api/item', item);
app.use('/api/sender', sender);
app.use('/api/receiver', receiver);

app.listen(app.get('port'), () => {
  console.log(`app listening on ${app.get('port')}`);
});

module.exports = app;
