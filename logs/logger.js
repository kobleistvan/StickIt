var logger = require('winston');

// Redefine the DEFAULT winston logger used throughout the application, instead of redefinind it in every module

logger.add(logger.transports.File, {
    level: "info",
    filename: "./logs/all-logs.log",
    handleExceptions: true,
    humanReadableUnhandledException: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false
});

logger.remove(logger.transports.Console).add(logger.transports.Console, {
    level: "debug",
    handleExceptions: true,
    humanReadableUnhandledException: true,
    json: false,
    prettyPrint: true,
    colorize: true
});


logger.exitOnError = false;

// Define a stream to be used by morgan
logger.stream = {
    write: function(message, encoding) {
        logger.info(message);
    }
};

module.exports = logger;