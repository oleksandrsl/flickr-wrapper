const path = require('path');
const express = require('express');
const httpError = require('http-errors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const routes = require('../routes/index.route');
const config = require('./config');
const passport = require('./passport')
var session = require('express-session')
const app = express();

if (config.env === 'development') {
  app.use(logger('combined'));
}

// Choose what fronten framework to serve the dist from
var distDir = '../../dist/';

app.use(express.static(path.join(__dirname, distDir)))
app.use(/^((?!(api)).)*/, (req, res) => {
  res.sendFile(path.join(__dirname, distDir + '/index.html'));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

app.use(cookieParser("secret"));
app.use(compress());
app.use(methodOverride());

app.use(passport.initialize());
app.use(passport.session());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// API router
app.use('/api/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new httpError(404)
  return next(err);
});

// error handler, send stacktrace only during development
app.use((err, req, res, next) => {

  // customize Joi validation errors
  if (err.isJoi) {
    err.message = err.details.map(e => e.message).join("; ");
    err.status = 400;
  }

  res.status(err.status || 500).json({
    message: err.message
  });
  next(err);
});

module.exports = app;
