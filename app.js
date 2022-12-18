const express = require('express');
const httpLogger = require('morgan');
const path = require('path');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(httpLogger('dev'));
app.use(express.json({ limit: '5MB' }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, x-access-token',
  );
  res.header(
    'Access-Control-Expose-Headers',
    'Content-Disposition, x-access-token',
  );
  if (req.method === 'OPTIONS') {
    res.status(200).send();
  } else {
    next();
  }
});

app.use('/', routes);

app.use('/public', express.static(`${__dirname}/public`));

app.get('/favicon.ico', (req, res) => res.status(204));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(new Error('ERROR'));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(400).send({ code: 500, message: err.message });

  res.locals.message = err.message;
  res.locals.error = req.app.get('NODE_ENV') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
