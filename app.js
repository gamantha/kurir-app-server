const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
// const { SMTPServer } = require('smtp-server');
require('dotenv').config();

app.use(cors());

// passport
const Sender = require('./controllers/sender');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, Sender.login));

// port setup
app.set('port', process.env.PORT || 3000);

// bodyparser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// smtp server setup
// const options = {
//   secure: true,
//   name: 'localhost',
//   banner: 'hello kurir',
// };
// const mailServer = new SMTPServer(options);
// mailServer.listen(4000, null, () => {
//   console.log('berhasil konek ke email server');
// });
// mailServer.on('error', (err) => {
//   console.log('Error %s', err.message);
// });

// routes
const item = require('./routes/item');
const sender = require('./routes/sender');
const receiver = require('./routes/receiver');
const mail = require('./routes/mail');

app.use('/api/item', item);
app.use('/api/sender', sender);
app.use('/api/receiver', receiver);
app.use('/api/mail', mail);

app.listen(app.get('port'), () => {
  console.log(`app listening on ${app.get('port')}`);
});

module.exports = app;
