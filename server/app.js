const app = require('express')();

const bodyParser = require('body-parser');

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
