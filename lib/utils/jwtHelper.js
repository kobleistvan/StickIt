var config = rootRequire('config.json')[process.env.NODE_ENV || 'dev'],
    jwt = require('jsonwebtoken');

// jwtHelper constructor method, parameterizes the configuration for the jsonwebtoken instance
var jwtHelper = function (conf) {
    this._config = conf || {
        jwtSecret: config.jwt.superSecret
    };
};

// Signs a token which expires in 24 hours
jwtHelper.prototype.signToken = function (data, callback) {
    callback = (typeof callback === 'function') ? callback : function() {};
    try {
        var token = jwt.sign(data, this._config.jwtSecret, {
            expiresIn: 60 * 1440 // expires in 24 hours
        });
        return callback(null, {
            token: token
        });
    } catch (err) {
        console.error(err);
        return callback(err);
    }
};

// Verifies the integrity and validity of a jwt
jwtHelper.prototype.verifyToken = function (data, callback) {
    callback = (typeof callback === 'function') ? callback : function() {};
    if (data.token) {
        // Verifies secret and checks expiration
        try {
            var decoded = jwt.verify(data.token, this._config.jwtSecret);
            return callback(null, {
                decoded: decoded
            });
        } catch (err) {
            console.error(err);
            return callback(err);
        }
    } else {
        var e = new Error("No authentication token provided.");
        e.name = "missingTokenError";
        return callback(e);
    }
};

module.exports = jwtHelper;