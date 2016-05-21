var express = require('express'),
    router = express.Router(),
    jwtHelper = rootRequire('lib/utils/jwtHelper');

var middlewares = {

    // Middleware for requiring a valid authentication token in order to move onto the 'next' method
    requireToken: function (req, res, next) {

        // Check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.signedCookies.x_access_token || req.headers['x-access-token'];

        if (token) {
            var jwt = new jwtHelper();
            jwt.verifyToken({
                token: token
            }, function verify(err, response) {
                if (err) {
                    if (err.name && err.name === 'TokenExpiredError') {
                        return res.status(401).send({
                            success: false,
                            message: 'Authentication token has expired.'
                        })
                    } else if (err.name && err.name === 'missingTokenError') {
                        return res.status(401).send({
                            success: false,
                            message: "No authentication token provided."
                        })
                    } else {
                        return res.status(500).send({
                            success: false,
                            message: 'An error occured while verifying the authentication token.'
                        })
                    }
                } else {
                    req.decoded = response.decoded;
                    next();
                }
            })
        } else {
            return res.status(401).send({
                success: false,
                message: 'No authentication token provided.'
            });
        }
    }
};

module.exports = middlewares;
