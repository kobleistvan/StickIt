// Use strict for all the imported modules. Doesn't apply for this one, so I have to use the classic "use strict" directive.
"use strict";
require('use-strict');

// Define rootRequire to avoid '../../../../'-es
global.rootRequire = function(name) {
    return require(__dirname + '/' + name);
};

var express = require('express'),
    path = require('path'),
    config = require('./config.json')[process.env.NODE_ENV || 'dev'],
    favicon = require('serve-favicon'),
    morgan = require('morgan'),
    logger = require('./logs/logger'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    helmet = require('helmet'),
    routes = require('./routes/routes'),
    compression = require('compression'),
    app = express();

// use GZip compression
app.use(compression());

// Moved static content serving before logging for simplicity
app.use(express.static(path.join(__dirname, 'public')));

// Redirect morgan logs to winston's info stream
app.use(require("morgan")((process.env.NODE_ENV ? 'combined' : 'dev'), {
    "stream": logger.stream
}));

// Say Hi, kids!
logger.info("Environment set to: ", process.env.NODE_ENV || 'development (dev)');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon(path.join(__dirname, 'public/favicon', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser("randomsecretToSignCookies!"));
app.use(helmet());

// Handle every route
app.use('/', routes);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: (app.get('env') === 'development') ? err : {}
    });
});

module.exports = app;
